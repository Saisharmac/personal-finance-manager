import { openDB } from 'idb';
export type Kind='income'|'expense';
export type Tx={id:string;title:string;category:string;accountId:string;amount:number;kind:Kind;date:string;note?:string};
export type Account={id:string;name:string;type:string;balance:number;institution:string;color:string};
export type Budget={id:string;category:string;limit:number;spent:number;period:string};
export type Loan={id:string;name:string;lender:string;principal:number;outstanding:number;emi:number;rate:number;dueDate:string};
export type Investment={id:string;name:string;type:string;invested:number;current:number;units?:number};
export type Settings={id:string;currency:string;name:string;monthStart:number};
const db=openDB('pfm-local',2,{upgrade(d){
 if(!d.objectStoreNames.contains('transactions'))d.createObjectStore('transactions',{keyPath:'id'});
 for(const s of ['accounts','budgets','loans','investments','settings'])if(!d.objectStoreNames.contains(s))d.createObjectStore(s,{keyPath:'id'});
}});
export async function getAll<T>(store:'transactions'|'accounts'|'budgets'|'loans'|'investments'|'settings'):Promise<T[]>{return (await db).getAll(store) as Promise<T[]>}
export async function put<T extends {id:string}>(store:'transactions'|'accounts'|'budgets'|'loans'|'investments'|'settings',value:T){await (await db).put(store,value)}
export async function remove(store:'transactions'|'accounts'|'budgets'|'loans'|'investments',id:string){await (await db).delete(store,id)}
export async function seed(){const d=await db;const firstRun=!(await d.get('settings','main'));if(firstRun)await d.put('settings',{id:'main',currency:'INR',name:'My workspace',monthStart:1});
 if(firstRun&&!(await d.count('transactions'))){const rows:Tx[]=[{id:'demo-1',title:'Salary credit',category:'Salary',accountId:'acc-bank',amount:85000,kind:'income',date:new Date().toISOString().slice(0,10)},{id:'demo-2',title:'Rent payment',category:'Housing',accountId:'acc-bank',amount:18000,kind:'expense',date:new Date().toISOString().slice(0,10)},{id:'demo-3',title:'Groceries',category:'Food & dining',accountId:'acc-card',amount:2450,kind:'expense',date:new Date(Date.now()-86400000).toISOString().slice(0,10)},{id:'demo-4',title:'Freelance project',category:'Side income',accountId:'acc-bank',amount:12500,kind:'income',date:new Date(Date.now()-2*86400000).toISOString().slice(0,10)}];await Promise.all(rows.map(x=>d.put('transactions',x)));}
 if(firstRun&&!(await d.count('accounts'))){const rows:Account[]=[{id:'acc-bank',name:'Primary bank',type:'Savings',balance:184250,institution:'Main bank',color:'violet'},{id:'acc-cash',name:'Cash wallet',type:'Cash',balance:8250,institution:'Wallet',color:'green'},{id:'acc-card',name:'Credit card',type:'Credit card',balance:-12400,institution:'Card provider',color:'orange'}];await Promise.all(rows.map(x=>d.put('accounts',x)));}
 if(firstRun&&!(await d.count('budgets'))){const rows:Budget[]=[{id:'b1',category:'Housing',limit:20000,spent:18000,period:'Monthly'},{id:'b2',category:'Food & dining',limit:12500,spent:8250,period:'Monthly'},{id:'b3',category:'Transport',limit:7500,spent:3200,period:'Monthly'},{id:'b4',category:'Shopping',limit:10000,spent:3000,period:'Monthly'}];await Promise.all(rows.map(x=>d.put('budgets',x)));}
}
