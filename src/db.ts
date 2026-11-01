import { openDB } from 'idb';

export type Kind = 'income' | 'expense' | 'transfer';
export type Split = { category: string; amount: number };
export type Tx = {
  id: string; title: string; category: string; accountId: string; amount: number;
  kind: Kind; date: string; note?: string; fromAccountId?: string; toAccountId?: string;
  postedAt?: string; reconciled?: boolean; splits?: Split[]; tags?: string[];
};
export type Account = {
  id: string; name: string; type: string; balance: number; institution: string; color: string;
  reconciledBalance?: number; reconciledAt?: string; currency?: string;
};
export type Budget = {
  id: string; category: string; limit: number; spent: number; period: string;
  rollover?: boolean; rolloverBalance?: number; color?: string;
};
export type Loan = {
  id: string; name: string; lender: string; principal: number; outstanding: number;
  emi: number; rate: number; dueDate: string; type?: string; note?: string;
};
export type Investment = {
  id: string; name: string; type: string; invested: number; current: number;
  units?: number; updatedAt?: string; note?: string;
};
export type Recurring = {
  id: string; name: string; provider: string; category: string; kind: 'income'|'expense';
  group: 'Bill'|'Subscription'|'Income'; amount: number; accountId: string;
  frequency: 'Weekly'|'Monthly'|'Quarterly'|'Yearly'; nextDate: string; active: boolean; note?: string;
};
export type Goal = {
  id: string; name: string; category: string; target: number; current: number;
  deadline: string; monthlyPlan: number; note?: string;
};
export type Asset = { id: string; name: string; category: string; currentValue: number; acquiredDate: string; note?: string };
export type Setting = { id: string; [key: string]: unknown };
export type StoreName = 'transactions'|'accounts'|'budgets'|'loans'|'investments'|'recurring'|'goals'|'assets'|'settings';
export const stores: StoreName[] = ['transactions','accounts','budgets','loans','investments','recurring','goals','assets','settings'];

// Version 4 is an additive migration from v4 of Finance OS. Existing stores and rows are retained.
const db = openDB('pfm-local', 4, { upgrade(d) {
  for (const store of stores) if (!d.objectStoreNames.contains(store)) d.createObjectStore(store, { keyPath: 'id' });
}});

export async function getAll<T>(store: StoreName): Promise<T[]> { return (await db).getAll(store) as Promise<T[]>; }
export async function put<T extends {id:string}>(store: StoreName, value: T): Promise<void> { await (await db).put(store, value); }
export async function remove(store: StoreName, id: string): Promise<void> { await (await db).delete(store, id); }
export async function seed(): Promise<void> {
  const d = await db;
  if (!(await d.get('settings','main'))) await d.put('settings', {id:'main', currency:'INR', name:'My workspace', monthStart:1, theme:'midnight'});
}
export async function replaceAll(data: Partial<Record<StoreName, Array<{id:string}>>>): Promise<void> {
  const d = await db;
  const tx = d.transaction(stores, 'readwrite');
  for (const name of stores) {
    const s = tx.objectStore(name);
    await s.clear();
    for (const row of data[name] ?? []) await s.put(row);
  }
  await tx.done;
}
export async function mergeAll(data: Partial<Record<StoreName, Array<{id:string}>>>): Promise<void> {
  const d = await db;
  const tx = d.transaction(stores, 'readwrite');
  for (const name of stores) for (const row of data[name] ?? []) await tx.objectStore(name).put(row);
  await tx.done;
}
