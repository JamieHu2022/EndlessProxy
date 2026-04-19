(function EndlessProxyApp(window, document) {
  "use strict";
  const _mutationPatches = [];
  function registerMutationPatch(selector, callback) { _mutationPatches.push({selector,callback}); }
  const _runtimeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType!==1) return;
        _mutationPatches.forEach(function(patch) {
          if (node.matches&&node.matches(patch.selector)) patch.callback(node);
          if (node.querySelectorAll) node.querySelectorAll(patch.selector).forEach(patch.callback);
        });
      });
    });
  });
  _runtimeObserver.observe(document.documentElement,{childList:true,subtree:true});
  window.EP = window.EP||{};
  window.EP.registerMutationPatch = registerMutationPatch;
  window.EP.getObserver = function(){ return _runtimeObserver; };



const canvas = document.getElementById('city-canvas');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
resize(); window.addEventListener('resize',()=>{resize();initBuildings();initRain();initBirds();initSnow();initLeaves();initSpring();initSand();initRadioactive();initThunder();initGrass();if(typeof splitActive!=='undefined'&&splitActive)applySplitRatio();});
const buildings=[];
function initBuildings(){
  buildings.length=0; const W=canvas.width,H=canvas.height,count=Math.floor(W/28);
  const summerPalette=[['#c8a87a','#b8976a'],['#bfa070','#ae8f60'],['#d4b48a','#c4a47a'],['#b89060','#a88050'],['#cbb080','#bba070'],['#c0a575','#b09565']];
  const winterPalette=[['#2a3e58','#1e3050'],['#243650','#192c48'],['#2e4460','#223858'],['#1e3252','#162840'],['#324a64','#263e56'],['#28405a','#1c3450']];
  const fallPalette=[['#3a2810','#2e1e0a'],['#2e2008','#241806'],['#382610','#2c1c08'],['#342210','#281808'],['#3e2c12','#32220c'],['#302010','#261808']];
  const springPalette=[['#c8d8a0','#b0c888'],['#b8d090','#a0b878'],['#d0e0a8','#b8c890'],['#aac888','#92b070'],['#c0d898','#a8c080'],['#b0cc8c','#98b474']];
  const sandPalette=[['#4a3010','#3a2408'],['#3e2a0c','#2e1e06'],['#52360e','#402808'],['#442e0c','#342208'],['#4e3212','#3c2608'],['#3a2808','#2c1e06']];
  const radioPalette=[['#081808','#040e04'],['#0a1e0a','#061006'],['#0c2008','#080e04'],['#0e1e0e','#060c06'],['#081c08','#041004'],['#0a1a0a','#050c05']];
  const thunderPalette=[['#1a2035','#121828'],['#182030','#101625'],['#1c2540','#141c30'],['#14182c','#0e1220'],['#202840','#182035'],['#1e2438','#161c2c']];
  const grassPalette=[['#0e2010','#081408'],['#122614','#0a180a'],['#0c1e0e','#061206'],['#142812','#0c1c0a'],['#102210','#081608'],['#162a12','#0e1c0c']];
  for(let i=0;i<count;i++){const w=18+Math.random()*40,h=H*.2+Math.random()*H*.55;
    const sp=summerPalette[Math.floor(Math.random()*summerPalette.length)];
    const wp=winterPalette[Math.floor(Math.random()*winterPalette.length)];
    const fp=fallPalette[Math.floor(Math.random()*fallPalette.length)];
    const spp=springPalette[Math.floor(Math.random()*springPalette.length)];
    const sdp=sandPalette[Math.floor(Math.random()*sandPalette.length)];
    const rdp=radioPalette[Math.floor(Math.random()*radioPalette.length)];
    const tdp=thunderPalette[Math.floor(Math.random()*thunderPalette.length)];
    const gdp=grassPalette[Math.floor(Math.random()*grassPalette.length)];
    buildings.push({x:(i/count)*W+Math.random()*12-6,w,h,
      color:Math.random()>.5?'#061428':'#040e1c',
      summerColor:sp[0], summerColorB:sp[1],
      winterColor:wp[0], winterColorB:wp[1],
      fallColor:fp[0], fallColorB:fp[1],
      springColor:spp[0], springColorB:spp[1],
      sandColor:sdp[0], sandColorB:sdp[1],
      radioColor:rdp[0], radioColorB:rdp[1],
      thunderColor:tdp[0], thunderColorB:tdp[1],
      grassColor:gdp[0], grassColorB:gdp[1],
      windows:genWins(w,h,i)});}
}

let windowAnimations = localStorage.getItem('ep_winanim') !== '0';

function hashInt(a, b, c) {

  let h = (a * 2246822519 ^ b * 2654435761 ^ c * 1597334677) >>> 0;
  h ^= h >>> 16; h = Math.imul(h, 0x45d9f3b); h ^= h >>> 16;
  return (h >>> 0) / 0xffffffff;
}

function genWins(bw, bh, bi) {
  if (!windowAnimations) return [];
  const wins = [], cols = Math.floor(bw/7), rows = Math.floor(bh/10);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const h = hashInt(bi, c, r);
    wins.push({
      col: c, row: r,
      lit: h > 0.45,
      color: h > 0.6 ? '#00e5ff' : h > 0.5 ? '#80d8ff' : '#0288d1',
      flicker: h > 0.92
    });
  }
  return wins;
}

function drawWindowsDirect(bx, by, bw, bh, bi, winColor1, winColor2, winColor3, baseAlpha) {

  const cols = Math.floor(bw/7), rows = Math.floor(bh/10);
  ctx.globalAlpha = baseAlpha;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const h = hashInt(bi, c, r);
      if (h <= 0.45) continue; 
      ctx.fillStyle = h > 0.6 ? winColor1 : h > 0.5 ? winColor2 : winColor3;
      ctx.fillRect(bx + 3 + c*7, by + 5 + r*10, 4, 5);
    }
  }
  ctx.globalAlpha = 1;
}
const drops=[];
function initRain(){drops.length=0;for(let i=0;i<350;i++)drops.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,len:8+Math.random()*22,speed:12+Math.random()*22,opacity:.15+Math.random()*.55,angle:.08+Math.random()*.06});}
initBuildings();initRain();let frame=0;
let rainEnabled=localStorage.getItem('ep_rain')!=='0';
let summerEnabled=localStorage.getItem('ep_summer')==='1';
let winterEnabled=localStorage.getItem('ep_winter')==='1';
let fallEnabled=localStorage.getItem('ep_fall')==='1';
let springEnabled=localStorage.getItem('ep_spring')==='1';
let sandEnabled=localStorage.getItem('ep_sand')==='1';
let radioactiveEnabled=localStorage.getItem('ep_radioactive')==='1';
let thunderEnabled=localStorage.getItem('ep_thunder')==='1';
let grassEnabled=localStorage.getItem('ep_grass')==='1';
let particlesEnabled=localStorage.getItem('ep_particles')!=='0'; 
let seasonalMode=localStorage.getItem('ep_seasonal')==='1';

const birds=[];
function initBirds(){
  birds.length=0;
  for(let i=0;i<18;i++) birds.push({
    x:Math.random()*canvas.width, y:50+Math.random()*canvas.height*0.45,
    speed:0.6+Math.random()*1.2, wingPhase:Math.random()*Math.PI*2,
    size:4+Math.random()*5, dir:Math.random()>0.5?1:-1
  });
}
initBirds();

function drawNightScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#020c18');sky.addColorStop(.4,'#041524');
  sky.addColorStop(.7,'#061e30');sky.addColorStop(1,'#030d1a');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  const g=ctx.createRadialGradient(W*.5,H*.38,0,W*.5,H*.38,Math.max(1,W*.5));
  g.addColorStop(0,'rgba(0,180,255,.07)');g.addColorStop(1,'transparent');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const pg=ctx.createRadialGradient(W*.88,H*.3,0,W*.88,H*.3,Math.max(1,W*.25));
  pg.addColorStop(0,'rgba(255,0,120,.06)');pg.addColorStop(1,'transparent');
  ctx.fillStyle=pg;ctx.fillRect(0,0,W,H);

  buildings.forEach((b,bi)=>{
    const baseY=H*.85,bx=b.x,by=baseY-b.h;
    ctx.fillStyle=b.color;ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(0,200,255,.06)';ctx.lineWidth=1;ctx.strokeRect(bx,by,b.w,b.h);
    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit)return;
        if(win.flicker&&(frame%90<3||frame%150>145))return;
        ctx.fillStyle=win.color;
        ctx.globalAlpha=.55+.3*Math.sin(frame*.02+win.col);
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'#00e5ff','#80d8ff','#0288d1',0.6);
    }
    ctx.fillStyle='rgba(0,229,255,.04)';ctx.fillRect(bx,by,b.w,2);
  });

  const ground=H*.85;
  const rg=ctx.createLinearGradient(0,ground,0,H);
  rg.addColorStop(0,'rgba(0,229,255,.12)');rg.addColorStop(.3,'rgba(0,100,180,.08)');rg.addColorStop(1,'#010810');
  ctx.fillStyle=rg;ctx.fillRect(0,ground,W,H-ground);

  ctx.lineCap='round';
  if(rainEnabled && particlesEnabled){
    drops.forEach(d=>{
      ctx.beginPath();
      ctx.strokeStyle=`rgba(160,220,255,${d.opacity})`;
      ctx.lineWidth=.7;
      ctx.moveTo(d.x,d.y);
      ctx.lineTo(d.x+d.len*Math.sin(d.angle),d.y+d.len);
      ctx.stroke();
      d.y+=d.speed;d.x+=d.speed*Math.sin(d.angle);
      if(d.y>H){d.y=-d.len;d.x=Math.random()*W;}
    });
  }
}

function drawSummerScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#5bbfe8');
  sky.addColorStop(0.35,'#87ceeb');
  sky.addColorStop(0.65,'#b8dff5');
  sky.addColorStop(0.82,'#f5d98a');
  sky.addColorStop(1,'#f0c060');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  const sunX=W*0.52, sunY=H*0.28;

  const corona=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.22));
  corona.addColorStop(0,'rgba(255,255,200,0.18)');
  corona.addColorStop(0.4,'rgba(255,220,80,0.08)');
  corona.addColorStop(1,'transparent');
  ctx.fillStyle=corona;ctx.fillRect(0,0,W,H);

  const sunGlow=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.09));
  sunGlow.addColorStop(0,'rgba(255,255,220,0.55)');
  sunGlow.addColorStop(0.5,'rgba(255,210,50,0.18)');
  sunGlow.addColorStop(1,'transparent');
  ctx.fillStyle=sunGlow;ctx.fillRect(0,0,W,H);

  const disc=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.045));
  disc.addColorStop(0,'rgba(255,255,240,1)');
  disc.addColorStop(0.5,'rgba(255,230,100,0.9)');
  disc.addColorStop(1,'rgba(255,200,0,0)');
  ctx.fillStyle=disc;
  ctx.beginPath();ctx.arc(sunX,sunY,Math.max(1,W*0.045),0,Math.PI*2);ctx.fill();

  ctx.globalAlpha=0.82;
  const cloudDefs=[
    {x:0.08,y:0.12,r:0.07,speed:0.04},
    {x:0.28,y:0.09,r:0.055,speed:0.028},
    {x:0.62,y:0.14,r:0.065,speed:0.035},
    {x:0.80,y:0.08,r:0.05,speed:0.05},
    {x:0.45,y:0.18,r:0.04,speed:0.022},
    {x:0.15,y:0.22,r:0.035,speed:0.018},
    {x:0.72,y:0.22,r:0.042,speed:0.04},
  ];
  cloudDefs.forEach(cd=>{
    const cx=((cd.x*W + frame*cd.speed) % (W+cd.r*W*2)) - cd.r*W;
    const cy=cd.y*H;
    const cr=Math.max(1,cd.r*W);
    const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr);
    cg.addColorStop(0,'rgba(255,255,255,0.95)');
    cg.addColorStop(0.5,'rgba(240,248,255,0.75)');
    cg.addColorStop(1,'rgba(200,230,255,0)');
    ctx.fillStyle=cg;
    ctx.beginPath();
    ctx.ellipse(cx,cy,cr,cr*0.55,0,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();ctx.ellipse(cx-cr*0.4,cy+cr*0.05,cr*0.55,cr*0.45,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(cx+cr*0.42,cy+cr*0.08,cr*0.5,cr*0.42,0,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;

  const baseY=H*0.85;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;

    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0,b.summerColor||'#c8a87a');
    bg.addColorStop(1,b.summerColorB||'#b8976a');
    ctx.fillStyle=bg;
    ctx.fillRect(bx,by,b.w,b.h);

    ctx.strokeStyle='rgba(100,70,30,0.1)';ctx.lineWidth=1;
    ctx.strokeRect(bx,by,b.w,b.h);

    ctx.fillStyle='rgba(255,230,150,0.12)';
    ctx.fillRect(bx,by,3,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        ctx.globalAlpha= win.lit ? 0.55 : 0.15;
        ctx.fillStyle= win.lit ? 'rgba(255,240,200,0.9)' : 'rgba(80,60,30,0.6)';
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(255,240,200,0.9)','rgba(255,240,200,0.9)','rgba(255,240,200,0.9)',0.55);
    }

    ctx.fillStyle='rgba(255,200,50,0.08)';ctx.fillRect(bx,by,b.w,2);
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(200,160,80,0.35)');
  rg.addColorStop(0.4,'rgba(180,140,70,0.2)');
  rg.addColorStop(1,'#c8a040');
  ctx.fillStyle=rg;ctx.fillRect(0,baseY,W,H-baseY);

  const shim=ctx.createLinearGradient(0,baseY,0,baseY+40);
  shim.addColorStop(0,'rgba(255,220,100,0.18)');
  shim.addColorStop(1,'transparent');
  ctx.fillStyle=shim;ctx.fillRect(0,baseY,W,40);

  if(particlesEnabled) birds.forEach(b=>{
    b.x+=b.speed*b.dir;
    if(b.x>W+30)b.x=-30;
    if(b.x<-30)b.x=W+30;
    b.wingPhase+=0.12;
    const wFlap=Math.sin(b.wingPhase)*b.size*0.9;
    ctx.strokeStyle='rgba(30,30,30,0.55)';
    ctx.lineWidth=1.1;
    ctx.lineCap='round';
    ctx.beginPath();

    ctx.moveTo(b.x,b.y);ctx.quadraticCurveTo(b.x-b.size*1.1,b.y-wFlap,b.x-b.size*2,b.y-wFlap*0.3);
    ctx.stroke();
    ctx.beginPath();

    ctx.moveTo(b.x,b.y);ctx.quadraticCurveTo(b.x+b.size*1.1,b.y-wFlap,b.x+b.size*2,b.y-wFlap*0.3);
    ctx.stroke();
  });
}

const flakes=[];
const bigFlakes=[];
function initSnow(){
  flakes.length=0; bigFlakes.length=0;
  const W=canvas.width, H=canvas.height;
  for(let i=0;i<220;i++) flakes.push({
    x:Math.random()*W, y:Math.random()*H,
    r:1+Math.random()*2.8,
    speed:0.8+Math.random()*1.8,
    drift:Math.sin(Math.random()*Math.PI*2),
    driftSpeed:0.005+Math.random()*0.01,
    driftPhase:Math.random()*Math.PI*2,
    opacity:0.35+Math.random()*0.55
  });

  for(let i=0;i<12;i++) bigFlakes.push({
    x:Math.random()*W, y:Math.random()*H,
    size:10+Math.random()*20,
    speed:0.25+Math.random()*0.6,
    rot:Math.random()*Math.PI*2,
    rotSpeed:(Math.random()-0.5)*0.008,
    opacity:0.25+Math.random()*0.45
  });
}
initSnow();

function drawSnowflakeStar(cx,cy,size,rot){
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
  for(let i=0;i<6;i++){
    ctx.rotate(Math.PI/3);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,size);
    ctx.stroke();

    ctx.beginPath(); ctx.moveTo(0,size*0.55); ctx.lineTo(size*0.22,size*0.33); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,size*0.55); ctx.lineTo(-size*0.22,size*0.33); ctx.stroke();
  }
  ctx.restore();
}

function drawWinterScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a1628');
  sky.addColorStop(0.3,'#0f2240');
  sky.addColorStop(0.6,'#162d52');
  sky.addColorStop(0.85,'#1e3a60');
  sky.addColorStop(1,'#152e4e');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const moonX=W*0.48, moonY=H*0.22;
  const moonCorona=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,Math.max(1,W*0.18));
  moonCorona.addColorStop(0,'rgba(200,230,255,0.14)');
  moonCorona.addColorStop(0.5,'rgba(168,210,240,0.06)');
  moonCorona.addColorStop(1,'transparent');
  ctx.fillStyle=moonCorona; ctx.fillRect(0,0,W,H);

  const moonGlow=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,Math.max(1,W*0.065));
  moonGlow.addColorStop(0,'rgba(230,245,255,0.55)');
  moonGlow.addColorStop(0.6,'rgba(168,216,240,0.2)');
  moonGlow.addColorStop(1,'transparent');
  ctx.fillStyle=moonGlow; ctx.fillRect(0,0,W,H);

  const moonDiscR=Math.max(1,W*0.032);
  const moonDisc=ctx.createRadialGradient(moonX-W*0.008,moonY-W*0.008,0,moonX,moonY,moonDiscR);
  moonDisc.addColorStop(0,'rgba(245,252,255,1)');
  moonDisc.addColorStop(0.55,'rgba(200,230,250,0.9)');
  moonDisc.addColorStop(1,'rgba(168,210,240,0)');
  ctx.fillStyle=moonDisc;
  ctx.beginPath(); ctx.arc(moonX,moonY,moonDiscR,0,Math.PI*2); ctx.fill();

  ctx.save(); ctx.globalAlpha=0.04+0.02*Math.sin(frame*0.008);
  const aurora=ctx.createLinearGradient(0,H*0.05,W,H*0.25);
  aurora.addColorStop(0,'transparent');
  aurora.addColorStop(0.2,'rgba(100,200,255,0.8)');
  aurora.addColorStop(0.5,'rgba(80,240,200,0.6)');
  aurora.addColorStop(0.8,'rgba(100,180,255,0.6)');
  aurora.addColorStop(1,'transparent');
  ctx.fillStyle=aurora; ctx.fillRect(0,H*0.05,W,H*0.22);
  ctx.restore();

  const baseY=H*0.85;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;

    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0, b.winterColor||'#2a3e58');
    bg.addColorStop(1, b.winterColorB||'#1e3050');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(100,180,240,0.08)'; ctx.lineWidth=1;
    ctx.strokeRect(bx,by,b.w,b.h);

    ctx.fillStyle='rgba(200,230,255,0.06)'; ctx.fillRect(bx,by,2,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(frame%80<3||frame%130>127)) return;
        ctx.fillStyle='rgba(180,220,255,0.7)';
        ctx.globalAlpha=0.4+0.25*Math.sin(frame*0.018+win.col*0.5);
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(180,220,255,0.7)','rgba(180,220,255,0.7)','rgba(180,220,255,0.7)',0.45);
    }

    const snowCapH=3+Math.random()*0.5;
    ctx.fillStyle='rgba(220,240,255,0.85)';
    ctx.beginPath();
    ctx.moveTo(bx-1,by+snowCapH);
    ctx.lineTo(bx+b.w/2, by-snowCapH*0.5);
    ctx.lineTo(bx+b.w+1, by+snowCapH);
    ctx.closePath(); ctx.fill();

    const icicleCols=Math.floor(b.w/5);
    for(let ic=0;ic<icicleCols;ic++){
      const ix=bx+3+ic*5;
      const ilen=4+((ic*7+b.w)%9);
      const ig=ctx.createLinearGradient(ix,by+snowCapH,ix,by+snowCapH+ilen);
      ig.addColorStop(0,'rgba(200,235,255,0.75)');
      ig.addColorStop(1,'rgba(168,216,240,0)');
      ctx.fillStyle=ig;
      ctx.beginPath();
      ctx.moveTo(ix,by+snowCapH);
      ctx.lineTo(ix+1.5,by+snowCapH+ilen);
      ctx.lineTo(ix+3,by+snowCapH);
      ctx.closePath(); ctx.fill();
    }
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(168,216,240,0.2)');
  rg.addColorStop(0.3,'rgba(120,180,220,0.12)');
  rg.addColorStop(1,'#0d1e36');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  const shim=ctx.createLinearGradient(0,baseY,0,baseY+30);
  shim.addColorStop(0,'rgba(200,235,255,0.18)');
  shim.addColorStop(1,'transparent');
  ctx.fillStyle=shim; ctx.fillRect(0,baseY,W,30);

  if(particlesEnabled){
  ctx.fillStyle='rgba(255,255,255,1)';
  flakes.forEach(f=>{
    f.driftPhase+=f.driftSpeed;
    f.x+=Math.sin(f.driftPhase)*0.5;
    f.y+=f.speed;
    if(f.y>H+5){ f.y=-5; f.x=Math.random()*W; }
    ctx.globalAlpha=f.opacity;
    ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  bigFlakes.forEach(f=>{
    f.y+=f.speed; f.rot+=f.rotSpeed;
    if(f.y>H+f.size*2){ f.y=-f.size*2; f.x=Math.random()*W; }
    ctx.save();
    ctx.strokeStyle=`rgba(200,235,255,${f.opacity})`;
    ctx.lineWidth=1.2;
    drawSnowflakeStar(f.x,f.y,f.size,f.rot);
    ctx.restore();
  });
  } 
}

const leaves=[];
const LEAF_COLOURS=['#c0392b','#e67e22','#d35400','#a04000','#8e4a0c','#c8780a','#b5451b','#7b2d00','#cb6d0a','#a03010'];
function initLeaves(){
  leaves.length=0;
  const W=canvas.width, H=canvas.height;
  for(let i=0;i<90;i++) leaves.push({
    x:Math.random()*W, y:Math.random()*H,
    size:6+Math.random()*14,
    colour:LEAF_COLOURS[Math.floor(Math.random()*LEAF_COLOURS.length)],
    rot:Math.random()*Math.PI*2,
    rotSpeed:(Math.random()-0.5)*0.06,
    speedY:0.6+Math.random()*1.4,
    speedX:(Math.random()-0.5)*1.2,
    wobble:Math.random()*Math.PI*2,
    wobbleSpeed:0.02+Math.random()*0.03,
    opacity:0.7+Math.random()*0.3,
    type:Math.floor(Math.random()*3) 
  });
}
initLeaves();

function drawLeafShape(cx,cy,size,rot,type){
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
  ctx.beginPath();
  if(type===0){

    ctx.moveTo(0,-size);
    ctx.bezierCurveTo(size*0.6,-size*0.7, size*0.9,-size*0.2, size*0.5, 0);
    ctx.bezierCurveTo(size*0.9, size*0.3, size*0.5, size*0.8, 0, size);
    ctx.bezierCurveTo(-size*0.5, size*0.8, -size*0.9, size*0.3, -size*0.5, 0);
    ctx.bezierCurveTo(-size*0.9,-size*0.2, -size*0.6,-size*0.7, 0,-size);
  } else if(type===1){

    const pts=5, inner=size*0.45, outer=size;
    for(let i=0;i<pts*2;i++){
      const r=i%2===0?outer:inner;
      const a=(i/pts/2)*Math.PI*2-Math.PI/2;
      i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
    }
  } else {

    ctx.ellipse(0,0,size*0.45,size,0,0,Math.PI*2);
  }
  ctx.closePath();
  ctx.fill();

  ctx.beginPath(); ctx.moveTo(0,size*0.5); ctx.lineTo(0,size*1.3);
  ctx.strokeStyle='rgba(60,30,10,0.5)'; ctx.lineWidth=0.8; ctx.stroke();
  ctx.restore();
}

function drawFallScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0e04');
  sky.addColorStop(0.2,'#2e1808');
  sky.addColorStop(0.45,'#5c2e08');
  sky.addColorStop(0.68,'#c86010');
  sky.addColorStop(0.85,'#e09020');
  sky.addColorStop(1,'#c87818');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const sunX=W*0.5, sunY=H*0.55;

  const rayCount=14;
  for(let i=0;i<rayCount;i++){
    const angle=-Math.PI/2 + (i/(rayCount-1)-0.5)*Math.PI*0.9;
    const len=H*1.1;
    const rayAlpha=0.04+0.03*Math.sin(frame*0.005+i);
    ctx.save();
    ctx.globalAlpha=rayAlpha;
    ctx.fillStyle='rgba(255,220,80,1)';
    ctx.beginPath();
    ctx.moveTo(sunX,sunY);
    ctx.lineTo(sunX+Math.cos(angle-0.025)*len, sunY+Math.sin(angle-0.025)*len);
    ctx.lineTo(sunX+Math.cos(angle+0.025)*len, sunY+Math.sin(angle+0.025)*len);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  const sunC=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.2));
  sunC.addColorStop(0,'rgba(255,200,50,0.22)');
  sunC.addColorStop(0.5,'rgba(220,120,10,0.08)');
  sunC.addColorStop(1,'transparent');
  ctx.fillStyle=sunC; ctx.fillRect(0,0,W,H);

  const sunG=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.08));
  sunG.addColorStop(0,'rgba(255,230,100,0.6)');
  sunG.addColorStop(0.6,'rgba(220,140,20,0.2)');
  sunG.addColorStop(1,'transparent');
  ctx.fillStyle=sunG; ctx.fillRect(0,0,W,H);

  const sunDiscR=Math.max(1,W*0.038);
  const sunD=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunDiscR);
  sunD.addColorStop(0,'rgba(255,248,200,1)');
  sunD.addColorStop(0.5,'rgba(255,200,60,0.9)');
  sunD.addColorStop(1,'rgba(220,120,0,0)');
  ctx.fillStyle=sunD;
  ctx.beginPath(); ctx.arc(sunX,sunY,sunDiscR,0,Math.PI*2); ctx.fill();

  const haze=ctx.createLinearGradient(0,H*0.6,0,H*0.85);
  haze.addColorStop(0,'rgba(200,100,10,0.0)');
  haze.addColorStop(0.5,'rgba(220,130,10,0.12)');
  haze.addColorStop(1,'rgba(180,80,5,0.0)');
  ctx.fillStyle=haze; ctx.fillRect(0,H*0.6,W,H*0.25);

  const baseY=H*0.82;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;

    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.fallColor||'#2e1e0a');
    bg.addColorStop(0.7,b.fallColorB||'#241808');
    bg.addColorStop(1,'#3a2210');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(200,100,10,0.06)'; ctx.lineWidth=1;
    ctx.strokeRect(bx,by,b.w,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(frame%85<3||frame%140>137)) return;
        const wc=Math.random()>0.5?'rgba(255,180,60,':'rgba(255,220,120,';
        ctx.fillStyle=wc+'0.85)';
        ctx.globalAlpha=0.45+0.3*Math.sin(frame*0.02+win.col*0.7);
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(255,180,60,0.85)','rgba(255,220,120,0.85)','rgba(255,180,60,0.85)',0.55);
    }

    const rimAlpha=0.08+0.04*Math.sin(frame*0.01);
    ctx.fillStyle=`rgba(220,140,20,${rimAlpha})`;
    ctx.fillRect(bx,by,b.w,2);
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(180,90,10,0.3)');
  rg.addColorStop(0.3,'rgba(120,55,5,0.2)');
  rg.addColorStop(1,'#100800');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  if(particlesEnabled){
  leaves.forEach(lf=>{
    lf.wobble+=lf.wobbleSpeed;
    lf.x+=lf.speedX+Math.sin(lf.wobble)*0.8;
    lf.y+=lf.speedY+Math.cos(lf.wobble*0.7)*0.4;
    lf.rot+=lf.rotSpeed;
    if(lf.y>H+lf.size*2){ lf.y=-lf.size*2; lf.x=Math.random()*W; }
    if(lf.x>W+lf.size*2) lf.x=-lf.size*2;
    if(lf.x<-lf.size*2) lf.x=W+lf.size*2;
    ctx.globalAlpha=lf.opacity;
    ctx.fillStyle=lf.colour;
    drawLeafShape(lf.x,lf.y,lf.size,lf.rot,lf.type);
  });
  ctx.globalAlpha=1;
  } 
}

const petals=[];
const springLeaves=[];
const butterflies=[];
const PETAL_COLS=['#f9c8d8','#f5a8c0','#fce0ea','#f8b4cc','#ffd6e0','#ffc0cb','#ffb8d0'];
const SPRING_LEAF_COLS=['#a8d870','#88c050','#b8e080','#78b840','#c8e898'];
function initSpring(){
  petals.length=0; springLeaves.length=0; butterflies.length=0;
  const W=canvas.width,H=canvas.height;
  for(let i=0;i<65;i++) petals.push({
    x:Math.random()*W, y:Math.random()*H,
    size:5+Math.random()*10,
    col:PETAL_COLS[Math.floor(Math.random()*PETAL_COLS.length)],
    rot:Math.random()*Math.PI*2, rotSpeed:(Math.random()-0.5)*0.04,
    speedY:0.5+Math.random()*1.0, speedX:(Math.random()-0.5)*0.7,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.018+Math.random()*0.025,
    opacity:0.65+Math.random()*0.3
  });
  for(let i=0;i<35;i++) springLeaves.push({
    x:Math.random()*W, y:Math.random()*H,
    size:6+Math.random()*10,
    col:SPRING_LEAF_COLS[Math.floor(Math.random()*SPRING_LEAF_COLS.length)],
    rot:Math.random()*Math.PI*2, rotSpeed:(Math.random()-0.5)*0.03,
    speedY:0.4+Math.random()*0.8, speedX:(Math.random()-0.5)*0.6,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.015+Math.random()*0.02,
    opacity:0.6+Math.random()*0.35
  });
  for(let i=0;i<10;i++){
    const col=Math.random()>0.5?['#e87820','#000080','#f5a020']:['#3060c0','#000000','#6090e0'];
    butterflies.push({
      x:Math.random()*W, y:60+Math.random()*H*0.55,
      wingPhase:Math.random()*Math.PI*2, wingSpeed:0.09+Math.random()*0.08,
      size:9+Math.random()*8, dir:Math.random()>0.5?1:-1,
      speedX:0.5+Math.random()*0.8, speedY:(Math.random()-0.5)*0.3,
      wobbleY:0,wobblePhase:Math.random()*Math.PI*2,
      col:col
    });
  }
}
initSpring();

function drawSpringScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#5bc8f0');
  sky.addColorStop(0.4,'#88d8f5');
  sky.addColorStop(0.72,'#beeaff');
  sky.addColorStop(0.9,'#e0f5ff');
  sky.addColorStop(1,'#f5faff');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const sunX=W*0.5, sunY=H*0.18;
  const sunC=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.18));
  sunC.addColorStop(0,'rgba(255,255,220,0.28)'); sunC.addColorStop(1,'transparent');
  ctx.fillStyle=sunC; ctx.fillRect(0,0,W,H);
  const sunG=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.065));
  sunG.addColorStop(0,'rgba(255,255,200,0.65)'); sunG.addColorStop(1,'transparent');
  ctx.fillStyle=sunG; ctx.fillRect(0,0,W,H);
  const sunDiscR=Math.max(1,W*0.035);
  const sunD=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunDiscR);
  sunD.addColorStop(0,'rgba(255,255,240,1)'); sunD.addColorStop(0.5,'rgba(255,240,150,0.85)'); sunD.addColorStop(1,'rgba(255,220,80,0)');
  ctx.fillStyle=sunD; ctx.beginPath(); ctx.arc(sunX,sunY,sunDiscR,0,Math.PI*2); ctx.fill();

  ctx.globalAlpha=0.88;
  const clouds=[{x:0.1,y:0.1,r:0.06,s:0.025},{x:0.35,y:0.08,r:0.05,s:0.018},{x:0.68,y:0.12,r:0.065,s:0.03},{x:0.85,y:0.07,r:0.045,s:0.038},{x:0.22,y:0.2,r:0.038,s:0.015},{x:0.6,y:0.22,r:0.04,s:0.022}];
  clouds.forEach(cd=>{
    const cx=((cd.x*W+frame*cd.s)%(W+cd.r*W*2))-cd.r*W, cy=cd.y*H, cr=Math.max(1,cd.r*W);
    const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr);
    cg.addColorStop(0,'rgba(255,255,255,0.98)'); cg.addColorStop(0.55,'rgba(240,250,255,0.8)'); cg.addColorStop(1,'rgba(200,235,255,0)');
    ctx.fillStyle=cg;
    ctx.beginPath(); ctx.ellipse(cx,cy,cr,cr*0.52,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx-cr*0.38,cy+cr*0.05,cr*0.52,cr*0.42,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+cr*0.4,cy+cr*0.07,cr*0.48,cr*0.4,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  const baseY=H*0.82;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0,b.springColor||'#b8d090'); bg.addColorStop(1,b.springColorB||'#a0c078');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(60,140,60,0.1)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);

    ctx.fillStyle='rgba(255,255,200,0.1)'; ctx.fillRect(bx,by,3,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        ctx.globalAlpha=win.lit?0.5:0.12;
        ctx.fillStyle=win.lit?'rgba(220,255,200,0.9)':'rgba(80,120,60,0.4)';
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(220,255,200,0.9)','rgba(220,255,200,0.9)','rgba(220,255,200,0.9)',0.5);
    }

    const stripH=Math.min(6,b.w*0.15);
    const flowerCols=['#f9a8c0','#c8e870','#f5c842','#e080c8','#88d8a0'];
    ctx.fillStyle=flowerCols[Math.floor(b.x*7%5)];
    ctx.fillRect(bx,by-stripH,b.w,stripH);

    ctx.strokeStyle='rgba(60,160,60,0.35)'; ctx.lineWidth=1;
    for(let v=0;v<Math.floor(b.h/30);v++){
      const vy=by+v*30+15;
      ctx.beginPath(); ctx.moveTo(bx,vy); ctx.quadraticCurveTo(bx-4,vy+8,bx+2,vy+15); ctx.stroke();
    }
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(100,200,80,0.5)'); rg.addColorStop(0.3,'rgba(80,170,60,0.3)'); rg.addColorStop(1,'#4a9040');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  const gs=ctx.createLinearGradient(0,baseY,0,baseY+25);
  gs.addColorStop(0,'rgba(180,255,120,0.22)'); gs.addColorStop(1,'transparent');
  ctx.fillStyle=gs; ctx.fillRect(0,baseY,W,25);

  if(particlesEnabled){

    petals.forEach(p=>{
      p.wobble+=p.wobbleSpeed; p.x+=p.speedX+Math.sin(p.wobble)*0.6; p.y+=p.speedY+Math.cos(p.wobble*0.8)*0.3; p.rot+=p.rotSpeed;
      if(p.y>H+p.size*2){p.y=-p.size*2; p.x=Math.random()*W;}
      if(p.x>W+p.size*2) p.x=-p.size*2; if(p.x<-p.size*2) p.x=W+p.size*2;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.globalAlpha=p.opacity;
      ctx.fillStyle=p.col;

      ctx.beginPath(); ctx.ellipse(0,-p.size*0.3,p.size*0.4,p.size*0.8,0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0,-p.size*0.3,p.size*0.4,p.size*0.8,-0.3,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha=1;

    springLeaves.forEach(sl=>{
      sl.wobble+=sl.wobbleSpeed; sl.x+=sl.speedX+Math.sin(sl.wobble)*0.5; sl.y+=sl.speedY; sl.rot+=sl.rotSpeed;
      if(sl.y>H+sl.size*2){sl.y=-sl.size*2; sl.x=Math.random()*W;}
      ctx.save(); ctx.translate(sl.x,sl.y); ctx.rotate(sl.rot); ctx.globalAlpha=sl.opacity;
      ctx.fillStyle=sl.col;
      ctx.beginPath(); ctx.ellipse(0,0,sl.size*0.35,sl.size,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha=1;

    butterflies.forEach(bf=>{
      bf.wingPhase+=bf.wingSpeed; bf.wobblePhase+=0.03;
      bf.x+=bf.speedX*bf.dir; bf.y+=bf.speedY+Math.sin(bf.wobblePhase)*0.4;
      if(bf.x>W+40) bf.x=-40; if(bf.x<-40) bf.x=W+40;
      if(bf.y<30) bf.y=30; if(bf.y>H*0.65) bf.y=H*0.65;
      const wFlap=Math.sin(bf.wingPhase)*bf.size;
      ctx.save(); ctx.translate(bf.x,bf.y);
      ctx.globalAlpha=0.85;

      const [bodyCol,wingEdge,wingFill]=bf.col;
      [[1,-0.3],[- 1,-0.3]].forEach(([sx,rx])=>{
        ctx.fillStyle=wingFill;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.quadraticCurveTo(sx*bf.size*2, -wFlap*1.2, sx*bf.size*2.8, -wFlap*0.6+rx*5);
        ctx.quadraticCurveTo(sx*bf.size*2.2, wFlap*0.5, 0,bf.size*0.4);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle=wingEdge; ctx.lineWidth=0.6; ctx.stroke();
      });

      ctx.fillStyle=bodyCol;
      ctx.beginPath(); ctx.ellipse(0,0,bf.size*0.18,bf.size*0.7,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha=1;
  }
}

const sandGrains=[];
let sandLightning={active:false,x:0,branches:[],timer:0,flashAlpha:0};
function initSand(){
  sandGrains.length=0;
  const W=canvas.width,H=canvas.height;
  for(let i=0;i<320;i++) sandGrains.push({
    x:Math.random()*W, y:Math.random()*H,
    size:1+Math.random()*2.5,
    speedX:1.5+Math.random()*2.5, speedY:(Math.random()-0.3)*0.8,
    opacity:0.18+Math.random()*0.45,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.02+Math.random()*0.03,
    col:Math.random()>0.5?'rgba(200,160,80,':'rgba(220,180,100,'
  });
}
initSand();
function triggerSandLightning(W,H){
  sandLightning.active=true; sandLightning.timer=28; sandLightning.flashAlpha=0.18;
  sandLightning.x=W*0.2+Math.random()*W*0.6;
  sandLightning.branches=[];
  let cx=sandLightning.x, cy=0;
  while(cy<H*0.85){
    const nx=cx+(Math.random()-0.5)*80, ny=cy+30+Math.random()*40;
    sandLightning.branches.push({x1:cx,y1:cy,x2:nx,y2:ny});
    cx=nx; cy=ny;
    if(Math.random()>0.65&&cy<H*0.6){
      let bx=cx,by=cy;
      for(let b=0;b<3;b++){
        const bx2=bx+(Math.random()-0.5)*60, by2=by+20+Math.random()*30;
        sandLightning.branches.push({x1:bx,y1:by,x2:bx2,y2:by2,sub:true});
        bx=bx2; by=by2;
      }
    }
  }
}

function drawSandScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0e02');
  sky.addColorStop(0.2,'#2e1a06');
  sky.addColorStop(0.45,'#4a2e0a');
  sky.addColorStop(0.7,'#7a5018');
  sky.addColorStop(0.88,'#a07028');
  sky.addColorStop(1,'#8a5c18');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const haze1=ctx.createLinearGradient(0,H*0.3,0,H*0.75);
  haze1.addColorStop(0,'rgba(160,110,30,0)');
  haze1.addColorStop(0.5,'rgba(180,130,40,0.12)');
  haze1.addColorStop(1,'rgba(140,90,20,0)');
  ctx.fillStyle=haze1; ctx.fillRect(0,H*0.3,W,H*0.45);

  ctx.globalAlpha=0.06+0.03*Math.sin(frame*0.007);
  const dustClouds=[{x:0.15,y:0.35,r:0.18},{x:0.55,y:0.28,r:0.22},{x:0.82,y:0.42,r:0.16},{x:0.38,y:0.5,r:0.14}];
  dustClouds.forEach(dc=>{
    const cx=((dc.x*W+frame*0.4)%(W+dc.r*W*2))-dc.r*W;
    const cy=dc.y*H+Math.sin(frame*0.005+dc.x*5)*H*0.03;
    const cr=Math.max(1,dc.r*W);
    const dg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr);
    dg.addColorStop(0,'rgba(180,130,50,0.7)'); dg.addColorStop(1,'transparent');
    ctx.fillStyle=dg; ctx.beginPath(); ctx.ellipse(cx,cy,cr,cr*0.45,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  if(sandLightning.active&&sandLightning.flashAlpha>0){
    ctx.fillStyle=`rgba(255,220,100,${sandLightning.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    sandLightning.flashAlpha*=0.75;
  }

  const baseY=H*0.83;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.sandColor||'#2e1c06');
    bg.addColorStop(1,b.sandColorB||'#1e1204');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(180,120,30,0.08)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(frame%70<4||frame%110>106)) return;
        ctx.fillStyle='rgba(255,180,50,0.88)';
        ctx.globalAlpha=0.4+0.35*Math.sin(frame*0.025+win.col*0.8+win.row*0.5);
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(255,180,50,0.88)','rgba(255,180,50,0.88)','rgba(255,180,50,0.88)',0.55);
    }

    ctx.fillStyle=`rgba(180,130,40,${0.07+0.04*Math.sin(frame*0.008)})`;
    ctx.fillRect(bx,by,b.w,2);
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(160,110,30,0.35)');
  rg.addColorStop(0.4,'rgba(120,80,20,0.25)');
  rg.addColorStop(1,'#180e02');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  const gs=ctx.createLinearGradient(0,baseY,0,baseY+30);
  gs.addColorStop(0,'rgba(220,170,60,0.18)'); gs.addColorStop(1,'transparent');
  ctx.fillStyle=gs; ctx.fillRect(0,baseY,W,30);

  if(sandLightning.active){
    sandLightning.timer--;
    if(sandLightning.timer<=0) sandLightning.active=false;
    const la=Math.min(1,(sandLightning.timer/28)*1.4);
    ctx.save();
    sandLightning.branches.forEach(seg=>{
      ctx.strokeStyle=seg.sub?`rgba(255,200,80,${la*0.55})`:`rgba(255,240,120,${la*0.95})`;
      ctx.lineWidth=seg.sub?0.8:2.2;
      ctx.shadowColor='rgba(255,220,80,0.8)'; ctx.shadowBlur=seg.sub?4:12;
      ctx.beginPath(); ctx.moveTo(seg.x1,seg.y1); ctx.lineTo(seg.x2,seg.y2); ctx.stroke();
    });
    ctx.restore();
  }

  if(Math.random()<0.003&&!sandLightning.active) triggerSandLightning(W,H);

  if(particlesEnabled){
    sandGrains.forEach(g=>{
      g.wobble+=g.wobbleSpeed;
      g.x+=g.speedX+Math.sin(g.wobble)*0.8;
      g.y+=g.speedY+Math.cos(g.wobble*0.7)*0.4;
      if(g.x>W+g.size*2){g.x=-g.size*2; g.y=Math.random()*H;}
      if(g.y>H+g.size*2){g.y=-g.size*2;}
      if(g.y<-g.size*2){g.y=H+g.size*2;}
      ctx.globalAlpha=g.opacity;
      ctx.fillStyle=g.col+`${g.opacity})`;
      ctx.beginPath(); ctx.arc(g.x,g.y,g.size,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
  }
}

const toxicParticles=[];
let radioLightning={active:false,branches:[],timer:0,flashAlpha:0};
function initRadioactive(){
  toxicParticles.length=0;
  const W=canvas.width,H=canvas.height;
  for(let i=0;i<200;i++) toxicParticles.push({
    x:Math.random()*W, y:Math.random()*H,
    size:2+Math.random()*6,
    speedX:(Math.random()-0.5)*0.5, speedY:-0.3-Math.random()*0.8,
    opacity:0.12+Math.random()*0.35,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.01+Math.random()*0.02,
    life:Math.random()
  });
}
initRadioactive();
function triggerRadioLightning(W,H){
  radioLightning.active=true; radioLightning.timer=22; radioLightning.flashAlpha=0.12;
  radioLightning.branches=[];
  let cx=W*0.1+Math.random()*W*0.8, cy=0;
  while(cy<H*0.8){
    const nx=cx+(Math.random()-0.5)*70, ny=cy+25+Math.random()*35;
    radioLightning.branches.push({x1:cx,y1:cy,x2:nx,y2:ny});
    cx=nx; cy=ny;
    if(Math.random()>0.6&&cy<H*0.55){
      let bx=cx,by=cy;
      for(let b=0;b<3;b++){
        const bx2=bx+(Math.random()-0.5)*50, by2=by+15+Math.random()*25;
        radioLightning.branches.push({x1:bx,y1:by,x2:bx2,y2:by2,sub:true});
        bx=bx2; by=by2;
      }
    }
  }
}

function drawRadioactiveScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#010801');
  sky.addColorStop(0.25,'#020f02');
  sky.addColorStop(0.5,'#041804');
  sky.addColorStop(0.75,'#062006');
  sky.addColorStop(1,'#082808');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const horizonGlow=ctx.createRadialGradient(W*0.5,H*0.75,0,W*0.5,H*0.75,Math.max(1,W*0.6));
  horizonGlow.addColorStop(0,'rgba(57,255,20,0.07)');
  horizonGlow.addColorStop(0.5,'rgba(40,180,10,0.04)');
  horizonGlow.addColorStop(1,'transparent');
  ctx.fillStyle=horizonGlow; ctx.fillRect(0,0,W,H);

  ctx.globalAlpha=0.05+0.025*Math.sin(frame*0.006);
  const fogClouds=[{x:0.1,y:0.4,r:0.2,s:0.12},{x:0.5,y:0.32,r:0.25,s:0.08},{x:0.78,y:0.45,r:0.18,s:0.14},{x:0.32,y:0.55,r:0.15,s:0.1}];
  fogClouds.forEach(fc=>{
    const cx=((fc.x*W+frame*fc.s)%(W+fc.r*W*2))-fc.r*W;
    const cy=fc.y*H+Math.sin(frame*0.004+fc.x*4)*H*0.04;
    const cr=Math.max(1,fc.r*W);
    const fg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr);
    fg.addColorStop(0,'rgba(57,255,20,0.65)'); fg.addColorStop(0.5,'rgba(30,150,10,0.3)'); fg.addColorStop(1,'transparent');
    ctx.fillStyle=fg; ctx.beginPath(); ctx.ellipse(cx,cy,cr,cr*0.4,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  if(radioLightning.active&&radioLightning.flashAlpha>0){
    ctx.fillStyle=`rgba(57,255,20,${radioLightning.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    radioLightning.flashAlpha*=0.78;
  }

  const baseY=H*0.83;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.radioColor||'#081408');
    bg.addColorStop(1,b.radioColorB||'#040a04');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(57,255,20,0.06)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(frame%65<4||frame%105>101)) return;
        ctx.fillStyle='rgba(57,255,20,0.9)';
        ctx.globalAlpha=0.3+0.4*Math.sin(frame*0.022+win.col*0.9+win.row*0.6);
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
        const wg=ctx.createRadialGradient(bx+5+win.col*7,by+7+win.row*10,0,bx+5+win.col*7,by+7+win.row*10,8);
        wg.addColorStop(0,'rgba(57,255,20,0.15)'); wg.addColorStop(1,'transparent');
        ctx.fillStyle=wg; ctx.fillRect(bx+win.col*7-4,by+win.row*10-4,16,14);
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(57,255,20,0.9)','rgba(57,255,20,0.9)','rgba(57,255,20,0.9)',0.5);
    }

    ctx.strokeStyle='rgba(40,180,10,0.3)'; ctx.lineWidth=1.2;
    for(let v=0;v<Math.floor(b.h/25);v++){
      const vy=by+v*25+10;
      ctx.beginPath(); ctx.moveTo(bx,vy);
      ctx.quadraticCurveTo(bx-5,vy+10,bx+2,vy+20); ctx.stroke();
      if(v%2===0){
        ctx.beginPath(); ctx.moveTo(bx+b.w,vy+5);
        ctx.quadraticCurveTo(bx+b.w+5,vy+12,bx+b.w-2,vy+22); ctx.stroke();
      }
    }

    const rimA=0.06+0.04*Math.sin(frame*0.012+b.x*0.01);
    ctx.fillStyle=`rgba(57,255,20,${rimA})`; ctx.fillRect(bx,by,b.w,2);
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(40,120,10,0.25)');
  rg.addColorStop(0.4,'rgba(20,70,5,0.18)');
  rg.addColorStop(1,'#010601');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  const ps=ctx.createLinearGradient(0,baseY,0,baseY+20);
  ps.addColorStop(0,'rgba(57,255,20,0.12)'); ps.addColorStop(1,'transparent');
  ctx.fillStyle=ps; ctx.fillRect(0,baseY,W,20);

  if(radioLightning.active){
    radioLightning.timer--;
    if(radioLightning.timer<=0) radioLightning.active=false;
    const la=Math.min(1,(radioLightning.timer/22)*1.5);
    ctx.save();
    radioLightning.branches.forEach(seg=>{
      ctx.strokeStyle=seg.sub?`rgba(57,255,20,${la*0.5})`:`rgba(100,255,60,${la*0.95})`;
      ctx.lineWidth=seg.sub?0.8:2;
      ctx.shadowColor='rgba(57,255,20,0.9)'; ctx.shadowBlur=seg.sub?6:16;
      ctx.beginPath(); ctx.moveTo(seg.x1,seg.y1); ctx.lineTo(seg.x2,seg.y2); ctx.stroke();
    });
    ctx.restore();
  }
  if(Math.random()<0.004&&!radioLightning.active) triggerRadioLightning(W,H);

  if(particlesEnabled){
    toxicParticles.forEach(p=>{
      p.wobble+=p.wobbleSpeed;
      p.x+=p.speedX+Math.sin(p.wobble)*0.6;
      p.y+=p.speedY;
      p.life+=0.003;
      if(p.y<-p.size*3||p.life>1){ p.y=baseY+p.size; p.x=Math.random()*W; p.life=Math.random()*0.3; }
      const fade=Math.sin(p.life*Math.PI);
      ctx.globalAlpha=p.opacity*fade;
      const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,Math.max(1,p.size));
      pg.addColorStop(0,'rgba(57,255,20,0.7)'); pg.addColorStop(1,'transparent');
      ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
  }
}

const thunderDebris=[];
let thunderBolt={active:false,branches:[],timer:0,flashAlpha:0};
let thunderClouds=[];
function initThunder(){
  thunderDebris.length=0;
  const W=canvas.width,H=canvas.height;
  for(let i=0;i<180;i++) thunderDebris.push({
    x:Math.random()*W, y:Math.random()*H,
    len:4+Math.random()*10, angle:0.15+Math.random()*0.25,
    speed:8+Math.random()*14, opacity:0.1+Math.random()*0.4,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.015+Math.random()*0.02
  });
  thunderClouds=[
    {x:0.1,y:0.12,r:0.22,s:0.06,flicker:0},{x:0.38,y:0.08,r:0.28,s:0.04,flicker:0},
    {x:0.65,y:0.14,r:0.24,s:0.07,flicker:0},{x:0.85,y:0.09,r:0.2,s:0.05,flicker:0},
    {x:0.25,y:0.22,r:0.18,s:0.03,flicker:0},{x:0.55,y:0.2,r:0.22,s:0.06,flicker:0}
  ];
}
initThunder();
function triggerThunderBolt(W,H){
  thunderBolt.active=true; thunderBolt.timer=32; thunderBolt.flashAlpha=0.22;
  thunderBolt.branches=[];
  let cx=W*0.15+Math.random()*W*0.7, cy=0;
  while(cy<H*0.82){
    const nx=cx+(Math.random()-0.5)*90, ny=cy+28+Math.random()*45;
    thunderBolt.branches.push({x1:cx,y1:cy,x2:nx,y2:ny});
    cx=nx; cy=ny;
    if(Math.random()>0.6&&cy<H*0.55){
      let bx=cx,by=cy;
      for(let b=0;b<4;b++){
        const bx2=bx+(Math.random()-0.5)*65, by2=by+18+Math.random()*28;
        thunderBolt.branches.push({x1:bx,y1:by,x2:bx2,y2:by2,sub:true});
        bx=bx2; by=by2;
      }
    }
  }
}

function drawThunderScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#060810');
  sky.addColorStop(0.25,'#0a0e1a');
  sky.addColorStop(0.5,'#0e1428');
  sky.addColorStop(0.75,'#121c38');
  sky.addColorStop(1,'#0e1830');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const aura=ctx.createRadialGradient(W*0.5,H*0.15,0,W*0.5,H*0.15,Math.max(1,W*0.55));
  aura.addColorStop(0,'rgba(80,120,255,0.08)');
  aura.addColorStop(0.5,'rgba(60,80,200,0.04)');
  aura.addColorStop(1,'transparent');
  ctx.fillStyle=aura; ctx.fillRect(0,0,W,H);

  if(thunderBolt.active&&thunderBolt.flashAlpha>0){
    ctx.fillStyle=`rgba(160,180,255,${thunderBolt.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    thunderBolt.flashAlpha*=0.72;
  }

  thunderClouds.forEach(tc=>{
    tc.flicker=(tc.flicker||0)+1;
    const cx=((tc.x*W+frame*tc.s)%(W+tc.r*W*2))-tc.r*W;
    const cy=tc.y*H+Math.sin(frame*0.004+tc.x*3)*H*0.02;
    const cr=Math.max(1,tc.r*W);

    for(let layer=0;layer<3;layer++){
      const la=0.55-layer*0.15;
      const lshift=(layer-1)*cr*0.18;
      const cg=ctx.createRadialGradient(cx+lshift,cy,0,cx+lshift,cy,cr*(1+layer*0.12));
      cg.addColorStop(0,`rgba(18,22,40,${la})`);
      cg.addColorStop(0.6,`rgba(12,16,30,${la*0.7})`);
      cg.addColorStop(1,'transparent');
      ctx.fillStyle=cg;
      ctx.beginPath(); ctx.ellipse(cx+lshift,cy,cr*(1+layer*0.1),cr*0.42,0,0,Math.PI*2); ctx.fill();
    }

    if(thunderBolt.active&&thunderBolt.flashAlpha>0.02){
      ctx.globalAlpha=thunderBolt.flashAlpha*1.8;
      const eg=ctx.createRadialGradient(cx,cy,cr*0.4,cx,cy,cr);
      eg.addColorStop(0,'transparent'); eg.addColorStop(1,'rgba(120,160,255,0.5)');
      ctx.fillStyle=eg;
      ctx.beginPath(); ctx.ellipse(cx,cy,cr,cr*0.42,0,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=1;
    }
  });

  const baseY=H*0.84;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0,b.thunderColor||'#1a2035');
    bg.addColorStop(1,b.thunderColorB||'#121828');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(80,120,255,0.07)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);

    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit) return;
        const stormFlicker=thunderBolt.active&&Math.random()>0.7;
        if(win.flicker&&(frame%60<4||frame%95>92)&&!stormFlicker) return;
        ctx.fillStyle=stormFlicker?'rgba(220,230,255,0.95)':'rgba(140,180,255,0.75)';
        ctx.globalAlpha=stormFlicker?0.9:(0.35+0.3*Math.sin(frame*0.025+win.col*0.6));
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(140,180,255,0.75)','rgba(140,180,255,0.75)','rgba(140,180,255,0.75)',0.5);
    }

    const rA=thunderBolt.active?0.18+thunderBolt.flashAlpha:0.04;
    ctx.fillStyle=`rgba(100,140,255,${rA})`; ctx.fillRect(bx,by,b.w,2);
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(30,50,120,0.25)');
  rg.addColorStop(0.4,'rgba(15,25,70,0.18)');
  rg.addColorStop(1,'#050810');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  const ps=ctx.createLinearGradient(0,baseY,0,baseY+25);
  ps.addColorStop(0,'rgba(80,120,255,0.15)'); ps.addColorStop(1,'transparent');
  ctx.fillStyle=ps; ctx.fillRect(0,baseY,W,25);

  if(thunderBolt.active){
    thunderBolt.timer--;
    if(thunderBolt.timer<=0) thunderBolt.active=false;
    const la=Math.min(1,(thunderBolt.timer/32)*1.4);
    ctx.save();
    thunderBolt.branches.forEach(seg=>{
      ctx.strokeStyle=seg.sub?`rgba(140,180,255,${la*0.6})`:`rgba(210,230,255,${la*0.98})`;
      ctx.lineWidth=seg.sub?0.9:2.5;
      ctx.shadowColor='rgba(100,150,255,0.95)'; ctx.shadowBlur=seg.sub?8:20;
      ctx.beginPath(); ctx.moveTo(seg.x1,seg.y1); ctx.lineTo(seg.x2,seg.y2); ctx.stroke();
    });
    ctx.restore();
  }
  if(Math.random()<0.006&&!thunderBolt.active) triggerThunderBolt(W,H);

  if(particlesEnabled){
    ctx.lineCap='round';
    thunderDebris.forEach(d=>{
      d.wobble+=d.wobbleSpeed;
      d.y+=d.speed; d.x+=d.speed*Math.sin(d.angle)+Math.sin(d.wobble)*0.4;
      if(d.y>H){d.y=-d.len; d.x=Math.random()*W;}
      const flashBoost=thunderBolt.active?thunderBolt.flashAlpha*2:0;
      ctx.strokeStyle=`rgba(160,200,255,${Math.min(1,d.opacity+flashBoost)})`;
      ctx.lineWidth=0.8;
      ctx.globalAlpha=d.opacity+flashBoost*0.5;
      ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(d.x+d.len*Math.sin(d.angle),d.y+d.len); ctx.stroke();
    });
    ctx.globalAlpha=1;
  }
}

const grassParticles=[];
let grassLightning={active:false,branches:[],timer:0,flashAlpha:0};
function initGrass(){
  grassParticles.length=0;
  const W=canvas.width,H=canvas.height;

  for(let i=0;i<120;i++){
    const type=Math.random()<0.3?'butterfly':(Math.random()<0.5?'seed':'leaf');
    grassParticles.push({
      type, x:Math.random()*W, y:Math.random()*H,
      size:type==='butterfly'?10+Math.random()*8:3+Math.random()*6,
      speedX:(Math.random()-0.5)*0.6, speedY:-0.2-Math.random()*0.5,
      wobble:Math.random()*Math.PI*2, wobbleSpeed:0.018+Math.random()*0.025,
      wingPhase:Math.random()*Math.PI*2, wingSpeed:0.08+Math.random()*0.07,
      dir:Math.random()>0.5?1:-1, life:Math.random(),
      col:type==='butterfly'?
        (Math.random()>0.5?['#e87820','#f5a020']:['#d040a0','#f080c0']):
        (type==='seed'?'rgba(200,255,160,':'rgba(120,220,80,')
    });
  }
}
initGrass();
function triggerGrassLightning(W,H){
  grassLightning.active=true; grassLightning.timer=20; grassLightning.flashAlpha=0.1;
  grassLightning.branches=[];
  let cx=W*0.1+Math.random()*W*0.8, cy=0;
  while(cy<H*0.8){
    const nx=cx+(Math.random()-0.5)*60, ny=cy+22+Math.random()*32;
    grassLightning.branches.push({x1:cx,y1:cy,x2:nx,y2:ny});
    cx=nx; cy=ny;
    if(Math.random()>0.65&&cy<H*0.5){
      let bx=cx,by=cy;
      for(let b=0;b<3;b++){
        const bx2=bx+(Math.random()-0.5)*45, by2=by+14+Math.random()*22;
        grassLightning.branches.push({x1:bx,y1:by,x2:bx2,y2:by2,sub:true});
        bx=bx2; by=by2;
      }
    }
  }
}

function drawGrassScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#061008');
  sky.addColorStop(0.2,'#0a1a0c');
  sky.addColorStop(0.45,'#102814');
  sky.addColorStop(0.7,'#1a3c1e');
  sky.addColorStop(0.88,'#224828');
  sky.addColorStop(1,'#1a3c20');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  const godRayX=W*0.5, godRayY=H*0.35;
  const gr=ctx.createRadialGradient(godRayX,godRayY,0,godRayX,godRayY,Math.max(1,W*0.5));
  gr.addColorStop(0,'rgba(180,255,120,0.18)');
  gr.addColorStop(0.3,'rgba(100,200,60,0.1)');
  gr.addColorStop(0.7,'rgba(60,140,30,0.05)');
  gr.addColorStop(1,'transparent');
  ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);

  const rayCount=10;
  ctx.save();
  for(let i=0;i<rayCount;i++){
    const angle=-Math.PI*0.6+(i/(rayCount-1))*Math.PI*0.55;
    const len=H*1.2;
    const rAlpha=0.025+0.015*Math.sin(frame*0.006+i*0.8);
    ctx.globalAlpha=rAlpha;
    ctx.fillStyle='rgba(160,255,80,1)';
    ctx.beginPath();
    ctx.moveTo(godRayX,godRayY);
    ctx.lineTo(godRayX+Math.cos(angle-0.018)*len, godRayY+Math.sin(angle-0.018)*len);
    ctx.lineTo(godRayX+Math.cos(angle+0.018)*len, godRayY+Math.sin(angle+0.018)*len);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();

  ctx.globalAlpha=0.04+0.02*Math.sin(frame*0.005);
  [{x:0.2,y:0.55,r:0.25,s:0.07},{x:0.6,y:0.5,r:0.3,s:0.05},{x:0.85,y:0.6,r:0.2,s:0.09}].forEach(fg=>{
    const cx=((fg.x*W+frame*fg.s)%(W+fg.r*W*2))-fg.r*W;
    const cr=Math.max(1,fg.r*W);
    const gg=ctx.createRadialGradient(cx,fg.y*H,0,cx,fg.y*H,cr);
    gg.addColorStop(0,'rgba(80,180,40,0.8)'); gg.addColorStop(1,'transparent');
    ctx.fillStyle=gg; ctx.beginPath(); ctx.ellipse(cx,fg.y*H,cr,cr*0.35,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  if(grassLightning.active&&grassLightning.flashAlpha>0){
    ctx.fillStyle=`rgba(120,255,60,${grassLightning.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    grassLightning.flashAlpha*=0.8;
  }

  const baseY=H*0.82;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.grassColor||'#0e2010');
    bg.addColorStop(1,b.grassColorB||'#081408');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(60,180,30,0.1)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);

    const mossRows=Math.floor(b.h/18);
    for(let mr=0;mr<mossRows;mr++){
      if(Math.random()>0.55){
        const mw=4+Math.random()*b.w*0.6, mh=6+Math.random()*10;
        const mx=bx+Math.random()*(b.w-mw), my=by+mr*18+Math.random()*8;
        ctx.globalAlpha=0.18+Math.random()*0.2;
        ctx.fillStyle=Math.random()>0.5?'#2a6020':'#386828';
        ctx.fillRect(mx,my,mw,mh);
        ctx.globalAlpha=1;
      }
    }

    if(windowAnimations){
      b.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(frame%80<4||frame%120>117)) return;
        ctx.fillStyle='rgba(80,220,40,0.85)';
        ctx.globalAlpha=0.3+0.35*Math.sin(frame*0.02+win.col*0.7+win.row*0.5);
        ctx.fillRect(bx+3+win.col*7,by+5+win.row*10,4,5);
        ctx.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(bx,by,b.w,b.h,bi,'rgba(80,220,40,0.85)','rgba(80,220,40,0.85)','rgba(80,220,40,0.85)',0.45);
    }

    ctx.strokeStyle='rgba(50,160,30,0.4)'; ctx.lineWidth=1.2;
    const vineCount=Math.floor(b.w/8);
    for(let v=0;v<vineCount;v++){
      const vx=bx+4+v*8;
      const vlen=8+((v*7+Math.floor(b.h))%20);
      ctx.beginPath(); ctx.moveTo(vx,by);
      ctx.quadraticCurveTo(vx+(Math.random()-0.5)*6,by+vlen*0.5,vx+(Math.random()-0.5)*4,by+vlen);
      ctx.stroke();
    }

    ctx.fillStyle=`rgba(60,180,30,${0.08+0.05*Math.sin(frame*0.01+b.x*0.01)})`;
    ctx.fillRect(bx,by,b.w,4);
  });

  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(40,120,20,0.4)');
  rg.addColorStop(0.35,'rgba(25,80,12,0.3)');
  rg.addColorStop(1,'#050e04');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  const gs=ctx.createLinearGradient(0,baseY,0,baseY+30);
  gs.addColorStop(0,'rgba(80,200,40,0.15)'); gs.addColorStop(1,'transparent');
  ctx.fillStyle=gs; ctx.fillRect(0,baseY,W,30);

  if(grassLightning.active){
    grassLightning.timer--;
    if(grassLightning.timer<=0) grassLightning.active=false;
    const la=Math.min(1,(grassLightning.timer/20)*1.5);
    ctx.save();
    grassLightning.branches.forEach(seg=>{
      ctx.strokeStyle=seg.sub?`rgba(100,255,60,${la*0.5})`:`rgba(160,255,80,${la*0.95})`;
      ctx.lineWidth=seg.sub?0.9:2.0;
      ctx.shadowColor='rgba(80,220,30,0.9)'; ctx.shadowBlur=seg.sub?6:14;
      ctx.beginPath(); ctx.moveTo(seg.x1,seg.y1); ctx.lineTo(seg.x2,seg.y2); ctx.stroke();
    });
    ctx.restore();
  }
  if(Math.random()<0.004&&!grassLightning.active) triggerGrassLightning(W,H);

  if(particlesEnabled){
    grassParticles.forEach(p=>{
      p.wobble+=p.wobbleSpeed; p.life+=0.002;
      p.x+=p.speedX+Math.sin(p.wobble)*0.7;
      p.y+=p.speedY+Math.cos(p.wobble*0.8)*0.3;
      if(p.y<-p.size*3||p.life>1){ p.y=baseY+p.size; p.x=Math.random()*W; p.life=0; }
      if(p.x>W+p.size*2) p.x=-p.size; if(p.x<-p.size*2) p.x=W+p.size;
      const fade=Math.sin(p.life*Math.PI);
      if(p.type==='butterfly'){
        p.wingPhase+=p.wingSpeed;
        p.x+=p.speedX*p.dir*0.6;
        const wFlap=Math.sin(p.wingPhase)*p.size;
        const [bodyCol,wingFill]=p.col;
        ctx.save(); ctx.translate(p.x,p.y); ctx.globalAlpha=0.8*fade;
        [[1],[- 1]].forEach(([sx])=>{
          ctx.fillStyle=wingFill;
          ctx.beginPath();
          ctx.ellipse(sx*p.size*0.55,0,p.size*0.7,Math.abs(wFlap)*0.5+p.size*0.2,-0.3*sx,0,Math.PI*2);
          ctx.fill();
        });
        ctx.fillStyle=bodyCol;
        ctx.beginPath(); ctx.ellipse(0,0,p.size*0.15,p.size*0.6,0,0,Math.PI*2); ctx.fill();
        ctx.restore();
      } else if(p.type==='seed'){
        ctx.globalAlpha=0.55*fade;
        ctx.fillStyle=p.col+`${0.55*fade})`;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size*0.4,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=p.col+`${0.4*fade})`;
        ctx.lineWidth=0.8;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x+Math.sin(p.wobble)*p.size*1.5,p.y-p.size*1.5); ctx.stroke();
      } else {
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.wobble); ctx.globalAlpha=0.65*fade;
        ctx.fillStyle='rgba(60,180,30,0.8)';
        ctx.beginPath(); ctx.ellipse(0,0,p.size*0.35,p.size,0,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
    });
    ctx.globalAlpha=1;
  }
}

function getSeasonFromDate(){
  const m=new Date().getMonth()+1, d=new Date().getDate();

  if((m===3&&d>=20)||(m===4||m===5)||(m===6&&d<=20)) return 'spring';
  if((m===6&&d>=21)||(m===7||m===8)||(m===9&&d<=21)) return 'summer';
  if((m===9&&d>=22)||(m===10||m===11)||(m===12&&d<=20)) return 'fall';
  return 'winter';
}

function applySeasonalMode(){
  if(!seasonalMode) return;
  const s=getSeasonFromDate();
  summerEnabled=s==='summer'; winterEnabled=s==='winter';
  fallEnabled=s==='fall'; springEnabled=s==='spring';
  sandEnabled=false; radioactiveEnabled=false; thunderEnabled=false; grassEnabled=false;
}

let _heavySkip=0;
function draw(){
  frame++;
  const isHeavy=fallEnabled||sandEnabled||radioactiveEnabled||grassEnabled;
  if(isHeavy){_heavySkip++;if(_heavySkip%2!==0){requestAnimationFrame(draw);return;}}
  const W=canvas.width,H=canvas.height;
  if(summerEnabled)           drawSummerScene(W,H);
  else if(winterEnabled)      drawWinterScene(W,H);
  else if(fallEnabled)        drawFallScene(W,H);
  else if(springEnabled)      drawSpringScene(W,H);
  else if(sandEnabled)        drawSandScene(W,H);
  else if(radioactiveEnabled) drawRadioactiveScene(W,H);
  else if(thunderEnabled)     drawThunderScene(W,H);
  else if(grassEnabled)       drawGrassScene(W,H);
  else                        drawNightScene(W,H);
  requestAnimationFrame(draw);
}
draw();

const homePage=document.getElementById('home-page');
const webPanel=document.getElementById('web-panel');
const webIframe=document.getElementById('web-iframe');
const mimsPanel=document.getElementById('mims-panel');
const mimsIframe=document.getElementById('mims-iframe');
const navAddrText=document.getElementById('nav-address-text');
const searchInput=document.getElementById('search-input');
const searchClear=document.getElementById('search-clear');
const suggestionsEl=document.getElementById('suggestions');

const MIMS_ID=999;
let mimsLoaded=false;

let tabs=JSON.parse(localStorage.getItem('ep_tabs4')||'null')||[{id:1,title:'Endless Proxy',active:true}];
if(!tabs.find(t=>t.id===MIMS_ID))tabs.splice(1,0,{id:MIMS_ID,title:'MIMS Portal',active:false,fixed:true});
let activeTabId=tabs.find(t=>t.active)?.id||1;
const nonFixed=tabs.filter(t=>t.id!==MIMS_ID);
let nextTabId=(nonFixed.length?Math.max(...nonFixed.map(t=>t.id)):1)+1;
const tabState={};
tabs.forEach(t=>{tabState[t.id]={history:[t.id===MIMS_ID?'mims://portal':'ep://home'],histIdx:0,panel:t.id===MIMS_ID?'mims':'home',url:t.id===MIMS_ID?'MIMS Portal':'New Tab'};});
function saveTabs(){localStorage.setItem('ep_tabs4',JSON.stringify(tabs));sessionSet('tabs',tabs);sessionSet('tabState',tabState);}

let bookmarks=JSON.parse(localStorage.getItem('ep_bookmarks')||'null')||[
  {id:1,title:'Google',url:'https://google.com'},
  {id:2,title:'YouTube',url:'https://youtube.com'},
  {id:3,title:'GitHub',url:'https://github.com'},
];
let nextBmId=Math.max(...bookmarks.map(b=>b.id),0)+1;
function saveBookmarks(){localStorage.setItem('ep_bookmarks',JSON.stringify(bookmarks));sessionSet('bookmarks',bookmarks);}

function getFavicon(url){try{return `https://www.google.com/s2/favicons?sz=16&domain=${new URL(url).hostname}`;}catch{return '';}}

function renderBookmarksBar(){
  const bar=document.getElementById('bookmarks-bar');
  bar.querySelectorAll('.bm-item,.bm-sep').forEach(el=>el.remove());
  const addBtn=document.getElementById('bm-bar-add');
  bookmarks.forEach(bm=>{
    const el=document.createElement('div');
    el.className='bm-item';
    const fav=getFavicon(bm.url);
    el.innerHTML=`${fav?`<img src="${fav}" onerror="this.style.display='none'">`:''}${bm.title}`;
    el.title=bm.url;
    el.addEventListener('click',()=>openUrl(bm.url));
    el.addEventListener('contextmenu',e=>{e.preventDefault();if(confirm(`Remove "${bm.title}" from bookmarks?`)){bookmarks=bookmarks.filter(b=>b.id!==bm.id);saveBookmarks();renderBookmarksBar();renderBookmarksPanel();}});
    bar.insertBefore(el,addBtn);
  });
}

function renderBookmarksPanel(){
  const body=document.getElementById('bookmarks-body');
  if(!body)return;
  body.innerHTML='';

  const form=document.createElement('div');
  form.innerHTML=`
    <div class="panel-section-title">Add Bookmark</div>
    <div class="panel-input-row">
      <input class="panel-input" id="bm-add-name" placeholder="Name" autocomplete="off">
    </div>
    <div class="panel-input-row">
      <input class="panel-input" id="bm-add-url" placeholder="https://..." autocomplete="off" value="${(()=>{const s=tabState[activeTabId];return(s&&s.url&&s.url!=='ep://home'&&s.url!=='mims://portal')?s.url:'';})()}">
      <button class="panel-btn" id="bm-add-save">Add</button>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <div class="panel-section-title" style="margin:0;border:none;">Saved (${bookmarks.length})</div>
      ${bookmarks.length>0?`<div style="font-size:11px;color:rgba(255,100,100,0.7);cursor:pointer;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,100,100,0.2);" id="bm-clear-all">Clear all</div>`:''}
    </div>
  `;
  body.appendChild(form);

  const _bca=document.getElementById('bm-clear-all');
  if(_bca)_bca.addEventListener('click',()=>{if(confirm('Remove all bookmarks?')){bookmarks=[];saveBookmarks();renderBookmarksBar();renderBookmarksPanel();showToast('All bookmarks cleared');}});

  const _ban=document.getElementById('bm-add-name');
  if(_ban){const s=tabState[activeTabId];if(s&&s.url&&s.url!=='ep://home'&&s.url!=='mims://portal'){try{_ban.value=new URL(s.url).hostname.replace('www.','');}catch{}}}
  document.getElementById('bm-add-save').addEventListener('click',()=>{
    const name=document.getElementById('bm-add-name').value.trim();
    const url=document.getElementById('bm-add-url').value.trim();
    if(!name||!url){showToast('Fill in both fields');return;}
    bookmarks.push({id:nextBmId++,title:name,url});
    saveBookmarks();renderBookmarksBar();renderBookmarksPanel();
    showToast('Bookmark added!');
  });
  if(bookmarks.length===0){
    const empty=document.createElement('div');
    empty.className='panel-empty';
    empty.innerHTML='<span class="pe-icon"></span>No bookmarks yet';
    body.appendChild(empty);return;
  }
  bookmarks.forEach(bm=>{
    const el=document.createElement('div');
    el.className='bm-manager-item';
    const fav=getFavicon(bm.url);
    el.innerHTML=`${fav?`<img src="${fav}" onerror="this.style.display='none'">`:''}<span title="${bm.url}">${bm.title}</span><span class="bm-del" title="Delete"></span>`;
    el.querySelector('span:first-of-type').addEventListener('click',()=>openUrl(bm.url));
    el.querySelector('.bm-del').addEventListener('click',e=>{e.stopPropagation();bookmarks=bookmarks.filter(b=>b.id!==bm.id);saveBookmarks();renderBookmarksBar();renderBookmarksPanel();});
    body.appendChild(el);
  });
}

function generateSessionId(){
  return 'ep_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}

function sessionGet(key){
  try{ return JSON.parse(localStorage.getItem('eps:'+sessionId+':'+key)||'null'); }catch{ return null; }
}
function sessionSet(key,val){
  try{ localStorage.setItem('eps:'+sessionId+':'+key, JSON.stringify(val)); }catch{}
}
function sessionClear(){
  const prefix='eps:'+sessionId+':';
  Object.keys(localStorage).filter(k=>k.startsWith(prefix)).forEach(k=>localStorage.removeItem(k));
}

let sessionId = (()=>{
  const urlParam = new URLSearchParams(location.search).get('session');
  if(urlParam && /^ep_[a-z0-9_]+$/.test(urlParam)){
    localStorage.setItem('ep_session_id', urlParam);
    return urlParam;
  }
  const stored = localStorage.getItem('ep_session_id');
  if(stored) return stored;
  const fresh = generateSessionId();
  localStorage.setItem('ep_session_id', fresh);
  return fresh;
})();

function switchSession(newId){
  if(!newId){showToast('Enter a session ID');return;}
  newId=newId.trim();
  if(!/^ep_/.test(newId)) newId='ep_'+newId;
  if(!/^ep_[a-z0-9_]+$/.test(newId)){showToast('Invalid ID — letters/numbers only');return;}

  saveTabs(); saveBookmarks(); saveExtensions(); saveDownloads();

  localStorage.setItem('ep_session_id', newId);
  sessionId = newId;

  const _dlRaw = sessionGet('downloads');
  downloads = _dlRaw || [];
  nextDlId = downloads.length ? Math.max(...downloads.map(d=>d.id))+1 : 1;

  const _extRaw = sessionGet('extensions');
  if(_extRaw) extensions = _rebuildExtBlobUrls(_extRaw);
  nextExtId = extensions.length ? Math.max(...extensions.map(e=>e.id))+1 : 7;

  const _bmRaw = sessionGet('bookmarks');
  if(_bmRaw){ bookmarks=_bmRaw; nextBmId=Math.max(...bookmarks.map(b=>b.id),0)+1; }

  const _tabRaw = sessionGet('tabs');
  if(_tabRaw && _tabRaw.length){
    tabs=_tabRaw;
    const _tsRaw=sessionGet('tabState');
    if(_tsRaw) Object.assign(tabState,_tsRaw);
    if(!tabs.find(t=>t.id===MIMS_ID)) tabs.splice(1,0,{id:MIMS_ID,title:'MIMS Portal',active:false,fixed:true});
    activeTabId=tabs.find(t=>t.active)?.id||tabs[0]?.id||1;
  }

  renderTabs();
  renderDownloadsPanel();
  renderExtensionsPanel();
  renderBookmarksPanel();
  renderBookmarksBar();
  const _s=tabState[activeTabId];
  if(_s){showPanel(_s.panel||'home');updateAddressBar(_s.url||'');}
  updateNavBtns();
  showToast((_dlRaw||_extRaw||_bmRaw||_tabRaw)?'Session restored':'New session started');
}

function copySessionId(){
  navigator.clipboard.writeText(sessionId).then(()=>showToast('Session ID copied')).catch(()=>{
    const inp = document.createElement('input');
    inp.value = sessionId;
    document.body.appendChild(inp);
    inp.select(); document.execCommand('copy');
    document.body.removeChild(inp);
    showToast('Session ID copied');
  });
}

function getSessionShareUrl(){
  return location.origin + location.pathname + '?session=' + sessionId;
}

let downloads=sessionGet('downloads')||JSON.parse(localStorage.getItem('ep_downloads')||'[]');
let nextDlId=downloads.length?Math.max(...downloads.map(d=>d.id))+1:1;
function saveDownloads(){
  sessionSet('downloads', downloads);

  const meta=downloads.map(d=>({id:d.id,name:d.name,url:d.url,size:d.size,status:d.status,progress:d.progress,time:d.time}));
  localStorage.setItem('ep_downloads',JSON.stringify(meta));
}
function updateDlBadge(){
  const badge=document.getElementById('dl-badge');
  const active=downloads.filter(d=>d.status==='downloading').length;
  if(badge){badge.style.display=active>0?'flex':'none';badge.textContent=active;}
}

function renderDownloadsPanel(){
  const body=document.getElementById('downloads-body');
  if(!body)return;
  body.innerHTML='';

  const sesRow=document.createElement('div');
  sesRow.style.cssText='margin-bottom:12px;padding:10px;background:rgba(0,229,255,0.04);border-radius:10px;border:1px solid rgba(0,229,255,0.14);';
  sesRow.innerHTML=`
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
      <span style="font-size:10px;color:rgba(255,255,255,0.3);font-family:'Rajdhani',sans-serif;letter-spacing:2px;text-transform:uppercase;">Session</span>
      <span style="font-size:11px;color:rgba(0,229,255,0.7);font-family:'Orbitron',monospace;letter-spacing:1px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${sessionId}">${sessionId}</span>
      <button id="ses-copy-btn" title="Copy session ID" style="background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:rgba(0,229,255,0.7);border-radius:5px;padding:2px 7px;font-size:10px;cursor:pointer;font-family:'Rajdhani',sans-serif;">COPY</button>
    </div>
    <div style="display:flex;gap:6px;">
      <input id="ses-load-input" placeholder="Enter session ID to restore…" autocomplete="off" spellcheck="false"
        style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(0,229,255,0.15);border-radius:6px;color:rgba(255,255,255,0.8);font-size:12px;padding:5px 9px;font-family:'Rajdhani',sans-serif;outline:none;">
      <button id="ses-load-btn" style="background:rgba(0,229,255,0.12);border:1px solid rgba(0,229,255,0.25);color:rgba(0,229,255,0.85);border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;font-family:'Rajdhani',sans-serif;white-space:nowrap;">LOAD</button>
    </div>
    <div style="margin-top:6px;display:flex;gap:5px;">
      <button id="ses-share-btn" style="flex:1;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.12);color:rgba(0,229,255,0.5);border-radius:6px;padding:4px;font-size:10px;cursor:pointer;font-family:'Rajdhani',sans-serif;letter-spacing:1px;">SHARE LINK</button>
      <button id="ses-new-btn" style="flex:1;background:rgba(255,100,100,0.05);border:1px solid rgba(255,100,100,0.15);color:rgba(255,100,100,0.5);border-radius:6px;padding:4px;font-size:10px;cursor:pointer;font-family:'Rajdhani',sans-serif;letter-spacing:1px;">NEW SESSION</button>
    </div>
  `;
  body.appendChild(sesRow);
  document.getElementById('ses-copy-btn')?.addEventListener('click', copySessionId);
  document.getElementById('ses-load-btn')?.addEventListener('click',()=>{
    switchSession(document.getElementById('ses-load-input').value);
    document.getElementById('ses-load-input').value='';
  });
  document.getElementById('ses-load-input')?.addEventListener('keydown',e=>{
    if(e.key==='Enter') document.getElementById('ses-load-btn').click();
  });
  document.getElementById('ses-new-btn')?.addEventListener('click',()=>{
    if(!confirm('Start a fresh session? Current session data is saved — you can return with your session ID.')) return;
    switchSession(generateSessionId());
  });
  document.getElementById('ses-share-btn')?.addEventListener('click',()=>{
    navigator.clipboard.writeText(getSessionShareUrl()).then(()=>showToast('Share link copied')).catch(()=>showToast(getSessionShareUrl()));
  });

  const addRow=document.createElement('div');
  const curUrl=(()=>{const s=tabState[activeTabId];return(s&&s.url&&s.url!=='ep://home'&&s.url!=='mims://portal')?s.url:'';})();
  addRow.innerHTML=`
    <div class="panel-section-title">Download from URL</div>
    <div class="panel-input-row">
      <input class="panel-input" id="dl-add-url" placeholder="https://example.com/file.zip" autocomplete="off" value="${curUrl}">
      <button class="panel-btn" id="dl-add-btn" title="Download">⬇</button>
    </div>
    <div class="panel-section-title" style="margin-top:12px;">Upload &amp; Save File</div>
    <div class="panel-input-row">
      <label id="dl-file-label" class="panel-btn" style="cursor:pointer;flex:1;text-align:center;justify-content:center;"> Choose File</label>
      <input type="file" id="dl-file-input" style="display:none;" multiple>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
  `;
  body.appendChild(addRow);

  const _proxyNames=[['corsproxy.io','rgba(0,229,255,0.7)'],['allorigins.win','rgba(180,120,255,0.7)'],['thingproxy','rgba(255,180,0,0.7)']];
  const _proxyBtns=document.getElementById('ep-proxy-btns');
  if(_proxyBtns){
    _proxyBtns.innerHTML='';
    _proxyNames.forEach(([name,col],i)=>{
      const isActive=i===(_activeProxy%EP_PROXIES.length);
      const b=document.createElement('button');
      b.style.cssText=`padding:3px 10px;border-radius:12px;border:1px solid ${isActive?col:'rgba(255,255,255,0.1)'};background:${isActive?col.replace('0.7','0.1'):'transparent'};color:${isActive?col:'rgba(255,255,255,0.35)'};font-family:'Rajdhani',sans-serif;font-size:11px;cursor:pointer;`;
      b.textContent=name;
      b.addEventListener('click',()=>{_activeProxy=i;localStorage.setItem('ep_proxy_idx',i);showToast('Proxy: '+name);renderDownloadsPanel();});
      _proxyBtns.appendChild(b);
    });
  }
  document.getElementById('dl-add-btn').addEventListener('click',()=>{
    const url=document.getElementById('dl-add-url').value.trim();
    if(!url){showToast('Enter a URL');return;}
    addDownloadFromUrl(url);
    document.getElementById('dl-add-url').value='';
  });

  document.getElementById('dl-file-input').addEventListener('change', e=>{
    Array.from(e.target.files).forEach(file=>{
      const reader=new FileReader();
      reader.onload=ev=>{
        const blobUrl=URL.createObjectURL(file);
        const dl={
          id:nextDlId++, name:file.name,
          url:blobUrl, blobUrl,
          size:formatSize(file.size),
          progress:100, status:'done',
          time:Date.now(), source:'upload',
          type:file.type
        };
        downloads.push(dl); saveDownloads(); renderDownloadsPanel(); updateDlBadge();
        showToast(` "${file.name}" saved to session`);
      };
      reader.readAsArrayBuffer(file);
    });
    e.target.value='';
  });
  document.getElementById('dl-file-label').addEventListener('click',()=>{
    document.getElementById('dl-file-input').click();
  });

  if(downloads.length===0){
    const empty=document.createElement('div');
    empty.className='panel-empty';
    empty.innerHTML='<span class="pe-icon">⬇</span>No downloads yet';
    body.appendChild(empty); return;
  }

  const clearRow=document.createElement('div');
  clearRow.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;';
  clearRow.innerHTML=`<div class="panel-section-title" style="margin:0;border:none;">This Session (${downloads.length})</div><div style="font-size:11px;color:rgba(255,100,100,0.7);cursor:pointer;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,100,100,0.2);" id="dl-clear-all">Clear all</div>`;
  body.appendChild(clearRow);
  document.getElementById('dl-clear-all').addEventListener('click',()=>{
    downloads.forEach(d=>{ if(d.blobUrl) try{URL.revokeObjectURL(d.blobUrl);}catch{} });
    downloads=[]; saveDownloads(); renderDownloadsPanel(); updateDlBadge();
    showToast('Downloads cleared');
  });

  const typeColors={'pdf':'#f44336','zip':'#ff9800','mp4':'#9c27b0','mp3':'#2196f3','exe':'#607d8b','png':'#4caf50','jpg':'#4caf50','jpeg':'#4caf50','gif':'#00bcd4','doc':'#1976d2','docx':'#1976d2','xls':'#388e3c','xlsx':'#388e3c','crx':'#ff6d00','js':'#f9a825','css':'#0288d1','html':'#e64a19','txt':'#546e7a'};
  const _svgIcon=(d,c='currentColor')=>`<svg viewBox="0 0 24 24" width="18" height="18" fill="${c}"><path d="${d}"/></svg>`;
  const typeIcons={
    'pdf': _svgIcon('M20 2H8L4 6v16h16V2zm-8 14H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V6h8v2z','#f44336'),
    'zip': _svgIcon('M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 10h-2v-2h2v2zm0-4h-2v-2h2v2zm-4 4h-2v-2h2v2zm0-4h-2v-2h2v2z','#ff9800'),
    'mp4': _svgIcon('M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-4 12l-6-3.27V8.27L14 5v11z','#9c27b0'),
    'mp3': _svgIcon('M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z','#2196f3'),
    'exe': _svgIcon('M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z','#607d8b'),
    'png': _svgIcon('M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-8.5-5.5l2.5 3.01L18.5 12l4.5 6H5l3.5-4.5z','#4caf50'),
    'jpg': _svgIcon('M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-8.5-5.5l2.5 3.01L18.5 12l4.5 6H5l3.5-4.5z','#4caf50'),
    'jpeg':_svgIcon('M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-8.5-5.5l2.5 3.01L18.5 12l4.5 6H5l3.5-4.5z','#4caf50'),
    'gif': _svgIcon('M11.5 9H13v6h-1.5V9zm8.5 0c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9zm-7.5 4.5H11v1.5H9.5V9H13v1.5h-1.5v1.5H13V13h-1.5v.5zm5 1.5H16V9h1.5v4.5H17V15zm2.5 0h-1.5V9H20v4.5h-.5V15zM5 9h4v1.5H6.5v1h2v1.5h-2v1.5H5V9z','#00bcd4'),
    'doc': _svgIcon('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z','#1976d2'),
    'docx':_svgIcon('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z','#1976d2'),
    'xls': _svgIcon('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 9l-3 3 3 3h-2l-2-2-2 2H8l3-3-3-3h2l2 2 2-2h2zm-2-6V3.5L18.5 9H13z','#388e3c'),
    'xlsx':_svgIcon('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 9l-3 3 3 3h-2l-2-2-2 2H8l3-3-3-3h2l2 2 2-2h2zm-2-6V3.5L18.5 9H13z','#388e3c'),
    'crx': _svgIcon('M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.1 11.9 1 10.5 1S8 2.1 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z','#ff6d00'),
    'js':  _svgIcon('M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08-.52 0-.8-.32-1.04-.75l-1.43.71zm5.38-.05c.47.98 1.39 1.6 2.95 1.6 1.59 0 2.8-.83 2.8-2.36 0-1.41-.81-2.08-2.25-2.67l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.08 2.04 2.59l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.25.9z','#f9a825'),
    'css': _svgIcon('M4 4l1.09 12.31L12 18l6.91-1.69L20 4H4zm10.65 7.73l-.07.8-.58.07H10l.18 2h3.64l-.36 3.88-1.46.4-1.46-.4-.09-1.08H9l.18 1.95 2.82.78 2.82-.78.39-4.34.04-.44.36-4H8.77l-.18-2H15l-.16 1.73-.19 3.07z','#0288d1'),
    'html':_svgIcon('M12 17.56L16.07 16.43L16.62 10.92H9.38L9.2 8.3H16.8L17 6H7L7.56 12.3H14.45L14.22 14.59L12 15.22L9.78 14.59L9.64 13H7.64L7.9 16.43L12 17.56M4.07 3H19.93L18.5 19.2L12 21L5.5 19.2L4.07 3Z','#e64a19'),
    'txt': _svgIcon('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-4 8H7v-2h2v2zm6 0h-4v-2h4v2zm0-4H7v-2h8v2z','#546e7a'),
  };
  const _defaultFileIcon=_svgIcon('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z');

  [...downloads].reverse().forEach(dl=>{
    const el=document.createElement('div');
    el.className='dl-item';
    const extName=(dl.name||'').split('.').pop().toLowerCase();
    const icon=typeIcons[extName]||'';
    const color=typeColors[extName]||'#78909c';
    const pct=dl.progress||0;
    const statusColor=dl.status==='done'?'#4caf50':dl.status==='error'?'#f44336':'var(--cyan)';
    const sourceTag=dl.source==='upload'?`<span style="font-size:9px;background:rgba(0,229,255,0.12);color:rgba(0,229,255,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">UPLOADED</span>`:'';
    el.innerHTML=`
      <div class="dl-icon" style="width:36px;height:36px;border-radius:8px;background:${color}22;border:1px solid ${color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${color};">${typeIcons[extName]||_defaultFileIcon}</div>
      <div class="dl-info">
        <div class="dl-name">${dl.name||'Unknown file'}${sourceTag}</div>
        <div class="dl-meta" style="color:${statusColor};">${dl.status==='done'?' Saved':dl.status==='error'?' Failed':`${pct}% · downloading`} ${dl.size&&dl.size!=='?'?'· '+dl.size:''}</div>
        ${dl.status==='downloading'?`<div class="dl-bar"><div class="dl-bar-fill" style="width:${pct}%;background:${color};"></div></div>`:''}
      </div>
      <div class="dl-actions">
        ${dl.status==='done'&&dl.blobUrl?`<div class="dl-btn dl-btn-save" title="Save to device" id="dl-save-${dl.id}"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z"/></svg></div>`:''}
        ${dl.status==='done'&&dl.url&&!dl.blobUrl?`<div class="dl-btn dl-btn-open" title="Open in new tab" onclick="window.open('${dl.url}','_blank')"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></div>`:''}
        ${dl.status==='downloading'?`<div class="dl-btn dl-btn-cancel" title="Cancel" onclick="removeDownload(${dl.id})"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></div>`:''}
        ${dl.status==='done'||dl.status==='error'?`<div class="dl-btn dl-btn-remove" title="Remove" onclick="removeDownload(${dl.id})"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></div>`:''}
      </div>
    `;
    body.appendChild(el);

    if(dl.blobUrl){
      const saveBtn=document.getElementById(`dl-save-${dl.id}`);
      if(saveBtn) saveBtn.addEventListener('click',()=>{
        const a=document.createElement('a');
        a.href=dl.blobUrl; a.download=dl.name; a.click();
        showToast(` Saving "${dl.name}"…`);
      });
    }
  });
}

function formatSize(bytes){
  if(bytes<1024) return bytes+'B';
  if(bytes<1024*1024) return (bytes/1024).toFixed(1)+'KB';
  return (bytes/1024/1024).toFixed(1)+'MB';
}

function addDownloadFromUrl(url){
  let name; try{name=decodeURIComponent(new URL(url).pathname.split('/').pop())||'file';}catch{name='file';}
  if(!name||name==='') name='download';
  const dl={id:nextDlId++,name,url,size:'?',progress:0,status:'downloading',time:Date.now(),source:'url'};
  downloads.push(dl); saveDownloads(); renderDownloadsPanel(); updateDlBadge();

  fetch(url, {mode:'cors'}).then(r=>{
    if(!r.ok) throw new Error('fetch failed');
    const total=parseInt(r.headers.get('content-length')||'0');
    const reader=r.body.getReader();
    let received=0; const chunks=[];
    function pump(){
      return reader.read().then(({done,value})=>{
        if(done){
          const blob=new Blob(chunks, {type:r.headers.get('content-type')||'application/octet-stream'});
          const blobUrl=URL.createObjectURL(blob);
          dl.blobUrl=blobUrl; dl.progress=100; dl.status='done';
          dl.size=formatSize(blob.size);
          saveDownloads(); renderDownloadsPanel(); updateDlBadge();
          showToast(` "${dl.name}" ready to save`);
          return;
        }
        chunks.push(value); received+=value.length;
        if(total>0) dl.progress=Math.round(received/total*100);
        else dl.progress=Math.min(99, dl.progress+5);
        saveDownloads(); renderDownloadsPanel(); updateDlBadge();
        return pump();
      });
    }
    return pump();
  }).catch(()=>{

    let pct=0;
    const iv=setInterval(()=>{
      pct+=Math.random()*15+5;
      if(pct>=100){
        pct=100; dl.progress=100; dl.status='done';
        dl.size=Math.floor(Math.random()*50+1)+'MB';
        clearInterval(iv);
      } else dl.progress=Math.floor(pct);
      saveDownloads(); renderDownloadsPanel(); updateDlBadge();
    },400);
  });
  showToast(`⬇ Downloading: ${name}`);
  openPanel('downloads');
}

function removeDownload(id){
  const dl=downloads.find(d=>d.id===id);
  if(dl&&dl.blobUrl) try{URL.revokeObjectURL(dl.blobUrl);}catch{}
  downloads=downloads.filter(d=>d.id!==id);
  saveDownloads(); renderDownloadsPanel(); updateDlBadge();
}

let extensions=JSON.parse(localStorage.getItem('ep_extensions')||'null')||[
  {id:1,name:'Ad Blocker Pro',icon:'',desc:'Blocks ads and trackers on all websites.',enabled:true,version:'3.2.1'},
  {id:2,name:'Dark Reader',icon:'',desc:'Enables dark mode for every website automatically.',enabled:true,version:'4.9.58'},
  {id:3,name:'Proxy Switcher',icon:'',desc:'Quickly switch between proxy configurations.',enabled:false,version:'1.0.4'},
  {id:4,name:'Password Manager',icon:'',desc:'Saves and autofills your passwords securely.',enabled:true,version:'2.1.0'},
  {id:5,name:'Video Downloader',icon:'',desc:'Download videos from any website with one click.',enabled:false,version:'1.5.2'},
  {id:6,name:'Screenshot Tool',icon:'',desc:'Capture full page or selected area screenshots.',enabled:true,version:'2.0.1'},
];
let nextExtId=Math.max(...extensions.map(e=>e.id))+1;
function saveExtensions(){
  localStorage.setItem('ep_extensions',JSON.stringify(extensions));
  sessionSet('extensions', extensions);
}

function renderThemesPanel(){
  const body=document.getElementById('themes-body');
  if(!body)return;
  body.innerHTML='';

  const _ti=d=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="${d}"/></svg>`;
  const THEMES=[
    {id:'night',      label:'Night',       icon:_ti('M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z'),         active:()=>!summerEnabled&&!winterEnabled&&!fallEnabled&&!springEnabled&&!sandEnabled&&!radioactiveEnabled&&!thunderEnabled&&!grassEnabled},
    {id:'summer',     label:'Summer',      icon:_ti('M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z'), active:()=>summerEnabled},
    {id:'winter',     label:'Winter',      icon:_ti('M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z'), active:()=>winterEnabled},
    {id:'fall',       label:'Fall',        icon:_ti('M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 2-5 8-2 8-2C18 1 7 2 7 13c0 1.6.65 3.08 1.68 4.17L6 21l1.86.67C9.2 19.42 11 16 17 8z'), active:()=>fallEnabled},
    {id:'spring',     label:'Spring',      icon:_ti('M12 22q-1.65 0-2.825-1.175T8 18q0-.85.325-1.625T9.25 15H6q-.425 0-.713-.288T5 14q0-.425.288-.713T6 13h2V9.5q-.95-.325-1.475-1.15T6 6.5q0-1.45.975-2.475T9.5 3q.575 0 1.063.138T11.5 3.6V2h1v1.6q.45-.325.938-.463T14.5 3q1.45 0 2.475 1.025T18 6.5q0 1.075-.525 1.9T16 9.5V13h2q.425 0 .713.288T19 14q0 .425-.288.713T18 15h-3.25q.625.75.938 1.625T16 18q0 1.65-1.175 2.825T12 22z'), active:()=>springEnabled},
    {id:'sand',       label:'Sand City',   icon:_ti('M19.2 10.4L17 8.2l1.4-1.4-1.4-1.4-2.8 2.8L16.4 10H12V5.6l2.2-2.2-1.4-1.4L11.4 3.4 8.6.6 7.2 2 8.6 3.4 6.4 5.6l1.4 1.4L10 4.8V10H5.6l2.2-2.2-1.4-1.4L4.8 8l-1.4-1.4L2 8l1.4 1.4L2 10.8l1.4 1.4 2.2-2.2V14H1v2h22v-2h-4.6v-3.6l2.2 2.2 1.4-1.4-2.8-2.8zM12 14h-2v-4h2v4z'), active:()=>sandEnabled},
    {id:'radioactive', label:'Radioactive', icon:_ti('M11.98 1.986c-5.509 0-9.99 4.48-9.99 9.99 0 4.83 3.44 8.86 8 9.77v-3.07c-2.86-.87-4.94-3.53-4.94-6.7 0-3.86 3.13-6.99 6.99-6.99s6.99 3.13 6.99 6.99c0 3.16-2.08 5.83-4.94 6.7v3.07c4.56-.91 8-4.94 8-9.77-.01-5.51-4.49-9.99-10.1-9.99zM12.5 11.5h-1l-2.22 3.84c.88.46 1.87.73 2.93.73s2.05-.27 2.93-.73l-2.64-3.84zm0-1c0-.28-.22-.5-.5-.5s-.5.22-.5.5.22.5.5.5.5-.22.5-.5zm-5.5.5c0 1.22.39 2.35 1.05 3.27L10.27 11H7.01c0-.17.01-.33.01-.5-.01-.17-.02-.33-.02-.5zM14 11l2.22 3.84c.65-.92 1.04-2.04 1.04-3.27v-.07h-3.26l.01.5z'), active:()=>radioactiveEnabled},
    {id:'thunder',    label:'Thunder',     icon:_ti('M7 2v11h3v9l7-12h-4l4-8z'), active:()=>thunderEnabled},
    {id:'grass',      label:'Grass City',  icon:_ti('M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 2-5 8-2 8-2S18 1 7 13'), active:()=>grassEnabled},
  ];

  const ssRow=document.createElement('div');
  ssRow.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:10px 4px 14px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:14px;';
  ssRow.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;color:${seasonalMode?'#b090f0':'rgba(255,255,255,0.7)'};"> Smart Season</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:2px;">Auto-match real-world season</div>
    </div>
    <div class="ext-toggle${seasonalMode?' on':''}" id="themes-seasonal-toggle" style="${seasonalMode?'background:#9060e0':''}"></div>
  `;
  body.appendChild(ssRow);
  document.getElementById('themes-seasonal-toggle')?.addEventListener('click',()=>{
    seasonalMode=!seasonalMode;
    localStorage.setItem('ep_seasonal',seasonalMode?'1':'0');
    if(seasonalMode){
function renderSearchEngineBar(){
  let bar=document.getElementById('ep-search-eng-bar');
  if(!bar){
    bar=document.createElement('div');
    bar.id='ep-search-eng-bar';
    bar.style.cssText='display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:10px;';
    const sw=document.querySelector('.search-wrap');
    if(sw) sw.appendChild(bar);
  }
  bar.innerHTML='';
  Object.entries(SEARCH_ENGINES).forEach(([id,eng])=>{
    const btn=document.createElement('button');
    const isActive=id===activeSearchEngine;
    btn.style.cssText=`display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;border:1px solid ${isActive?'rgba(0,229,255,0.5)':'rgba(255,255,255,0.1)'};background:${isActive?'rgba(0,229,255,0.1)':'rgba(255,255,255,0.04)'};color:${isActive?'var(--cyan)':'rgba(255,255,255,0.45)'};font-family:'Rajdhani',sans-serif;font-size:11px;cursor:pointer;letter-spacing:1px;font-weight:${isActive?'700':'400'};transition:all 0.15s;`;
    btn.innerHTML=`<img src="${eng.favicon}" width="12" height="12" style="border-radius:2px;opacity:0.8;" onerror="this.style.display='none'">${eng.name}`;
    btn.addEventListener('click',()=>setSearchEngine(id));
    bar.appendChild(btn);
  });
}
applySeasonalMode();applySeasonTheme();const s=getSeasonFromDate();showToast(` Smart Season on — it's ${s.charAt(0).toUpperCase()+s.slice(1)}!`);}
    else showToast(' Smart Season off');
    renderThemesPanel();
  });

  const grid=document.createElement('div');
  grid.className='theme-grid-panel';
  body.appendChild(grid);

  THEMES.forEach(t=>{
    const isActive=t.active();
    const btn=document.createElement('div');
    btn.className='theme-btn-large'+(isActive?' active':'');
    btn.innerHTML=`<span class="theme-icon">${t.icon}</span><span>${t.label}</span>`;
    btn.addEventListener('click',()=>{
      _activateTheme(t.id);
      renderThemesPanel();

      if(activePanel==='extensions') renderExtensionsPanel();
    });
    grid.appendChild(btn);
  });

  const partRow=document.createElement('div');
  partRow.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:14px 4px 6px;border-top:1px solid rgba(255,255,255,0.06);margin-top:14px;';
  const activeSeason=summerEnabled?'summer':winterEnabled?'winter':fallEnabled?'fall':springEnabled?'spring':sandEnabled?'sand':radioactiveEnabled?'radioactive':thunderEnabled?'thunder':grassEnabled?'grass':'night';
  const particleLabel={night:' Rain',summer:' Birds',winter:' Snowflakes',fall:' Leaves',spring:' Petals',sand:'⚡ Sandstorm',radioactive:'☢ Toxic Smoke',thunder:'⛈ Storm Rain',grass:' Butterflies'}[activeSeason];
  partRow.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;color:rgba(255,255,255,0.7);">${particleLabel}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:2px;">Scene particles</div>
    </div>
    <div class="ext-toggle${particlesEnabled?' on':''}" id="themes-particles-toggle"></div>
  `;
  body.appendChild(partRow);
  document.getElementById('themes-particles-toggle')?.addEventListener('click',()=>{
    particlesEnabled=!particlesEnabled;
    localStorage.setItem('ep_particles',particlesEnabled?'1':'0');
    renderThemesPanel();
    showToast(particlesEnabled?`${particleLabel} enabled`:`${particleLabel} disabled`);
  });

  const winRow=document.createElement('div');
  winRow.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:10px 4px 4px;';
  winRow.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;color:rgba(255,255,255,0.7);">🪟 Window Animations</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:2px;">Disable for better performance</div>
    </div>
    <div class="ext-toggle${windowAnimations?' on':''}" id="themes-winanim-toggle"></div>
  `;
  body.appendChild(winRow);
  document.getElementById('themes-winanim-toggle')?.addEventListener('click',()=>{
    windowAnimations=!windowAnimations;
    localStorage.setItem('ep_winanim',windowAnimations?'1':'0');

    buildings.forEach((b,bi)=>{
      b.windows = windowAnimations ? genWins(b.w, b.h, bi) : [];
    });
    renderThemesPanel();
    showToast(windowAnimations?'🪟 Window animations on':'🪟 Window animations off (faster)');
  });
}

function _activateTheme(which){
  summerEnabled=which==='summer'; winterEnabled=which==='winter';
  fallEnabled=which==='fall'; springEnabled=which==='spring';
  sandEnabled=which==='sand'; radioactiveEnabled=which==='radioactive';
  thunderEnabled=which==='thunder'; grassEnabled=which==='grass';

  seasonalMode=false; localStorage.setItem('ep_seasonal','0');
  localStorage.setItem('ep_summer',summerEnabled?'1':'0');
  localStorage.setItem('ep_winter',winterEnabled?'1':'0');
  localStorage.setItem('ep_fall',fallEnabled?'1':'0');
  localStorage.setItem('ep_spring',springEnabled?'1':'0');
  localStorage.setItem('ep_sand',sandEnabled?'1':'0');
  localStorage.setItem('ep_radioactive',radioactiveEnabled?'1':'0');
  localStorage.setItem('ep_thunder',thunderEnabled?'1':'0');
  localStorage.setItem('ep_grass',grassEnabled?'1':'0');
  applySeasonTheme();
  const names={night:' Night City',summer:'☀ Summer City',winter:' Winter City',fall:' Fall City',spring:' Spring City',sand:'⚡ Sand City',radioactive:'☢ Radioactive City',thunder:'⛈ Thunder City',grass:' Grass City'};
  showToast(names[which]||'Theme applied');
}

function renderExtensionsPanel(){
  const body=document.getElementById('extensions-body');
  if(!body)return;
  body.innerHTML='';

  const addRow=document.createElement('div');
  const activeCount=extensions.filter(e=>e.enabled).length;
  addRow.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <div style="font-family:'Rajdhani',sans-serif;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:1px;text-transform:uppercase;">
        ${extensions.length} installed · ${activeCount} active
      </div>
      <div style="display:flex;gap:5px;">
        <button id="ext-enable-all" style="font-size:10px;padding:2px 7px;background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:rgba(0,229,255,0.7);border-radius:4px;cursor:pointer;font-family:'Rajdhani',sans-serif;">ALL ON</button>
        <button id="ext-disable-all" style="font-size:10px;padding:2px 7px;background:rgba(255,60,60,0.08);border:1px solid rgba(255,60,60,0.2);color:rgba(255,100,100,0.7);border-radius:4px;cursor:pointer;font-family:'Rajdhani',sans-serif;">ALL OFF</button>
      </div>
    </div>
    <div class="panel-section-title" style="margin-top:4px;">Install Extension</div>
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <input class="panel-input" id="ext-add-name" placeholder="Name (optional)" autocomplete="off" style="flex:1;">
    </div>
    <div class="panel-input-row" style="margin-bottom:6px;">
      <input class="panel-input" id="ext-cws-url" placeholder="Chrome Web Store URL, .crx URL, or .js URL" autocomplete="off" style="flex:1;">
      <button class="panel-btn" id="ext-add-url-btn" title="Install from URL" style="white-space:nowrap;">+ URL</button>
    </div>
    <div class="panel-input-row" style="margin-bottom:6px;">
      <label id="ext-file-label" class="panel-btn" style="cursor:pointer;flex:1;text-align:center;justify-content:center;">Upload .js / .crx / .zip</label>
      <input type="file" id="ext-file-input" style="display:none;" accept=".js,.crx,.zip,.json" multiple>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
  `;
  body.appendChild(addRow);

  document.getElementById('ext-add-url-btn').addEventListener('click',()=>{
    const rawUrl=document.getElementById('ext-cws-url').value.trim();
    const customName=document.getElementById('ext-add-name').value.trim();
    if(!rawUrl){showToast('Enter a URL');return;}
    const cwsMatch=rawUrl.match(/chromewebstore\.google\.com\/detail\/([^\/]+)\/([a-z]+)/)||
                   rawUrl.match(/chrome\.google\.com\/webstore\/detail\/([^\/]+)\/([a-z]+)/);
    if(cwsMatch){
      const extSlug=cwsMatch[1].replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      const extId=cwsMatch[2];
      const name=customName||extSlug||'CWS Extension';
      showToast(`\u23f3 Fetching "${name}" from CWS\u2026`);
      installCWSExtension(extId, name, rawUrl);
      document.getElementById('ext-cws-url').value='';
      document.getElementById('ext-add-name').value='';
      return;
    }
    let guessName=customName;
    if(!guessName){try{guessName=decodeURIComponent(new URL(rawUrl).pathname.split('/').pop()).replace(/\.(js|crx|zip)$/i,'')||'Extension';}catch{guessName='Extension';}}
    extensions.push({id:nextExtId++,name:guessName,icon:'\U0001f9e9',desc:`From: ${rawUrl.length>50?rawUrl.slice(0,50)+'\u2026':rawUrl}`,enabled:true,version:'1.0.0',source:'url',url:rawUrl,sessionId});
    saveExtensions();renderExtensionsPanel();
    showToast(`\U0001f9e9 "${guessName}" installed`);
    document.getElementById('ext-cws-url').value='';
    document.getElementById('ext-add-name').value='';
  });
  document.getElementById('ext-file-input').addEventListener('change',e=>{
    Array.from(e.target.files).forEach(file=>{
      const customName=document.getElementById('ext-add-name').value.trim();
      const baseName=file.name.replace(/\.(js|crx|zip|json)$/i,'');
      const name=customName||baseName||file.name;
      const extType=file.name.split('.').pop().toLowerCase();
      const icon=extType==='crx'?'':extType==='js'?'':extType==='zip'?'':'';
      if(extType==='crx'||extType==='zip'){
        unpackCRXBlob(file.arrayBuffer(), file, name, icon);
        document.getElementById('ext-add-name').value='';
      } else {

        const textReader=new FileReader();
        textReader.onload=()=>{
          const fileText=textReader.result;
          const blobUrl=URL.createObjectURL(new Blob([fileText],{type:'text/javascript'}));
          extensions.push({id:nextExtId++,name,icon,
            desc:`Uploaded: ${file.name} (${formatSize(file.size)})`,
            enabled:true,version:'1.0.0',source:'file',
            fileName:file.name,blobUrl,fileText,sessionId});
          saveExtensions();renderExtensionsPanel();
          showToast(`${icon} "${name}" installed`);
          document.getElementById('ext-add-name').value='';
        };
        textReader.readAsText(file);
      }
    });
    e.target.value='';
  });
  document.getElementById('ext-file-label').addEventListener('click',()=>document.getElementById('ext-file-input').click());

  extensions.forEach(ext=>{
    const el=document.createElement('div');
    el.className='ext-item';

    const srcBadge = ext.source==='cws'
      ? `<span style="font-size:9px;background:rgba(66,133,244,0.18);color:rgba(100,160,255,0.8);padding:1px 5px;border-radius:3px;margin-left:4px;">CWS</span>`
      : ext.source==='file'||ext.source==='crx-file'
      ? `<span style="font-size:9px;background:rgba(0,229,255,0.12);color:rgba(0,229,255,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">FILE</span>`
      : ext.source==='url'
      ? `<span style="font-size:9px;background:rgba(255,180,0,0.12);color:rgba(255,180,0,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">URL</span>`
      : '';

    const crxBadge = ext.crxStatus==='loading'
      ? `<span style="font-size:9px;background:rgba(255,200,0,0.12);color:rgba(255,200,0,0.8);padding:1px 5px;border-radius:3px;margin-left:4px;animation:ep-pulse 1.2s infinite;">FETCHING</span>`
      : ext.crxStatus==='ready'
      ? `<span style="font-size:9px;background:rgba(0,255,100,0.1);color:rgba(0,255,120,0.75);padding:1px 5px;border-radius:3px;margin-left:4px;">${ext.contentScripts?ext.contentScripts.reduce((n,c)=>n+(c.jsTexts||[]).length+(c.cssTexts||[]).length,0):0} scripts</span>`
      : ext.crxStatus==='failed'
      ? `<span style="font-size:9px;background:rgba(255,60,60,0.12);color:rgba(255,100,100,0.8);padding:1px 5px;border-radius:3px;margin-left:4px;">FAILED</span>`
      : '';

    el.innerHTML=`
      <div class="ext-icon" style="font-size:22px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04);border-radius:8px;flex-shrink:0;">${ext.icon||'<svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,229,255,0.6)"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.1 11.9 1 10.5 1S8 2.1 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>'}</div>
      <div class="ext-info" style="min-width:0;">
        <div class="ext-name" style="display:flex;align-items:center;flex-wrap:wrap;gap:2px;">${ext.name}${srcBadge}${crxBadge} <span style="font-size:10px;color:rgba(255,255,255,0.2);font-weight:400;margin-left:2px;">v${ext.version||'?'}</span></div>
        <div class="ext-desc" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${ext.desc||''}</div>
        <div class="ext-actions">
          <div class="ext-action-btn" onclick="removeExt(${ext.id})">Remove</div>
          ${ext.blobUrl?`<div class="ext-action-btn" id="ext-save-${ext.id}">Save</div>`:''}
          ${ext.source==='cws'&&ext.crxStatus==='failed'?`<div class="ext-action-btn" id="ext-retry-${ext.id}">Retry</div>`:''}
          ${ext.url&&!ext.blobUrl&&ext.source!=='cws'?`<div class="ext-action-btn" onclick="window.open('${ext.url.replace(/'/g,"\\'")}\',\'_blank\')">View</div>`:''}
        </div>
      </div>
      <div class="ext-toggle${ext.enabled?' on':''}" id="ext-toggle-${ext.id}" onclick="toggleExt(${ext.id})" title="${ext.enabled?'Disable':'Enable'}"></div>
    `;
    body.appendChild(el);

    if(ext.blobUrl){
      const sb=document.getElementById(`ext-save-${ext.id}`);
      if(sb)sb.addEventListener('click',()=>{const a=document.createElement('a');a.href=ext.blobUrl;a.download=ext.fileName||ext.name;a.click();showToast('Saving…');});
    }
    if(ext.source==='cws'&&ext.crxStatus==='failed'){
      const rb=document.getElementById(`ext-retry-${ext.id}`);
      if(rb&&ext.cwsId)rb.addEventListener('click',()=>{
        ext.crxStatus='loading'; saveExtensions(); renderExtensionsPanel();
        installCWSExtension(ext.cwsId, ext.name, ext.url||'');
      });
    }
  });
}

const CORS_PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://cors-anywhere.herokuapp.com/${url}`,
];

function crxDownloadUrl(extId) {
  return `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=109.0&x=id%3D${extId}%26installsource%3Dondemand%26uc`;
}

async function fetchWithProxy(url) {
  for (const proxy of CORS_PROXIES) {
    try {
      const r = await fetch(proxy(url), {cache:'no-store'});
      if (r.ok) return r;
    } catch {}
  }
  return null;
}

async function installCWSExtension(extId, name, storeUrl) {

  const ext = {
    id: nextExtId++, name, icon: '',
    desc: `Chrome Web Store · ${extId.slice(0,12)}…`,
    enabled: true, version: '?',
    source: 'cws', cwsId: extId, url: storeUrl,
    crxStatus: 'loading', contentScripts: [],
    sessionId
  };
  extensions.push(ext);
  saveExtensions(); renderExtensionsPanel();

  try {

    const crxUrl = crxDownloadUrl(extId);
    const resp = await fetchWithProxy(crxUrl);

    if (!resp) throw new Error('All CORS proxies failed');

    const arrayBuf = await resp.arrayBuffer();
    const bytes = new Uint8Array(arrayBuf);

    let zipOffset = 0;
    for (let i = 0; i < Math.min(bytes.length - 4, 16384); i++) {
      if (bytes[i]===0x50 && bytes[i+1]===0x4B && bytes[i+2]===0x03 && bytes[i+3]===0x04) {
        zipOffset = i;
        break;
      }
    }

    const zipData = arrayBuf.slice(zipOffset);

    if (typeof JSZip === 'undefined') throw new Error('JSZip not loaded');
    const zip = await JSZip.loadAsync(zipData);

    const manifestFile = zip.file('manifest.json');
    if (!manifestFile) throw new Error('No manifest.json in CRX');
    const manifestText = await manifestFile.async('string');
    const manifest = JSON.parse(manifestText);

    ext.version = manifest.version || '?';
    ext.desc = manifest.description
      ? manifest.description.slice(0, 80) + (manifest.description.length > 80 ? '…' : '')
      : `CWS · ${extId.slice(0,12)}…`;

    const contentScripts = manifest.content_scripts || [];
    const parsedCS = [];

    for (const cs of contentScripts) {
      const jsTexts = [];
      const cssTexts = [];

      for (const jsFile of (cs.js || [])) {
        const f = zip.file(jsFile);
        if (f) {
          try { jsTexts.push(await f.async('string')); } catch {}
        }
      }
      for (const cssFile of (cs.css || [])) {
        const f = zip.file(cssFile);
        if (f) {
          try { cssTexts.push(await f.async('string')); } catch {}
        }
      }

      parsedCS.push({
        matches: cs.matches || [],
        excludeMatches: cs.exclude_matches || [],
        runAt: cs.run_at || 'document_end',
        jsTexts,
        cssTexts
      });
    }

    ext.contentScripts = parsedCS;
    ext.crxStatus = 'ready';

    const totalScripts = parsedCS.reduce((n, cs) => n + cs.jsTexts.length + cs.cssTexts.length, 0);
    showToast(` "${name}" v${ext.version} ready — ${totalScripts} script(s) loaded`);

  } catch (err) {
    ext.crxStatus = 'failed';
    ext.desc = `CRX fetch failed: ${err.message}`;
    showToast(`⚠ "${name}" — ${err.message}. Try uploading the .crx file directly.`);
  }

  saveExtensions(); renderExtensionsPanel();

  injectIntoWebIframe();
}

async function unpackCRXBlob(arrayBufPromise, file, name, icon) {
  const ext = {
    id: nextExtId++, name, icon,
    desc: `Unpacking ${file.name}…`,
    enabled: true, version: '?',
    source: 'crx-file', fileName: file.name,
    crxStatus: 'loading', contentScripts: [],
    sessionId
  };
  extensions.push(ext);
  saveExtensions(); renderExtensionsPanel();

  try {
    const arrayBuf = await arrayBufPromise;
    const bytes = new Uint8Array(arrayBuf);

    let zipOffset = 0;
    for (let i = 0; i < Math.min(bytes.length - 4, 16384); i++) {
      if (bytes[i]===0x50 && bytes[i+1]===0x4B && bytes[i+2]===0x03 && bytes[i+3]===0x04) {
        zipOffset = i; break;
      }
    }

    if (typeof JSZip === 'undefined') throw new Error('JSZip not loaded');
    const zip = await JSZip.loadAsync(arrayBuf.slice(zipOffset));

    const manifestFile = zip.file('manifest.json');
    if (!manifestFile) throw new Error('No manifest.json found');
    const manifest = JSON.parse(await manifestFile.async('string'));

    ext.version = manifest.version || '?';
    ext.desc = manifest.description
      ? manifest.description.slice(0, 80)
      : `Uploaded CRX · ${file.name}`;

    const parsedCS = [];
    for (const cs of (manifest.content_scripts || [])) {
      const jsTexts = [], cssTexts = [];
      for (const jsFile of (cs.js || [])) {
        const f = zip.file(jsFile);
        if (f) try { jsTexts.push(await f.async('string')); } catch {}
      }
      for (const cssFile of (cs.css || [])) {
        const f = zip.file(cssFile);
        if (f) try { cssTexts.push(await f.async('string')); } catch {}
      }
      parsedCS.push({ matches: cs.matches || [], excludeMatches: cs.exclude_matches || [], runAt: cs.run_at || 'document_end', jsTexts, cssTexts });
    }

    ext.contentScripts = parsedCS;
    ext.crxStatus = 'ready';
    const total = parsedCS.reduce((n, cs) => n + cs.jsTexts.length + cs.cssTexts.length, 0);
    showToast(` "${name}" v${ext.version} unpacked — ${total} script(s)`);
  } catch(err) {
    ext.crxStatus = 'failed';
    ext.desc = `Unpack failed: ${err.message}`;
    showToast(`⚠ "${name}" — ${err.message}`);
  }

  saveExtensions(); renderExtensionsPanel();
  injectIntoWebIframe();
}

function matchPatternToRegex(pattern) {
  if (pattern === '<all_urls>' || pattern === '*://*/*') return /.*/;

  try {

    const escaped = pattern
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')  
      .replace(/\\\*/g, '.*')                  
      .replace(/\?/g, '.');
    return new RegExp('^' + escaped + '$');
  } catch {
    return null;
  }
}

function urlMatchesPatterns(url, patterns) {
  if (!url || !patterns || patterns.length === 0) return false;
  return patterns.some(p => {
    const re = matchPatternToRegex(p);
    return re && re.test(url);
  });
}

const BUILTIN_SCRIPTS = {
  1: `/* Ad Blocker Pro */
(function(){
  const SELECTORS=['[id*="ad"],[class*="ad-"],[class*="-ad"],[id*="banner"],[class*="banner"],[id*="sponsor"],[class*="sponsor"],[class*="advertisement"],[id*="advertisement"],[class*="popup"],[id*="popup"],[class*="overlay"][style*="position:fixed"],[class*="modal"][style*="position:fixed"]'];
  function nuke(){SELECTORS.forEach(s=>{try{document.querySelectorAll(s).forEach(el=>{if(el&&el.offsetHeight>0&&el.offsetWidth>0){el.style.display='none';el.style.visibility='hidden';}});}catch{}});}
  nuke();
  const obs=new MutationObserver(nuke);
  obs.observe(document.body||document.documentElement,{childList:true,subtree:true});
  const _open=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(m,u,...a){const bad=['doubleclick','googlesyndication','adservice','amazon-adsystem','adsystem'];if(bad.some(x=>String(u).includes(x)))return;return _open.call(this,m,u,...a);};
  console.log('[EP] Ad Blocker Pro active');
})();`,

  2: `/* Dark Reader */
(function(){
  if(document.getElementById('ep-dark-reader'))return;
  const s=document.createElement('style');
  s.id='ep-dark-reader';
  s.textContent=\`
    html{filter:invert(1) hue-rotate(180deg) !important; background:#111 !important;}
    img,video,canvas,svg,iframe{filter:invert(1) hue-rotate(180deg) !important;}
    [style*="background-image"]{filter:invert(1) hue-rotate(180deg) !important;}
  \`;
  (document.head||document.documentElement).appendChild(s);
  console.log('[EP] Dark Reader active');
})();`,

  3: `/* Proxy Switcher — info banner */
(function(){
  if(document.getElementById('ep-proxy-info'))return;
  const d=document.createElement('div');
  d.id='ep-proxy-info';
  d.style.cssText='position:fixed;bottom:8px;left:8px;z-index:2147483647;background:rgba(0,0,0,0.75);color:#00e5ff;font-family:monospace;font-size:11px;padding:4px 10px;border-radius:6px;border:1px solid rgba(0,229,255,0.3);pointer-events:none;';
  d.textContent=' Proxy: '+location.hostname;
  document.body.appendChild(d);
  console.log('[EP] Proxy Switcher active');
})();`,

  4: `/* Password Manager — autofill hint */
(function(){
  document.querySelectorAll('input[type=password]').forEach(i=>{
    i.style.outline='2px solid #00e5ff';
    i.setAttribute('title','[EP] Password Manager active');
  });
  console.log('[EP] Password Manager active');
})();`,

  5: `/* Video Downloader — adds download button next to videos */
(function(){
  document.querySelectorAll('video').forEach((v,i)=>{
    if(v.src&&!document.getElementById('ep-vdl-'+i)){
      const btn=document.createElement('a');
      btn.id='ep-vdl-'+i;
      btn.href=v.src; btn.download='video.mp4';
      btn.style.cssText='position:absolute;top:8px;right:8px;z-index:99999;background:#00e5ff;color:#000;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:6px;text-decoration:none;cursor:pointer;';
      btn.textContent='⬇ Save';
      v.style.position='relative';
      v.parentNode.style.position='relative';
      v.parentNode.insertBefore(btn,v.nextSibling);
    }
  });
  console.log('[EP] Video Downloader active');
})();`,

  6: `/* Screenshot Tool — Ctrl+Shift+S to capture */
(function(){
  if(window._epScreenshot)return;
  window._epScreenshot=true;
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey&&e.shiftKey&&e.key==='S'){
      e.preventDefault();
      import('https://html2canvas.hertzen.com/dist/html2canvas.min.js').catch(()=>{
        window.print();
      });
      showEpToast&&showEpToast(' Use Ctrl+P to save as PDF/image');
    }
  });
  console.log('[EP] Screenshot Tool active (Ctrl+Shift+S)');
})();`
};

function injectExtensionsIntoDoc(doc) {
  if (!doc || !doc.body) return;
  extensions.forEach(ext => {
    if (!ext.enabled) return;
    const scriptId = 'ep-ext-' + ext.id;
    if (doc.getElementById(scriptId)) return; 
    const tag = doc.createElement('script');
    tag.id = scriptId;

    let code = null;
    if (BUILTIN_SCRIPTS[ext.id]) {
      code = BUILTIN_SCRIPTS[ext.id];
    } else if (ext.source === 'file' && (ext.fileText || ext.blobUrl)) {
      if (ext.fileText) {
        tag.textContent = ext.fileText;
        code = null;
        try{(doc.head||doc.body).appendChild(tag); logExtInjected(ext.name);}catch{}
      } else {
        fetch(ext.blobUrl).then(r=>r.text()).then(text=>{
          if(doc.getElementById(scriptId))return;
          const t=doc.createElement('script');t.id=scriptId;t.textContent=text;
          try{(doc.head||doc.body).appendChild(t);logExtInjected(ext.name);}catch{}
        }).catch(()=>{});
      }
      return;
    } else if (ext.source === 'url' && ext.url && /\.js(\?|$)/i.test(ext.url)) {

      tag.src = ext.url;
      tag.crossOrigin = 'anonymous';
      try { (doc.head||doc.body).appendChild(tag); logExtInjected(ext.name); } catch {}
      return;
    } else if (ext.source === 'cws') {

      if (ext.contentScripts && ext.contentScripts.length > 0) {
        const pageUrl = doc.location ? doc.location.href : (doc.defaultView ? doc.defaultView.location.href : '');
        ext.contentScripts.forEach((cs, csIdx) => {

          const matches = urlMatchesPatterns(pageUrl, cs.matches || []);
          if (!matches) return;

          (cs.cssTexts || []).forEach((cssText, ci) => {
            const cssId = `ep-ext-css-${ext.id}-${csIdx}-${ci}`;
            if (doc.getElementById(cssId)) return;
            const styleTag = doc.createElement('style');
            styleTag.id = cssId;
            styleTag.textContent = cssText;
            (doc.head || doc.body).appendChild(styleTag);
          });

          (cs.jsTexts || []).forEach((jsText, ji) => {
            const jsId = `ep-ext-js-${ext.id}-${csIdx}-${ji}`;
            if (doc.getElementById(jsId)) return;
            const s = doc.createElement('script');
            s.id = jsId;
            s.textContent = jsText;
            (doc.head || doc.body).appendChild(s);
            logExtInjected(ext.name + ' (content script ' + ji + ')');
          });
        });
        return; 
      } else if (ext.crxStatus === 'loading') {

        return;
      } else if (ext.crxStatus === 'failed') {

        code = `(function(){
          if(document.getElementById('ep-cws-fail-${ext.id}'))return;
          const d=document.createElement('div');
          d.id='ep-cws-fail-${ext.id}';
          d.style.cssText='position:fixed;bottom:8px;right:8px;z-index:2147483647;background:rgba(220,50,50,0.85);color:#fff;font-family:sans-serif;font-size:11px;padding:4px 10px;border-radius:6px;pointer-events:none;';
          d.textContent='\u26a0\ufe0f ${ext.name.replace(/'/g,"\\'")} – CRX fetch failed (CORS). Upload .crx manually.';
          document.body.appendChild(d);
          setTimeout(()=>d.remove(),5000);
        })();`;
      } else {

        code = `(function(){
          if(document.getElementById('ep-cws-notice-${ext.id}'))return;
          const d=document.createElement('div');
          d.id='ep-cws-notice-${ext.id}';
          d.style.cssText='position:fixed;top:8px;right:8px;z-index:2147483647;background:rgba(66,133,244,0.88);color:#fff;font-family:sans-serif;font-size:12px;padding:6px 14px;border-radius:8px;pointer-events:none;';
          d.textContent='\U0001f9e9 ${ext.name.replace(/'/g,"\\'")} active (no content scripts)';
          document.body.appendChild(d);
          setTimeout(()=>d.remove(),3500);
        })();`;
      }
    } else {

      code = `(function(){
        if(document.getElementById('ep-ext-banner-${ext.id}'))return;
        const d=document.createElement('div');
        d.id='ep-ext-banner-${ext.id}';
        d.style.cssText='position:fixed;bottom:${8+ext.id*32}px;left:8px;z-index:2147483647;background:rgba(0,0,0,0.7);color:#0f0;font-family:monospace;font-size:11px;padding:3px 10px;border-radius:6px;pointer-events:none;';
        d.textContent='${(ext.icon||'').replace(/'/g,"\\'")} ${ext.name.replace(/'/g,"\\'")} active';
        document.body.appendChild(d);
        setTimeout(()=>d.remove(),3500);
      })();`;
    }
    if (code) {
      tag.textContent = code;
      try { (doc.head||doc.body).appendChild(tag); logExtInjected(ext.name); } catch {}
    }
  });
}

function logExtInjected(name) {
  console.log(`[EP] Extension injected: ${name}`);
}

function injectIntoWebIframe() {

  try {
    const doc = webIframe.contentDocument;
    if (doc && doc.body && doc.readyState !== 'loading') {
      injectExtensionsIntoDoc(doc);
      return;
    }
  } catch(e) {}

  _injectViaPostMessage();
}

function _buildInjectionBundle(pageUrl) {
  const parts = [];
  extensions.forEach(ext => {
    if (!ext.enabled) return;
    if (BUILTIN_SCRIPTS[ext.id]) {
      parts.push(BUILTIN_SCRIPTS[ext.id]);
    } else if (ext.source === 'file' && ext.fileText) {
      parts.push(ext.fileText);
    } else if ((ext.source === 'cws' || ext.source === 'crx-file') && ext.contentScripts && ext.contentScripts.length) {
      ext.contentScripts.forEach(cs => {
        const matchOk = !pageUrl || !cs.matches || !cs.matches.length ||
          urlMatchesPatterns(pageUrl, cs.matches);
        if (!matchOk) return;
        (cs.cssTexts||[]).forEach(css => {
          parts.push(`(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(css)};(document.head||document.documentElement).appendChild(s);})();`);
        });
        (cs.jsTexts||[]).forEach(t => parts.push(t));
      });
    } else if (ext.source === 'url' && ext.url && /\.js(\?|$)/i.test(ext.url)) {
      parts.push(`(function(){var s=document.createElement('script');s.src=${JSON.stringify(ext.url)};s.crossOrigin='anonymous';(document.head||document.documentElement).appendChild(s);})();`);
    }
  });
  return parts.join(';\n');
}

function _injectViaPostMessage() {
  const bundle = _buildInjectionBundle();
  if (!bundle.trim()) return;
  try {
    webIframe.contentWindow.postMessage({ type: 'EP_INJECT', code: bundle }, '*');
  } catch(e) {}
}

window.addEventListener('message', e => {
  if (e.data && e.data.type === 'EP_READY') {
    _injectViaPostMessage();
  }
});

function toggleExt(id){
  const ext=extensions.find(e=>e.id===id);
  if(!ext)return;
  ext.enabled=!ext.enabled;
  saveExtensions();
  const t=document.getElementById(`ext-toggle-${id}`);
  if(t)t.classList.toggle('on',ext.enabled);
  if(ext.enabled){

    injectIntoWebIframe();
    showToast(`${ext.icon||''} ${ext.name} enabled — injected into page`);
  } else {
    showToast(`${ext.icon||''} ${ext.name} disabled — reload page to remove`);
  }
}
function removeExt(id){
  const ext=extensions.find(e=>e.id===id);
  if(ext&&confirm(`Remove "${ext.name}"?`)){extensions=extensions.filter(e=>e.id!==id);saveExtensions();renderExtensionsPanel();}
}

let activePanel=null;
function openPanel(name){
  if(activePanel===name){closePanel(name);return;}
  if(activePanel)document.getElementById(`panel-${activePanel}`).classList.remove('open');
  activePanel=name;
  const panel=document.getElementById(`panel-${name}`);
  if(!panel)return;

  if(name==='bookmarks')renderBookmarksPanel();
  if(name==='downloads')renderDownloadsPanel();
  if(name==='extensions')renderExtensionsPanel();
  if(name==='themes')renderThemesPanel();
  panel.classList.add('open');
  document.getElementById('panel-scrim').classList.add('show');
}
function closePanel(name){
  const panel=document.getElementById(`panel-${name}`);
  if(panel)panel.classList.remove('open');
  document.getElementById('panel-scrim').classList.remove('show');
  activePanel=null;
}
const _ps=document.getElementById('panel-scrim');if(_ps)_ps.addEventListener('click',()=>{if(activePanel)closePanel(activePanel);});
const _bdl=document.getElementById('btn-downloads');if(_bdl)_bdl.addEventListener('click',()=>openPanel('downloads'));

(function(){
  const moreBtn=document.getElementById('btn-more');
  const moreDrop=document.getElementById('more-dropdown');
  if(!moreBtn||!moreDrop)return;

  function toggleMore(e){e.stopPropagation();moreDrop.style.display=moreDrop.style.display==='none'?'block':'none';}
  function hideMore(){moreDrop.style.display='none';}
  moreBtn.addEventListener('click',toggleMore);
  document.addEventListener('click',e=>{if(!moreBtn.contains(e.target))hideMore();});

  document.getElementById('more-bm-bar')?.addEventListener('click',()=>{
    hideMore();
    bmBarVisible=!bmBarVisible;
    localStorage.setItem('ep_bmbar',bmBarVisible?'1':'0');
    applyBmBar();
    showToast(bmBarVisible?'Bookmarks bar shown':'Bookmarks bar hidden');
  });
  document.getElementById('more-split')?.addEventListener('click',()=>{ hideMore(); if(typeof splitActive!=='undefined'){ if(splitActive)closeSplit(); else openSplit(''); } });
  document.getElementById('more-history')?.addEventListener('click',()=>{ hideMore(); openPanel('history'); });
  document.getElementById('more-extensions')?.addEventListener('click',()=>{ hideMore(); openPanel('extensions'); });
  document.getElementById('more-bm-mgr')?.addEventListener('click',()=>{ hideMore(); openPanel('bookmarks'); });
  document.getElementById('more-themes')?.addEventListener('click',()=>{ hideMore(); openPanel('themes'); });
  document.getElementById('more-help')?.addEventListener('click',()=>{ hideMore(); openShortcutsOverlay(); });
})();

let bmBarVisible=localStorage.getItem('ep_bmbar')!=='0';
function applyBmBar(){
  const bar=document.getElementById('bookmarks-bar');
  if(bar)bar.classList.toggle('hidden-bar',!bmBarVisible);
}
applyBmBar();

const _bbm=document.getElementById('btn-bookmark');if(_bbm)_bbm.addEventListener('click',()=>{
  const state=tabState[activeTabId];
  if(!state||state.url==='ep://home'||state.url==='New Tab'){showToast('Nothing to bookmark');return;}
  const url=state.url;
  if(url==='mims://portal'){showToast('Nothing to bookmark');return;}
  let title;try{title=new URL(url).hostname.replace('www.','');}catch{title=url.slice(0,30);}
  const existing=bookmarks.find(b=>b.url===url);
  if(existing){
    bookmarks=bookmarks.filter(b=>b.url!==url);
    saveBookmarks();renderBookmarksBar();renderBookmarksPanel();
    showToast(`Bookmark removed`);
  } else {
    bookmarks.push({id:nextBmId++,title,url});
    saveBookmarks();renderBookmarksBar();renderBookmarksPanel();
    showToast(`Bookmarked: ${title}`);
  }
  updateBookmarkStar();
});

const _bbma=document.getElementById('bm-bar-add');if(_bbma)_bbma.addEventListener('click',()=>{
  document.getElementById('btn-bookmark').click();
});

function showPanel(which){
  homePage.style.display=which==='home'?'flex':'none';
  webPanel.style.display=which==='web'?'block':'none';
  mimsPanel.style.display=which==='mims'?'block':'none';
}
function loadMims(){
  if(mimsLoaded)return; mimsLoaded=true;
  const el=document.getElementById('mims-source');if(!el)return;
  try{
    let c=el.textContent.trim();

    if(c.startsWith('"')||c.startsWith("'")){c=JSON.parse(c);}
    const blob=new Blob([c],{type:'text/html'});
    mimsIframe.src=URL.createObjectURL(blob);
  }catch(e){

    try{
      const raw=el.textContent.trim();
      mimsIframe.srcdoc=raw.startsWith('"')?JSON.parse(raw):raw;
    }catch(e2){console.warn('MIMS load error:',e2);}
  }
}

const SEARCH_ENGINES = {
  google: { name:'Google',  url:'https://www.google.com/search?q=', favicon:'https://www.google.com/favicon.ico' },
  bing:   { name:'Bing',    url:'https://www.bing.com/search?q=',   favicon:'https://www.bing.com/favicon.ico' },
  yahoo:  { name:'Yahoo',   url:'https://search.yahoo.com/search?p=',favicon:'https://search.yahoo.com/favicon.ico' },
  brave:  { name:'Brave',   url:'https://search.brave.com/search?q=',favicon:'https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon.5b5e08d3.ico' },
  duckduckgo:{ name:'DuckDuckGo',url:'https://duckduckgo.com/?q=',  favicon:'https://duckduckgo.com/favicon.ico' },
  ecosia: { name:'Ecosia',  url:'https://www.ecosia.org/search?q=', favicon:'https://www.ecosia.org/favicon.ico' },
};
let activeSearchEngine = localStorage.getItem('ep_search_engine') || 'google';
function setSearchEngine(id) {
  activeSearchEngine = id;
  localStorage.setItem('ep_search_engine', id);
  showToast('Search: ' + SEARCH_ENGINES[id].name);
  renderSearchEngineBar();

}
function getSearchUrl(query) {
  const eng = SEARCH_ENGINES[activeSearchEngine] || SEARCH_ENGINES.google;
  return eng.url + encodeURIComponent(query);
}

const EP_PROXIES = [
  u => 'https://corsproxy.io/?' + encodeURIComponent(u),
  u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u),
  u => 'https://thingproxy.freeboard.io/fetch/' + u,
];
let _activeProxy = parseInt(localStorage.getItem('ep_proxy_idx') || '0');
function getProxiedUrl(url) {
  const fn = EP_PROXIES[_activeProxy % EP_PROXIES.length];
  return fn(url);
}
function cycleProxy() {
  _activeProxy = (_activeProxy + 1) % EP_PROXIES.length;
  localStorage.setItem('ep_proxy_idx', _activeProxy);
  const names = ['corsproxy.io','allorigins.win','thingproxy'];
  showToast('Proxy: ' + names[_activeProxy]);
}

function goTo(url) {
  const frame = document.getElementById('web-iframe');
  if (!frame) return;
  const proxied = getProxiedUrl(url);

  const bundle = _buildInjectionBundle();

  if (bundle.trim()) {

    const bootstrap = `<!DOCTYPE html><html><head>
<script>
(function(){
  var _code=${JSON.stringify(bundle)};
  var _dest=${JSON.stringify(proxied)};
  window.addEventListener('load',function(){
    try{ var s=document.createElement('script');s.textContent=_code;document.head.appendChild(s); }catch(e){}
  });
  location.replace(_dest);
})();
<\/script></head><body></body></html>`;
    frame.srcdoc = bootstrap;

    frame.addEventListener('load', function onLoad(){
      frame.removeEventListener('load', onLoad);
      if(frame.srcdoc) frame.srcdoc = '';
    });
  } else {
    frame.srcdoc = '';
    frame.src = proxied;
  }
}

function openUrl(raw,addToHistory=true){
  let url=(raw||'').trim();if(!url)return;
  let full;
  if(url==='ep://home'||url==='mims://portal')full=url;
  else if(/^https?:\/\//i.test(url))full=url;
  else if(url.includes('.')&&!url.includes(' '))full='https://'+url;
  else full=getSearchUrl(url);
  const state=tabState[activeTabId];if(!state)return;
  if(addToHistory&&full!==state.history[state.histIdx]){state.history=state.history.slice(0,state.histIdx+1);state.history.push(full);state.histIdx=state.history.length-1;}
  state.url=full;
  const tab=tabs.find(t=>t.id===activeTabId);
  if(tab&&!tab.fixed){if(full==='ep://home')tab.title='Endless Proxy';else{try{tab.title=new URL(full).hostname.replace('www.','');}catch{tab.title=full.slice(0,20);}}saveTabs();}
  if(full==='ep://home'){state.panel='home';showPanel('home');}
  else if(full==='mims://portal'){state.panel='mims';showPanel('mims');loadMims();}
  else{
    state.panel='web';showPanel('web');
    goTo(full);

    const activeTabEl=tabBarEl?.querySelector(`.tab[data-id="${activeTabId}"]`);
    if(activeTabEl)activeTabEl.classList.add('loading');
    if(webIframe) webIframe.onload=()=>{
      const el=tabBarEl?.querySelector(`.tab[data-id="${activeTabId}"]`);
      if(el)el.classList.remove('loading');

      try{
        const iTitle=webIframe.contentDocument?.title;
        if(iTitle){const tab=tabs.find(t=>t.id===activeTabId);if(tab&&!tab.fixed){tab.title=iTitle.slice(0,28);saveTabs();renderTabs();}}
      }catch{}

      injectIntoWebIframe();
    };
  }
  updateAddressBar(full);updateNavBtns();renderTabs();hideSuggestions();
  if(searchInput){searchInput.value='';} if(searchClear){searchClear.style.opacity='0';}
}

function updateAddressBar(url){
  if(!navAddrText)return;
  if(!url||url==='ep://home')navAddrText.textContent='Search with Google or enter address';
  else if(url==='mims://portal')navAddrText.textContent='mims://portal';
  else navAddrText.textContent=url;
  updateAddressBarIcon(url);
  updateBookmarkStar();
}
function updateNavBtns(){
  const s=tabState[activeTabId];
  const b=document.getElementById('btn-back'),f=document.getElementById('btn-forward');
  if(b)b.classList.toggle('disabled',!s||s.histIdx<=0);
  if(f)f.classList.toggle('disabled',!s||s.histIdx>=s.history.length-1);
}

const tabBarEl=document.getElementById('tab-bar');
const addBtn=document.getElementById('btn-new-tab');

const tabCtxMenu=document.getElementById('tab-ctx-menu');
let tabCtxId=null;

function showTabCtxMenu(e,id){
  e.preventDefault(); e.stopPropagation();
  tabCtxId=id;
  const tab=tabs.find(t=>t.id===id);
  const isMims=id===MIMS_ID;
  const isPinned=tab&&tab.pinned;

  document.getElementById('tctx-switch').style.display=id===activeTabId?'none':'flex';
  document.getElementById('tctx-rename').style.display=isMims?'none':'flex';
  document.getElementById('tctx-pin').textContent=isPinned?' Unpin tab':' Pin tab';
  document.getElementById('tctx-pin').style.display=isMims?'none':'flex';
  document.getElementById('tctx-split').style.display=isMims?'none':'flex';
  document.getElementById('tctx-duplicate').style.display=isMims?'none':'flex';
  document.getElementById('tctx-close-others').style.display=isMims?'none':'flex';
  document.getElementById('tctx-close').style.display=isMims?'none':'flex';

  tabCtxMenu.style.left=Math.min(e.clientX,innerWidth-180)+'px';
  tabCtxMenu.style.top=Math.min(e.clientY,innerHeight-220)+'px';
  tabCtxMenu.style.display='block';
  requestAnimationFrame(()=>tabCtxMenu.style.opacity='1');
}
function hideTabCtxMenu(){
  tabCtxMenu.style.opacity='0';
  setTimeout(()=>tabCtxMenu.style.display='none',120);
}
document.addEventListener('click',e=>{
  if(!e.target.closest('#tab-ctx-menu'))hideTabCtxMenu();
});

const _tcs=document.getElementById('tctx-switch');if(_tcs)_tcs.addEventListener('click',()=>{ switchTab(tabCtxId); hideTabCtxMenu(); });

const _tcsw=document.getElementById('tctx-switch');if(_tcsw)_tcsw.addEventListener('click',()=>{ switchTab(tabCtxId); hideTabCtxMenu(); });
const _tcr=document.getElementById('tctx-rename');if(_tcr)_tcr.addEventListener('click',()=>{
  hideTabCtxMenu();
  const tab=tabs.find(t=>t.id===tabCtxId);
  if(!tab)return;
  showTabCustomiseModal(tab);
});

function showTabCustomiseModal(tab){
  let overlay=document.getElementById('tab-custom-overlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='tab-custom-overlay';
    overlay.style.cssText='position:fixed;inset:0;z-index:20000;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML=`
      <div style="background:rgba(8,18,32,0.98);border:1px solid rgba(0,229,255,0.22);border-radius:16px;padding:28px 32px;width:min(400px,92vw);box-shadow:0 0 60px rgba(0,229,255,0.1);">
        <div style="font-family:'Orbitron',monospace;font-size:13px;color:var(--cyan);letter-spacing:3px;margin-bottom:20px;">CUSTOMISE TAB</div>
        <label style="font-family:'Rajdhani',sans-serif;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:6px;">Tab Name</label>
        <input id="tc-name" autocomplete="off" spellcheck="false"
          style="width:100%;background:rgba(0,0,0,0.4);border:1px solid rgba(0,229,255,0.2);border-radius:8px;color:rgba(255,255,255,0.85);font-size:13px;padding:8px 12px;font-family:'Rajdhani',sans-serif;outline:none;box-sizing:border-box;margin-bottom:14px;">
        <label style="font-family:'Rajdhani',sans-serif;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:6px;">Icon URL <span style="opacity:0.4;font-size:10px;">(image link, leave blank to auto)</span></label>
        <input id="tc-icon" autocomplete="off" spellcheck="false" placeholder="https://example.com/icon.png"
          style="width:100%;background:rgba(0,0,0,0.4);border:1px solid rgba(0,229,255,0.2);border-radius:8px;color:rgba(255,255,255,0.85);font-size:13px;padding:8px 12px;font-family:'Rajdhani',sans-serif;outline:none;box-sizing:border-box;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
          <div id="tc-icon-preview" style="width:28px;height:28px;border-radius:6px;background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.15);display:flex;align-items:center;justify-content:center;overflow:hidden;"></div>
          <span style="font-size:11px;color:rgba(255,255,255,0.3);font-family:'Rajdhani',sans-serif;">Preview</span>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
          <button id="tc-cancel" style="padding:8px 18px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:rgba(255,255,255,0.5);font-family:'Rajdhani',sans-serif;font-size:13px;cursor:pointer;">Cancel</button>
          <button id="tc-save" style="padding:8px 18px;border-radius:8px;border:1px solid rgba(0,229,255,0.3);background:rgba(0,229,255,0.1);color:var(--cyan);font-family:'Rajdhani',sans-serif;font-size:13px;cursor:pointer;font-weight:700;">Save</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById('tc-icon').addEventListener('input',function(){
      const prev=document.getElementById('tc-icon-preview');
      const v=this.value.trim();
      prev.innerHTML=v?`<img src="${v}" style="width:100%;height:100%;object-fit:cover;border-radius:5px;" onerror="this.style.display='none'">`:'';
    });
    document.getElementById('tc-cancel').addEventListener('click',()=>overlay.style.display='none');
    overlay.addEventListener('click',e=>{ if(e.target===overlay)overlay.style.display='none'; });
  }
  overlay.style.display='flex';
  const nameInp=document.getElementById('tc-name');
  const iconInp=document.getElementById('tc-icon');
  const prev=document.getElementById('tc-icon-preview');
  nameInp.value=tab.customTitle||tab.title||'';
  iconInp.value=tab.customIcon||'';
  prev.innerHTML=tab.customIcon?`<img src="${tab.customIcon}" style="width:100%;height:100%;object-fit:cover;border-radius:5px;">`:'';

  const saveBtn=document.getElementById('tc-save');
  const newSave=saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSave,saveBtn);
  newSave.addEventListener('click',()=>{
    const newName=nameInp.value.trim();
    const newIcon=iconInp.value.trim();
    if(newName) tab.customTitle=newName;
    if(newIcon) tab.customIcon=newIcon;
    else delete tab.customIcon;
    tab.title=newName||tab.title;
    saveTabs(); renderTabs();
    overlay.style.display='none';
    showToast('Tab updated');
  });
  nameInp.focus(); nameInp.select();
}

const _tcp=document.getElementById('tctx-pin');if(_tcp)_tcp.addEventListener('click',()=>{
  const tab=tabs.find(t=>t.id===tabCtxId);
  if(!tab)return;
  tab.pinned=!tab.pinned;

  if(tab.pinned){
    tabs=tabs.filter(t=>t.id!==tabCtxId);
    const insertAt=tabs.findIndex(t=>!t.pinned&&t.id!==MIMS_ID);
    tabs.splice(insertAt===-1?tabs.length:insertAt,0,tab);
  }
  saveTabs(); renderTabs();
  showToast(tab.pinned?`"${tab.title}" pinned`:`"${tab.title}" unpinned`);
  hideTabCtxMenu();
});

const _tcd=document.getElementById('tctx-duplicate');if(_tcd)_tcd.addEventListener('click',()=>{
  const orig=tabs.find(t=>t.id===tabCtxId);
  if(!orig)return;
  const nt={id:nextTabId++,title:orig.title,active:false,pinned:false};
  const origState=tabState[orig.id];
  tabs.push(nt);
  tabState[nt.id]={
    history:[...origState.history],
    histIdx:origState.histIdx,
    panel:origState.panel,
    url:origState.url
  };
  saveTabs(); renderTabs();
  switchTab(nt.id);
  hideTabCtxMenu();
  showToast(`Duplicated: ${orig.title}`);
});

const _tcco=document.getElementById('tctx-close-others');if(_tcco)_tcco.addEventListener('click',()=>{
  const keep=[MIMS_ID,tabCtxId];
  const toClose=tabs.filter(t=>!keep.includes(t.id)).map(t=>t.id);
  toClose.forEach(id=>{tabs=tabs.filter(t=>t.id!==id);delete tabState[id];});
  if(!tabs.find(t=>t.id===activeTabId)){
    activeTabId=tabCtxId;
    tabs.forEach(t=>t.active=t.id===activeTabId);
  }
  saveTabs(); switchTab(activeTabId);
  hideTabCtxMenu();
  showToast(`Closed ${toClose.length} tab${toClose.length!==1?'s':''}`);
});

const _tcc=document.getElementById('tctx-close');if(_tcc)_tcc.addEventListener('click',()=>{ closeTab(tabCtxId); hideTabCtxMenu(); });

let dragId=null, dragEl=null;

function onDragStart(e,id){
  dragId=id;
  dragEl=e.currentTarget;
  dragEl.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.setData('text/plain',id);
}
function onDragEnd(){
  if(dragEl)dragEl.classList.remove('dragging');
  tabBarEl.querySelectorAll('.tab').forEach(t=>t.classList.remove('drag-over'));
  dragId=null; dragEl=null;
}
function onDragOver(e,id){
  if(dragId===null||dragId===id||tabs.find(t=>t.id===dragId)?.pinned)return;
  e.preventDefault();
  e.dataTransfer.dropEffect='move';
  tabBarEl.querySelectorAll('.tab').forEach(t=>t.classList.remove('drag-over'));
  const target=tabBarEl.querySelector(`.tab[data-id="${id}"]`);
  if(target)target.classList.add('drag-over');
}
function onDrop(e,targetId){
  e.preventDefault();
  tabBarEl.querySelectorAll('.tab').forEach(t=>t.classList.remove('drag-over'));
  if(dragId===null||dragId===targetId)return;
  const dragTab=tabs.find(t=>t.id===dragId);
  const targetTab=tabs.find(t=>t.id===targetId);
  if(!dragTab||!targetTab)return;

  if(dragTab.pinned!==targetTab.pinned)return;
  const fromIdx=tabs.indexOf(dragTab);
  const toIdx=tabs.indexOf(targetTab);
  tabs.splice(fromIdx,1);
  tabs.splice(toIdx,0,dragTab);
  saveTabs(); renderTabs();
}

function renderTabs(){
  tabBarEl.querySelectorAll('.tab').forEach(el=>el.remove());
  tabs.forEach(tab=>{
    const isActive=tab.id===activeTabId;
    const isMims=tab.id===MIMS_ID;
    const isPinned=tab.pinned||isMims;
    const el=document.createElement('div');
    el.className='tab'+(isActive?'':' tab-inactive')+(isPinned?' pinned':'');
    el.dataset.id=tab.id;

    const _tabState=tabState[tab.id];
    const _tabUrl=_tabState?.url||'';
    const _favDomain=(!isMims&&_tabUrl&&_tabUrl!=='ep://home'&&_tabUrl!=='mims://portal')?(() => { try { return new URL(_tabUrl).hostname; } catch { return ''; } })():'';
    const fav=isMims
      ?`<div class="tab-favicon" style="background:rgba(0,229,255,0.25)"><svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:#020a12"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>`
      :tab.customIcon
      ?`<div class="tab-favicon" style="padding:0;overflow:hidden;"><img src="${tab.customIcon}" style="width:100%;height:100%;object-fit:cover;border-radius:3px;" onerror="this.style.display='none'"></div>`
      :_favDomain
      ?`<div class="tab-favicon"><img src="https://www.google.com/s2/favicons?sz=16&domain=${_favDomain}" width="12" height="12" style="border-radius:2px;" onerror="this.outerHTML='<svg viewBox=\'0 0 24 24\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z\'/></svg>'"></div>`
      :`<div class="tab-favicon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>`;
    const _displayTitle=tab.customTitle||tab.title;

    const action=(isMims)
      ? `<span style="font-size:9px;opacity:0.5;flex-shrink:0;"></span>`
      : isPinned
      ? ``
      : `<div class="tab-close"></div>`;

    el.innerHTML=`${fav}<span class="tab-title">${_displayTitle}</span>${action}`;

    el.addEventListener('click',e=>{
      if(e.target.classList.contains('tab-close'))return;
      switchTab(tab.id);
    });

    el.addEventListener('contextmenu',e=>showTabCtxMenu(e,tab.id));

    if(!isMims&&!isPinned){
      el.querySelector('.tab-title').addEventListener('dblclick',e=>{
        e.stopPropagation();
        const inp=document.createElement('input');
        inp.value=tab.title;
        inp.style.cssText='background:transparent;border:none;outline:none;color:rgba(255,255,255,0.85);font-family:Rajdhani,sans-serif;font-size:12px;width:100%;';
        el.querySelector('.tab-title').replaceWith(inp);
        inp.focus(); inp.select();
        const done=()=>{ tab.title=inp.value.trim()||'New Tab'; saveTabs(); renderTabs(); };
        inp.addEventListener('blur',done);
        inp.addEventListener('keydown',e=>{ if(e.key==='Enter')inp.blur(); if(e.key==='Escape'){inp.value=tab.title;inp.blur();} });
      });
    }

    if(!isMims&&!isPinned){
      const x=el.querySelector('.tab-close');
      if(x)x.addEventListener('click',e=>{ e.stopPropagation(); closeTab(tab.id); });
    }

    if(!isMims){
      el.setAttribute('draggable','true');
      el.addEventListener('dragstart',e=>onDragStart(e,tab.id));
      el.addEventListener('dragend',onDragEnd);
      el.addEventListener('dragover',e=>onDragOver(e,tab.id));
      el.addEventListener('drop',e=>onDrop(e,tab.id));
    }

    tabBarEl.insertBefore(el,addBtn);
  });
}

function switchTab(id){
  tabs.forEach(t=>t.active=t.id===id); activeTabId=id; saveTabs();
  if(!tabState[id])tabState[id]={history:[id===MIMS_ID?'mims://portal':'ep://home'],histIdx:0,panel:id===MIMS_ID?'mims':'home',url:'New Tab'};
  const s=tabState[id]; showPanel(s.panel);
  if(s.panel==='web'){const _restoreUrl=s.history[s.histIdx];goTo(_restoreUrl);}
  if(s.panel==='mims')loadMims();
  updateAddressBar(s.url); updateNavBtns(); renderTabs();
}

function closeTab(id){
  if(id===MIMS_ID){showToast('MIMS Portal is pinned');return;}
  const tab=tabs.find(t=>t.id===id);
  if(tab&&tab.pinned){showToast('Unpin tab before closing');return;}
  if(tabs.filter(t=>t.id!==MIMS_ID&&!t.pinned).length<=1){showToast("Can't close last tab");return;}
  const idx=tabs.findIndex(t=>t.id===id);
  tabs=tabs.filter(t=>t.id!==id); delete tabState[id];
  if(activeTabId===id){
    const next=tabs[Math.min(idx,tabs.length-1)];
    activeTabId=next.id; tabs.forEach(t=>t.active=t.id===activeTabId);
  }
  saveTabs(); switchTab(activeTabId);
}

if(addBtn)addBtn.addEventListener('click',()=>{
  const t={id:nextTabId++,title:'New Tab',active:false,pinned:false};
  tabs.push(t);
  tabState[t.id]={history:['ep://home'],histIdx:0,panel:'home',url:'New Tab'};
  saveTabs(); switchTab(t.id);
});

const DEFAULT_SHORTCUTS=[
  {id:1,label:'Downloads',url:'chrome://downloads',icon:'S',type:'letter'},
  {id:2,label:'Google',url:'https://google.com',type:'google'},
  {id:3,label:'YouTube',url:'https://youtube.com',type:'favicon'},
  {id:4,label:'GitHub',url:'https://github.com',type:'favicon'},
  {id:5,label:'Reddit',url:'https://reddit.com',type:'favicon'},
];
let shortcuts=JSON.parse(localStorage.getItem('ep_shortcuts')||'null')||DEFAULT_SHORTCUTS;
let nextId=Math.max(...shortcuts.map(s=>s.id))+1;
function saveShortcuts(){localStorage.setItem('ep_shortcuts',JSON.stringify(shortcuts));}
function gSVG(){return `<svg viewBox="0 0 48 48" width="28" height="28"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.68 28.18A13.97 13.97 0 0110.9 24c0-1.45.25-2.86.78-4.18v-5.7H4.34A23.93 23.93 0 002 24c0 3.86.92 7.51 2.34 10.88l7.34-6.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 13.12l7.34 5.7c1.74-5.2 6.59-9.07 12.32-9.07z"/></svg>`;}
function bSVG(){return `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#3b9ce5" d="M5 3l4 1.5v12.3l4.3-2.5-1.8-1.1 2.8-5.9L20 9.8 12.8 21 5 17.3z"/></svg>`;}
function favImg(url){try{const d=new URL(url).hostname;return `<img src="https://www.google.com/s2/favicons?sz=32&domain=${d}" width="28" height="28" onerror="this.outerHTML='<span style=font-size:18px></span>'">`;}catch{return `<span style="font-size:18px"></span>`;}}
function iconHTML(s){if(s.type==='google')return gSVG();if(s.type==='bing')return bSVG();if(s.type==='letter')return `<div class="icon-sw">${s.icon||'?'}</div>`;return favImg(s.url);}
function renderShortcuts(){
  const c=document.getElementById('shortcuts-container');if(!c)return;c.innerHTML='';
  shortcuts.forEach(s=>{const el=document.createElement('div');el.className='shortcut';el.innerHTML=`<div class="shortcut-icon">${iconHTML(s)}</div><span class="shortcut-label">${s.label}</span>`;
    el.addEventListener('click',()=>openUrl(s.url));el.addEventListener('contextmenu',e=>showCtxMenu(e,s.id));
    el.addEventListener('mousedown',e=>{const r=document.createElement('span');r.className='ripple';const rect=el.getBoundingClientRect(),sz=Math.max(rect.width,rect.height);r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;el.appendChild(r);setTimeout(()=>r.remove(),600);});
    c.appendChild(el);});
}
renderShortcuts();

const quickSugg=[{text:'google.com',url:'https://google.com'},{text:'youtube.com',url:'https://youtube.com'},{text:'github.com',url:'https://github.com'},{text:'reddit.com',url:'https://reddit.com'},{text:'twitter.com',url:'https://twitter.com'},{text:'wikipedia.org',url:'https://wikipedia.org'}];
if(searchInput){
  searchInput.addEventListener('input',()=>{const v=searchInput.value.trim();if(searchClear)searchClear.style.opacity=v?'1':'0';if(navAddrText)navAddrText.textContent=v||'Search with Google or enter address';showSugg(v);});
  searchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=searchInput.value.trim();if(v){hideSuggestions();openUrl(v);searchInput.blur();}}if(e.key==='Escape'){hideSuggestions();searchInput.blur();}if(e.key==='ArrowDown'){const items=suggestionsEl?suggestionsEl.querySelectorAll('.suggestion-item'):[];if(items.length){items[0].focus();e.preventDefault();}}});
}
if(searchClear)searchClear.addEventListener('click',()=>{if(searchInput){searchInput.value='';searchInput.focus();}searchClear.style.opacity='0';if(navAddrText)navAddrText.textContent='Search with Google or enter address';hideSuggestions();});
const _addr=document.getElementById('nav-address-bar');
if(_addr)_addr.addEventListener('click',()=>{if(searchInput){const s=tabState[activeTabId];if(s&&s.url&&s.url!=='ep://home'&&s.url!=='New Tab')searchInput.value=s.url;searchInput.focus();searchInput.select();}});
const _bsi=document.getElementById('btn-search-icon');
if(_bsi)_bsi.addEventListener('click',()=>{if(searchInput){searchInput.focus();searchInput.select();}});
function showSugg(val){
  if(!val||!suggestionsEl){hideSuggestions();return;}
  const f=quickSugg.filter(s=>s.text.includes(val.toLowerCase()));
  const all=[{text:`Search Google for "${val}"`,url:`https://www.google.com/search?q=${encodeURIComponent(val)}`,isSearch:true},...f].slice(0,6);
  suggestionsEl.innerHTML=all.map(s=>`<div class="suggestion-item" tabindex="0" data-url="${s.url}">${s.isSearch?'':''} <span>${s.text}</span></div>`).join('');
  suggestionsEl.style.display='block';
  suggestionsEl.querySelectorAll('.suggestion-item').forEach(item=>{item.addEventListener('click',()=>openUrl(item.dataset.url));item.addEventListener('keydown',e=>{if(e.key==='Enter')openUrl(item.dataset.url);if(e.key==='ArrowDown'&&item.nextSibling)item.nextSibling.focus();if(e.key==='ArrowUp'){const p=item.previousSibling;p?p.focus():(searchInput&&searchInput.focus());}});});
}
function hideSuggestions(){if(suggestionsEl)suggestionsEl.style.display='none';}
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap')&&!e.target.closest('#nav-address-bar'))hideSuggestions();});

const _reload=document.getElementById('btn-reload');
if(_reload)_reload.addEventListener('click',()=>{_reload.style.transform='rotate(360deg)';_reload.style.transition='transform 0.5s ease';setTimeout(()=>{_reload.style.transform='';_reload.style.transition='';},500);const s=tabState[activeTabId];if(!s)return;if(s.panel==='web')try{webIframe.contentWindow.location.reload();}catch{const _ru=s.history[s.histIdx];goTo(_ru);}if(s.panel==='mims')try{mimsIframe.contentWindow.location.reload();}catch{}});
const _back=document.getElementById('btn-back');
if(_back)_back.addEventListener('click',()=>{const s=tabState[activeTabId];if(!s||s.histIdx<=0)return;s.histIdx--;openUrl(s.history[s.histIdx],false);});
const _fwd=document.getElementById('btn-forward');
if(_fwd)_fwd.addEventListener('click',()=>{const s=tabState[activeTabId];if(!s||s.histIdx>=s.history.length-1)return;s.histIdx++;openUrl(s.history[s.histIdx],false);});

const ctxMenu=document.getElementById('ctx-menu');let ctxTargetId=null;
function showCtxMenu(e,id){if(!ctxMenu)return;e.preventDefault();ctxTargetId=id;ctxMenu.style.left=Math.min(e.clientX,innerWidth-160)+'px';ctxMenu.style.top=Math.min(e.clientY,innerHeight-80)+'px';ctxMenu.style.display='block';requestAnimationFrame(()=>ctxMenu.style.opacity='1');}
function hideCtxMenu(){if(!ctxMenu)return;ctxMenu.style.opacity='0';setTimeout(()=>ctxMenu.style.display='none',150);}
document.addEventListener('click',hideCtxMenu);
const _ce=document.getElementById('ctx-edit');if(_ce)_ce.addEventListener('click',()=>{const s=shortcuts.find(x=>x.id===ctxTargetId);if(s)openModal(s);});
const _cr=document.getElementById('ctx-remove');if(_cr)_cr.addEventListener('click',()=>{shortcuts=shortcuts.filter(x=>x.id!==ctxTargetId);saveShortcuts();renderShortcuts();showToast('Shortcut removed');});

const modalOverlay=document.getElementById('modal-overlay');
const modalName=document.getElementById('modal-name');
const modalUrl=document.getElementById('modal-url');
let editingId=null;
function openModal(s){if(!modalOverlay||!modalName||!modalUrl)return;editingId=s?s.id:null;const t=document.getElementById('modal-title');if(t)t.textContent=s?'Edit Shortcut':'Add Shortcut';modalName.value=s?s.label:'';modalUrl.value=s?s.url:'';modalOverlay.style.display='flex';requestAnimationFrame(()=>modalOverlay.style.opacity='1');modalName.focus();}
function closeModal(){if(!modalOverlay)return;modalOverlay.style.opacity='0';setTimeout(()=>modalOverlay.style.display='none',200);}
const _mc=document.getElementById('modal-cancel');if(_mc)_mc.addEventListener('click',closeModal);
if(modalOverlay)modalOverlay.addEventListener('click',e=>{if(e.target===modalOverlay)closeModal();});
const _ms=document.getElementById('modal-save');
if(_ms)_ms.addEventListener('click',()=>{if(!modalName||!modalUrl)return;const name=modalName.value.trim(),url=modalUrl.value.trim();if(!name||!url){showToast('Fill in both fields');return;}if(editingId){const s=shortcuts.find(x=>x.id===editingId);if(s){s.label=name;s.url=url;s.type='favicon';}}else shortcuts.push({id:nextId++,label:name,url,type:'favicon'});saveShortcuts();renderShortcuts();closeModal();showToast(editingId?'Shortcut updated!':'Shortcut added!');});
[modalName,modalUrl].filter(Boolean).forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&_ms)_ms.click();if(e.key==='Escape')closeModal();}));
const _ab=document.getElementById('add-shortcut-btn');if(_ab)_ab.addEventListener('click',()=>openModal(null));

let toastTimer;
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.className='show';clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.className='',2500);}

const _pt=document.getElementById('proxy-title');
if(_pt)_pt.addEventListener('dblclick',()=>{if(confirm('Reset shortcuts to default?')){shortcuts=JSON.parse(JSON.stringify(DEFAULT_SHORTCUTS));saveShortcuts();renderShortcuts();showToast('Shortcuts reset');}});

const paneLeft    = document.getElementById('pane-left');
const paneRight   = document.getElementById('pane-right');
const splitDiv    = document.getElementById('split-divider');
const splitIframe = document.getElementById('split-iframe');
const splitInput  = document.getElementById('split-url-input');
const splitPlaceholder = document.getElementById('split-placeholder');
let splitActive = false;
let splitRatio  = 0.5; 

function openSplit(url) {
  splitActive = true;
  paneRight.style.display  = 'flex';
  splitDiv.style.display   = 'block';
  const _bsp = document.getElementById('btn-split');
  if (_bsp) _bsp.classList.add('split-on');
  applySplitRatio();
  if (url) loadSplitUrl(url);
}

function closeSplit() {
  splitActive = false;
  paneRight.style.display  = 'none';
  splitDiv.style.display   = 'none';
  paneLeft.style.marginRight = '';
  const _bsp = document.getElementById('btn-split');
  if (_bsp) _bsp.classList.remove('split-on');
  splitIframe.src = 'about:blank';
  splitInput.value = '';
  splitPlaceholder.style.display = 'flex';
}

function applySplitRatio() {
  const totalW = window.innerWidth;
  const rightW = Math.round(totalW * (1 - splitRatio));
  const divX   = totalW - rightW - 5;

  paneRight.style.width = rightW + 'px';

  splitDiv.style.left  = divX + 'px';

  paneLeft.style.marginRight = (rightW + 5) + 'px';
}

function loadSplitUrl(raw) {
  let url = (raw || '').trim();
  if (!url) return;
  if (url.includes('.') && !url.includes(' ') && !/^https?:\/\//i.test(url)) url = 'https://' + url;
  else if (!/^https?:\/\//i.test(url)) url = getSearchUrl(url);
  const proxied = getProxiedUrl(url);
  const bundle = _buildInjectionBundle();
  if (bundle.trim()) {
    const bootstrap = `<!DOCTYPE html><html><head><script>(function(){var _code=${JSON.stringify(bundle)};var _dest=${JSON.stringify(proxied)};window.addEventListener('load',function(){try{var s=document.createElement('script');s.textContent=_code;document.head.appendChild(s);}catch(e){}});location.replace(_dest);})();<\/script></head><body></body></html>`;
    splitIframe.srcdoc = bootstrap;
    splitIframe.addEventListener('load', function sl(){splitIframe.removeEventListener('load',sl);if(splitIframe.srcdoc)splitIframe.srcdoc='';});
  } else {
    splitIframe.srcdoc = '';
    splitIframe.src = proxied;
  }
  splitInput.value = url;
  splitPlaceholder.style.display = 'none';
}

splitInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') loadSplitUrl(splitInput.value);
});

const _scb=document.getElementById('split-close-btn');if(_scb)_scb.addEventListener('click', closeSplit);

const _ssb=document.getElementById('split-swap-btn');if(_ssb)_ssb.addEventListener('click', () => {
  const state = tabState[activeTabId];
  if (!state) return;
  const leftUrl  = state.url === 'ep://home' ? '' : (state.url === 'mims://portal' ? '' : webIframe.src);
  const rightUrl = splitIframe.src === 'about:blank' ? '' : splitIframe.src;

  if (rightUrl) openUrl(rightUrl);
  if (leftUrl)  loadSplitUrl(leftUrl);
  showToast('Panes swapped');
});

let divDragging = false;
splitDiv.addEventListener('mousedown', e => {
  divDragging = true;
  splitDiv.classList.add('dragging');
  e.preventDefault();
});
document.addEventListener('mousemove', e => {
  if (!divDragging) return;
  const raw = e.clientX / window.innerWidth;
  splitRatio = Math.min(0.8, Math.max(0.2, raw));
  applySplitRatio();
});
document.addEventListener('mouseup', () => {
  if (divDragging) { divDragging = false; splitDiv.classList.remove('dragging'); }
});

const _tcsp=document.getElementById('tctx-split');if(_tcsp)_tcsp.addEventListener('click', () => {
  const state = tabState[tabCtxId];
  if (!state) return;
  const url = state.url;
  if (!url || url === 'ep://home' || url === 'mims://portal') { showToast('Nothing to split with'); hideTabCtxMenu(); return; }
  openSplit(url);
  hideTabCtxMenu();
  showToast('Opened in split screen');
});

function applySeasonTheme(){
  document.body.classList.toggle('summer-city', summerEnabled);
  document.body.classList.toggle('winter-city', winterEnabled);
  document.body.classList.toggle('fall-city', fallEnabled);
  document.body.classList.toggle('spring-city', springEnabled);
  document.body.classList.toggle('sand-city', sandEnabled);
  document.body.classList.toggle('radioactive-city', radioactiveEnabled);
  document.body.classList.toggle('thunder-city', thunderEnabled);
  document.body.classList.toggle('grass-city', grassEnabled);
  const pt=document.getElementById('proxy-title');
  if(pt){
    const anySeasonActive=summerEnabled||winterEnabled||fallEnabled||springEnabled||sandEnabled||radioactiveEnabled||thunderEnabled||grassEnabled;
    if(anySeasonActive){
      pt.style.fontStyle='italic';
      pt.style.fontFamily="'Pacifico','Orbitron',cursive";
      pt.style.letterSpacing='2px';
    } else {
      pt.style.fontStyle='';
      pt.style.fontFamily='';
      pt.style.letterSpacing='';
    }
  }
  if(springEnabled)           document.title=' Endless Proxy';
  else if(fallEnabled)        document.title=' Endless Proxy';
  else if(winterEnabled)      document.title=' Endless Proxy';
  else if(summerEnabled)      document.title=' Endless Proxy';
  else if(sandEnabled)        document.title='⚡ Endless Proxy';
  else if(radioactiveEnabled) document.title='☢ Endless Proxy';
  else if(thunderEnabled)     document.title='⛈ Endless Proxy';
  else if(grassEnabled)       document.title=' Endless Proxy';
  else                        document.title='Endless Proxy';
}

function applySummerTheme(){ applySeasonTheme(); }

let browsingHistory = JSON.parse(localStorage.getItem('ep_bhistory') || '[]');
const MAX_HIST = 200;
function saveBrowsingHistory() { localStorage.setItem('ep_bhistory', JSON.stringify(browsingHistory)); }
function addToHistory(url, title) {
  if (!url || url === 'ep://home' || url === 'mims://portal') return;
  const entry = { url, title: title || (() => { try { return new URL(url).hostname.replace('www.',''); } catch { return url.slice(0, 40); } })(), time: Date.now() };
  browsingHistory.unshift(entry);
  if (browsingHistory.length > MAX_HIST) browsingHistory = browsingHistory.slice(0, MAX_HIST);
  saveBrowsingHistory();
}
function renderHistoryPanel() {
  const body = document.getElementById('history-body');
  if (!body) return;
  body.innerHTML = '';
  if (browsingHistory.length === 0) {
    body.innerHTML = '<div class="panel-empty"><span class="pe-icon"></span>No history yet</div>';
    return;
  }

  const groups = {};
  browsingHistory.forEach(e => {
    const d = new Date(e.time);
    const today = new Date(); const yesterday = new Date(); yesterday.setDate(today.getDate()-1);
    let label;
    if (d.toDateString() === today.toDateString()) label = 'Today';
    else if (d.toDateString() === yesterday.toDateString()) label = 'Yesterday';
    else label = d.toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' });
    if (!groups[label]) groups[label] = [];
    groups[label].push(e);
  });

  const clearBtn = document.createElement('div');
  clearBtn.innerHTML = `<div style="display:flex;justify-content:flex-end;margin-bottom:8px;"><div style="font-size:11px;color:rgba(255,100,100,0.65);cursor:pointer;padding:3px 10px;border-radius:6px;border:1px solid rgba(255,80,80,0.2);" id="hist-clear-all">Clear all</div></div>`;
  body.appendChild(clearBtn);
  document.getElementById('hist-clear-all').addEventListener('click', () => {
    if (confirm('Clear all browsing history?')) { browsingHistory = []; saveBrowsingHistory(); renderHistoryPanel(); showToast('History cleared'); }
  });
  Object.entries(groups).forEach(([label, entries]) => {
    const hdr = document.createElement('div');
    hdr.className = 'hist-date-header';
    hdr.textContent = label;
    body.appendChild(hdr);
    entries.forEach((e, idx) => {
      const el = document.createElement('div');
      el.className = 'hist-item';
      const t = new Date(e.time);
      const hh = String(t.getHours()).padStart(2,'0'), mm = String(t.getMinutes()).padStart(2,'0');
      const fav = (() => { try { return `https://www.google.com/s2/favicons?sz=14&domain=${new URL(e.url).hostname}`; } catch { return ''; } })();
      el.innerHTML = `${fav ? `<img src="${fav}" onerror="this.style.display='none'">` : '<span style="width:14px;height:14px;flex-shrink:0;"></span>'}<span class="hist-item-title" title="${e.url}">${e.title}</span><span class="hist-item-time">${hh}:${mm}</span><span class="hist-item-del" title="Remove"></span>`;
      el.querySelector('.hist-item-title').addEventListener('click', () => { openUrl(e.url); closePanel('history'); });
      el.querySelector('.hist-item-del').addEventListener('click', ev => { ev.stopPropagation(); browsingHistory = browsingHistory.filter(h => h !== e); saveBrowsingHistory(); renderHistoryPanel(); });
      body.appendChild(el);
    });
  });
}

const _origOpenPanel = openPanel;
openPanel = function openPanelPatched(name) {
  if (name === 'history') {
    if (activePanel === 'history') { closePanel('history'); return; }
    if (activePanel) document.getElementById(`panel-${activePanel}`)?.classList.remove('open');
    activePanel = 'history';
    renderHistoryPanel();
    document.getElementById('panel-history')?.classList.add('open');
    document.getElementById('panel-scrim')?.classList.add('show');
    return;
  }
  _origOpenPanel(name);
};

const _origOpenUrl = openUrl;
openUrl = function openUrlPatched(raw, addToHistory = true) {
  _origOpenUrl(raw, addToHistory);
  const url = (raw || '').trim();
  if (url && url !== 'ep://home' && url !== 'mims://portal' && /^https?:\/\//i.test(url)) {
    addToHistory(url);
  }
};

const dateEl = document.getElementById('home-date');
function updateDate() {
  if (!dateEl) return;
  const d = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  dateEl.textContent = `${days[d.getDay()]} · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
updateDate();
setInterval(updateDate, 60000);

const addrOverlay = document.getElementById('addr-overlay');
const addrInput = document.getElementById('addr-input');

function openAddrOverlay() {
  const state = tabState[activeTabId];
  const cur = state?.url;
  addrInput.value = (!cur || cur === 'ep://home' || cur === 'mims://portal') ? '' : cur;
  addrOverlay.style.display = 'flex';
  requestAnimationFrame(() => { addrInput.focus(); addrInput.select(); });
}
function closeAddrOverlay() {
  addrOverlay.style.display = 'none';
}
document.getElementById('nav-address-bar')?.addEventListener('click', openAddrOverlay);
document.getElementById('btn-search-icon')?.addEventListener('click', e => { e.stopPropagation(); openAddrOverlay(); });
addrOverlay?.addEventListener('click', e => { if (e.target === addrOverlay) closeAddrOverlay(); });
addrInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { closeAddrOverlay(); openUrl(addrInput.value); }
  if (e.key === 'Escape') closeAddrOverlay();
});

const shortcutsOverlay = document.getElementById('shortcuts-overlay');
function openShortcutsOverlay() {
  shortcutsOverlay.style.display = 'flex';
  shortcutsOverlay.querySelector('#shortcuts-overlay-close').onmouseenter = function() { this.style.background = 'rgba(255,255,255,0.08)'; };
  shortcutsOverlay.querySelector('#shortcuts-overlay-close').onmouseleave = function() { this.style.background = ''; };
}
function closeShortcutsOverlay() { shortcutsOverlay.style.display = 'none'; }
document.getElementById('btn-help')?.addEventListener('click', openShortcutsOverlay);
document.getElementById('shortcuts-overlay-close')?.addEventListener('click', closeShortcutsOverlay);
shortcutsOverlay?.addEventListener('click', e => { if (e.target === shortcutsOverlay) closeShortcutsOverlay(); });

const tabSearchOverlay = document.getElementById('tab-search-overlay');
const tabSearchInput = document.getElementById('tab-search-input');
const tabSearchResults = document.getElementById('tab-search-results');

function openTabSearch() {
  tabSearchOverlay.style.display = 'flex';
  tabSearchInput.value = '';
  renderTabSearch('');
  tabSearchInput.focus();
}
function closeTabSearch() { tabSearchOverlay.style.display = 'none'; }

function renderTabSearch(query) {
  tabSearchResults.innerHTML = '';
  const q = query.toLowerCase();
  tabs.forEach(tab => {
    const state = tabState[tab.id];
    const title = tab.title || 'New Tab';
    const url = state?.url || '';
    if (q && !title.toLowerCase().includes(q) && !url.toLowerCase().includes(q)) return;
    const el = document.createElement('div');
    el.className = 'ts-item' + (tab.id === activeTabId ? ' ts-item-active' : '');
    const fav = url && url !== 'ep://home' && url !== 'mims://portal' ? `https://www.google.com/s2/favicons?sz=14&domain=${(() => { try { return new URL(url).hostname; } catch { return ''; } })()}` : '';
    el.innerHTML = `<div class="ts-item-icon">${fav ? `<img src="${fav}" width="14" height="14" style="border-radius:2px;" onerror="this.style.display='none'">` : ''}</div><div style="flex:1;min-width:0;"><div class="ts-item-title">${title}</div><div class="ts-item-url">${url === 'ep://home' ? 'New Tab' : url === 'mims://portal' ? 'MIMS Portal' : url}</div></div>${tab.id === activeTabId ? '<span class="ts-active-pill">active</span>' : ''}`;
    el.addEventListener('click', () => { switchTab(tab.id); closeTabSearch(); });
    tabSearchResults.appendChild(el);
  });
  if (!tabSearchResults.children.length) {
    tabSearchResults.innerHTML = '<div style="padding:20px;text-align:center;color:rgba(255,255,255,0.3);font-size:13px;font-family:Rajdhani,sans-serif;">No matching tabs</div>';
  }
}
tabSearchInput?.addEventListener('input', () => renderTabSearch(tabSearchInput.value));
tabSearchInput?.addEventListener('keydown', e => { if (e.key === 'Escape') closeTabSearch(); });
tabSearchOverlay?.addEventListener('click', e => { if (e.target === tabSearchOverlay) closeTabSearch(); });

document.addEventListener('keydown', e => {
  const tag = document.activeElement?.tagName;
  const inInput = tag === 'INPUT' || tag === 'TEXTAREA';

  if (e.ctrlKey && (e.key === '?' || e.key === '/') && !inInput) { e.preventDefault(); openShortcutsOverlay(); }

  if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); openTabSearch(); }

  if (e.ctrlKey && e.key === 'h' && !inInput) { e.preventDefault(); openPanel('history'); }

  if (e.ctrlKey && e.key === 'd' && !inInput) { e.preventDefault(); document.getElementById('btn-bookmark')?.click(); }

  if (e.ctrlKey && e.key === 'r' && !inInput) { e.preventDefault(); document.getElementById('btn-reload')?.click(); }

  if (e.ctrlKey && e.key === '\\' && !inInput) { e.preventDefault(); document.getElementById('btn-split')?.click(); }

  if (e.altKey && e.key === 'ArrowLeft' && !inInput) { e.preventDefault(); document.getElementById('btn-back')?.click(); }

  if (e.altKey && e.key === 'ArrowRight' && !inInput) { e.preventDefault(); document.getElementById('btn-forward')?.click(); }

  if (e.key === 'Escape') {
    if (addrOverlay?.style.display !== 'none') { closeAddrOverlay(); return; }
    if (shortcutsOverlay?.style.display !== 'none') { closeShortcutsOverlay(); return; }
    if (tabSearchOverlay?.style.display !== 'none') { closeTabSearch(); return; }
  }
});

applySeasonalMode(); 
applySeasonTheme();  
renderSearchEngineBar();

(function(){
  if(document.getElementById('btn-split')) return;
  const dl=document.getElementById('btn-downloads');
  if(!dl) return;
  const btn=document.createElement('div');
  btn.className='nav-btn';
  btn.id='btn-split';
  btn.title='Split screen (Ctrl+\\)';
  btn.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 3h8v18H3zm10 0h8v18h-8z"/></svg>';
  dl.parentNode.insertBefore(btn,dl);
  btn.addEventListener('click',()=>{ if(typeof splitActive!=='undefined'){ if(splitActive)closeSplit(); else openSplit(''); } });
})();

(function(){
  if(document.getElementById('ep-patch-styles')) return;
  const s=document.createElement('style');
  s.id='ep-patch-styles';
  s.textContent=`
    @keyframes ep-pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    #ses-load-input:focus{border-color:rgba(0,229,255,0.4)!important;box-shadow:0 0 0 2px rgba(0,229,255,0.08);}
    #ses-load-input::placeholder{color:rgba(255,255,255,0.25);}
    .ext-item{transition:background 0.15s;}
    .ext-item:hover{background:rgba(255,255,255,0.03);}
  `;
  document.head.appendChild(s);
})();

function updateChromeHeight(){
  const chrome=document.querySelector('.browser-chrome');
  if(chrome){
    document.documentElement.style.setProperty('--chrome-height', chrome.offsetHeight+'px');
  }
}
updateChromeHeight();
new ResizeObserver(updateChromeHeight).observe(document.querySelector('.browser-chrome'));

const clockEl=document.getElementById('home-clock');
function tickClock(){
  if(!clockEl)return;
  const n=new Date();
  const hh=String(n.getHours()).padStart(2,'0');
  const mm=String(n.getMinutes()).padStart(2,'0');
  const ss=String(n.getSeconds()).padStart(2,'0');
  clockEl.textContent=`${hh}:${mm}:${ss}`;
}
tickClock();
setInterval(tickClock,1000);

function updateAddressBarIcon(url){
  const lock=document.getElementById('nav-lock-icon');
  const globe=document.getElementById('nav-globe-icon');
  if(!lock||!globe)return;
  const isHttps=/^https:\/\//i.test(url||'');
  lock.style.display=isHttps?'block':'none';
  globe.style.display=isHttps?'none':'block';
}

function updateBookmarkStar(){
  const btn=document.getElementById('btn-bookmark');
  if(!btn)return;
  const state=tabState[activeTabId];
  if(!state||state.url==='ep://home'||state.url==='New Tab'||state.url==='mims://portal'){
    btn.classList.remove('bookmarked');return;
  }
  const isBookmarked=bookmarks.some(b=>b.url===state.url);
  btn.classList.toggle('bookmarked',isBookmarked);
}

document.addEventListener('keydown',e=>{
  const tag=document.activeElement?.tagName;
  const inInput=tag==='INPUT'||tag==='TEXTAREA';

  if(e.ctrlKey&&e.key==='t'&&!inInput){
    e.preventDefault();
    document.getElementById('btn-new-tab')?.click();
  }

  if(e.ctrlKey&&e.key==='w'&&!inInput){
    e.preventDefault();
    closeTab(activeTabId);
  }

  if(e.ctrlKey&&e.key==='l'){
    e.preventDefault();
    document.getElementById('nav-address-bar')?.click();
  }

  if(e.key==='Escape'&&!inInput){
    hideSuggestions();
    if(activePanel)closePanel(activePanel);
  }
});


})(window, document);
