/* ============================================================
   OUR STORY — main.js
   Semua logic ada di sini. Konten diambil dari COUPLE_CONFIG (config.js)
   ============================================================ */

// ---------- util: sha256 (dipakai untuk gate password) ----------
async function sha256(text){
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
window.sha256 = sha256;

const ICONS = {
  anniversary:'❤️', birthday:'🎂', firstdate:'🌹', trip:'✈️', firstchat:'💌'
};

document.addEventListener('DOMContentLoaded', () => {
  initGate();
  initTheme();
  initNav();
  initHeroParticles();
  initCounter();
  renderGallery();
  renderTimeline();
  initLoveLetter();
  renderMemories();
  renderSpecialDates();
  initMusicPlayer();
  initSecretMessage();
  initInteractiveHearts();
  initScrollReveal();
  initAdminPanel();
  initSmoothScrollButtons();
});

/* ================= GATE ================= */
function initGate(){
  const cfg = COUPLE_CONFIG.gate;
  const gateEl = document.getElementById('gate');
  const body = document.body;

  if(!cfg.enabled){ gateEl.style.display='none'; body.classList.remove('locked'); return; }

  const savedOk = sessionStorage.getItem('gate_ok') === '1';
  if(savedOk){ gateEl.style.display='none'; body.classList.remove('locked'); return; }

  body.classList.add('locked');
  document.getElementById('gate-hint').textContent = cfg.hint || '';

  const input = document.getElementById('gate-input');
  const btn = document.getElementById('gate-enter');
  const err = document.getElementById('gate-error');

  async function tryEnter(){
    const val = input.value.trim();
    if(!val){ return; }
    const hash = await sha256(val);
    if(hash === cfg.passwordHash){
      sessionStorage.setItem('gate_ok','1');
      gateEl.style.opacity='0';
      setTimeout(()=>{ gateEl.style.display='none'; body.classList.remove('locked'); }, 400);
    } else {
      err.textContent = 'Hmm, coba lagi ya 🤍';
      input.value='';
      input.focus();
    }
  }
  btn.addEventListener('click', tryEnter);
  input.addEventListener('keydown', e => { if(e.key==='Enter') tryEnter(); });
}

/* ================= THEME (dark/light) ================= */
function initTheme(){
  const saved = localStorage.getItem('site_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  document.querySelectorAll('.theme-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('site_theme', next);
      updateThemeIcon(next);
    });
  });
}
function updateThemeIcon(theme){
  document.querySelectorAll('.theme-toggle').forEach(btn=>{
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

/* ================= NAV ================= */
function initNav(){
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', ()=>{
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', ()=> mobileMenu.classList.add('open'));
  document.getElementById('close-menu').addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  });
}

function initSmoothScrollButtons(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        const target = document.querySelector(id);
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      }
    });
  });
}

/* ================= HERO ================= */
function initHeroParticles(){
  const wrap = document.getElementById('hero-particles');
  const count = window.innerWidth < 640 ? 14 : 26;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    const size = 2 + Math.random()*4;
    s.style.width = s.style.height = size+'px';
    s.style.left = Math.random()*100+'%';
    s.style.bottom = '-20px';
    s.style.animationDuration = (10 + Math.random()*14)+'s';
    s.style.animationDelay = (Math.random()*10)+'s';
    wrap.appendChild(s);
  }

  document.getElementById('hero-names').innerHTML =
    `${escapeHtml(COUPLE_CONFIG.names.person1)} <span class="heart">❤</span> ${escapeHtml(COUPLE_CONFIG.names.person2)}`;
  document.getElementById('hero-tagline').textContent = COUPLE_CONFIG.names.tagline;
}

function initCounter(){
  const start = new Date(COUPLE_CONFIG.relationshipStart).getTime();
  const els = {
    years: document.querySelector('#c-years .num'),
    months: document.querySelector('#c-months .num'),
    days: document.querySelector('#c-days .num'),
    hours: document.querySelector('#c-hours .num'),
    mins: document.querySelector('#c-mins .num'),
    secs: document.querySelector('#c-secs .num'),
  };
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, now - start);

    const totalSeconds = Math.floor(diff/1000);
    const days = Math.floor(totalSeconds / 86400);
    const years = Math.floor(days/365.25);
    const months = Math.floor((days - years*365.25)/30.44);
    const hours = Math.floor((totalSeconds % 86400)/3600);
    const mins = Math.floor((totalSeconds % 3600)/60);
    const secs = totalSeconds % 60;

    els.years.textContent = years;
    els.months.textContent = months;
    els.days.textContent = days;
    els.hours.textContent = String(hours).padStart(2,'0');
    els.mins.textContent = String(mins).padStart(2,'0');
    els.secs.textContent = String(secs).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ================= GALLERY ================= */
function renderGallery(){
  const wrap = document.getElementById('gallery-grid');
  wrap.innerHTML = '';
  COUPLE_CONFIG.gallery.forEach((photo, idx)=>{
    const card = document.createElement('div');
    card.className = 'photo-card reveal';
    card.innerHTML = `
      <div class="ph-inner">
        ${imgOrPlaceholder(photo.src, photo.caption)}
        <div class="photo-caption">${escapeHtml(photo.caption||'')}</div>
      </div>`;
    card.addEventListener('click', ()=> openLightbox(idx));
    wrap.appendChild(card);
  });
}

function imgOrPlaceholder(src, alt){
  return `<img src="${src}" alt="${escapeHtml(alt||'')}" loading="lazy"
    onerror="this.outerHTML='<div class=&quot;photo-placeholder&quot;><span class=&quot;icon&quot;>🤍</span><span>Ganti foto ini di<br><code>config.js</code></span></div>'">`;
}

function openLightbox(idx){
  const photo = COUPLE_CONFIG.gallery[idx];
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-content').innerHTML = imgOrPlaceholder(photo.src, photo.caption);
  document.getElementById('lightbox-caption').textContent = photo.caption || '';
  lb.classList.add('open');
}
document.addEventListener('click', e=>{
  if(e.target.id==='lightbox' || e.target.closest('.lb-close')){
    document.getElementById('lightbox').classList.remove('open');
  }
});

/* ================= TIMELINE ================= */
function renderTimeline(){
  const wrap = document.getElementById('timeline-list');
  wrap.innerHTML = '';
  COUPLE_CONFIG.timeline.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'tl-item reveal';
    el.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-card">
        <div class="tl-thumb">${imgOrPlaceholderSmall(item.photo)}</div>
        <div>
          <div class="tl-date">${escapeHtml(item.date)}</div>
          <div class="tl-title">${escapeHtml(item.title)}</div>
          <div class="tl-story">${escapeHtml(item.story)}</div>
        </div>
      </div>`;
    wrap.appendChild(el);
  });
}
function imgOrPlaceholderSmall(src){
  return `<img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover" onerror="this.outerHTML='💜'">`;
}

/* ================= LOVE LETTER ================= */
function initLoveLetter(){
  const cfg = COUPLE_CONFIG.loveLetter;
  document.getElementById('letter-heading').textContent = cfg.heading;
  document.getElementById('letter-body').textContent = cfg.body;
  document.getElementById('letter-sign').textContent = cfg.signature;

  const envelope = document.getElementById('envelope');
  const modal = document.getElementById('letter-modal');
  envelope.addEventListener('click', ()=>{
    envelope.classList.add('open');
    setTimeout(()=> modal.classList.add('open'), 500);
  });
  document.addEventListener('click', e=>{
    if(e.target.id==='letter-modal' || e.target.closest('.letter-close')){
      modal.classList.remove('open');
      envelope.classList.remove('open');
    }
  });
}

/* ================= MEMORIES ================= */
let currentMemoryFilter = 'all';
function renderMemories(){
  const years = [...new Set(COUPLE_CONFIG.memories.map(m=>m.year))].sort();
  const filterWrap = document.getElementById('memory-filters');
  filterWrap.innerHTML = `<button class="filter-chip active" data-year="all">Semua</button>` +
    years.map(y=>`<button class="filter-chip" data-year="${y}">${y}</button>`).join('');

  filterWrap.querySelectorAll('.filter-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      filterWrap.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      currentMemoryFilter = chip.dataset.year;
      drawMemoryGrid();
    });
  });
  drawMemoryGrid();
}
function drawMemoryGrid(){
  const grid = document.getElementById('memory-grid');
  const list = COUPLE_CONFIG.memories.filter(m => currentMemoryFilter==='all' || String(m.year)===String(currentMemoryFilter));
  grid.innerHTML = list.map(m=>`
    <div class="memory-card reveal visible">
      <div class="memory-photo">${imgOrPlaceholderSmall(m.photo)}</div>
      <div class="memory-body">
        <div class="memory-date">${escapeHtml(m.date)}</div>
        <div class="memory-title">${escapeHtml(m.title)}</div>
        <div class="memory-desc">${escapeHtml(m.description)}</div>
      </div>
    </div>`).join('');
}

/* ================= SPECIAL DATES ================= */
function renderSpecialDates(){
  const grid = document.getElementById('dates-grid');
  const now = Date.now();

  const withInfo = COUPLE_CONFIG.specialDates.map(d=>{
    let target = new Date(d.date).getTime();
    // if date already passed this year and it's a recurring type, bump to next year
    if(target < now){
      const dt = new Date(d.date);
      const nextYear = new Date(dt);
      nextYear.setFullYear(new Date().getFullYear() + (dt.getMonth() < new Date().getMonth() || (dt.getMonth()===new Date().getMonth() && dt.getDate()<new Date().getDate()) ? 1 : 0));
      target = nextYear.getTime();
    }
    return {...d, target};
  });

  const nearest = withInfo.reduce((a,b)=> (a.target < b.target ? a : b), withInfo[0]);

  grid.innerHTML = withInfo.map(d=>{
    const isNearest = d === nearest;
    const daysLeft = Math.max(0, Math.ceil((d.target - now)/86400000));
    return `
      <div class="date-card reveal visible ${isNearest?'nearest':''}">
        <div class="d-icon">${ICONS[d.type]||'📌'}</div>
        <div class="d-label">${escapeHtml(d.label)}</div>
        <div class="d-date">${formatDate(d.date)}</div>
        <div class="d-countdown">${daysLeft===0?'Hari ini! 🎉':`${daysLeft} hari lagi`}</div>
        ${isNearest?'<div class="d-badge">Terdekat</div>':''}
      </div>`;
  }).join('');
}
function formatDate(str){
  const d = new Date(str);
  return d.toLocaleDateString('id-ID',{ day:'numeric', month:'long', year:'numeric' });
}

/* ================= MUSIC PLAYER ================= */
function initMusicPlayer(){
  const cfg = COUPLE_CONFIG.music;
  document.getElementById('music-title').textContent = cfg.title;
  document.getElementById('music-artist').textContent = cfg.artist;

  const audio = document.getElementById('audio-el');
  audio.src = cfg.src;
  const playBtn = document.getElementById('music-play-btn');
  const progressFill = document.getElementById('music-progress-fill');
  const progressBar = document.getElementById('music-progress');
  const vol = document.getElementById('music-vol');

  let userInteracted = false;

  playBtn.addEventListener('click', ()=>{
    userInteracted = true;
    if(audio.paused){
      audio.play().catch(()=>{ playBtn.textContent='🎵'; });
      playBtn.textContent = '⏸';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  audio.addEventListener('timeupdate', ()=>{
    if(audio.duration){
      progressFill.style.width = (audio.currentTime/audio.duration*100)+'%';
    }
  });
  progressBar.addEventListener('click', e=>{
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX-rect.left)/rect.width;
    if(audio.duration) audio.currentTime = pct*audio.duration;
  });
  vol.addEventListener('input', ()=> audio.volume = vol.value);
  audio.volume = vol.value;

  audio.addEventListener('error', ()=>{
    document.getElementById('music-artist').textContent = 'Ganti file musik di assets/music/';
  });
}

/* ================= SECRET MESSAGE ================= */
function initSecretMessage(){
  const cfg = COUPLE_CONFIG.secretMessage;
  document.getElementById('secret-btn-label').textContent = cfg.buttonLabel;
  document.getElementById('secret-text').textContent = cfg.message;

  const btn = document.getElementById('secret-open-btn');
  const modal = document.getElementById('secret-modal');
  const lock = document.getElementById('lock-icon');

  btn.addEventListener('click', async ()=>{
    if(cfg.unlockPassword){
      const pass = prompt('Masukkan password rahasia:');
      if(pass === null) return;
      if(pass !== cfg.unlockPassword){ alert('Password salah 🤐'); return; }
    }
    lock.classList.add('unlocking');
    setTimeout(()=>{
      modal.classList.add('open');
      lock.textContent = '🔓';
    }, 350);
  });
  document.addEventListener('click', e=>{
    if(e.target.id==='secret-modal' || e.target.closest('.secret-close')){
      modal.classList.remove('open');
      lock.textContent='🔒';
      lock.classList.remove('unlocking');
    }
  });
}

/* ================= INTERACTIVE HEARTS ================= */
function initInteractiveHearts(){
  document.addEventListener('click', e=>{
    if(e.target.closest('button, a, input, .photo-card, .filter-chip')) return;
    spawnHeart(e.clientX, e.clientY);
  });
}
function spawnHeart(x,y){
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = '♥';
  heart.style.left = (x-8)+'px';
  heart.style.top = (y-8)+'px';
  document.body.appendChild(heart);
  setTimeout(()=> heart.remove(), 1500);
}

/* ================= SCROLL REVEAL ================= */
function initScrollReveal(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });

  setTimeout(()=>{
    document.querySelectorAll('.reveal').forEach(el=> observer.observe(el));
  }, 100);
}

/* ================= ADMIN PANEL ================= */
function initAdminPanel(){
  const toggle = document.getElementById('admin-toggle');
  const panel = document.getElementById('admin-panel');
  toggle.addEventListener('click', ()=> panel.classList.add('open'));
  document.addEventListener('click', e=>{
    if(e.target.id==='admin-panel' || e.target.closest('.admin-close')){
      panel.classList.remove('open');
    }
  });
}

/* ================= helpers ================= */
function escapeHtml(str=''){
  return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
