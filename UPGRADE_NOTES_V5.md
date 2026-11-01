# Finance OS v5 — Ultimate Edition

## Upgrade overview

v5 consolidates the existing v4 functionality into a new mobile-first midnight interface and adds split-aware categories, CSV workflows, reconciliation visibility, budget carry-forward, debt payoff prioritisation, portfolio allocation, more useful analytics and scenario tools.

## Main changes

- Reworked command-centre navigation and interface with refreshed iconography, responsive layouts, compact mobile navigation, new charts and Midnight / Aurora dark themes.
- Added split-category transactions. Split lines use `Category | Amount`; totals must equal the transaction amount. Reports and budgets attribute spending to each split category.
- Added CSV transaction import with a quoted-field parser, standard Date / Description / Type / Category / Account / Amount / Note headers, and a choice to include imported entries in live balances or keep them as history only to avoid double-counting current opening balances. CSV exports include the transaction type, category, account and reconciliation status.
- Added account statement reconciliation markers. Reconciliation saves a statement balance and date and shows the difference against the live ledger balance; it never posts a hidden adjustment.
- Added zero-based budget planning indicator, carry-forward option, and split-aware category spend.
- Added a recurring due outlook and preserved manual record-and-advance behaviour.
- Added debt avalanche and snowball priority views and transparent EMI payoff estimates.
- Added investment allocation by holding type and total return display.
- Added financial lab scenarios for additional debt repayments, savings targets, emergency cash runway and simple ratios.
- Improved backup validation and kept merge semantics: matching record IDs are overwritten; other rows are retained.
- Bumped the IndexedDB schema from 3 to 4 additively and bumped the service-worker cache to v5.

## Data safety

- Database name remains `pfm-local`. Existing stores and rows are not cleared during migration.
- New transaction properties (`splits`, `reconciled`) and account/budget properties are optional. Older records remain valid.
- Restore accepts previous Finance OS JSON backups with any subset of known arrays. It validates arrays and string IDs before merging.
- No real financial data is stored in repository source. App records remain in browser IndexedDB.

## Operational scope

Finance OS v5 is a manual tracking and planning tool. It does not connect to financial institutions, initiate payments, receive live market prices, or sync data to the cloud. Estimates are indicative and must not replace official bank, lender or broker statements.
