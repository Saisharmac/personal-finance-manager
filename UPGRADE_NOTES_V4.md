# Finance OS v4 — Planning & Net Worth Upgrade

## New modules
- Recurring & Bills: repeating expense, subscription and income reminders with weekly, monthly, quarterly and yearly cadence.
- Record action: when a real payment/receipt occurs, it creates a ledger transaction and advances the next due date. It does not execute payments or automatically create future ledger entries.
- Due Calendar: 45-day view of upcoming recurring items and next loan EMI dates, with overdue / soon indicators.
- Goals: savings targets, deadline, monthly plan and manual goal contributions.
- Net Worth: account balances + investment values + other assets − loans outstanding.
- Loan payoff estimate: indicative payoff duration and interest at current EMI and annual rate, assuming constant rate and payment.
- Reports: selectable month, category spending and CSV export.
- Settings: v4 JSON backup/restore includes recurring items, goals and assets; targeted cleanup of original demo records.
- Overview: net worth and upcoming commitments added to the dashboard, plus an interactive first-time setup checklist.
- IndexedDB database upgraded from version 2 to version 3 with stores for recurring items, goals and assets. Existing v3 records are retained.

## Apply the patch
Copy these files into the existing `finance-publish` repository clone, preserving folder paths:
- `src/App.tsx`
- `src/db.ts`
- `src/styles.css`
- `public/sw.js`
- `README.md`
- `index.html`

Also keep `UPGRADE_NOTES_V4.md` in the project root for reference.

Do not replace `package.json`, `package-lock.json`, `vite.config.ts`, or `.github/workflows/deploy.yml`.

Then run:

```cmd
npm run build
```

Only publish after the build succeeds. Stage only the listed files and the upgrade notes.

## Existing browser data
- IndexedDB version is incremented, not deleted. Existing accounts, transactions, budgets, loans and investments remain.
- v3 JSON backups can be imported; new arrays are optional when restoring.
- The old demo records are not deleted automatically. Settings includes an explicit action to remove only the original sample IDs.
- Goal contributions update goal progress only; record real cash movements separately in Transactions.
- Net worth can double-count a liability if the same debt is both a negative account balance and a loan. Avoid duplicating the same debt.

## Operational limits
All records remain local to the browser profile. Recurring reminders are manual; the app does not make payments, send notifications or sync to banks/brokers. Loan payoff figures are estimates, not lender statements. Asset and investment valuations are manual.
