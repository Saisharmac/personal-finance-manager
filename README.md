# Finance OS — Personal Finance Manager

A mobile-first personal finance app built with React, TypeScript, Vite, IndexedDB and Recharts.

## Included sections
- **Overview:** tracked balance, monthly income and expenses, savings rate, six-month cash-flow chart, budget health, recent transactions and accounts.
- **Transactions:** add, edit, delete, search and filter income/expenses.
- **Accounts:** manage bank, cash, credit and other account balances.
- **Budgets:** monthly category limits, spent amount, remaining balance and overspend warnings.
- **Loans & EMIs:** principal, outstanding amount, monthly EMI, interest rate and next due date.
- **Investments:** holdings, asset type, units, invested capital, current value and gain/loss.
- **Reports:** cash-flow trends, category spending and budget performance.
- **Settings:** JSON export/import, local-storage explanation and install-to-home-screen guide.

## Run locally
Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Privacy and backup
Records are stored in IndexedDB in this browser profile. There is no bank connection, cloud sync or payment processing. Export JSON backups regularly. Clearing browser data can erase local records. The app seeds illustrative sample records only when a corresponding store is empty. Existing transaction records from the first version are retained and their old account names are mapped to the new account IDs when loaded.

## GitHub Pages
The included GitHub Actions workflow builds and deploys on pushes to `main`. Set repository Settings → Pages → Build and deployment → Source to GitHub Actions.
