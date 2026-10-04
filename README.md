# GhostSub — subscription defense without your bank login

Hacktoberfest **Build for a Friend**: help a friend spot subscription "vampires," draft FTC-style cancellation letters, and compare duplicate services with Friend-Split — all from a CSV export, no Plaid or bank credentials.

## Quick start

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). Press **⌘D** (or **Ctrl+D**) to load the demo statement.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port **43123** |
| `npm run build` | Production build |
| `npm run test` | Core recurrence unit test |
| `npm run lint` | ESLint |

## Deploy

[`render.yaml`](./render.yaml) — Node web service, `npm run build` / `npm start` in `apps/web`.

## License

MIT — see [LICENSE](./LICENSE).

## DEV.to demo script (outline)

1. Hook: a friend’s $295/mo drain and why Rocket Money-style apps fail the privacy test.
2. Live demo: **⌘D** → 48-row CSV → Planet Fitness zombie + Adobe price-creep cards.
3. Click **GHOST-** issue → inspector drift → FTC letter → copy/download (disclaimer visible).
4. Friend-Split samples → Duo savings + Lake Tahoe progress bar.
5. Tags: `#hacktoberfest` `#opensource` `#tabpfn` `#gemma` — repo `github.com/aiwithrajan/hacktoberfest-build-for-a-friend`.
