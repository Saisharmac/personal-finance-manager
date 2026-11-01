# Personal Finance Manager

Premium, responsive, local-first personal finance dashboard.

## Run locally
Requires Node.js 20.19+ or 22+.
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## GitHub Pages deployment
1. Create a **new, separate** public repository named `personal-finance-manager`.
2. Upload the contents of this folder to the repository root.
3. Open Settings → Pages → Build and deployment → Source, choose **GitHub Actions**.
4. Push/commit to `main`. The included workflow builds and deploys.
5. URL: `https://YOUR-USERNAME.github.io/personal-finance-manager/`.

## Privacy
Transactions are stored in IndexedDB in this browser profile. Demo records are illustrative. Export backups regularly; clearing browser/site data can erase local records. No bank connection or payment processing is included.

## Included foundation
Responsive dark dashboard, cash-flow chart, budget overview, accounts preview, add-transaction modal, search, IndexedDB persistence, JSON backup, GitHub Pages workflow.
