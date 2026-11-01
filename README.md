# Finance OS — Personal Finance Manager

A responsive, local-first personal finance workspace built with React, TypeScript, Vite, IndexedDB and Recharts.

## Run locally

Requires Node.js 20.19+ or 22+.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The app is configured for the repository project path `/personal-finance-manager/`. GitHub Pages should use **GitHub Actions** as its deployment source. The workflow builds the app and publishes the `dist` folder.

## Modules

- Overview: tracked account balance, monthly cash flow, budget health, net worth snapshot and upcoming commitments.
- Transactions: income, expenses, transfers, search and edit/delete.
- Accounts: opening balances and ledger-driven balances.
- Budgets: category limits and actual expense totals from transactions.
- Recurring & Bills: bill, subscription and repeating-income reminders. Recording a due item creates a transaction; nothing is paid automatically.
- Due Calendar: upcoming recurring dates and loan EMI reminders.
- Loans & EMIs: balances, EMI commitments and approximate payoff estimates.
- Investments: manual holdings and valuations.
- Goals: savings targets and manual contribution progress.
- Net Worth: accounts + investments + other assets − loans.
- Reports: selected-month breakdown and CSV export.
- Settings: JSON backup/restore and data controls.

## Privacy and limitations

All records stay in IndexedDB in the current browser profile. There is no bank, card, broker or lender connection; no automatic payments; no cloud sync; and no market-price feed. Investment valuations, asset estimates and loan outstanding amounts must be updated manually. Net worth can be double-counted if a liability is entered both as a negative account and as a loan; the app displays a reminder about this.

Export JSON backups regularly. Clearing browser/site data can erase local records. For migration, use the in-app JSON export and import on the destination browser.
