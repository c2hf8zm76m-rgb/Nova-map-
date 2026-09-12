const st=document.createElement('style');
st.textContent='.nc20-actions .nc23-btn{display:inline-flex!important;align-items:center;justify-content:center}';
document.head.appendChild(st);
function fixNav0233(){
  const acts=document.querySelector('.nc20-actions');
  if(!acts)return;
  const community=acts.querySelector('.nc23-btn');
  if(community){
    community.style.setProperty('display','inline-flex','important');
    community.textContent='Communauté';
  }
  const servers=document.querySelector('#nc21ServersBtn');
  if(servers&&community&&servers.parentElement===acts){
    if(servers.nextElementSibling!==community)acts.insertBefore(community,servers.nextSibling);
  }
  document.title='NovaCall V0.23.3';
}
fixNav0233();
setInterval(fixNav0233,1000);
