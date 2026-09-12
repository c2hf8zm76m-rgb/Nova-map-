const s=document.createElement('style');
s.textContent=`#nc20home .nc20-actions .nc23-btn,.nc20-actions .nc23-btn{display:inline-flex!important;visibility:visible!important;opacity:1!important;align-items:center!important}`;
document.head.appendChild(s);
function keepCommunityVisible(){
  document.querySelectorAll('.nc20-actions .nc23-btn').forEach(b=>{
    b.style.setProperty('display','inline-flex','important');
    b.style.setProperty('visibility','visible','important');
    b.style.setProperty('opacity','1','important');
  });
  document.title='NovaCall V0.23.4';
}
keepCommunityVisible();
setInterval(keepCommunityVisible,800);
