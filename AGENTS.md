# Thorin documentation instructions

## About this project

- This is the public Thorin documentation site built on [Mintlify](https://mintlify.com).
- Pages are MDX files with YAML frontmatter.
- Configuration lives in `docs.json`.
- People write product documentation by hand. Do not regenerate public docs by dumping private repository notes into this repo.
- Scheduled automation validates docs health. It does not rewrite content.

## Terminology

- Use "Thorin" for the product.
- Use "customer" for organizations being onboarded to Thorin.
- Use "admin" for customer users who configure organization wide settings.

## Style preferences

- Use active voice and second person.
- Keep sentences concise. Use one idea per sentence.
- Use sentence case for headings.
- Use simple words.
- Do not use dashes in prose.
- Do not use boldface as decoration.
- Use code formatting for file names, commands, paths, and code references.

## Content boundaries

- This repo is public. Do not publish broad private repo context automatically.
- Do not publish internal runbooks, incident notes, test credentials, AWS account details, on call contacts, customer specific notes, or private operational playbooks.
- Before moving private source material into public docs, rewrite it for a customer facing audience and check for secrets, customer data, internal credentials, and operational details that should not be public.
