const FLAG='novacall-call-transition-v0234';
function markCallTransition(){try{sessionStorage.setItem(FLAG,'1')}catch{}}
function clearCallTransition(){try{sessionStorage.removeItem(FLAG)}catch{}}
document.addEventListener('click',e=>{
  const t=e.target?.closest?.('.nc20-call,.nc201-call,.s21call,[data-callserver],.n19yes');
  if(t)markCallTransition();
  const c=e.target?.closest?.('.nc20-cancel,.nc201-cancel,.n19no');
  if(c)clearCallTransition();
},true);
window.addEventListener('pageshow',()=>{
  const u=new URL(location.href);
  if(!u.searchParams.get('room'))return;
  let active=false;try{active=sessionStorage.getItem(FLAG)==='1'}catch{}
  if(!active)return;
  const done=()=>{const app=document.querySelector('#app');return !!app&&!app.classList.contains('hide')};
  const finish=()=>{clearCallTransition();document.querySelector('#nc234-call-transition')?.remove();document.documentElement.classList.remove('nc234-call-transitioning')};
  if(done()){finish();return}
  const timer=setInterval(()=>{if(done()){clearInterval(timer);finish()}},80);
  setTimeout(()=>{clearInterval(timer);finish()},15000);
});
