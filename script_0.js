
/* ═══ CURSOR ═══ */
var mx=0,my=0,rx=0,ry=0;
var cu=document.getElementById('cu'),cr=document.getElementById('cr');
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cu.style.left=mx+'px';cu.style.top=my+'px'});
(function lp(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(lp)})();
document.querySelectorAll('a,button,.proj-card,.sc,.tcd').forEach(function(el){
  el.addEventListener('mouseenter',function(){cr.style.cssText='width:44px;height:44px;margin:-22px 0 0 -22px;left:'+rx+'px;top:'+ry+'px'});
  el.addEventListener('mouseleave',function(){cr.style.cssText='width:30px;height:30px;margin:-15px 0 0 -15px;left:'+rx+'px;top:'+ry+'px'});
});
/* ═══ TOP BAR ═══ */
function closeBar(){var t=document.getElementById('tbar');if(t)t.style.display='none';document.documentElement.style.setProperty('--tbh','0px')}
/* ═══ COLOR PICKER — WITH CUSTOM COLOR ═══ */
var curColour='red',isLight=false;
var MOON='<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" stroke="currentColor" stroke-width="2"/>';
var SUN='<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>';
function applyTheme(c){
  curColour=c;
  document.documentElement.setAttribute('data-theme','dark-'+c);
  document.querySelectorAll('.cpc').forEach(function(s){s.classList.toggle('sel',s.dataset.c===c)});
  /* clear any custom inline colors */
  ['--ac','--ac2','--ac3','--b1','--sh'].forEach(function(v){document.documentElement.style.removeProperty(v)});
}
function applyCustomColor(hex){
  document.querySelectorAll('.cpc').forEach(function(el){el.classList.remove('sel')});
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  document.documentElement.style.setProperty('--ac',hex);
  document.documentElement.style.setProperty('--ac2','rgb('+Math.min(r+30,255)+','+Math.min(g+30,255)+','+Math.min(b+30,255)+')');
  document.documentElement.style.setProperty('--ac3','rgb('+Math.min(r+60,255)+','+Math.min(g+60,255)+','+Math.min(b+60,255)+')');
  document.documentElement.style.setProperty('--b1','rgba('+r+','+g+','+b+',.25)');
  document.documentElement.style.setProperty('--sh','0 8px 24px rgba('+r+','+g+','+b+',.3)');
}
document.querySelector('.cpd').addEventListener('click',function(e){
  var s=e.target.closest('.cpc');
  if(s)applyTheme(s.dataset.c);
});
document.getElementById('customColor').addEventListener('input',function(e){applyCustomColor(e.target.value)});
applyTheme('red');
/* ═══ NAVIGATION ═══ */
function updateSideNavLabels(pgId){
  var snav=document.querySelector('.snav');
  if(!snav)return;
  snav.classList.toggle('home-mode',pgId==='home');
}
function go(pgId){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('on','vis')});
  document.querySelectorAll('.sn,.mb').forEach(function(b){b.classList.remove('on','act')});
  var pg=document.getElementById(pgId);if(!pg)return;
  pg.classList.add('on');
  updateSideNavLabels(pgId);
  setTimeout(function(){
    pg.classList.add('vis');
    trigFI(pg);
    if(pgId==='about'){animSk();doCount();}
    if(pgId==='testimonials')initSlider();
    if(pgId==='portfolio'){renderGrid();}
  },25);
  document.querySelectorAll('[data-p="'+pgId+'"]').forEach(function(b){b.classList.add(b.classList.contains('sn')?'on':'act')});
  window.scrollTo(0,0);
}
document.querySelectorAll('[data-p]').forEach(function(b){b.addEventListener('click',function(){var p=b.getAttribute('data-p');if(p)go(p)})});
go('home');
setTimeout(function(){var h=document.getElementById('home');if(h)h.classList.add('vis');},60);
function trigFI(c){c.querySelectorAll('.fi').forEach(function(el,i){el.classList.remove('v');setTimeout(function(){el.classList.add('v')},i*60)})}
setTimeout(function(){trigFI(document.getElementById('home'))},80);
function animSk(){document.querySelectorAll('.skf').forEach(function(el){el.style.transform='scaleX('+el.dataset.w+')'})}
function doCount(){document.querySelectorAll('.cu').forEach(function(el){var t=parseInt(el.dataset.t),n=0;var iv=setInterval(function(){n++;el.textContent=n;if(n>=t)clearInterval(iv)},Math.max(18,1400/t))})}
/* ═══════════════════════════════════════════════════════
   PORTFOLIO GRID — Multiple project cards, Show More/Less
═══════════════════════════════════════════════════════ */
var PROJECTS={
  funnel:[
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c7e7c5a2f715eb02a.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c4c82f7be9220a53f.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c6cc0eead5ce13cc3.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9117c135509c88be439.jpg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c1f1059c428ff9262.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90ce05851175c84d124.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9207c135509c88be4e9.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e91f3c3aed7c63c63575.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e958a0bd00c015f9285a.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9587c135509c88be73b.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e958e05851175c84d3e7.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9586cc0eead5ce13fcf.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9583c3aed7c63c63749.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e95e6cc0eead5ce13fff.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e95f1f1059c428ff959a.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e95e3c3aed7c63c63763.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9c49b6d07a704b2b3d2.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9c43c3aed7c63c63b14.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14ebc51f1059c428ffab53.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e9116cc0eead5ce13cfb.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e920069d64aa5d37b3f1.png'
  ],
  automation:[
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185d60ad4b061938293b.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185c54d7dff212d28339.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185a0397b3655e6c41fe.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185a60ad4b06193828e5.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185a0397b3655e6c41fa.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151856d2747625ad8a9b7c.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b63d2747625ad8bf04c.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6354d7dff212d3ceb1.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b63e05851175c891bda.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6660ad4b0619397b82.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b67e05851175c891c36.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6760ad4b0619397ba8.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6754d7dff212d3cf4f.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b68e05851175c891c67.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b67d2747625ad8bf0ad.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6ad2747625ad8bf0fb.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c42e05851175c892c40.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c42e05851175c892c3f.png'
  ],
  a2p:[
    'https://assets.cdn.filesafe.space/WVjtKb0rLhOE85zZ1c0G/media/69aac355b3fc006ac91d918b.png',
    'https://assets.cdn.filesafe.space/WVjtKb0rLhOE85zZ1c0G/media/69aac4fe618c8da9ee23f070.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d654d7dff212d0f356.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d6e05851175c862be1.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d660ad4b06193691dc.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d60397b3655e6aa8fc.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d660ad4b06193691d2.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d2e05851175c862b89.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d254d7dff212d0f28e.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d260ad4b0619369198.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d2e05851175c862b8a.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d260ad4b0619369199.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1503d2d2747625ad88fd5b.png'
  ],
  n8n:[
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151a860397b3655e6c6b35.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151a8654d7dff212d2aae5.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151a86e05851175c87ebd5.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14f6004c82f7be92212c73.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14f600a0bd00c015f9ac87.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14f6003c3aed7c63c6b929.jpeg',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14f6009b6d07a704b3353b.jpeg'
  ],
  crm:[
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185660ad4b06193828a9.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185a0397b3655e6c41fb.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151a3460ad4b0619384c34.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185c54d7dff212d28337.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6360ad4b0619397b2e.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b63d2747625ad8bf052.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b63e05851175c891bd9.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6b60ad4b0619397c16.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152b6a54d7dff212d3cf97.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c45d2747625ad8c01ff.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c42d2747625ad8c01c1.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c420397b3655e6da511.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c4260ad4b0619398cc0.png'
  ],
  dashboard:[
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1511fb54d7dff212d20aa5.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1511fb54d7dff212d20aa6.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1511fbe05851175c87424a.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1511fbe05851175c874249.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1511fb60ad4b061937b111.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15120054d7dff212d20b39.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15120060ad4b061937b17c.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1512000397b3655e6bc522.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151200d2747625ad8a22a4.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1512000397b3655e6bc524.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151203d2747625ad8a2306.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15120460ad4b061937b208.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151204d2747625ad8a2314.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1512050397b3655e6bc589.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15120660ad4b061937b227.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151206d2747625ad8a232e.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1512070397b3655e6bc5a0.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1512080397b3655e6bc5a2.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1512090397b3655e6bc5ba.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151209d2747625ad8a2388.png'
  ],
  voiceai:[
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185660ad4b06193828aa.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185660ad4b06193828ab.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1518560397b3655e6c41ce.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a1518560397b3655e6c41cf.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151859e05851175c87bf83.png',
    'https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a152c42d2747625ad8c01c2.png'
  ]
};
var CAT_LABELS={
  funnel:{lbl:'FUNNEL',name:'Sales & Booking Funnel'},
  automation:{lbl:'AUTOMATION',name:'GHL Workflow Automation'},
  crm:{lbl:'CRM',name:'CRM & Pipeline Setup'},
  dashboard:{lbl:'DASHBOARD',name:'Custom Dashboard Design'},
  voiceai:{lbl:'VOICE AI',name:'AI Voice Agent Build'},
  a2p:{lbl:'A2P / SMS',name:'A2P 10DLC & SMS System'},
  n8n:{lbl:'N8N / MAKE',name:'n8n & Make Automation'}
};
var INITIAL_COUNT=6;
var STEP=6;
var curFilter='all';
var shownCount=INITIAL_COUNT;
function buildProjectList(){
  var list=[];
  Object.keys(PROJECTS).forEach(function(cat){
    PROJECTS[cat].forEach(function(url,i){list.push({url:url,cat:cat,idx:i+1})});
  });
  return list;
}
var ALL_PROJECTS=buildProjectList();
function updateCounts(){
  document.getElementById('cnt-all').textContent=ALL_PROJECTS.length;
  Object.keys(PROJECTS).forEach(function(cat){
    var el=document.getElementById('cnt-'+cat);
    if(el)el.textContent=PROJECTS[cat].length;
  });
}
function getFiltered(){
  if(curFilter==='all')return ALL_PROJECTS;
  return ALL_PROJECTS.filter(function(p){return p.cat===curFilter});
}
function renderGrid(){
  var grid=document.getElementById('portGrid');
  if(!grid)return;
  var filtered=getFiltered();
  var toShow=filtered.slice(0,shownCount);
  grid.innerHTML='';
  if(toShow.length===0){
    grid.innerHTML='<div class="port-empty">No projects in this category yet. Check back soon.</div>';
    updateButtons(0,0);return;
  }
  toShow.forEach(function(p,i){
    var card=document.createElement('div');
    card.className='proj-card';
    var info=CAT_LABELS[p.cat];
    card.innerHTML=
      '<div class="proj-img-box">'+
        '<img class="proj-img" src="'+p.url+'" alt="'+info.name+' — GoHighLevel project '+p.idx+'" loading="lazy" decoding="async">'+
      '</div>'+
      '<span class="proj-scroll-hint">Hover to scroll</span>'+
      '<div class="proj-overlay">'+
        '<span class="proj-cat-tag">'+info.lbl+'</span>'+
        '<div class="proj-name">'+info.name+' — Project #'+p.idx+'</div>'+
      '</div>';
    grid.appendChild(card);
    setTimeout(function(){card.classList.add('in')},i*45);
    var img=card.querySelector('.proj-img');
    var setScroll=function(){
      var box=card.querySelector('.proj-img-box');
      if(!img.naturalWidth||!box.clientWidth)return;
      var scale=box.clientWidth/img.naturalWidth;
      var renderH=img.naturalHeight*scale;
      var overflow=renderH-box.clientHeight;
      card.style.setProperty('--scrollY',overflow>30?'-'+overflow+'px':'0px');
    };
    if(img.complete)setScroll();
    else img.addEventListener('load',setScroll);
  });
  updateButtons(filtered.length,toShow.length);
}
function updateButtons(total,shown){
  var moreBtn=document.getElementById('showMoreBtn');
  var lessBtn=document.getElementById('showLessBtn');
  if(shown<total){
    moreBtn.classList.remove('hide');
    moreBtn.childNodes[0].textContent='Show More Projects ('+(total-shown)+' more) ';
  } else moreBtn.classList.add('hide');
  if(shown>INITIAL_COUNT)lessBtn.classList.remove('hide');
  else lessBtn.classList.add('hide');
}
document.getElementById('fTabs').addEventListener('click',function(e){
  var btn=e.target.closest('.ft');
  if(!btn)return;
  document.querySelectorAll('.ft').forEach(function(b){b.classList.remove('on')});
  btn.classList.add('on');
  curFilter=btn.dataset.f;
  shownCount=INITIAL_COUNT;
  renderGrid();
});
document.getElementById('showMoreBtn').addEventListener('click',function(){shownCount+=STEP;renderGrid()});
document.getElementById('showLessBtn').addEventListener('click',function(){
  shownCount=INITIAL_COUNT;renderGrid();
  document.getElementById('portfolio').scrollIntoView({behavior:'smooth',block:'start'});
});
updateCounts();
renderGrid();

/* ═══ VIDEO TESTIMONIAL SLIDER ═══ */
var vtIdx=0,vtPer=1;
function calcVideoPer(){vtPer=1}
function updateVideoTestimonials(){
  var tr=document.getElementById('vtTrack');if(!tr)return;
  calcVideoPer();
  var cards=tr.querySelectorAll('.vt-card');if(!cards.length)return;
  var vp=document.getElementById('vtViewport'),gap=14;
  if(!vp || vp.offsetWidth<20)return; /* page may still be hidden */
  var cardW=vp.clientWidth;
  cards.forEach(function(c){
    c.style.flex='0 0 '+cardW+'px';
    c.style.minWidth=cardW+'px';
    c.style.maxWidth=cardW+'px';
  });
  var max=Math.max(0,cards.length-1);
  vtIdx=Math.max(0,Math.min(vtIdx,max));
  tr.style.transform='translate3d(-'+(vtIdx*(cardW+gap))+'px,0,0)';
  cards.forEach(function(card,idx){
    var video=card.querySelector('video');
    if(video && idx!==vtIdx)video.pause();
  });
  document.querySelectorAll('.vt-dot').forEach(function(d,i){d.classList.toggle('on',i===vtIdx)});
}
function nextVideoTestimonial(){
  var tr=document.getElementById('vtTrack');if(!tr)return;
  var max=Math.max(0,tr.querySelectorAll('.vt-card').length-1);
  vtIdx=vtIdx>=max?0:vtIdx+1;updateVideoTestimonials();
}
function prevVideoTestimonial(){
  var tr=document.getElementById('vtTrack');if(!tr)return;
  var max=Math.max(0,tr.querySelectorAll('.vt-card').length-1);
  vtIdx=vtIdx<=0?max:vtIdx-1;updateVideoTestimonials();
}
function goVideoTestimonial(i){vtIdx=i;updateVideoTestimonials()}
document.querySelectorAll('.vt-media video').forEach(function(v){
  v.addEventListener('play',function(){
    document.querySelectorAll('.vt-media video').forEach(function(other){
      if(other!==v)other.pause();
    });
  });
});
setTimeout(updateVideoTestimonials,180);
window.addEventListener('resize',function(){requestAnimationFrame(updateVideoTestimonials)});

/* ═══ REVIEW SLIDER ═══ */
var rvwIdx=0,rvwTimer=null,rvwPer=3;
function calcReviewPer(){rvwPer=window.innerWidth<=900?1:3}
function updateReviewSlider(){
  var tr=document.getElementById('rvwTrack');if(!tr)return;
  calcReviewPer();
  var cards=tr.querySelectorAll('.rvw-card');
  if(!cards.length)return;
  var max=Math.max(0,cards.length-rvwPer);
  rvwIdx=Math.max(0,Math.min(rvwIdx,max));
  var wrap=tr.parentElement,gap=14;
  var cardW=(wrap.offsetWidth-(rvwPer-1)*gap)/rvwPer;
  cards.forEach(function(c){c.style.flex='0 0 '+cardW+'px';c.style.minWidth=cardW+'px'});
  tr.style.transform='translateX(-'+(rvwIdx*(cardW+gap))+'px)';
  document.querySelectorAll('.rvw-dot').forEach(function(d,i){d.classList.toggle('on',i===rvwIdx)});
}
function goReview(i){rvwIdx=i;updateReviewSlider();startReviewAuto()}
function nextReview(){
  var tr=document.getElementById('rvwTrack');if(!tr)return;
  var total=tr.querySelectorAll('.rvw-card').length;
  calcReviewPer();
  var max=Math.max(0,total-rvwPer);
  rvwIdx=rvwIdx>=max?0:rvwIdx+1;
  updateReviewSlider();
}
function prevReview(){
  var tr=document.getElementById('rvwTrack');if(!tr)return;
  var total=tr.querySelectorAll('.rvw-card').length;
  calcReviewPer();
  var max=Math.max(0,total-rvwPer);
  rvwIdx=rvwIdx<=0?max:rvwIdx-1;
  updateReviewSlider();
}
function startReviewAuto(){clearInterval(rvwTimer);rvwTimer=setInterval(nextReview,3200)}
setTimeout(function(){updateReviewSlider();startReviewAuto()},160);
window.addEventListener('resize',function(){updateReviewSlider()});
/* ═══ TESTIMONIALS ═══ */
var tIdx=0,pV=3,tAuto=null;
function buildTestimonialDots(totalPages){
  var holder=document.getElementById('testimonialDots');
  if(!holder)return;
  holder.innerHTML='';
  for(var i=0;i<totalPages;i++){
    var b=document.createElement('button');
    b.className='tdo'+(i===tIdx?' on':'');
    b.setAttribute('aria-label','Testimonial page '+(i+1));
    b.onclick=(function(idx){return function(){goT(idx)}})(i);
    holder.appendChild(b);
  }
}
function initSlider(){
  pV=window.innerWidth<=900?1:3;
  drawSlider();
  trigFI(document.getElementById('testimonials'));
  requestAnimationFrame(function(){
    updateVideoTestimonials();
    setTimeout(updateVideoTestimonials,120);
  });
}
function drawSlider(){
  var tr=document.getElementById('ttr');if(!tr)return;
  var cards=tr.querySelectorAll('.tcd');if(!cards.length)return;
  var w=tr.parentElement.offsetWidth,gap=14;
  pV=window.innerWidth<=900?1:3;
  var cw=(w-(pV-1)*gap)/pV;
  cards.forEach(function(c){c.style.flex='0 0 '+cw+'px';c.style.minWidth=cw+'px'});
  var pages=Math.ceil(cards.length/pV),max=pages-1;
  if(tIdx>max)tIdx=max;
  tr.style.transform='translateX(-'+(tIdx*((cw+gap)*pV))+'px)';
  buildTestimonialDots(pages);
}
function nextT(){var cards=document.querySelectorAll('#ttr .tcd').length;var max=Math.ceil(cards/pV)-1;tIdx=tIdx>=max?0:tIdx+1;drawSlider()}
function prevT(){var cards=document.querySelectorAll('#ttr .tcd').length;var max=Math.ceil(cards/pV)-1;tIdx=tIdx<=0?max:tIdx-1;drawSlider()}
function goT(i){tIdx=i;drawSlider();restartTestimonialAuto()}
function restartTestimonialAuto(){clearInterval(tAuto);tAuto=setInterval(nextT,5200)}
window.addEventListener('resize',function(){drawSlider()});
setTimeout(function(){drawSlider();restartTestimonialAuto()},160);
