const style=document.createElement('style');
style.textContent=`
/* NovaCall V0.23.2 — correctif barre de message vocal */
#form.send{
  display:grid!important;
  grid-template-columns:44px minmax(0,1fr) 44px!important;
  align-items:center!important;
  gap:10px!important;
  width:100%!important;
  min-height:64px!important;
  padding:10px 12px!important;
  box-sizing:border-box!important;
  overflow:visible!important;
}
#form.send .nc23-emojibar{display:none!important}
#form.send #attach,
#form.send>button{
  width:44px!important;
  min-width:44px!important;
  height:44px!important;
  min-height:44px!important;
  margin:0!important;
  padding:0!important;
  border-radius:14px!important;
  align-self:center!important;
}
#form.send #text{
  grid-column:2!important;
  width:100%!important;
  min-width:0!important;
  height:44px!important;
  min-height:44px!important;
  max-height:120px!important;
  margin:0!important;
  padding:12px 14px!important;
  box-sizing:border-box!important;
  border-radius:14px!important;
  resize:none!important;
  overflow:auto!important;
  display:block!important;
  font-size:14px!important;
  line-height:20px!important;
}
#form.send #attach{grid-column:1!important}
#form.send>button:last-child{grid-column:3!important}
@media(max-width:700px){
  #form.send{
    grid-template-columns:40px minmax(0,1fr) 40px!important;
    gap:8px!important;
    min-height:58px!important;
    padding:8px 10px!important;
  }
  #form.send #attach,
  #form.send>button{
    width:40px!important;
    min-width:40px!important;
    height:40px!important;
    min-height:40px!important;
    border-radius:12px!important;
  }
  #form.send #text{
    height:40px!important;
    min-height:40px!important;
    font-size:16px!important;
    padding:10px 12px!important;
  }
}
`;
document.head.appendChild(style);

document.title='NovaCall V0.23.2';
const setVersion=()=>{
  document.querySelectorAll('.v16-brandname span').forEach(e=>e.textContent='V0.23.2');
  document.querySelectorAll('.brand .v').forEach(e=>e.textContent='0.23.2');
};
setVersion();
setTimeout(setVersion,1200);
console.log('NovaCall V0.23.2 — correctif barre message vocal chargé');
