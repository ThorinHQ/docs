# Thorin docs

Mintlify documentation for Thorin.

The docs site is public. Treat `ThorinHQ/thorin`, Slack, Linear, and Notion as research sources, not as content that can be copied directly into this repository.

Write pages for the customer facing product surface at `app.thorin.com`. Cover agents, skills, automations, knowledge, integrations, admin setup, security, and workflows. Keep internal runbooks, incidents, test credentials, AWS details, on call contacts, customer specific notes, and private operational playbooks out of this repo.

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview documentation changes locally.

```bash
npm i -g mint
```

Run the preview at the repository root.

```bash
mint dev
```

View your local preview at `http://localhost:3000`.

## Validation

Run the docs checks locally.

```bash
npm run check
npm exec --yes --package mint@latest -- mint validate
npm exec --yes --package mint@latest -- mint broken-links --check-redirects
```

`.github/workflows/validate-docs.yml` runs the same checks every three days and on demand. It validates docs health but does not rewrite content.

## Troubleshooting

- If a page loads as a 404, run `npm run check` and confirm every navigation path maps to an `.mdx` file.
- If a redirect fails, run `mint broken-links --check-redirects` and confirm its destination page exists.
- If product behavior changed, update the relevant page and `docs.json` in the same change.
