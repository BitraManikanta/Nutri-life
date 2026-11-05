// IndexedDB: two independent stores ('pdfs','images'). No server, no database service.
const open=()=>new Promise((res,rej)=>{const r=indexedDB.open('nutrilife',1);
r.onupgradeneeded=()=>{['pdfs','images'].forEach(s=>{if(!r.result.objectStoreNames.contains(s))r.result.createObjectStore(s,{keyPath:'id'})})};
r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=async(s,m,f)=>{const d=await open();return new Promise((res,rej)=>{const t=d.transaction(s,m);const q=f(t.objectStore(s));t.oncomplete=()=>res(q&&q.result);t.onerror=()=>rej(t.error)})};
export const all=s=>tx(s,'readonly',o=>o.getAll());
export const put=(s,v)=>tx(s,'readwrite',o=>o.put(v));
export const del=(s,id)=>tx(s,'readwrite',o=>o.delete(id));
