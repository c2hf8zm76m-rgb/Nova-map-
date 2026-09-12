const V21='https://nova-call-v21-kk0jl6wgc-alo12230-6256s-projects.vercel.app/v21.mjs';
const st=document.createElement('style');st.textContent='.nc20-actions .nc23-btn{display:none!important}';document.head.appendChild(st);
let retrying=false;
async function ensureServers0231(){
  document.querySelectorAll('.nc20-actions .nc23-btn').forEach(b=>b.style.display='none');
  if(document.querySelector('#nc21ServersBtn')){document.title='NovaCall V0.23.1';return;}
  const acts=document.querySelector('.nc20-actions');
  if(!acts||retrying)return;
  retrying=true;
  try{await import(V21+'?v0231='+Date.now())}catch(e){console.warn('NC23.1 server nav fix',e)}
  setTimeout(()=>{retrying=false;document.title='NovaCall V0.23.1'},2500);
}
ensureServers0231();
setInterval(ensureServers0231,1000);
