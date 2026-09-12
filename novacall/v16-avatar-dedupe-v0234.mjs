// NovaCall V0.23.4 — remove legacy V0.16 duplicate participant avatar
const style=document.createElement('style');
style.textContent=`
#people .person > .v16-avatar{display:none!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;opacity:0!important;overflow:hidden!important;pointer-events:none!important}
#people .person .personTop > .avatar{display:grid!important;flex:0 0 auto!important}
`;
document.head.appendChild(style);
function dedupeLegacyAvatar(){
  document.querySelectorAll('#people .person').forEach(row=>{
    row.querySelectorAll(':scope > .v16-avatar').forEach(av=>{
      av.style.setProperty('display','none','important');
      av.setAttribute('aria-hidden','true');
      av.dataset.ncLegacyHidden='1';
    });
  });
}
dedupeLegacyAvatar();
const people=document.querySelector('#people');
if(people)new MutationObserver(dedupeLegacyAvatar).observe(people,{childList:true,subtree:true});
setInterval(()=>{if(!document.hidden)dedupeLegacyAvatar()},1500);
