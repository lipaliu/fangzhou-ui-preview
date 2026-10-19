// Browser-only preview storage. OWNER is not an authentication credential or security boundary.
export const OWNER = 'preview-lipa';
export type Asset = {id:string;owner:string;name:string;kind:'image'|'video';created:number;sample?:boolean;src?:string;blob?:Blob;filename?:string};
let opening:Promise<IDBDatabase>|undefined;
export function database(){return opening ||= new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('fangzhou-simple-workspace',1);r.onupgradeneeded=()=>{const db=r.result;const a=db.createObjectStore('assets',{keyPath:'id'});a.createIndex('owner','owner');db.createObjectStore('workspaces',{keyPath:'owner'});};r.onsuccess=()=>resolve(r.result);r.onerror=()=>{opening=undefined;reject(r.error)};});}
export async function readWorkspace(){const db=await database();return new Promise<any>((resolve,reject)=>{const tx=db.transaction(['assets','workspaces'],'readonly');const ar=tx.objectStore('assets').index('owner').getAll(OWNER),sr=tx.objectStore('workspaces').get(OWNER);tx.oncomplete=()=>resolve({assets:ar.result,state:sr.result?.value});tx.onerror=()=>reject(tx.error);});}
async function put(store:string,records:unknown[]){const db=await database();return new Promise<void>((resolve,reject)=>{const tx=db.transaction(store,'readwrite');records.forEach(r=>tx.objectStore(store).put(r));tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
export const saveAssets=(records:Asset[])=>put('assets',records);
export const saveWorkspace=(value:unknown)=>put('workspaces',[{owner:OWNER,value}]);
