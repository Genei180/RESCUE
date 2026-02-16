export function openDB(name, version, { upgrade } = {}){
  return new Promise((resolve, reject)=>{
    const req = indexedDB.open(name, version);
    req.onupgradeneeded = (e)=>{
      upgrade && upgrade(req.result, e.oldVersion, e.newVersion, req.transaction);
    };
    req.onsuccess = ()=> resolve({
      put(store, value){ return new Promise((res,rej)=>{ const tx=req.result.transaction(store,'readwrite'); tx.objectStore(store).put(value); tx.oncomplete=()=>res(); tx.onerror=rej; }) },
      getAll(store){ return new Promise((res,rej)=>{ const tx=req.result.transaction(store,'readonly'); const r=tx.objectStore(store).getAll(); r.onsuccess=()=>res(r.result); r.onerror=rej; }) },
      transaction(store, mode){ return req.result.transaction(store, mode) },
      objectStore(store){ return req.result.transaction(store,'readwrite').objectStore(store) }
    });
    req.onerror = ()=> reject(req.error);
  });
}
