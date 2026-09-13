// NovaCall V0.25 — one-shot cleanup service worker
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{for(const key of await caches.keys())await caches.delete(key)}catch{}
    try{await self.clients.claim()}catch{}
    try{
      const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
      for(const client of clients)client.postMessage({type:'NOVACALL_V025_PWA_RESET'});
    }catch{}
    try{await self.registration.unregister()}catch{}
  })());
});
self.addEventListener('fetch',()=>{});
