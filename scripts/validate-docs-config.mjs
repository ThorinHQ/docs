import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

function collectNavigationPages(items, pages = []) {
  for (const item of items) {
    if (typeof item === "string") {
      pages.push(item);
      continue;
    }

    if (Array.isArray(item.pages)) {
      collectNavigationPages(item.pages, pages);
    }
  }

  return pages;
}

async function pageExists(pagePath) {
  const candidates = [`${pagePath}.mdx`, `${pagePath}.md`].map((candidate) => path.join(repoRoot, candidate));

  for (const candidate of candidates) {
    const stat = await fs.stat(candidate).catch(() => null);

    if (stat?.isFile()) {
      return true;
    }
  }

  return false;
}

async function assertNoStarterContent() {
  const files = ["docs.json", "README.md", "index.mdx"];

  for (const file of files) {
    const content = await fs.readFile(path.join(repoRoot, file), "utf8");

    if (content.includes("Mintlify Starter Kit") || content.includes("Welcome to your project")) {
      throw new Error(`${file} still contains starter-kit content.`);
    }
  }
}

async function main() {
  const docsConfig = await readJson(path.join(repoRoot, "docs.json"));

  if (!docsConfig.navigation?.pages) {
    throw new Error("docs.json must define navigation.pages.");
  }

  const pages = collectNavigationPages(docsConfig.navigation.pages);

  for (const page of pages) {
    if (!(await pageExists(page))) {
      throw new Error(`Navigation references a missing page: ${page}`);
    }
  }

  for (const redirect of docsConfig.redirects ?? []) {
    if (typeof redirect.destination !== "string") {
      throw new Error("Each redirect must define a destination.");
    }

    const destination = redirect.destination.replace(/^\//, "");

    if (!(await pageExists(destination))) {
      throw new Error(`Redirect points to a missing page: ${redirect.destination}`);
    }
  }

  await assertNoStarterContent();

  console.log(`Validated ${pages.length} navigation pages.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
