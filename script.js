// ══ DATA ══
const AVC=['linear-gradient(135deg,#1d4ed8,#3b82f6)','linear-gradient(135deg,#7c3aed,#a78bfa)','linear-gradient(135deg,#0e7490,#22d3ee)','linear-gradient(135deg,#c2410c,#fb923c)','linear-gradient(135deg,#15803d,#4ade80)','linear-gradient(135deg,#92400e,#fbbf24)','linear-gradient(135deg,#9d174d,#f9a8d4)','linear-gradient(135deg,#1e3a5f,#60a5fa)'];
const POS={Forward:'pos-fw',Midfielder:'pos-mf',Defender:'pos-df',Goalkeeper:'pos-gk'};
const squad=[{id:1,name:'Alex Ramos',pos:'Forward',jersey:9,me:true},{id:2,name:'Brian Cruz',pos:'Forward',jersey:11},{id:3,name:'Kevin Santos',pos:'Forward',jersey:7},{id:4,name:'Nelson Marin',pos:'Forward',jersey:20},{id:5,name:'Carlos Teck',pos:'Midfielder',jersey:8},{id:6,name:'David Mena',pos:'Midfielder',jersey:6},{id:7,name:'Edwin Bol',pos:'Midfielder',jersey:10},{id:8,name:'Luis Goff',pos:'Midfielder',jersey:14},{id:9,name:'Oscar Babb',pos:'Midfielder',jersey:16},{id:10,name:'Felix Avilez',pos:'Defender',jersey:4},{id:11,name:'Gilberto Patt',pos:'Defender',jersey:5},{id:12,name:'Hector Reyes',pos:'Defender',jersey:3},{id:13,name:'Ivan Torres',pos:'Defender',jersey:2},{id:14,name:'Marco Chan',pos:'Defender',jersey:15},{id:15,name:'Joel Castillo',pos:'Goalkeeper',jersey:1},{id:16,name:'Pedro Usher',pos:'Goalkeeper',jersey:13}];
const skills=[{name:'Pace',val:88},{name:'Shooting',val:82},{name:'Passing',val:74},{name:'Dribbling',val:79},{name:'Physical',val:71},{name:'Positioning',val:85}];
const history=[{r:'w',opp:'Corozal Tigers',score:'3–0',date:'Feb 20',g:2,a:0},{r:'w',opp:'San Pedro Pirates',score:'2–1',date:'Feb 17',g:1,a:1},{r:'d',opp:'OW United',score:'1–1',date:'Feb 14',g:0,a:1},{r:'w',opp:'Dangriga Warriors',score:'2–0',date:'Feb 10',g:1,a:0},{r:'l',opp:'Belize City FC',score:'0–1',date:'Feb 6',g:0,a:0},{r:'w',opp:'Corozal Tigers',score:'2–0',date:'Jan 30',g:1,a:1}];
const standings=[{rank:1,team:'Panthers FC',p:6,w:5,gd:11,pts:16,me:true},{rank:2,team:'OW United',p:6,w:4,gd:5,pts:13},{rank:3,team:'Corozal Tigers',p:6,w:3,gd:2,pts:11},{rank:4,team:'San Pedro Pirates',p:6,w:3,gd:0,pts:10},{rank:5,team:'Belmopan Bandits',p:6,w:2,gd:-3,pts:7}];

// ══ NAV ══
function navigate(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.tnav-link,.snav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  window.scrollTo({top:0,behavior:'instant'});
  if(page==='stats') setTimeout(animateSkills,120);
}

// ══ SIDEBAR ══
function toggleSidebar(){
  const s=document.getElementById('sidebar'),o=document.getElementById('sidebarOverlay'),h=document.getElementById('hamburger');
  const open=s.classList.contains('open');
  if(open){closeSidebar();}else{s.classList.add('open');o.classList.add('open');h.classList.add('open');document.body.style.overflow='hidden';}
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow='';
}

// ══ SHEETS ══
function openSheet(id){document.getElementById(id).classList.add('open');}
function closeSheet(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.sheet-ov').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));

// ══ PHOTO UPLOAD ══
function takePhoto(){const i=document.getElementById('photoInput');i.setAttribute('capture','user');i.click();}
function pickPhoto(){const i=document.getElementById('photoInput');i.removeAttribute('capture');i.click();}
function handlePhoto(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    applyPhoto(ev.target.result);
    closeSheet('photoSheet');
    showToast('Profile photo updated! 📸','lime');
  };
  r.readAsDataURL(f);
}
function applyPhoto(url){
  // Helper to set img in avatar element
  function setImg(el,initId){
    let img=el.querySelector('img');
    if(!img){img=document.createElement('img');el.appendChild(img);}
    img.src=url;
    const init=document.getElementById(initId);
    if(init) init.style.display='none';
  }
  setImg(document.getElementById('profilePhoto'),'profileInit');
  setImg(document.getElementById('statsAv'),'statsAvInit');
  setImg(document.getElementById('topnavAvatar'),'topnavInitial');
  setImg(document.getElementById('sidebarAv'),'sidebarInitial');
  document.getElementById('removeOpt').style.display='flex';
}
function removePhoto(){
  ['profilePhoto','statsAv','topnavAvatar','sidebarAv'].forEach(id=>{
    const img=document.getElementById(id)?.querySelector('img');
    if(img) img.remove();
  });
  ['profileInit','statsAvInit','topnavInitial','sidebarInitial'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.style.display='';
  });
  document.getElementById('removeOpt').style.display='none';
  closeSheet('photoSheet');
  showToast('Photo removed','lime');
}

// ══ ACTIONS ══
function saveProfile(){closeSheet('editSheet');showToast('Profile updated! ✓','lime');}
function changePass(){closeSheet('passSheet');showToast('Password changed! ✓','lime');}
function confirmLogout(){if(confirm('Log out of your account?')){showToast('Logging out...','lime');setTimeout(()=>window.location.href='login.php',1200);}}

// ══ TOAST ══
function showToast(msg,type='lime'){
  const w=document.getElementById('toastWrap');
  const t=document.createElement('div');t.className=`toast ${type}`;
  t.innerHTML=`<div class="toast-dot"></div><div class="toast-msg">${msg}</div>`;
  w.appendChild(t);
  setTimeout(()=>{t.style.transition='opacity 0.3s';t.style.opacity='0';setTimeout(()=>t.remove(),320);},3000);
}

// ══ RENDER SQUAD ══
function renderSquad(){
  document.getElementById('squadList').innerHTML=squad.map((p,i)=>`
    <div class="pl-row ${p.me?'me':''}">
      <div class="pl-num">${p.jersey}</div>
      <div class="pl-av" style="background:${AVC[i%AVC.length]}">${p.name[0]}</div>
      <div class="pl-info">
        <div class="pl-name">${p.name}${p.me?` <span style="font-size:9px;background:rgba(200,240,0,0.14);color:var(--lime);padding:2px 7px;border-radius:5px;font-weight:800;letter-spacing:0.07em">YOU</span>`:''}</div>
        <div class="pl-pos">${p.pos}</div>
      </div>
      <span class="pos-badge ${POS[p.pos]}">${p.pos}</span>
    </div>`).join('');
}

// ══ RENDER SKILLS ══
function renderSkills(){
  document.getElementById('skillBars').innerHTML=skills.map(s=>`
    <div>
      <div class="sk-row-top"><div class="sk-lbl">${s.name}</div><div class="sk-val">${s.val}</div></div>
      <div class="sk-track"><div class="sk-fill" style="width:0%" data-w="${s.val}%"></div></div>
    </div>`).join('');
}
function animateSkills(){
  document.querySelectorAll('.sk-fill').forEach(b=>{
    requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.width=b.dataset.w;}));
  });
}

// ══ RENDER HISTORY ══
function renderHistory(){
  document.getElementById('mhList').innerHTML=history.map(m=>`
    <div class="mh-row">
      <div class="mh-res ${m.r}">${m.r.toUpperCase()}</div>
      <div class="mh-inf"><div class="mh-match">vs ${m.opp}</div><div class="mh-meta">${m.date} · ${m.g}G ${m.a}A</div></div>
      <div class="mh-score">${m.score}</div>
    </div>`).join('');
}

// ══ RENDER STANDINGS ══
function renderStandings(){
  document.getElementById('standingsRows').innerHTML=standings.map(s=>`
    <div class="st-row ${s.me?'me':''}">
      <div class="st-rank ${s.rank<=3?'top':''}">${s.rank}</div>
      <div class="st-team-name ${s.me?'me-t':''}">${s.team}${s.me?' ← You':''}</div>
      <div class="st-n">${s.p}</div>
      <div class="st-n">${s.w}</div>
      <div class="st-n" style="color:${s.gd>0?'var(--lime)':s.gd<0?'var(--red)':'var(--text2)'}">${s.gd>0?'+':''}${s.gd}</div>
      <div class="st-pts">${s.pts}</div>
    </div>`).join('');
}

// ══ SWIPE TO OPEN SIDEBAR ══
let tx=0;
document.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
document.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx;
  const sb=document.getElementById('sidebar');
  if(dx>60&&tx<40&&!sb.classList.contains('open'))toggleSidebar();
  if(dx<-60&&sb.classList.contains('open'))closeSidebar();
},{passive:true});

// ══ INIT ══
renderSquad();renderSkills();renderHistory();renderStandings();
setTimeout(animateSkills,300);