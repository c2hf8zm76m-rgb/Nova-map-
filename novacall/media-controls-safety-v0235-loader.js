/* Loads the media controls patch after fixing its dataset guard. */
(async()=>{
  try{
    const src='https://raw.githubusercontent.com/c2hf8zm76m-rgb/Nova-map-/main/novacall/media-controls-safety-v0235.js?ncfix=2';
    const r=await fetch(src,{cache:'no-store'});
    if(!r.ok) throw new Error('media patch '+r.status);
    let code=await r.text();
    code=code.replace("const PATCH='nc-media-safe-0235';\n  if(document.documentElement.dataset[PATCH]) return;\n  document.documentElement.dataset[PATCH]='1';","const PATCH='data-nc-media-safe-0235';\n  if(document.documentElement.hasAttribute(PATCH)) return;\n  document.documentElement.setAttribute(PATCH,'1');");
    (0,eval)(code);
  }catch(e){console.error('NovaCall media patch loader',e)}
})();
