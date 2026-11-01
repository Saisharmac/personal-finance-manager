import { openDB } from 'idb';

export type Kind = 'income' | 'expense' | 'transfer';
export type Tx = { id:string; title:string; category:string; accountId:string; amount:number; kind:Kind; date:string; note?:string; fromAccountId?:string; toAccountId?:string; postedAt?:string };
export type Account = { id:string; name:string; type:string; balance:number; institution:string; color:string };
export type Budget = { id:string; category:string; limit:number; spent:number; period:string };
export type Loan = { id:string; name:string; lender:string; principal:number; outstanding:number; emi:number; rate:number; dueDate:string };
export type Investment = { id:string; name:string; type:string; invested:number; current:number; units?:number };
export type Recurring = { id:string; name:string; provider:string; category:string; kind:'income'|'expense'; group:'Bill'|'Subscription'|'Income'; amount:number; accountId:string; frequency:'Weekly'|'Monthly'|'Quarterly'|'Yearly'; nextDate:string; active:boolean; note?:string };
export type Goal = { id:string; name:string; category:string; target:number; current:number; deadline:string; monthlyPlan:number; note?:string };
export type Asset = { id:string; name:string; category:string; currentValue:number; acquiredDate:string; note?:string };
export type Setting = { id:string; [key:string]:unknown };

export type StoreName = 'transactions'|'accounts'|'budgets'|'loans'|'investments'|'recurring'|'goals'|'assets'|'settings';

const db = openDB('pfm-local', 3, { upgrade(d) {
  const stores:StoreName[] = ['transactions','accounts','budgets','loans','investments','recurring','goals','assets','settings'];
  for (const store of stores) if (!d.objectStoreNames.contains(store)) d.createObjectStore(store,{keyPath:'id'});
}});

export async function getAll<T>(store:StoreName):Promise<T[]> { return (await db).getAll(store) as Promise<T[]>; }
export async function put<T extends {id:string}>(store:StoreName,value:T):Promise<void> { await (await db).put(store,value); }
export async function remove(store:StoreName,id:string):Promise<void> { await (await db).delete(store,id); }

export async function seed():Promise<void> {
  const d = await db;
  if (!(await d.get('settings','main'))) await d.put('settings',{id:'main',currency:'INR',name:'My workspace',monthStart:1});
  // No sample financial records are created. A new workspace starts clean.
}
