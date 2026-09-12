/* Guard against legacy presentation mode auto-opening a remote screen before consent. */
(function(){
  if(document.getElementById('nc235-stage-guard-style'))return;
  const s=document.createElement('style');s.id='nc235-stage-guard-style';s.textContent='.nc235-share-card .v14-full{display:none!important}';document.head.appendChild(s);
  setInterval(()=>{
    const cards=[...document.querySelectorAll('.nc235-share-card[data-stream-key]')];
    if(!cards.length)return;
    for(const card of cards){
      const id=String(card.dataset.streamKey||'').split(':')[0];
      try{for(const[k,n]of remoteNodes){if(k.startsWith(id+':')&&n?.classList)n.classList.remove('v14-presenting')}}catch{}
    }
    try{const g=document.getElementById('grid');if(g&&!document.getElementById('local-screen')&&!g.querySelector('.nc235-screen-tile.v14-presenting'))g.classList.remove('v14-stage')}catch{}
  },300);
})();
