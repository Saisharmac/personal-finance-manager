# Finance OS — Ultimate Edition (v5)

A mobile-first, local-first personal finance workspace built with React, TypeScript, Vite, IndexedDB, Recharts and Lucide icons. Designed for manual INR tracking and private use in one browser profile.

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

The project uses the `/personal-finance-manager/` project path. Keep GitHub Pages configured to use **GitHub Actions**. The existing workflow in `.github/workflows/deploy.yml` builds the app and publishes `dist`.

## Modules

- **Command centre:** net worth, monthly income and expense, net cash flow, savings rate, budget pulse, recent activity, accounts and upcoming commitments.
- **Transactions:** income, expenses, transfers, search, type filters, editing, deletion, split-category expenses, CSV import and monthly CSV export.
- **Accounts:** bank, savings, cash, current and credit accounts; opening balances; statement reconciliation notes and balances.
- **Budgets:** monthly category plans, zero-based unassigned-income indicator, actual ledger spending, split-category allocation and optional unused-budget carry-forward.
- **Bills & subscriptions:** recurring income, bills and subscriptions with weekly, monthly, quarterly and yearly schedules; manual record-and-advance action; 90-day due outlook.
- **Debt planner:** debt register, EMI and interest estimates, plus avalanche (highest interest first) and snowball (smallest balance first) priorities.
- **Investments:** manual holdings, invested capital, current value, gains/losses and asset-type allocation.
- **Goals:** savings targets, target dates, monthly plans and contribution tracking.
- **Net worth:** account balances + investment valuations + other assets − loan outstanding.
- **Analytics:** month selector, income/expense chart, split-aware category analysis, budget performance, recurring cash-flow outlook and CSV export.
- **Financial lab:** extra-debt-payment scenario, savings target calculator, emergency cash runway and basic financial ratios.
- **Settings:** Midnight and Aurora dark themes, JSON backup/restore, CSV import, installation guidance and local data controls.

## Data and migration

- The IndexedDB database name remains `pfm-local`; schema version increments from 3 to 4. Existing stores and records are retained. The migration adds no destructive data changes.
- Existing v4 transaction/account/budget/loan/investment/recurring/goal/asset records remain readable. New optional transaction fields support split categories and reconciliation flags; budgets support rollover fields; account reconciliation values are optional.
- JSON imports validate the structure and record IDs before merging. Matching IDs are replaced; unrelated records remain. Export backups before clearing site data or moving to another browser/device.
- CSV import accepts bank/spreadsheet rows with `Description` and `Amount` required; `Date`, `Type`, `Category`, `Account` and `Note` are recommended. If a date is not in `YYYY-MM-DD`, the import uses today's date. If the account name does not match, it uses the first configured account. Before importing, the app asks whether the account opening balances pre-date the CSV period: choosing Yes includes imported activity in live balances; choosing No preserves live balances and imports the rows for historical analysis only. Transfers are skipped during CSV import and should be entered manually with both accounts selected.

## Privacy and limitations

Records remain in IndexedDB in the current browser profile. There is no bank, card, broker or lender connection; no automatic payments; no cloud sync; and no live market price feed. Account reconciliation stores the entered statement balance and difference but does not silently post an adjustment. Recurring entries create ledger transactions only when you press **Record** after the actual payment/receipt. Loan payoff figures are estimates, and investment/asset valuations need manual updates.

Net worth may be double-counted if a liability is entered both as a negative account balance and as a loan, or if investments are repeated as other assets. Credit-card purchases should be expenses on the card account; card payments should be transfers from bank to card. Goal contributions update goal progress and are not account transfers unless you record the actual movement.

Export a JSON backup regularly. Clearing browser/site data can permanently erase local records.
