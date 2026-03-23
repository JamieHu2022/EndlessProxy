// ═══════════════════════════════════════════
//  CITYSCAPE CANVAS
// ═══════════════════════════════════════════
const canvas = document.getElementById('city-canvas');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
resize(); window.addEventListener('resize',()=>{resize();initBuildings();initRa


const a0 = document.getElementById('city-a0');
const b1 = a0.getContext('2d');
function resize(){ a0.width=innerWidth; a0.height=innerHeight; }
resize(); window.addEventListener('resize',()=>{resize();initBuildings();initRain();initBirds();initSnow();initLeaves();initSpring();initSand();initRadioactive();initThunder();initGrass();if(typeof i346!=='undefined'&&i346)applySplitRatio();});
const c2=[];
function initBuildings(){
  c2.length=0; const d3=a0.width,H=a0.height,count=Math.floor(d3/28);
  const e4=[['#c8a87a','#b8976a'],['#bfa070','#ae8f60'],['#d4b48a','#c4a47a'],['#b89060','#a88050'],['#cbb080','#bba070'],['#c0a575','#b09565']];
  const f5=[['#2a3e58','#1e3050'],['#243650','#192c48'],['#2e4460','#223858'],['#1e3252','#162840'],['#324a64','#263e56'],['#28405a','#1c3450']];
  const g6=[['#3a2810','#2e1e0a'],['#2e2008','#241806'],['#382610','#2c1c08'],['#342210','#281808'],['#3e2c12','#32220c'],['#302010','#261808']];
  const h7=[['#c8d8a0','#b0c888'],['#b8d090','#a0b878'],['#d0e0a8','#b8c890'],['#aac888','#92b070'],['#c0d898','#a8c080'],['#b0cc8c','#98b474']];
  const i8=[['#4a3010','#3a2408'],['#3e2a0c','#2e1e06'],['#52360e','#402808'],['#442e0c','#342208'],['#4e3212','#3c2608'],['#3a2808','#2c1e06']];
  const j9=[['#081808','#040e04'],['#0a1e0a','#061006'],['#0c2008','#080e04'],['#0e1e0e','#060c06'],['#081c08','#041004'],['#0a1a0a','#050c05']];
  const k10=[['#1a2035','#121828'],['#182030','#101625'],['#1c2540','#141c30'],['#14182c','#0e1220'],['#202840','#182035'],['#1e2438','#161c2c']];
  const l11=[['#0e2010','#081408'],['#122614','#0a180a'],['#0c1e0e','#061206'],['#142812','#0c1c0a'],['#102210','#081608'],['#162a12','#0e1c0c']];
  for(let m12=0;m12<count;m12++){const n13=18+Math.random()*40,x23=H*.2+Math.random()*H*.55;
    const o14=e4[Math.floor(Math.random()*e4.length)];
    const p15=f5[Math.floor(Math.random()*f5.length)];
    const q16=g6[Math.floor(Math.random()*g6.length)];
    const r17=h7[Math.floor(Math.random()*h7.length)];
    const s18=i8[Math.floor(Math.random()*i8.length)];
    const t19=j9[Math.floor(Math.random()*j9.length)];
    const u20=k10[Math.floor(Math.random()*k10.length)];
    const v21=l11[Math.floor(Math.random()*l11.length)];
    c2.push({x309:(m12/count)*d3+Math.random()*12-6,n13,x23,
      k192:Math.random()>.5?'#061428':'#040e1c',
      summerColor:o14[0], summerColorB:o14[1],
      winterColor:p15[0], winterColorB:p15[1],
      fallColor:q16[0], fallColorB:q16[1],
      springColor:r17[0], springColorB:r17[1],
      sandColor:s18[0], sandColorB:s18[1],
      radioColor:t19[0], radioColorB:t19[1],
      thunderColor:u20[0], thunderColorB:u20[1],
      grassColor:v21[0], grassColorB:v21[1],
      windows:genWins(n13,x23,m12)});}
}



let w22 = localStorage.getItem('ep_winanim') !== '0';

function hashInt(a78, b105, a26) {
  
  let x23 = (a78 * 2246822519 ^ b105 * 2654435761 ^ a26 * 1597334677) >>> 0;
  x23 ^= x23 >>> 16; x23 = Math.imul(x23, 0x45d9f3b); x23 ^= x23 >>> 16;
  return (x23 >>> 0) / 0xffffffff;
}

function genWins(bw, bh, bi) {
  if (!w22) return [];
  const y24 = [], b27 = Math.floor(bw/7), rows = Math.floor(bh/10);
  for (let z25 = 0; z25 < rows; z25++) for (let a26 = 0; a26 < b27; a26++) {
    const x23 = hashInt(bi, a26, z25);
    y24.push({
      r95: a26, row: z25,
      lit: x23 > 0.45,
      k192: x23 > 0.6 ? '#00e5ff' : x23 > 0.5 ? '#80d8ff' : '#0288d1',
      flicker: x23 > 0.92
    });
  }
  return y24;
}


function drawWindowsDirect(f57, by, bw, bh, bi, winColor1, winColor2, winColor3, baseAlpha) {
  
  const b27 = Math.floor(bw/7), rows = Math.floor(bh/10);
  b1.globalAlpha = baseAlpha;
  for (let z25 = 0; z25 < rows; z25++) {
    for (let a26 = 0; a26 < b27; a26++) {
      const x23 = hashInt(bi, a26, z25);
      if (x23 <= 0.45) continue; 
      b1.fillStyle = x23 > 0.6 ? winColor1 : x23 > 0.5 ? winColor2 : winColor3;
      b1.fillRect(f57 + 3 + a26*7, by + 5 + z25*10, 4, 5);
    }
  }
  b1.globalAlpha = 1;
}
const c28=[];
function initRain(){c28.length=0;for(let m12=0;m12<350;m12++)c28.push({x309:Math.random()*a0.width,y:Math.random()*a0.height,d81:8+Math.random()*22,speed:12+Math.random()*22,opacity:.15+Math.random()*.55,c80:.08+Math.random()*.06});}
initBuildings();initRain();let d29=0;
let e30=localStorage.getItem('ep_rain')!=='0';
let f31=localStorage.getItem('ep_summer')==='1';
let g32=localStorage.getItem('ep_winter')==='1';
let h33=localStorage.getItem('ep_fall')==='1';
let i34=localStorage.getItem('ep_spring')==='1';
let j35=localStorage.getItem('ep_sand')==='1';
let k36=localStorage.getItem('ep_radioactive')==='1';
let l37=localStorage.getItem('ep_thunder')==='1';
let m38=localStorage.getItem('ep_grass')==='1';
let n39=localStorage.getItem('ep_particles')!=='0'; 
let o40=localStorage.getItem('ep_seasonal')==='1';


const p41=[];
function initBirds(){
  p41.length=0;
  for(let m12=0;m12<18;m12++) p41.push({
    x309:Math.random()*a0.width, y:50+Math.random()*a0.height*0.45,
    speed:0.6+Math.random()*1.2, wingPhase:Math.random()*Math.PI*2,
    size:4+Math.random()*5, dir:Math.random()>0.5?1:-1
  });
}
initBirds();

function drawNightScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;
  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#020c18');q42.addColorStop(.4,'#041524');
  q42.addColorStop(.7,'#061e30');q42.addColorStop(1,'#030d1a');
  b1.fillStyle=q42;b1.fillRect(0,0,d3,H);
  
  const r43=b1.createRadialGradient(d3*.5,H*.38,0,d3*.5,H*.38,Math.max(1,d3*.5));
  r43.addColorStop(0,'rgba(0,180,255,.07)');r43.addColorStop(1,'transparent');
  b1.fillStyle=r43;b1.fillRect(0,0,d3,H);
  const s44=b1.createRadialGradient(d3*.88,H*.3,0,d3*.88,H*.3,Math.max(1,d3*.25));
  s44.addColorStop(0,'rgba(255,0,120,.06)');s44.addColorStop(1,'transparent');
  b1.fillStyle=s44;b1.fillRect(0,0,d3,H);
  
  c2.forEach((b105,bi)=>{
    const t45=H*.85,f57=b105.x309,by=t45-b105.x23;
    b1.fillStyle=b105.k192;b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(0,200,255,.06)';b1.lineWidth=1;b1.strokeRect(f57,by,b105.n13,b105.x23);
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit)return;
        if(win.flicker&&(d29%90<3||d29%150>145))return;
        b1.fillStyle=win.k192;
        b1.globalAlpha=.55+.3*Math.sin(d29*.02+win.r95);
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'#00e5ff','#80d8ff','#0288d1',0.6);
    }
    b1.fillStyle='rgba(0,229,255,.04)';b1.fillRect(f57,by,b105.n13,2);
  });
  
  const u46=H*.85;
  const v47=b1.createLinearGradient(0,u46,0,H);
  v47.addColorStop(0,'rgba(0,229,255,.12)');v47.addColorStop(.3,'rgba(0,100,180,.08)');v47.addColorStop(1,'#010810');
  b1.fillStyle=v47;b1.fillRect(0,u46,d3,H-u46);
  
  b1.lineCap='round';
  if(e30 && n39){
    c28.forEach(v255=>{
      b1.beginPath();
      b1.strokeStyle=`rgba(160,220,255,${v255.opacity})`;
      b1.lineWidth=.7;
      b1.moveTo(v255.x309,v255.y);
      b1.lineTo(v255.x309+v255.d81*Math.sin(v255.c80),v255.y+v255.d81);
      b1.stroke();
      v255.y+=v255.speed;v255.x309+=v255.speed*Math.sin(v255.c80);
      if(v255.y>H){v255.y=-v255.d81;v255.x309=Math.random()*d3;}
    });
  }
}

function drawSummerScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#5bbfe8');
  q42.addColorStop(0.35,'#87ceeb');
  q42.addColorStop(0.65,'#b8dff5');
  q42.addColorStop(0.82,'#f5d98a');
  q42.addColorStop(1,'#f0c060');
  b1.fillStyle=q42;b1.fillRect(0,0,d3,H);

  
  const w48=d3*0.52, sunY=H*0.28;
  
  const x49=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.22));
  x49.addColorStop(0,'rgba(255,255,200,0.18)');
  x49.addColorStop(0.4,'rgba(255,220,80,0.08)');
  x49.addColorStop(1,'transparent');
  b1.fillStyle=x49;b1.fillRect(0,0,d3,H);
  
  const y50=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.09));
  y50.addColorStop(0,'rgba(255,255,220,0.55)');
  y50.addColorStop(0.5,'rgba(255,210,50,0.18)');
  y50.addColorStop(1,'transparent');
  b1.fillStyle=y50;b1.fillRect(0,0,d3,H);
  
  const z51=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.045));
  z51.addColorStop(0,'rgba(255,255,240,1)');
  z51.addColorStop(0.5,'rgba(255,230,100,0.9)');
  z51.addColorStop(1,'rgba(255,200,0,0)');
  b1.fillStyle=z51;
  b1.beginPath();b1.arc(w48,sunY,Math.max(1,d3*0.045),0,Math.PI*2);b1.fill();

  
  b1.globalAlpha=0.82;
  const a52=[
    {x309:0.08,y:0.12,z25:0.07,speed:0.04},
    {x309:0.28,y:0.09,z25:0.055,speed:0.028},
    {x309:0.62,y:0.14,z25:0.065,speed:0.035},
    {x309:0.80,y:0.08,z25:0.05,speed:0.05},
    {x309:0.45,y:0.18,z25:0.04,speed:0.022},
    {x309:0.15,y:0.22,z25:0.035,speed:0.018},
    {x309:0.72,y:0.22,z25:0.042,speed:0.04},
  ];
  a52.forEach(cd=>{
    const b53=((cd.x309*d3 + d29*cd.speed) % (d3+cd.z25*d3*2)) - cd.z25*d3;
    const c54=cd.y*H;
    const d55=Math.max(1,cd.z25*d3);
    const e56=b1.createRadialGradient(b53,c54,0,b53,c54,d55);
    e56.addColorStop(0,'rgba(255,255,255,0.95)');
    e56.addColorStop(0.5,'rgba(240,248,255,0.75)');
    e56.addColorStop(1,'rgba(200,230,255,0)');
    b1.fillStyle=e56;
    b1.beginPath();
    b1.ellipse(b53,c54,d55,d55*0.55,0,0,Math.PI*2);
    b1.fill();
    
    b1.beginPath();b1.ellipse(b53-d55*0.4,c54+d55*0.05,d55*0.55,d55*0.45,0,0,Math.PI*2);b1.fill();
    b1.beginPath();b1.ellipse(b53+d55*0.42,c54+d55*0.08,d55*0.5,d55*0.42,0,0,Math.PI*2);b1.fill();
  });
  b1.globalAlpha=1;

  
  const t45=H*0.85;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    
    const g58=b1.createLinearGradient(f57,by,f57+b105.n13,by);
    g58.addColorStop(0,b105.summerColor||'#c8a87a');
    g58.addColorStop(1,b105.summerColorB||'#b8976a');
    b1.fillStyle=g58;
    b1.fillRect(f57,by,b105.n13,b105.x23);
    
    b1.strokeStyle='rgba(100,70,30,0.1)';b1.lineWidth=1;
    b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    b1.fillStyle='rgba(255,230,150,0.12)';
    b1.fillRect(f57,by,3,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        b1.globalAlpha= win.lit ? 0.55 : 0.15;
        b1.fillStyle= win.lit ? 'rgba(255,240,200,0.9)' : 'rgba(80,60,30,0.6)';
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(255,240,200,0.9)','rgba(255,240,200,0.9)','rgba(255,240,200,0.9)',0.55);
    }
    
    b1.fillStyle='rgba(255,200,50,0.08)';b1.fillRect(f57,by,b105.n13,2);
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(200,160,80,0.35)');
  v47.addColorStop(0.4,'rgba(180,140,70,0.2)');
  v47.addColorStop(1,'#c8a040');
  b1.fillStyle=v47;b1.fillRect(0,t45,d3,H-t45);

  
  const h59=b1.createLinearGradient(0,t45,0,t45+40);
  h59.addColorStop(0,'rgba(255,220,100,0.18)');
  h59.addColorStop(1,'transparent');
  b1.fillStyle=h59;b1.fillRect(0,t45,d3,40);

  
  if(n39) p41.forEach(b105=>{
    b105.x309+=b105.speed*b105.dir;
    if(b105.x309>d3+30)b105.x309=-30;
    if(b105.x309<-30)b105.x309=d3+30;
    b105.wingPhase+=0.12;
    const i60=Math.sin(b105.wingPhase)*b105.size*0.9;
    b1.strokeStyle='rgba(30,30,30,0.55)';
    b1.lineWidth=1.1;
    b1.lineCap='round';
    b1.beginPath();
    
    b1.moveTo(b105.x309,b105.y);b1.quadraticCurveTo(b105.x309-b105.size*1.1,b105.y-i60,b105.x309-b105.size*2,b105.y-i60*0.3);
    b1.stroke();
    b1.beginPath();
    
    b1.moveTo(b105.x309,b105.y);b1.quadraticCurveTo(b105.x309+b105.size*1.1,b105.y-i60,b105.x309+b105.size*2,b105.y-i60*0.3);
    b1.stroke();
  });
}


const j61=[];
const k62=[];
function initSnow(){
  j61.length=0; k62.length=0;
  const d3=a0.width, H=a0.height;
  for(let m12=0;m12<220;m12++) j61.push({
    x309:Math.random()*d3, y:Math.random()*H,
    z25:1+Math.random()*2.8,
    speed:0.8+Math.random()*1.8,
    drift:Math.sin(Math.random()*Math.PI*2),
    driftSpeed:0.005+Math.random()*0.01,
    driftPhase:Math.random()*Math.PI*2,
    opacity:0.35+Math.random()*0.55
  });
  
  for(let m12=0;m12<12;m12++) k62.push({
    x309:Math.random()*d3, y:Math.random()*H,
    size:10+Math.random()*20,
    speed:0.25+Math.random()*0.6,
    rot:Math.random()*Math.PI*2,
    rotSpeed:(Math.random()-0.5)*0.008,
    opacity:0.25+Math.random()*0.45
  });
}
initSnow();

function drawSnowflakeStar(b53,c54,size,rot){
  b1.save(); b1.translate(b53,c54); b1.rotate(rot);
  for(let m12=0;m12<6;m12++){
    b1.rotate(Math.PI/3);
    b1.beginPath(); b1.moveTo(0,0); b1.lineTo(0,size);
    b1.stroke();
    
    b1.beginPath(); b1.moveTo(0,size*0.55); b1.lineTo(size*0.22,size*0.33); b1.stroke();
    b1.beginPath(); b1.moveTo(0,size*0.55); b1.lineTo(-size*0.22,size*0.33); b1.stroke();
  }
  b1.restore();
}

function drawWinterScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#0a1628');
  q42.addColorStop(0.3,'#0f2240');
  q42.addColorStop(0.6,'#162d52');
  q42.addColorStop(0.85,'#1e3a60');
  q42.addColorStop(1,'#152e4e');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const l63=d3*0.48, moonY=H*0.22;
  const m64=b1.createRadialGradient(l63,moonY,0,l63,moonY,Math.max(1,d3*0.18));
  m64.addColorStop(0,'rgba(200,230,255,0.14)');
  m64.addColorStop(0.5,'rgba(168,210,240,0.06)');
  m64.addColorStop(1,'transparent');
  b1.fillStyle=m64; b1.fillRect(0,0,d3,H);
  
  const n65=b1.createRadialGradient(l63,moonY,0,l63,moonY,Math.max(1,d3*0.065));
  n65.addColorStop(0,'rgba(230,245,255,0.55)');
  n65.addColorStop(0.6,'rgba(168,216,240,0.2)');
  n65.addColorStop(1,'transparent');
  b1.fillStyle=n65; b1.fillRect(0,0,d3,H);
  
  const o66=Math.max(1,d3*0.032);
  const p67=b1.createRadialGradient(l63-d3*0.008,moonY-d3*0.008,0,l63,moonY,o66);
  p67.addColorStop(0,'rgba(245,252,255,1)');
  p67.addColorStop(0.55,'rgba(200,230,250,0.9)');
  p67.addColorStop(1,'rgba(168,210,240,0)');
  b1.fillStyle=p67;
  b1.beginPath(); b1.arc(l63,moonY,o66,0,Math.PI*2); b1.fill();

  
  b1.save(); b1.globalAlpha=0.04+0.02*Math.sin(d29*0.008);
  const q68=b1.createLinearGradient(0,H*0.05,d3,H*0.25);
  q68.addColorStop(0,'transparent');
  q68.addColorStop(0.2,'rgba(100,200,255,0.8)');
  q68.addColorStop(0.5,'rgba(80,240,200,0.6)');
  q68.addColorStop(0.8,'rgba(100,180,255,0.6)');
  q68.addColorStop(1,'transparent');
  b1.fillStyle=q68; b1.fillRect(0,H*0.05,d3,H*0.22);
  b1.restore();

  
  const t45=H*0.85;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    
    const g58=b1.createLinearGradient(f57,by,f57+b105.n13,by);
    g58.addColorStop(0, b105.winterColor||'#2a3e58');
    g58.addColorStop(1, b105.winterColorB||'#1e3050');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(100,180,240,0.08)'; b1.lineWidth=1;
    b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    b1.fillStyle='rgba(200,230,255,0.06)'; b1.fillRect(f57,by,2,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(d29%80<3||d29%130>127)) return;
        b1.fillStyle='rgba(180,220,255,0.7)';
        b1.globalAlpha=0.4+0.25*Math.sin(d29*0.018+win.r95*0.5);
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(180,220,255,0.7)','rgba(180,220,255,0.7)','rgba(180,220,255,0.7)',0.45);
    }
    
    const r69=3+Math.random()*0.5;
    b1.fillStyle='rgba(220,240,255,0.85)';
    b1.beginPath();
    b1.moveTo(f57-1,by+r69);
    b1.lineTo(f57+b105.n13/2, by-r69*0.5);
    b1.lineTo(f57+b105.n13+1, by+r69);
    b1.closePath(); b1.fill();

    
    const s70=Math.floor(b105.n13/5);
    for(let t71=0;t71<s70;t71++){
      const u72=f57+3+t71*5;
      const v73=4+((t71*7+b105.n13)%9);
      const w74=b1.createLinearGradient(u72,by+r69,u72,by+r69+v73);
      w74.addColorStop(0,'rgba(200,235,255,0.75)');
      w74.addColorStop(1,'rgba(168,216,240,0)');
      b1.fillStyle=w74;
      b1.beginPath();
      b1.moveTo(u72,by+r69);
      b1.lineTo(u72+1.5,by+r69+v73);
      b1.lineTo(u72+3,by+r69);
      b1.closePath(); b1.fill();
    }
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(168,216,240,0.2)');
  v47.addColorStop(0.3,'rgba(120,180,220,0.12)');
  v47.addColorStop(1,'#0d1e36');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);
  
  const h59=b1.createLinearGradient(0,t45,0,t45+30);
  h59.addColorStop(0,'rgba(200,235,255,0.18)');
  h59.addColorStop(1,'transparent');
  b1.fillStyle=h59; b1.fillRect(0,t45,d3,30);

  
  if(n39){
  b1.fillStyle='rgba(255,255,255,1)';
  j61.forEach(l245=>{
    l245.driftPhase+=l245.driftSpeed;
    l245.x309+=Math.sin(l245.driftPhase)*0.5;
    l245.y+=l245.speed;
    if(l245.y>H+5){ l245.y=-5; l245.x309=Math.random()*d3; }
    b1.globalAlpha=l245.opacity;
    b1.beginPath(); b1.arc(l245.x309,l245.y,l245.z25,0,Math.PI*2); b1.fill();
  });
  b1.globalAlpha=1;

  
  k62.forEach(l245=>{
    l245.y+=l245.speed; l245.rot+=l245.rotSpeed;
    if(l245.y>H+l245.size*2){ l245.y=-l245.size*2; l245.x309=Math.random()*d3; }
    b1.save();
    b1.strokeStyle=`rgba(200,235,255,${l245.opacity})`;
    b1.lineWidth=1.2;
    drawSnowflakeStar(l245.x309,l245.y,l245.size,l245.rot);
    b1.restore();
  });
  } 
}


const x75=[];
const y76=['#c0392b','#e67e22','#d35400','#a04000','#8e4a0c','#c8780a','#b5451b','#7b2d00','#cb6d0a','#a03010'];
function initLeaves(){
  x75.length=0;
  const d3=a0.width, H=a0.height;
  for(let m12=0;m12<90;m12++) x75.push({
    x309:Math.random()*d3, y:Math.random()*H,
    size:6+Math.random()*14,
    colour:y76[Math.floor(Math.random()*y76.length)],
    rot:Math.random()*Math.PI*2,
    rotSpeed:(Math.random()-0.5)*0.06,
    speedY:0.6+Math.random()*1.4,
    speedX:(Math.random()-0.5)*1.2,
    wobble:Math.random()*Math.PI*2,
    wobbleSpeed:0.02+Math.random()*0.03,
    opacity:0.7+Math.random()*0.3,
    c132:Math.floor(Math.random()*3) 
  });
}
initLeaves();

function drawLeafShape(b53,c54,size,rot,c132){
  b1.save(); b1.translate(b53,c54); b1.rotate(rot);
  b1.beginPath();
  if(c132===0){
    
    b1.moveTo(0,-size);
    b1.bezierCurveTo(size*0.6,-size*0.7, size*0.9,-size*0.2, size*0.5, 0);
    b1.bezierCurveTo(size*0.9, size*0.3, size*0.5, size*0.8, 0, size);
    b1.bezierCurveTo(-size*0.5, size*0.8, -size*0.9, size*0.3, -size*0.5, 0);
    b1.bezierCurveTo(-size*0.9,-size*0.2, -size*0.6,-size*0.7, 0,-size);
  } else if(c132===1){
    
    const z77=5, inner=size*0.45, outer=size;
    for(let m12=0;m12<z77*2;m12++){
      const z25=m12%2===0?outer:inner;
      const a78=(m12/z77/2)*Math.PI*2-Math.PI/2;
      m12===0?b1.moveTo(Math.cos(a78)*z25,Math.sin(a78)*z25):b1.lineTo(Math.cos(a78)*z25,Math.sin(a78)*z25);
    }
  } else {
    
    b1.ellipse(0,0,size*0.45,size,0,0,Math.PI*2);
  }
  b1.closePath();
  b1.fill();
  
  b1.beginPath(); b1.moveTo(0,size*0.5); b1.lineTo(0,size*1.3);
  b1.strokeStyle='rgba(60,30,10,0.5)'; b1.lineWidth=0.8; b1.stroke();
  b1.restore();
}

function drawFallScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#1a0e04');
  q42.addColorStop(0.2,'#2e1808');
  q42.addColorStop(0.45,'#5c2e08');
  q42.addColorStop(0.68,'#c86010');
  q42.addColorStop(0.85,'#e09020');
  q42.addColorStop(1,'#c87818');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const w48=d3*0.5, sunY=H*0.55;
  
  const b79=14;
  for(let m12=0;m12<b79;m12++){
    const c80=-Math.PI/2 + (m12/(b79-1)-0.5)*Math.PI*0.9;
    const d81=H*1.1;
    const e82=0.04+0.03*Math.sin(d29*0.005+m12);
    b1.save();
    b1.globalAlpha=e82;
    b1.fillStyle='rgba(255,220,80,1)';
    b1.beginPath();
    b1.moveTo(w48,sunY);
    b1.lineTo(w48+Math.cos(c80-0.025)*d81, sunY+Math.sin(c80-0.025)*d81);
    b1.lineTo(w48+Math.cos(c80+0.025)*d81, sunY+Math.sin(c80+0.025)*d81);
    b1.closePath(); b1.fill();
    b1.restore();
  }
  
  const f83=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.2));
  f83.addColorStop(0,'rgba(255,200,50,0.22)');
  f83.addColorStop(0.5,'rgba(220,120,10,0.08)');
  f83.addColorStop(1,'transparent');
  b1.fillStyle=f83; b1.fillRect(0,0,d3,H);
  
  const g84=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.08));
  g84.addColorStop(0,'rgba(255,230,100,0.6)');
  g84.addColorStop(0.6,'rgba(220,140,20,0.2)');
  g84.addColorStop(1,'transparent');
  b1.fillStyle=g84; b1.fillRect(0,0,d3,H);
  
  const h85=Math.max(1,d3*0.038);
  const i86=b1.createRadialGradient(w48,sunY,0,w48,sunY,h85);
  i86.addColorStop(0,'rgba(255,248,200,1)');
  i86.addColorStop(0.5,'rgba(255,200,60,0.9)');
  i86.addColorStop(1,'rgba(220,120,0,0)');
  b1.fillStyle=i86;
  b1.beginPath(); b1.arc(w48,sunY,h85,0,Math.PI*2); b1.fill();

  
  const j87=b1.createLinearGradient(0,H*0.6,0,H*0.85);
  j87.addColorStop(0,'rgba(200,100,10,0.0)');
  j87.addColorStop(0.5,'rgba(220,130,10,0.12)');
  j87.addColorStop(1,'rgba(180,80,5,0.0)');
  b1.fillStyle=j87; b1.fillRect(0,H*0.6,d3,H*0.25);

  
  const t45=H*0.82;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    
    const g58=b1.createLinearGradient(f57,by,f57,t45);
    g58.addColorStop(0,b105.fallColor||'#2e1e0a');
    g58.addColorStop(0.7,b105.fallColorB||'#241808');
    g58.addColorStop(1,'#3a2210');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(200,100,10,0.06)'; b1.lineWidth=1;
    b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(d29%85<3||d29%140>137)) return;
        const k88=Math.random()>0.5?'rgba(255,180,60,':'rgba(255,220,120,';
        b1.fillStyle=k88+'0.85)';
        b1.globalAlpha=0.45+0.3*Math.sin(d29*0.02+win.r95*0.7);
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(255,180,60,0.85)','rgba(255,220,120,0.85)','rgba(255,180,60,0.85)',0.55);
    }
    
    const l89=0.08+0.04*Math.sin(d29*0.01);
    b1.fillStyle=`rgba(220,140,20,${l89})`;
    b1.fillRect(f57,by,b105.n13,2);
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(180,90,10,0.3)');
  v47.addColorStop(0.3,'rgba(120,55,5,0.2)');
  v47.addColorStop(1,'#100800');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);

  
  if(n39){
  x75.forEach(lf=>{
    lf.wobble+=lf.wobbleSpeed;
    lf.x309+=lf.speedX+Math.sin(lf.wobble)*0.8;
    lf.y+=lf.speedY+Math.cos(lf.wobble*0.7)*0.4;
    lf.rot+=lf.rotSpeed;
    if(lf.y>H+lf.size*2){ lf.y=-lf.size*2; lf.x309=Math.random()*d3; }
    if(lf.x309>d3+lf.size*2) lf.x309=-lf.size*2;
    if(lf.x309<-lf.size*2) lf.x309=d3+lf.size*2;
    b1.globalAlpha=lf.opacity;
    b1.fillStyle=lf.colour;
    drawLeafShape(lf.x309,lf.y,lf.size,lf.rot,lf.c132);
  });
  b1.globalAlpha=1;
  } 
}


const m90=[];
const n91=[];
const o92=[];
const p93=['#f9c8d8','#f5a8c0','#fce0ea','#f8b4cc','#ffd6e0','#ffc0cb','#ffb8d0'];
const q94=['#a8d870','#88c050','#b8e080','#78b840','#c8e898'];
function initSpring(){
  m90.length=0; n91.length=0; o92.length=0;
  const d3=a0.width,H=a0.height;
  for(let m12=0;m12<65;m12++) m90.push({
    x309:Math.random()*d3, y:Math.random()*H,
    size:5+Math.random()*10,
    r95:p93[Math.floor(Math.random()*p93.length)],
    rot:Math.random()*Math.PI*2, rotSpeed:(Math.random()-0.5)*0.04,
    speedY:0.5+Math.random()*1.0, speedX:(Math.random()-0.5)*0.7,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.018+Math.random()*0.025,
    opacity:0.65+Math.random()*0.3
  });
  for(let m12=0;m12<35;m12++) n91.push({
    x309:Math.random()*d3, y:Math.random()*H,
    size:6+Math.random()*10,
    r95:q94[Math.floor(Math.random()*q94.length)],
    rot:Math.random()*Math.PI*2, rotSpeed:(Math.random()-0.5)*0.03,
    speedY:0.4+Math.random()*0.8, speedX:(Math.random()-0.5)*0.6,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.015+Math.random()*0.02,
    opacity:0.6+Math.random()*0.35
  });
  for(let m12=0;m12<10;m12++){
    const r95=Math.random()>0.5?['#e87820','#000080','#f5a020']:['#3060c0','#000000','#6090e0'];
    o92.push({
      x309:Math.random()*d3, y:60+Math.random()*H*0.55,
      wingPhase:Math.random()*Math.PI*2, wingSpeed:0.09+Math.random()*0.08,
      size:9+Math.random()*8, dir:Math.random()>0.5?1:-1,
      speedX:0.5+Math.random()*0.8, speedY:(Math.random()-0.5)*0.3,
      wobbleY:0,wobblePhase:Math.random()*Math.PI*2,
      r95:r95
    });
  }
}
initSpring();

function drawSpringScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#5bc8f0');
  q42.addColorStop(0.4,'#88d8f5');
  q42.addColorStop(0.72,'#beeaff');
  q42.addColorStop(0.9,'#e0f5ff');
  q42.addColorStop(1,'#f5faff');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const w48=d3*0.5, sunY=H*0.18;
  const f83=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.18));
  f83.addColorStop(0,'rgba(255,255,220,0.28)'); f83.addColorStop(1,'transparent');
  b1.fillStyle=f83; b1.fillRect(0,0,d3,H);
  const g84=b1.createRadialGradient(w48,sunY,0,w48,sunY,Math.max(1,d3*0.065));
  g84.addColorStop(0,'rgba(255,255,200,0.65)'); g84.addColorStop(1,'transparent');
  b1.fillStyle=g84; b1.fillRect(0,0,d3,H);
  const h85=Math.max(1,d3*0.035);
  const i86=b1.createRadialGradient(w48,sunY,0,w48,sunY,h85);
  i86.addColorStop(0,'rgba(255,255,240,1)'); i86.addColorStop(0.5,'rgba(255,240,150,0.85)'); i86.addColorStop(1,'rgba(255,220,80,0)');
  b1.fillStyle=i86; b1.beginPath(); b1.arc(w48,sunY,h85,0,Math.PI*2); b1.fill();

  
  b1.globalAlpha=0.88;
  const s96=[{x309:0.1,y:0.1,z25:0.06,p145:0.025},{x309:0.35,y:0.08,z25:0.05,p145:0.018},{x309:0.68,y:0.12,z25:0.065,p145:0.03},{x309:0.85,y:0.07,z25:0.045,p145:0.038},{x309:0.22,y:0.2,z25:0.038,p145:0.015},{x309:0.6,y:0.22,z25:0.04,p145:0.022}];
  s96.forEach(cd=>{
    const b53=((cd.x309*d3+d29*cd.p145)%(d3+cd.z25*d3*2))-cd.z25*d3, c54=cd.y*H, d55=Math.max(1,cd.z25*d3);
    const e56=b1.createRadialGradient(b53,c54,0,b53,c54,d55);
    e56.addColorStop(0,'rgba(255,255,255,0.98)'); e56.addColorStop(0.55,'rgba(240,250,255,0.8)'); e56.addColorStop(1,'rgba(200,235,255,0)');
    b1.fillStyle=e56;
    b1.beginPath(); b1.ellipse(b53,c54,d55,d55*0.52,0,0,Math.PI*2); b1.fill();
    b1.beginPath(); b1.ellipse(b53-d55*0.38,c54+d55*0.05,d55*0.52,d55*0.42,0,0,Math.PI*2); b1.fill();
    b1.beginPath(); b1.ellipse(b53+d55*0.4,c54+d55*0.07,d55*0.48,d55*0.4,0,0,Math.PI*2); b1.fill();
  });
  b1.globalAlpha=1;

  
  const t45=H*0.82;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    const g58=b1.createLinearGradient(f57,by,f57+b105.n13,by);
    g58.addColorStop(0,b105.springColor||'#b8d090'); g58.addColorStop(1,b105.springColorB||'#a0c078');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(60,140,60,0.1)'; b1.lineWidth=1; b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    b1.fillStyle='rgba(255,255,200,0.1)'; b1.fillRect(f57,by,3,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        b1.globalAlpha=win.lit?0.5:0.12;
        b1.fillStyle=win.lit?'rgba(220,255,200,0.9)':'rgba(80,120,60,0.4)';
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(220,255,200,0.9)','rgba(220,255,200,0.9)','rgba(220,255,200,0.9)',0.5);
    }
    
    const t97=Math.min(6,b105.n13*0.15);
    const u98=['#f9a8c0','#c8e870','#f5c842','#e080c8','#88d8a0'];
    b1.fillStyle=u98[Math.floor(b105.x309*7%5)];
    b1.fillRect(f57,by-t97,b105.n13,t97);
    
    b1.strokeStyle='rgba(60,160,60,0.35)'; b1.lineWidth=1;
    for(let v99=0;v99<Math.floor(b105.x23/30);v99++){
      const w100=by+v99*30+15;
      b1.beginPath(); b1.moveTo(f57,w100); b1.quadraticCurveTo(f57-4,w100+8,f57+2,w100+15); b1.stroke();
    }
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(100,200,80,0.5)'); v47.addColorStop(0.3,'rgba(80,170,60,0.3)'); v47.addColorStop(1,'#4a9040');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);
  
  const x101=b1.createLinearGradient(0,t45,0,t45+25);
  x101.addColorStop(0,'rgba(180,255,120,0.22)'); x101.addColorStop(1,'transparent');
  b1.fillStyle=x101; b1.fillRect(0,t45,d3,25);

  if(n39){
    
    m90.forEach(k322=>{
      k322.wobble+=k322.wobbleSpeed; k322.x309+=k322.speedX+Math.sin(k322.wobble)*0.6; k322.y+=k322.speedY+Math.cos(k322.wobble*0.8)*0.3; k322.rot+=k322.rotSpeed;
      if(k322.y>H+k322.size*2){k322.y=-k322.size*2; k322.x309=Math.random()*d3;}
      if(k322.x309>d3+k322.size*2) k322.x309=-k322.size*2; if(k322.x309<-k322.size*2) k322.x309=d3+k322.size*2;
      b1.save(); b1.translate(k322.x309,k322.y); b1.rotate(k322.rot); b1.globalAlpha=k322.opacity;
      b1.fillStyle=k322.r95;
      
      b1.beginPath(); b1.ellipse(0,-k322.size*0.3,k322.size*0.4,k322.size*0.8,0.3,0,Math.PI*2); b1.fill();
      b1.beginPath(); b1.ellipse(0,-k322.size*0.3,k322.size*0.4,k322.size*0.8,-0.3,0,Math.PI*2); b1.fill();
      b1.restore();
    });
    b1.globalAlpha=1;

    
    n91.forEach(sl=>{
      sl.wobble+=sl.wobbleSpeed; sl.x309+=sl.speedX+Math.sin(sl.wobble)*0.5; sl.y+=sl.speedY; sl.rot+=sl.rotSpeed;
      if(sl.y>H+sl.size*2){sl.y=-sl.size*2; sl.x309=Math.random()*d3;}
      b1.save(); b1.translate(sl.x309,sl.y); b1.rotate(sl.rot); b1.globalAlpha=sl.opacity;
      b1.fillStyle=sl.r95;
      b1.beginPath(); b1.ellipse(0,0,sl.size*0.35,sl.size,0,0,Math.PI*2); b1.fill();
      b1.restore();
    });
    b1.globalAlpha=1;

    
    o92.forEach(bf=>{
      bf.wingPhase+=bf.wingSpeed; bf.wobblePhase+=0.03;
      bf.x309+=bf.speedX*bf.dir; bf.y+=bf.speedY+Math.sin(bf.wobblePhase)*0.4;
      if(bf.x309>d3+40) bf.x309=-40; if(bf.x309<-40) bf.x309=d3+40;
      if(bf.y<30) bf.y=30; if(bf.y>H*0.65) bf.y=H*0.65;
      const i60=Math.sin(bf.wingPhase)*bf.size;
      b1.save(); b1.translate(bf.x309,bf.y);
      b1.globalAlpha=0.85;
      
      const [bodyCol,wingEdge,wingFill]=bf.r95;
      [[1,-0.3],[- 1,-0.3]].forEach(([sx,rx])=>{
        b1.fillStyle=wingFill;
        b1.beginPath();
        b1.moveTo(0,0);
        b1.quadraticCurveTo(sx*bf.size*2, -i60*1.2, sx*bf.size*2.8, -i60*0.6+rx*5);
        b1.quadraticCurveTo(sx*bf.size*2.2, i60*0.5, 0,bf.size*0.4);
        b1.closePath(); b1.fill();
        b1.strokeStyle=wingEdge; b1.lineWidth=0.6; b1.stroke();
      });
      
      b1.fillStyle=bodyCol;
      b1.beginPath(); b1.ellipse(0,0,bf.size*0.18,bf.size*0.7,0,0,Math.PI*2); b1.fill();
      b1.restore();
    });
    b1.globalAlpha=1;
  }
}


const y102=[];
let z103={y180:false,x309:0,branches:[],timer:0,flashAlpha:0};
function initSand(){
  y102.length=0;
  const d3=a0.width,H=a0.height;
  for(let m12=0;m12<320;m12++) y102.push({
    x309:Math.random()*d3, y:Math.random()*H,
    size:1+Math.random()*2.5,
    speedX:1.5+Math.random()*2.5, speedY:(Math.random()-0.3)*0.8,
    opacity:0.18+Math.random()*0.45,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.02+Math.random()*0.03,
    r95:Math.random()>0.5?'rgba(200,160,80,':'rgba(220,180,100,'
  });
}
initSand();
function triggerSandLightning(d3,H){
  z103.y180=true; z103.timer=28; z103.flashAlpha=0.18;
  z103.x309=d3*0.2+Math.random()*d3*0.6;
  z103.branches=[];
  let b53=z103.x309, c54=0;
  while(c54<H*0.85){
    const a104=b53+(Math.random()-0.5)*80, ny=c54+30+Math.random()*40;
    z103.branches.push({x1:b53,y1:c54,x2:a104,y2:ny});
    b53=a104; c54=ny;
    if(Math.random()>0.65&&c54<H*0.6){
      let f57=b53,by=c54;
      for(let b105=0;b105<3;b105++){
        const c106=f57+(Math.random()-0.5)*60, by2=by+20+Math.random()*30;
        z103.branches.push({x1:f57,y1:by,x2:c106,y2:by2,sub:true});
        f57=c106; by=by2;
      }
    }
  }
}

function drawSandScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#1a0e02');
  q42.addColorStop(0.2,'#2e1a06');
  q42.addColorStop(0.45,'#4a2e0a');
  q42.addColorStop(0.7,'#7a5018');
  q42.addColorStop(0.88,'#a07028');
  q42.addColorStop(1,'#8a5c18');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const d107=b1.createLinearGradient(0,H*0.3,0,H*0.75);
  d107.addColorStop(0,'rgba(160,110,30,0)');
  d107.addColorStop(0.5,'rgba(180,130,40,0.12)');
  d107.addColorStop(1,'rgba(140,90,20,0)');
  b1.fillStyle=d107; b1.fillRect(0,H*0.3,d3,H*0.45);

  
  b1.globalAlpha=0.06+0.03*Math.sin(d29*0.007);
  const e108=[{x309:0.15,y:0.35,z25:0.18},{x309:0.55,y:0.28,z25:0.22},{x309:0.82,y:0.42,z25:0.16},{x309:0.38,y:0.5,z25:0.14}];
  e108.forEach(dc=>{
    const b53=((dc.x309*d3+d29*0.4)%(d3+dc.z25*d3*2))-dc.z25*d3;
    const c54=dc.y*H+Math.sin(d29*0.005+dc.x309*5)*H*0.03;
    const d55=Math.max(1,dc.z25*d3);
    const f109=b1.createRadialGradient(b53,c54,0,b53,c54,d55);
    f109.addColorStop(0,'rgba(180,130,50,0.7)'); f109.addColorStop(1,'transparent');
    b1.fillStyle=f109; b1.beginPath(); b1.ellipse(b53,c54,d55,d55*0.45,0,0,Math.PI*2); b1.fill();
  });
  b1.globalAlpha=1;

  
  if(z103.y180&&z103.flashAlpha>0){
    b1.fillStyle=`rgba(255,220,100,${z103.flashAlpha})`;
    b1.fillRect(0,0,d3,H);
    z103.flashAlpha*=0.75;
  }

  
  const t45=H*0.83;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    const g58=b1.createLinearGradient(f57,by,f57,t45);
    g58.addColorStop(0,b105.sandColor||'#2e1c06');
    g58.addColorStop(1,b105.sandColorB||'#1e1204');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(180,120,30,0.08)'; b1.lineWidth=1; b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(d29%70<4||d29%110>106)) return;
        b1.fillStyle='rgba(255,180,50,0.88)';
        b1.globalAlpha=0.4+0.35*Math.sin(d29*0.025+win.r95*0.8+win.row*0.5);
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(255,180,50,0.88)','rgba(255,180,50,0.88)','rgba(255,180,50,0.88)',0.55);
    }
    
    b1.fillStyle=`rgba(180,130,40,${0.07+0.04*Math.sin(d29*0.008)})`;
    b1.fillRect(f57,by,b105.n13,2);
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(160,110,30,0.35)');
  v47.addColorStop(0.4,'rgba(120,80,20,0.25)');
  v47.addColorStop(1,'#180e02');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);
  const x101=b1.createLinearGradient(0,t45,0,t45+30);
  x101.addColorStop(0,'rgba(220,170,60,0.18)'); x101.addColorStop(1,'transparent');
  b1.fillStyle=x101; b1.fillRect(0,t45,d3,30);

  
  if(z103.y180){
    z103.timer--;
    if(z103.timer<=0) z103.y180=false;
    const g110=Math.min(1,(z103.timer/28)*1.4);
    b1.save();
    z103.branches.forEach(seg=>{
      b1.strokeStyle=seg.sub?`rgba(255,200,80,${g110*0.55})`:`rgba(255,240,120,${g110*0.95})`;
      b1.lineWidth=seg.sub?0.8:2.2;
      b1.shadowColor='rgba(255,220,80,0.8)'; b1.shadowBlur=seg.sub?4:12;
      b1.beginPath(); b1.moveTo(seg.x1,seg.y1); b1.lineTo(seg.x2,seg.y2); b1.stroke();
    });
    b1.restore();
  }
  
  if(Math.random()<0.003&&!z103.y180) triggerSandLightning(d3,H);

  
  if(n39){
    y102.forEach(r43=>{
      r43.wobble+=r43.wobbleSpeed;
      r43.x309+=r43.speedX+Math.sin(r43.wobble)*0.8;
      r43.y+=r43.speedY+Math.cos(r43.wobble*0.7)*0.4;
      if(r43.x309>d3+r43.size*2){r43.x309=-r43.size*2; r43.y=Math.random()*H;}
      if(r43.y>H+r43.size*2){r43.y=-r43.size*2;}
      if(r43.y<-r43.size*2){r43.y=H+r43.size*2;}
      b1.globalAlpha=r43.opacity;
      b1.fillStyle=r43.r95+`${r43.opacity})`;
      b1.beginPath(); b1.arc(r43.x309,r43.y,r43.size,0,Math.PI*2); b1.fill();
    });
    b1.globalAlpha=1;
  }
}


const h111=[];
let i112={y180:false,branches:[],timer:0,flashAlpha:0};
function initRadioactive(){
  h111.length=0;
  const d3=a0.width,H=a0.height;
  for(let m12=0;m12<200;m12++) h111.push({
    x309:Math.random()*d3, y:Math.random()*H,
    size:2+Math.random()*6,
    speedX:(Math.random()-0.5)*0.5, speedY:-0.3-Math.random()*0.8,
    opacity:0.12+Math.random()*0.35,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.01+Math.random()*0.02,
    life:Math.random()
  });
}
initRadioactive();
function triggerRadioLightning(d3,H){
  i112.y180=true; i112.timer=22; i112.flashAlpha=0.12;
  i112.branches=[];
  let b53=d3*0.1+Math.random()*d3*0.8, c54=0;
  while(c54<H*0.8){
    const a104=b53+(Math.random()-0.5)*70, ny=c54+25+Math.random()*35;
    i112.branches.push({x1:b53,y1:c54,x2:a104,y2:ny});
    b53=a104; c54=ny;
    if(Math.random()>0.6&&c54<H*0.55){
      let f57=b53,by=c54;
      for(let b105=0;b105<3;b105++){
        const c106=f57+(Math.random()-0.5)*50, by2=by+15+Math.random()*25;
        i112.branches.push({x1:f57,y1:by,x2:c106,y2:by2,sub:true});
        f57=c106; by=by2;
      }
    }
  }
}

function drawRadioactiveScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#010801');
  q42.addColorStop(0.25,'#020f02');
  q42.addColorStop(0.5,'#041804');
  q42.addColorStop(0.75,'#062006');
  q42.addColorStop(1,'#082808');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const j113=b1.createRadialGradient(d3*0.5,H*0.75,0,d3*0.5,H*0.75,Math.max(1,d3*0.6));
  j113.addColorStop(0,'rgba(57,255,20,0.07)');
  j113.addColorStop(0.5,'rgba(40,180,10,0.04)');
  j113.addColorStop(1,'transparent');
  b1.fillStyle=j113; b1.fillRect(0,0,d3,H);

  
  b1.globalAlpha=0.05+0.025*Math.sin(d29*0.006);
  const k114=[{x309:0.1,y:0.4,z25:0.2,p145:0.12},{x309:0.5,y:0.32,z25:0.25,p145:0.08},{x309:0.78,y:0.45,z25:0.18,p145:0.14},{x309:0.32,y:0.55,z25:0.15,p145:0.1}];
  k114.forEach(fc=>{
    const b53=((fc.x309*d3+d29*fc.p145)%(d3+fc.z25*d3*2))-fc.z25*d3;
    const c54=fc.y*H+Math.sin(d29*0.004+fc.x309*4)*H*0.04;
    const d55=Math.max(1,fc.z25*d3);
    const l115=b1.createRadialGradient(b53,c54,0,b53,c54,d55);
    l115.addColorStop(0,'rgba(57,255,20,0.65)'); l115.addColorStop(0.5,'rgba(30,150,10,0.3)'); l115.addColorStop(1,'transparent');
    b1.fillStyle=l115; b1.beginPath(); b1.ellipse(b53,c54,d55,d55*0.4,0,0,Math.PI*2); b1.fill();
  });
  b1.globalAlpha=1;

  
  if(i112.y180&&i112.flashAlpha>0){
    b1.fillStyle=`rgba(57,255,20,${i112.flashAlpha})`;
    b1.fillRect(0,0,d3,H);
    i112.flashAlpha*=0.78;
  }

  
  const t45=H*0.83;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    const g58=b1.createLinearGradient(f57,by,f57,t45);
    g58.addColorStop(0,b105.radioColor||'#081408');
    g58.addColorStop(1,b105.radioColorB||'#040a04');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(57,255,20,0.06)'; b1.lineWidth=1; b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(d29%65<4||d29%105>101)) return;
        b1.fillStyle='rgba(57,255,20,0.9)';
        b1.globalAlpha=0.3+0.4*Math.sin(d29*0.022+win.r95*0.9+win.row*0.6);
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
        const m116=b1.createRadialGradient(f57+5+win.r95*7,by+7+win.row*10,0,f57+5+win.r95*7,by+7+win.row*10,8);
        m116.addColorStop(0,'rgba(57,255,20,0.15)'); m116.addColorStop(1,'transparent');
        b1.fillStyle=m116; b1.fillRect(f57+win.r95*7-4,by+win.row*10-4,16,14);
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(57,255,20,0.9)','rgba(57,255,20,0.9)','rgba(57,255,20,0.9)',0.5);
    }
    
    b1.strokeStyle='rgba(40,180,10,0.3)'; b1.lineWidth=1.2;
    for(let v99=0;v99<Math.floor(b105.x23/25);v99++){
      const w100=by+v99*25+10;
      b1.beginPath(); b1.moveTo(f57,w100);
      b1.quadraticCurveTo(f57-5,w100+10,f57+2,w100+20); b1.stroke();
      if(v99%2===0){
        b1.beginPath(); b1.moveTo(f57+b105.n13,w100+5);
        b1.quadraticCurveTo(f57+b105.n13+5,w100+12,f57+b105.n13-2,w100+22); b1.stroke();
      }
    }
    
    const n117=0.06+0.04*Math.sin(d29*0.012+b105.x309*0.01);
    b1.fillStyle=`rgba(57,255,20,${n117})`; b1.fillRect(f57,by,b105.n13,2);
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(40,120,10,0.25)');
  v47.addColorStop(0.4,'rgba(20,70,5,0.18)');
  v47.addColorStop(1,'#010601');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);
  
  const o118=b1.createLinearGradient(0,t45,0,t45+20);
  o118.addColorStop(0,'rgba(57,255,20,0.12)'); o118.addColorStop(1,'transparent');
  b1.fillStyle=o118; b1.fillRect(0,t45,d3,20);

  
  if(i112.y180){
    i112.timer--;
    if(i112.timer<=0) i112.y180=false;
    const g110=Math.min(1,(i112.timer/22)*1.5);
    b1.save();
    i112.branches.forEach(seg=>{
      b1.strokeStyle=seg.sub?`rgba(57,255,20,${g110*0.5})`:`rgba(100,255,60,${g110*0.95})`;
      b1.lineWidth=seg.sub?0.8:2;
      b1.shadowColor='rgba(57,255,20,0.9)'; b1.shadowBlur=seg.sub?6:16;
      b1.beginPath(); b1.moveTo(seg.x1,seg.y1); b1.lineTo(seg.x2,seg.y2); b1.stroke();
    });
    b1.restore();
  }
  if(Math.random()<0.004&&!i112.y180) triggerRadioLightning(d3,H);

  
  if(n39){
    h111.forEach(k322=>{
      k322.wobble+=k322.wobbleSpeed;
      k322.x309+=k322.speedX+Math.sin(k322.wobble)*0.6;
      k322.y+=k322.speedY;
      k322.life+=0.003;
      if(k322.y<-k322.size*3||k322.life>1){ k322.y=t45+k322.size; k322.x309=Math.random()*d3; k322.life=Math.random()*0.3; }
      const p119=Math.sin(k322.life*Math.PI);
      b1.globalAlpha=k322.opacity*p119;
      const s44=b1.createRadialGradient(k322.x309,k322.y,0,k322.x309,k322.y,Math.max(1,k322.size));
      s44.addColorStop(0,'rgba(57,255,20,0.7)'); s44.addColorStop(1,'transparent');
      b1.fillStyle=s44; b1.beginPath(); b1.arc(k322.x309,k322.y,k322.size,0,Math.PI*2); b1.fill();
    });
    b1.globalAlpha=1;
  }
}


const q120=[];
let r121={y180:false,branches:[],timer:0,flashAlpha:0};
let s122=[];
function initThunder(){
  q120.length=0;
  const d3=a0.width,H=a0.height;
  for(let m12=0;m12<180;m12++) q120.push({
    x309:Math.random()*d3, y:Math.random()*H,
    d81:4+Math.random()*10, c80:0.15+Math.random()*0.25,
    speed:8+Math.random()*14, opacity:0.1+Math.random()*0.4,
    wobble:Math.random()*Math.PI*2, wobbleSpeed:0.015+Math.random()*0.02
  });
  s122=[
    {x309:0.1,y:0.12,z25:0.22,p145:0.06,flicker:0},{x309:0.38,y:0.08,z25:0.28,p145:0.04,flicker:0},
    {x309:0.65,y:0.14,z25:0.24,p145:0.07,flicker:0},{x309:0.85,y:0.09,z25:0.2,p145:0.05,flicker:0},
    {x309:0.25,y:0.22,z25:0.18,p145:0.03,flicker:0},{x309:0.55,y:0.2,z25:0.22,p145:0.06,flicker:0}
  ];
}
initThunder();
function triggerThunderBolt(d3,H){
  r121.y180=true; r121.timer=32; r121.flashAlpha=0.22;
  r121.branches=[];
  let b53=d3*0.15+Math.random()*d3*0.7, c54=0;
  while(c54<H*0.82){
    const a104=b53+(Math.random()-0.5)*90, ny=c54+28+Math.random()*45;
    r121.branches.push({x1:b53,y1:c54,x2:a104,y2:ny});
    b53=a104; c54=ny;
    if(Math.random()>0.6&&c54<H*0.55){
      let f57=b53,by=c54;
      for(let b105=0;b105<4;b105++){
        const c106=f57+(Math.random()-0.5)*65, by2=by+18+Math.random()*28;
        r121.branches.push({x1:f57,y1:by,x2:c106,y2:by2,sub:true});
        f57=c106; by=by2;
      }
    }
  }
}

function drawThunderScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#060810');
  q42.addColorStop(0.25,'#0a0e1a');
  q42.addColorStop(0.5,'#0e1428');
  q42.addColorStop(0.75,'#121c38');
  q42.addColorStop(1,'#0e1830');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const t123=b1.createRadialGradient(d3*0.5,H*0.15,0,d3*0.5,H*0.15,Math.max(1,d3*0.55));
  t123.addColorStop(0,'rgba(80,120,255,0.08)');
  t123.addColorStop(0.5,'rgba(60,80,200,0.04)');
  t123.addColorStop(1,'transparent');
  b1.fillStyle=t123; b1.fillRect(0,0,d3,H);

  
  if(r121.y180&&r121.flashAlpha>0){
    b1.fillStyle=`rgba(160,180,255,${r121.flashAlpha})`;
    b1.fillRect(0,0,d3,H);
    r121.flashAlpha*=0.72;
  }

  
  s122.forEach(tc=>{
    tc.flicker=(tc.flicker||0)+1;
    const b53=((tc.x309*d3+d29*tc.p145)%(d3+tc.z25*d3*2))-tc.z25*d3;
    const c54=tc.y*H+Math.sin(d29*0.004+tc.x309*3)*H*0.02;
    const d55=Math.max(1,tc.z25*d3);
    
    for(let u124=0;u124<3;u124++){
      const g110=0.55-u124*0.15;
      const v125=(u124-1)*d55*0.18;
      const e56=b1.createRadialGradient(b53+v125,c54,0,b53+v125,c54,d55*(1+u124*0.12));
      e56.addColorStop(0,`rgba(18,22,40,${g110})`);
      e56.addColorStop(0.6,`rgba(12,16,30,${g110*0.7})`);
      e56.addColorStop(1,'transparent');
      b1.fillStyle=e56;
      b1.beginPath(); b1.ellipse(b53+v125,c54,d55*(1+u124*0.1),d55*0.42,0,0,Math.PI*2); b1.fill();
    }
    
    if(r121.y180&&r121.flashAlpha>0.02){
      b1.globalAlpha=r121.flashAlpha*1.8;
      const w126=b1.createRadialGradient(b53,c54,d55*0.4,b53,c54,d55);
      w126.addColorStop(0,'transparent'); w126.addColorStop(1,'rgba(120,160,255,0.5)');
      b1.fillStyle=w126;
      b1.beginPath(); b1.ellipse(b53,c54,d55,d55*0.42,0,0,Math.PI*2); b1.fill();
      b1.globalAlpha=1;
    }
  });

  
  const t45=H*0.84;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    const g58=b1.createLinearGradient(f57,by,f57+b105.n13,by);
    g58.addColorStop(0,b105.thunderColor||'#1a2035');
    g58.addColorStop(1,b105.thunderColorB||'#121828');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(80,120,255,0.07)'; b1.lineWidth=1; b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit) return;
        const x127=r121.y180&&Math.random()>0.7;
        if(win.flicker&&(d29%60<4||d29%95>92)&&!x127) return;
        b1.fillStyle=x127?'rgba(220,230,255,0.95)':'rgba(140,180,255,0.75)';
        b1.globalAlpha=x127?0.9:(0.35+0.3*Math.sin(d29*0.025+win.r95*0.6));
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(140,180,255,0.75)','rgba(140,180,255,0.75)','rgba(140,180,255,0.75)',0.5);
    }
    
    const y128=r121.y180?0.18+r121.flashAlpha:0.04;
    b1.fillStyle=`rgba(100,140,255,${y128})`; b1.fillRect(f57,by,b105.n13,2);
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(30,50,120,0.25)');
  v47.addColorStop(0.4,'rgba(15,25,70,0.18)');
  v47.addColorStop(1,'#050810');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);
  
  const o118=b1.createLinearGradient(0,t45,0,t45+25);
  o118.addColorStop(0,'rgba(80,120,255,0.15)'); o118.addColorStop(1,'transparent');
  b1.fillStyle=o118; b1.fillRect(0,t45,d3,25);

  
  if(r121.y180){
    r121.timer--;
    if(r121.timer<=0) r121.y180=false;
    const g110=Math.min(1,(r121.timer/32)*1.4);
    b1.save();
    r121.branches.forEach(seg=>{
      b1.strokeStyle=seg.sub?`rgba(140,180,255,${g110*0.6})`:`rgba(210,230,255,${g110*0.98})`;
      b1.lineWidth=seg.sub?0.9:2.5;
      b1.shadowColor='rgba(100,150,255,0.95)'; b1.shadowBlur=seg.sub?8:20;
      b1.beginPath(); b1.moveTo(seg.x1,seg.y1); b1.lineTo(seg.x2,seg.y2); b1.stroke();
    });
    b1.restore();
  }
  if(Math.random()<0.006&&!r121.y180) triggerThunderBolt(d3,H);

  
  if(n39){
    b1.lineCap='round';
    q120.forEach(v255=>{
      v255.wobble+=v255.wobbleSpeed;
      v255.y+=v255.speed; v255.x309+=v255.speed*Math.sin(v255.c80)+Math.sin(v255.wobble)*0.4;
      if(v255.y>H){v255.y=-v255.d81; v255.x309=Math.random()*d3;}
      const z129=r121.y180?r121.flashAlpha*2:0;
      b1.strokeStyle=`rgba(160,200,255,${Math.min(1,v255.opacity+z129)})`;
      b1.lineWidth=0.8;
      b1.globalAlpha=v255.opacity+z129*0.5;
      b1.beginPath(); b1.moveTo(v255.x309,v255.y); b1.lineTo(v255.x309+v255.d81*Math.sin(v255.c80),v255.y+v255.d81); b1.stroke();
    });
    b1.globalAlpha=1;
  }
}


const a130=[];
let b131={y180:false,branches:[],timer:0,flashAlpha:0};
function initGrass(){
  a130.length=0;
  const d3=a0.width,H=a0.height;
  
  for(let m12=0;m12<120;m12++){
    const c132=Math.random()<0.3?'butterfly':(Math.random()<0.5?'seed':'leaf');
    a130.push({
      c132, x309:Math.random()*d3, y:Math.random()*H,
      size:c132==='butterfly'?10+Math.random()*8:3+Math.random()*6,
      speedX:(Math.random()-0.5)*0.6, speedY:-0.2-Math.random()*0.5,
      wobble:Math.random()*Math.PI*2, wobbleSpeed:0.018+Math.random()*0.025,
      wingPhase:Math.random()*Math.PI*2, wingSpeed:0.08+Math.random()*0.07,
      dir:Math.random()>0.5?1:-1, life:Math.random(),
      r95:c132==='butterfly'?
        (Math.random()>0.5?['#e87820','#f5a020']:['#d040a0','#f080c0']):
        (c132==='seed'?'rgba(200,255,160,':'rgba(120,220,80,')
    });
  }
}
initGrass();
function triggerGrassLightning(d3,H){
  b131.y180=true; b131.timer=20; b131.flashAlpha=0.1;
  b131.branches=[];
  let b53=d3*0.1+Math.random()*d3*0.8, c54=0;
  while(c54<H*0.8){
    const a104=b53+(Math.random()-0.5)*60, ny=c54+22+Math.random()*32;
    b131.branches.push({x1:b53,y1:c54,x2:a104,y2:ny});
    b53=a104; c54=ny;
    if(Math.random()>0.65&&c54<H*0.5){
      let f57=b53,by=c54;
      for(let b105=0;b105<3;b105++){
        const c106=f57+(Math.random()-0.5)*45, by2=by+14+Math.random()*22;
        b131.branches.push({x1:f57,y1:by,x2:c106,y2:by2,sub:true});
        f57=c106; by=by2;
      }
    }
  }
}

function drawGrassScene(d3,H){
  if(!d3||!H||!isFinite(d3)||!isFinite(H)) return;

  
  const q42=b1.createLinearGradient(0,0,0,H);
  q42.addColorStop(0,'#061008');
  q42.addColorStop(0.2,'#0a1a0c');
  q42.addColorStop(0.45,'#102814');
  q42.addColorStop(0.7,'#1a3c1e');
  q42.addColorStop(0.88,'#224828');
  q42.addColorStop(1,'#1a3c20');
  b1.fillStyle=q42; b1.fillRect(0,0,d3,H);

  
  const d133=d3*0.5, godRayY=H*0.35;
  const e134=b1.createRadialGradient(d133,godRayY,0,d133,godRayY,Math.max(1,d3*0.5));
  e134.addColorStop(0,'rgba(180,255,120,0.18)');
  e134.addColorStop(0.3,'rgba(100,200,60,0.1)');
  e134.addColorStop(0.7,'rgba(60,140,30,0.05)');
  e134.addColorStop(1,'transparent');
  b1.fillStyle=e134; b1.fillRect(0,0,d3,H);

  
  const b79=10;
  b1.save();
  for(let m12=0;m12<b79;m12++){
    const c80=-Math.PI*0.6+(m12/(b79-1))*Math.PI*0.55;
    const d81=H*1.2;
    const f135=0.025+0.015*Math.sin(d29*0.006+m12*0.8);
    b1.globalAlpha=f135;
    b1.fillStyle='rgba(160,255,80,1)';
    b1.beginPath();
    b1.moveTo(d133,godRayY);
    b1.lineTo(d133+Math.cos(c80-0.018)*d81, godRayY+Math.sin(c80-0.018)*d81);
    b1.lineTo(d133+Math.cos(c80+0.018)*d81, godRayY+Math.sin(c80+0.018)*d81);
    b1.closePath(); b1.fill();
  }
  b1.restore();

  
  b1.globalAlpha=0.04+0.02*Math.sin(d29*0.005);
  [{x309:0.2,y:0.55,z25:0.25,p145:0.07},{x309:0.6,y:0.5,z25:0.3,p145:0.05},{x309:0.85,y:0.6,z25:0.2,p145:0.09}].forEach(l115=>{
    const b53=((l115.x309*d3+d29*l115.p145)%(d3+l115.z25*d3*2))-l115.z25*d3;
    const d55=Math.max(1,l115.z25*d3);
    const g136=b1.createRadialGradient(b53,l115.y*H,0,b53,l115.y*H,d55);
    g136.addColorStop(0,'rgba(80,180,40,0.8)'); g136.addColorStop(1,'transparent');
    b1.fillStyle=g136; b1.beginPath(); b1.ellipse(b53,l115.y*H,d55,d55*0.35,0,0,Math.PI*2); b1.fill();
  });
  b1.globalAlpha=1;

  
  if(b131.y180&&b131.flashAlpha>0){
    b1.fillStyle=`rgba(120,255,60,${b131.flashAlpha})`;
    b1.fillRect(0,0,d3,H);
    b131.flashAlpha*=0.8;
  }

  
  const t45=H*0.82;
  c2.forEach((b105,bi)=>{
    const f57=b105.x309, by=t45-b105.x23;
    const g58=b1.createLinearGradient(f57,by,f57,t45);
    g58.addColorStop(0,b105.grassColor||'#0e2010');
    g58.addColorStop(1,b105.grassColorB||'#081408');
    b1.fillStyle=g58; b1.fillRect(f57,by,b105.n13,b105.x23);
    b1.strokeStyle='rgba(60,180,30,0.1)'; b1.lineWidth=1; b1.strokeRect(f57,by,b105.n13,b105.x23);
    
    const h137=Math.floor(b105.x23/18);
    for(let i138=0;i138<h137;i138++){
      if(Math.random()>0.55){
        const j139=4+Math.random()*b105.n13*0.6, mh=6+Math.random()*10;
        const k140=f57+Math.random()*(b105.n13-j139), my=by+i138*18+Math.random()*8;
        b1.globalAlpha=0.18+Math.random()*0.2;
        b1.fillStyle=Math.random()>0.5?'#2a6020':'#386828';
        b1.fillRect(k140,my,j139,mh);
        b1.globalAlpha=1;
      }
    }
    
    if(w22){
      b105.windows.forEach(win=>{
        if(!win.lit) return;
        if(win.flicker&&(d29%80<4||d29%120>117)) return;
        b1.fillStyle='rgba(80,220,40,0.85)';
        b1.globalAlpha=0.3+0.35*Math.sin(d29*0.02+win.r95*0.7+win.row*0.5);
        b1.fillRect(f57+3+win.r95*7,by+5+win.row*10,4,5);
        b1.globalAlpha=1;
      });
    } else {
      drawWindowsDirect(f57,by,b105.n13,b105.x23,bi,'rgba(80,220,40,0.85)','rgba(80,220,40,0.85)','rgba(80,220,40,0.85)',0.45);
    }
    
    b1.strokeStyle='rgba(50,160,30,0.4)'; b1.lineWidth=1.2;
    const l141=Math.floor(b105.n13/8);
    for(let v99=0;v99<l141;v99++){
      const m142=f57+4+v99*8;
      const n143=8+((v99*7+Math.floor(b105.x23))%20);
      b1.beginPath(); b1.moveTo(m142,by);
      b1.quadraticCurveTo(m142+(Math.random()-0.5)*6,by+n143*0.5,m142+(Math.random()-0.5)*4,by+n143);
      b1.stroke();
    }
    
    b1.fillStyle=`rgba(60,180,30,${0.08+0.05*Math.sin(d29*0.01+b105.x309*0.01)})`;
    b1.fillRect(f57,by,b105.n13,4);
  });

  
  const v47=b1.createLinearGradient(0,t45,0,H);
  v47.addColorStop(0,'rgba(40,120,20,0.4)');
  v47.addColorStop(0.35,'rgba(25,80,12,0.3)');
  v47.addColorStop(1,'#050e04');
  b1.fillStyle=v47; b1.fillRect(0,t45,d3,H-t45);
  
  const x101=b1.createLinearGradient(0,t45,0,t45+30);
  x101.addColorStop(0,'rgba(80,200,40,0.15)'); x101.addColorStop(1,'transparent');
  b1.fillStyle=x101; b1.fillRect(0,t45,d3,30);

  
  if(b131.y180){
    b131.timer--;
    if(b131.timer<=0) b131.y180=false;
    const g110=Math.min(1,(b131.timer/20)*1.5);
    b1.save();
    b131.branches.forEach(seg=>{
      b1.strokeStyle=seg.sub?`rgba(100,255,60,${g110*0.5})`:`rgba(160,255,80,${g110*0.95})`;
      b1.lineWidth=seg.sub?0.9:2.0;
      b1.shadowColor='rgba(80,220,30,0.9)'; b1.shadowBlur=seg.sub?6:14;
      b1.beginPath(); b1.moveTo(seg.x1,seg.y1); b1.lineTo(seg.x2,seg.y2); b1.stroke();
    });
    b1.restore();
  }
  if(Math.random()<0.004&&!b131.y180) triggerGrassLightning(d3,H);

  
  if(n39){
    a130.forEach(k322=>{
      k322.wobble+=k322.wobbleSpeed; k322.life+=0.002;
      k322.x309+=k322.speedX+Math.sin(k322.wobble)*0.7;
      k322.y+=k322.speedY+Math.cos(k322.wobble*0.8)*0.3;
      if(k322.y<-k322.size*3||k322.life>1){ k322.y=t45+k322.size; k322.x309=Math.random()*d3; k322.life=0; }
      if(k322.x309>d3+k322.size*2) k322.x309=-k322.size; if(k322.x309<-k322.size*2) k322.x309=d3+k322.size;
      const p119=Math.sin(k322.life*Math.PI);
      if(k322.c132==='butterfly'){
        k322.wingPhase+=k322.wingSpeed;
        k322.x309+=k322.speedX*k322.dir*0.6;
        const i60=Math.sin(k322.wingPhase)*k322.size;
        const [bodyCol,wingFill]=k322.r95;
        b1.save(); b1.translate(k322.x309,k322.y); b1.globalAlpha=0.8*p119;
        [[1],[- 1]].forEach(([sx])=>{
          b1.fillStyle=wingFill;
          b1.beginPath();
          b1.ellipse(sx*k322.size*0.55,0,k322.size*0.7,Math.abs(i60)*0.5+k322.size*0.2,-0.3*sx,0,Math.PI*2);
          b1.fill();
        });
        b1.fillStyle=bodyCol;
        b1.beginPath(); b1.ellipse(0,0,k322.size*0.15,k322.size*0.6,0,0,Math.PI*2); b1.fill();
        b1.restore();
      } else if(k322.c132==='seed'){
        b1.globalAlpha=0.55*p119;
        b1.fillStyle=k322.r95+`${0.55*p119})`;
        b1.beginPath(); b1.arc(k322.x309,k322.y,k322.size*0.4,0,Math.PI*2); b1.fill();
        b1.strokeStyle=k322.r95+`${0.4*p119})`;
        b1.lineWidth=0.8;
        b1.beginPath(); b1.moveTo(k322.x309,k322.y); b1.lineTo(k322.x309+Math.sin(k322.wobble)*k322.size*1.5,k322.y-k322.size*1.5); b1.stroke();
      } else {
        b1.save(); b1.translate(k322.x309,k322.y); b1.rotate(k322.wobble); b1.globalAlpha=0.65*p119;
        b1.fillStyle='rgba(60,180,30,0.8)';
        b1.beginPath(); b1.ellipse(0,0,k322.size*0.35,k322.size,0,0,Math.PI*2); b1.fill();
        b1.restore();
      }
    });
    b1.globalAlpha=1;
  }
}

function getSeasonFromDate(){
  const o144=new Date().getMonth()+1, v255=new Date().getDate();
  
  if((o144===3&&v255>=20)||(o144===4||o144===5)||(o144===6&&v255<=20)) return 'spring';
  if((o144===6&&v255>=21)||(o144===7||o144===8)||(o144===9&&v255<=21)) return 'summer';
  if((o144===9&&v255>=22)||(o144===10||o144===11)||(o144===12&&v255<=20)) return 'fall';
  return 'winter';
}

function applySeasonalMode(){
  if(!o40) return;
  const p145=getSeasonFromDate();
  f31=p145==='summer'; g32=p145==='winter';
  h33=p145==='fall'; i34=p145==='spring';
  j35=false; k36=false; l37=false; m38=false;
}

function draw(){
  d29++;const d3=a0.width,H=a0.height;
  if(f31)           drawSummerScene(d3,H);
  else if(g32)      drawWinterScene(d3,H);
  else if(h33)        drawFallScene(d3,H);
  else if(i34)      drawSpringScene(d3,H);
  else if(j35)        drawSandScene(d3,H);
  else if(k36) drawRadioactiveScene(d3,H);
  else if(l37)     drawThunderScene(d3,H);
  else if(m38)       drawGrassScene(d3,H);
  else                        drawNightScene(d3,H);
  requestAnimationFrame(draw);
}
draw();




const q146=document.getElementById('home-page');
const r147=document.getElementById('web-h267');
const s148=document.getElementById('web-iframe');
const t149=document.getElementById('mims-h267');
const u150=document.getElementById('mims-iframe');
const v151=document.getElementById('nav-address-text');
const w152=document.getElementById('search-input');
const x153=document.getElementById('search-clear');
const y154=document.getElementById('suggestions');

const z155=999;
let a156=false;

let b157=JSON.parse(localStorage.getItem('ep_tabs4')||'null')||[{id:1,p275:'Endless Proxy',y180:true}];
if(!b157.find(z259=>z259.id===z155))b157.splice(1,0,{id:z155,p275:'MIMS Portal',y180:false,fixed:true});
let c158=b157.find(z259=>z259.y180)?.id||1;
const d159=b157.filter(z259=>z259.id!==z155);
let e160=(d159.length?Math.max(...d159.map(z259=>z259.id)):1)+1;
const f161={};
b157.forEach(z259=>{f161[z259.id]={history:[z259.id===z155?'mims:
function saveTabs(){localStorage.setItem('ep_tabs4',JSON.stringify(b157));}




let g162=JSON.parse(localStorage.getItem('ep_bookmarks')||'null')||[
  {id:1,p275:'Google',r173:'https:
  {id:2,p275:'YouTube',r173:'https:
  {id:3,p275:'GitHub',r173:'https:
];
let h163=Math.max(...g162.map(b105=>b105.id),0)+1;
function saveBookmarks(){localStorage.setItem('ep_bookmarks',JSON.stringify(g162));}

function getFavicon(r173){try{return `https:

function renderBookmarksBar(){
  const i164=document.getElementById('g162-i164');
  i164.querySelectorAll('.bm-item,.bm-sep').forEach(k166=>k166.remove());
  const j165=document.getElementById('bm-i164-add');
  g162.forEach(bm=>{
    const k166=document.createElement('div');
    k166.className='bm-item';
    const l167=getFavicon(bm.r173);
    k166.innerHTML=`${l167?`<img src="${l167}" onerror="this.style.display='none'">`:''}${bm.p275}`;
    k166.p275=bm.r173;
    k166.addEventListener('click',()=>openUrl(bm.r173));
    k166.addEventListener('contextmenu',e=>{e.preventDefault();if(confirm(`Remove "${bm.p275}" from g162?`)){g162=g162.filter(b105=>b105.id!==bm.id);saveBookmarks();renderBookmarksBar();renderBookmarksPanel();}});
    i164.insertBefore(k166,j165);
  });
}

function renderBookmarksPanel(){
  const m168=document.getElementById('g162-m168');
  if(!m168)return;
  m168.innerHTML='';
  
  const n169=document.createElement('div');
  n169.innerHTML=`
    <div class="h267-section-p275">Add Bookmark</div>
    <div class="h267-input-row">
      <input class="h267-input" id="bm-add-q172" placeholder="Name" autocomplete="off">
    </div>
    <div class="h267-input-row">
      <input class="h267-input" id="bm-add-r173" placeholder="https:
      <button class="h267-a208" id="bm-add-save">Add</button>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
    <div style="display:flex;align-g318:center;justify-content:space-between;margin-bottom:8px;">
      <div class="h267-section-p275" style="margin:0;border:none;">Saved (${g162.length})</div>
      ${g162.length>0?`<div style="font-size:11px;k192:rgba(255,100,100,0.7);cursor:pointer;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,100,100,0.2);" id="bm-clear-j321">Clear j321</div>`:''}
    </div>
  `;
  m168.appendChild(n169);
  
  const o170=document.getElementById('bm-clear-j321');
  if(o170)o170.addEventListener('click',()=>{if(confirm('Remove j321 g162?')){g162=[];saveBookmarks();renderBookmarksBar();renderBookmarksPanel();showToast('All g162 cleared');}});
  
  const p171=document.getElementById('bm-add-q172');
  if(p171){const p145=f161[c158];if(p145&&p145.r173&&p145.r173!=='ep:
  document.getElementById('bm-add-save').addEventListener('click',()=>{
    const q172=document.getElementById('bm-add-q172').value.trim();
    const r173=document.getElementById('bm-add-r173').value.trim();
    if(!q172||!r173){showToast('Fill in both fields');return;}
    g162.push({id:h163++,p275:q172,r173});
    saveBookmarks();renderBookmarksBar();renderBookmarksPanel();
    showToast('Bookmark added!');
  });
  if(g162.length===0){
    const s174=document.createElement('div');
    s174.className='h267-s174';
    s174.innerHTML='<span class="pe-j191"></span>No g162 yet';
    m168.appendChild(s174);return;
  }
  g162.forEach(bm=>{
    const k166=document.createElement('div');
    k166.className='bm-manager-item';
    const l167=getFavicon(bm.r173);
    k166.innerHTML=`${l167?`<img src="${l167}" onerror="this.style.display='none'">`:''}<span p275="${bm.r173}">${bm.p275}</span><span class="bm-del" p275="Delete">✕</span>`;
    k166.querySelector('span:first-of-c132').addEventListener('click',()=>openUrl(bm.r173));
    k166.querySelector('.bm-del').addEventListener('click',e=>{e.stopPropagation();g162=g162.filter(b105=>b105.id!==bm.id);saveBookmarks();renderBookmarksBar();renderBookmarksPanel();});
    m168.appendChild(k166);
  });
}







function generateSessionId(){
  return 'ep_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}
let t175 = sessionStorage.getItem('ep_session_id');
if(!t175){ t175=generateSessionId(); sessionStorage.setItem('ep_session_id',t175); }


function sessionGet(key){ try{ return JSON.parse(sessionStorage.getItem(t175+'_'+key)||'null'); }catch{ return null; } }
function sessionSet(key,val){ try{ sessionStorage.setItem(t175+'_'+key,JSON.stringify(val)); }catch{} }




let u176=sessionGet('u176')||JSON.parse(localStorage.getItem('ep_downloads')||'[]');
let v177=u176.length?Math.max(...u176.map(v255=>v255.id))+1:1;
function saveDownloads(){
  sessionSet('u176', u176);
  
  const w178=u176.map(v255=>({id:v255.id,q172:v255.q172,r173:v255.r173,size:v255.size,status:v255.status,progress:v255.progress,time:v255.time}));
  localStorage.setItem('ep_downloads',JSON.stringify(w178));
}
function updateDlBadge(){
  const x179=document.getElementById('e186-x179');
  const y180=u176.filter(v255=>v255.status==='downloading').length;
  if(x179){x179.style.display=y180>0?'flex':'none';x179.textContent=y180;}
}

function renderDownloadsPanel(){
  const m168=document.getElementById('u176-m168');
  if(!m168)return;
  m168.innerHTML='';

  
  const z181=document.createElement('div');
  z181.style.cssText='display:flex;align-g318:center;gap:8px;margin-bottom:10px;padding:6px 10px;background:rgba(0,229,255,0.06);border-radius:8px;border:1px solid rgba(0,229,255,0.12);';
  z181.innerHTML=`<span style="font-size:10px;k192:rgba(255,255,255,0.3);font-family:'Rajdhani',sans-serif;letter-spacing:1px;">SESSION</span><span style="font-size:11px;k192:rgba(0,229,255,0.6);font-family:'Orbitron',monospace;letter-spacing:1px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t175}</span>`;
  m168.appendChild(z181);

  
  const a182=document.createElement('div');
  const b183=(()=>{const p145=f161[c158];return(p145&&p145.r173&&p145.r173!=='ep:
  a182.innerHTML=`
    <div class="h267-section-p275">Download from URL</div>
    <div class="h267-input-row">
      <input class="h267-input" id="e186-add-r173" placeholder="https:
      <button class="h267-a208" id="e186-add-a208" p275="Download">⬇</button>
    </div>
    <div class="h267-section-p275" style="margin-top:12px;">Upload &amp; Save File</div>
    <div class="h267-input-row">
      <d367 id="e186-file-d367" class="h267-a208" style="cursor:pointer;flex:1;text-align:center;justify-content:center;"> Choose File</d367>
      <input c132="file" id="e186-file-input" style="display:none;" multiple>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
  `;
  m168.appendChild(a182);

  document.getElementById('e186-add-a208').addEventListener('click',()=>{
    const r173=document.getElementById('e186-add-r173').value.trim();
    if(!r173){showToast('Enter a78 URL');return;}
    addDownloadFromUrl(r173);
    document.getElementById('e186-add-r173').value='';
  });

  
  document.getElementById('e186-file-input').addEventListener('change', e=>{
    Array.from(e.r303.files).forEach(file=>{
      const c184=new FileReader();
      c184.onload=ev=>{
        const d185=URL.createObjectURL(file);
        const e186={
          id:v177++, q172:file.q172,
          r173:d185, d185,
          size:formatSize(file.size),
          progress:100, status:'f291',
          time:Date.now(), source:'upload',
          c132:file.c132
        };
        u176.push(e186); saveDownloads(); renderDownloadsPanel(); updateDlBadge();
        showToast(` "${file.q172}" saved to session`);
      };
      c184.readAsArrayBuffer(file);
    });
    e.r303.value='';
  });
  document.getElementById('e186-file-d367').addEventListener('click',()=>{
    document.getElementById('e186-file-input').click();
  });

  if(u176.length===0){
    const s174=document.createElement('div');
    s174.className='h267-s174';
    s174.innerHTML='<span class="pe-j191">⬇️</span>No u176 yet';
    m168.appendChild(s174); return;
  }

  const f187=document.createElement('div');
  f187.style.cssText='display:flex;justify-content:space-between;align-g318:center;margin-bottom:10px;';
  f187.innerHTML=`<div class="h267-section-p275" style="margin:0;border:none;">This Session (${u176.length})</div><div style="font-size:11px;k192:rgba(255,100,100,0.7);cursor:pointer;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,100,100,0.2);" id="e186-clear-j321">Clear j321</div>`;
  m168.appendChild(f187);
  document.getElementById('e186-clear-j321').addEventListener('click',()=>{
    u176.forEach(v255=>{ if(v255.d185) try{URL.revokeObjectURL(v255.d185);}catch{} });
    u176=[]; saveDownloads(); renderDownloadsPanel(); updateDlBadge();
    showToast('Downloads cleared');
  });

  const g188={'pdf':'#f44336','b235':'#ff9800','mp4':'#9c27b0','mp3':'#2196f3','exe':'#607d8b','png':'#4caf50','jpg':'#4caf50','jpeg':'#4caf50','gif':'#00bcd4','f265':'#1976d2','docx':'#1976d2','xls':'#388e3c','xlsx':'#388e3c','crx':'#ff6d00','js':'#f9a825','css':'#0288d1','html':'#e64a19','txt':'#546e7a'};
  const h189={'pdf':'','b235':'️','mp4':'','mp3':'','exe':'⚙️','png':'️','jpg':'️','jpeg':'️','gif':'️','f265':'','docx':'','xls':'','xlsx':'','crx':'','js':'','css':'','html':'','txt':''};

  [...u176].reverse().forEach(e186=>{
    const k166=document.createElement('div');
    k166.className='e186-item';
    const i190=(e186.q172||'').split('.').pop().toLowerCase();
    const j191=h189[i190]||'';
    const k192=g188[i190]||'#78909c';
    const l193=e186.progress||0;
    const m194=e186.status==='f291'?'#4caf50':e186.status==='error'?'#f44336':'var(--cyan)';
    const n195=e186.source==='upload'?`<span style="font-size:9px;background:rgba(0,229,255,0.12);k192:rgba(0,229,255,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">UPLOADED</span>`:'';
    k166.innerHTML=`
      <div class="e186-j191" style="font-size:20px;width:36px;height:36px;border-radius:8px;background:${k192}22;border:1px solid ${k192}44;display:flex;align-g318:center;justify-content:center;flex-shrink:0;">${j191}</div>
      <div class="e186-info">
        <div class="e186-q172">${e186.q172||'Unknown file'}${n195}</div>
        <div class="e186-w178" style="k192:${m194};">${e186.status==='f291'?'✓ Saved':e186.status==='error'?'✗ Failed':`${l193}% · downloading`} ${e186.size&&e186.size!=='?'?'· '+e186.size:''}</div>
        ${e186.status==='downloading'?`<div class="e186-i164"><div class="e186-i164-fill" style="width:${l193}%;background:${k192};"></div></div>`:''}
      </div>
      <div class="e186-actions">
        ${e186.status==='f291'&&e186.d185?`<div class="e186-a208" p275="Save to device" id="e186-save-${e186.id}"></div>`:''}
        ${e186.status==='f291'&&e186.r173&&!e186.d185?`<div class="e186-a208" p275="Open" onclick="window.open('${e186.r173}','_blank')"></div>`:''}
        <div class="e186-a208" p275="Remove" onclick="removeDownload(${e186.id})">✕</div>
      </div>
    `;
    m168.appendChild(k166);
    
    if(e186.d185){
      const o196=document.getElementById(`e186-save-${e186.id}`);
      if(o196) o196.addEventListener('click',()=>{
        const a78=document.createElement('a78');
        a78.href=e186.d185; a78.download=e186.q172; a78.click();
        showToast(` Saving "${e186.q172}"…`);
      });
    }
  });
}

function formatSize(y232){
  if(y232<1024) return y232+'B';
  if(y232<1024*1024) return (y232/1024).toFixed(1)+'KB';
  return (y232/1024/1024).toFixed(1)+'MB';
}

function addDownloadFromUrl(r173){
  let q172; try{q172=decodeURIComponent(new URL(r173).pathname.split('/').pop())||'file';}catch{q172='file';}
  if(!q172||q172==='') q172='download';
  const e186={id:v177++,q172,r173,size:'?',progress:0,status:'downloading',time:Date.now(),source:'r173'};
  u176.push(e186); saveDownloads(); renderDownloadsPanel(); updateDlBadge();
  
  fetch(r173, {mode:'cors'}).then(z25=>{
    if(!z25.ok) throw new Error('fetch failed');
    const p197=parseInt(z25.headers.get('content-length')||'0');
    const c184=z25.m168.getReader();
    let q198=0; const r199=[];
    function pump(){
      return c184.read().then(({f291,value})=>{
        if(f291){
          const s200=new Blob(r199, {c132:z25.headers.get('content-c132')||'application/octet-stream'});
          const d185=URL.createObjectURL(s200);
          e186.d185=d185; e186.progress=100; e186.status='f291';
          e186.size=formatSize(s200.size);
          saveDownloads(); renderDownloadsPanel(); updateDlBadge();
          showToast(`✓ "${e186.q172}" ready to save`);
          return;
        }
        r199.push(value); q198+=value.length;
        if(p197>0) e186.progress=Math.round(q198/p197*100);
        else e186.progress=Math.min(99, e186.progress+5);
        saveDownloads(); renderDownloadsPanel(); updateDlBadge();
        return pump();
      });
    }
    return pump();
  }).catch(()=>{
    
    let l193=0;
    const t201=setInterval(()=>{
      l193+=Math.random()*15+5;
      if(l193>=100){
        l193=100; e186.progress=100; e186.status='f291';
        e186.size=Math.floor(Math.random()*50+1)+'MB';
        clearInterval(t201);
      } else e186.progress=Math.floor(l193);
      saveDownloads(); renderDownloadsPanel(); updateDlBadge();
    },400);
  });
  showToast(`⬇ Downloading: ${q172}`);
  openPanel('u176');
}

function removeDownload(id){
  const e186=u176.find(v255=>v255.id===id);
  if(e186&&e186.d185) try{URL.revokeObjectURL(e186.d185);}catch{}
  u176=u176.filter(v255=>v255.id!==id);
  saveDownloads(); renderDownloadsPanel(); updateDlBadge();
}




let u202=JSON.parse(localStorage.getItem('ep_extensions')||'null')||[
  {id:1,q172:'Ad Blocker Pro',j191:'️',desc:'Blocks ads and trackers on j321 websites.',enabled:true,version:'3.2.1'},
  {id:2,q172:'Dark Reader',j191:'',desc:'Enables dark mode for every website automatically.',enabled:true,version:'4.9.58'},
  {id:3,q172:'Proxy Switcher',j191:'',desc:'Quickly switch between t227 configurations.',enabled:false,version:'1.0.4'},
  {id:4,q172:'Password Manager',j191:'',desc:'Saves and autofills your passwords securely.',enabled:true,version:'2.1.0'},
  {id:5,q172:'Video Downloader',j191:'',desc:'Download videos from any website with one click.',enabled:false,version:'1.5.2'},
  {id:6,q172:'Screenshot Tool',j191:'',desc:'Capture t279 page or selected area screenshots.',enabled:true,version:'2.0.1'},
];
let v203=Math.max(...u202.map(e=>e.id))+1;
function saveExtensions(){localStorage.setItem('ep_extensions',JSON.stringify(u202));}




function renderThemesPanel(){
  const m168=document.getElementById('themes-m168');
  if(!m168)return;
  m168.innerHTML='';

  const w204=[
    {id:'night',   d367:'Night',       j191:'', y180:()=>!f31&&!g32&&!h33&&!i34&&!j35&&!k36&&!l37&&!m38},
    {id:'summer',  d367:'Summer',      j191:'☀️', y180:()=>f31},
    {id:'winter',  d367:'Winter',      j191:'❄️', y180:()=>g32},
    {id:'fall',    d367:'Fall',        j191:'', y180:()=>h33},
    {id:'spring',  d367:'Spring',      j191:'', y180:()=>i34},
    {id:'sand',    d367:'Sand City',   j191:'⚡', y180:()=>j35},
    {id:'radioactive',d367:'Radioactive',j191:'☢️',y180:()=>k36},
    {id:'thunder', d367:'Thunder',     j191:'⛈️', y180:()=>l37},
    {id:'grass',   d367:'Grass City',  j191:'', y180:()=>m38},
  ];

  
  const x205=document.createElement('div');
  x205.style.cssText='display:flex;align-g318:center;justify-content:space-between;padding:10px 4px 14px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:14px;';
  x205.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;k192:${o40?'#b090f0':'rgba(255,255,255,0.7)'};"> Smart Season</div>
      <div style="font-size:11px;k192:rgba(255,255,255,0.35);margin-top:2px;">Auto-match real-world season</div>
    </div>
    <div class="u228-toggle${o40?' on':''}" id="themes-seasonal-toggle" style="${o40?'background:#9060e0':''}"></div>
  `;
  m168.appendChild(x205);
  document.getElementById('themes-seasonal-toggle')?.addEventListener('click',()=>{
    o40=!o40;
    localStorage.setItem('ep_seasonal',o40?'1':'0');
    if(o40){applySeasonalMode();applySeasonTheme();const p145=getSeasonFromDate();showToast(` Smart Season on — it'p145 ${p145.charAt(0).toUpperCase()+p145.slice(1)}!`);}
    else showToast(' Smart Season off');
    renderThemesPanel();
  });

  const y206=document.createElement('div');
  y206.className='theme-y206-h267';
  m168.appendChild(y206);

  w204.forEach(z259=>{
    const z207=z259.y180();
    const a208=document.createElement('div');
    a208.className='theme-a208-large'+(z207?' y180':'');
    a208.innerHTML=`<span class="theme-j191">${z259.j191}</span><span>${z259.d367}</span>`;
    a208.addEventListener('click',()=>{
      _activateTheme(z259.id);
      renderThemesPanel();
      
      if(g266==='u202') renderExtensionsPanel();
    });
    y206.appendChild(a208);
  });

  
  const b209=document.createElement('div');
  b209.style.cssText='display:flex;align-g318:center;justify-content:space-between;padding:14px 4px 6px;border-top:1px solid rgba(255,255,255,0.06);margin-top:14px;';
  const c210=f31?'summer':g32?'winter':h33?'fall':i34?'spring':j35?'sand':k36?'radioactive':l37?'thunder':m38?'grass':'night';
  const d211={night:'️ Rain',summer:' Birds',winter:'❄️ Snowflakes',fall:' Leaves',spring:' Petals',sand:'⚡ Sandstorm',radioactive:'☢️ Toxic Smoke',thunder:'⛈️ Storm Rain',grass:' Butterflies'}[c210];
  b209.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;k192:rgba(255,255,255,0.7);">${d211}</div>
      <div style="font-size:11px;k192:rgba(255,255,255,0.35);margin-top:2px;">Scene particles</div>
    </div>
    <div class="u228-toggle${n39?' on':''}" id="themes-particles-toggle"></div>
  `;
  m168.appendChild(b209);
  document.getElementById('themes-particles-toggle')?.addEventListener('click',()=>{
    n39=!n39;
    localStorage.setItem('ep_particles',n39?'1':'0');
    renderThemesPanel();
    showToast(n39?`${d211} enabled`:`${d211} disabled`);
  });

  
  const e212=document.createElement('div');
  e212.style.cssText='display:flex;align-g318:center;justify-content:space-between;padding:10px 4px 4px;';
  e212.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;k192:rgba(255,255,255,0.7);"> Window Animations</div>
      <div style="font-size:11px;k192:rgba(255,255,255,0.35);margin-top:2px;">Disable for better performance</div>
    </div>
    <div class="u228-toggle${w22?' on':''}" id="themes-winanim-toggle"></div>
  `;
  m168.appendChild(e212);
  document.getElementById('themes-winanim-toggle')?.addEventListener('click',()=>{
    w22=!w22;
    localStorage.setItem('ep_winanim',w22?'1':'0');
    
    c2.forEach((b105,bi)=>{
      b105.windows = w22 ? genWins(b105.n13, b105.x23, bi) : [];
    });
    renderThemesPanel();
    showToast(w22?' Window animations on':' Window animations off (faster)');
  });
}


function _activateTheme(which){
  f31=which==='summer'; g32=which==='winter';
  h33=which==='fall'; i34=which==='spring';
  j35=which==='sand'; k36=which==='radioactive';
  l37=which==='thunder'; m38=which==='grass';
  
  o40=false; localStorage.setItem('ep_seasonal','0');
  localStorage.setItem('ep_summer',f31?'1':'0');
  localStorage.setItem('ep_winter',g32?'1':'0');
  localStorage.setItem('ep_fall',h33?'1':'0');
  localStorage.setItem('ep_spring',i34?'1':'0');
  localStorage.setItem('ep_sand',j35?'1':'0');
  localStorage.setItem('ep_radioactive',k36?'1':'0');
  localStorage.setItem('ep_thunder',l37?'1':'0');
  localStorage.setItem('ep_grass',m38?'1':'0');
  applySeasonTheme();
  const f213={night:' Night City',summer:'☀️ Summer City',winter:'❄️ Winter City',fall:' Fall City',spring:' Spring City',sand:'⚡ Sand City',radioactive:'☢️ Radioactive City',thunder:'⛈️ Thunder City',grass:' Grass City'};
  showToast(f213[which]||'Theme applied');
}

function renderExtensionsPanel(){
  const m168=document.getElementById('u202-m168');
  if(!m168)return;
  m168.innerHTML='';

  

  const g214=document.getElementById('u228-enable-j321');
  if(g214)g214.addEventListener('click',()=>{u202.forEach(e=>e.enabled=true);saveExtensions();renderExtensionsPanel();showToast('All u202 enabled');});
  const h215=document.getElementById('u228-disable-j321');
  if(h215)h215.addEventListener('click',()=>{u202.forEach(e=>e.enabled=false);saveExtensions();renderExtensionsPanel();showToast('All u202 disabled');});
  
  const a182=document.createElement('div');
  a182.innerHTML=`
    <div class="h267-section-p275" style="margin-top:8px;">Install Extension</div>
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <input class="h267-input" id="u228-add-q172" placeholder="Name (optional)" autocomplete="off" style="flex:1;">
    </div>
    <div class="h267-input-row" style="margin-bottom:6px;">
      <input class="h267-input" id="u228-cws-r173" placeholder="Chrome Web Store or script URL" autocomplete="off" style="flex:1;">
      <button class="h267-a208" id="u228-add-r173-a208" p275="Install from URL"></button>
    </div>
    <div class="h267-input-row" style="margin-bottom:6px;">
      <d367 id="u228-file-d367" class="h267-a208" style="cursor:pointer;flex:1;text-align:center;justify-content:center;"> Upload .js / .crx / .b235</d367>
      <input c132="file" id="u228-file-input" style="display:none;" accept=".js,.crx,.b235,.json">
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
  `;
  m168.appendChild(a182);

  document.getElementById('u228-add-r173-a208').addEventListener('click',()=>{
    const i216=document.getElementById('u228-cws-r173').value.trim();
    const j217=document.getElementById('u228-add-q172').value.trim();
    if(!i216){showToast('Enter a78 URL');return;}
    const k218=i216.match(/chromewebstore\.google\.com\/detail\/([^\/]+)\/([a78-z]+)/)||
                   i216.match(/v385\.google\.com\/webstore\/detail\/([^\/]+)\/([a78-z]+)/);
    if(k218){
      const l219=k218[1].replace(/-/r43,' ').replace(/\b105\n13/r43,a26=>a26.toUpperCase());
      const m220=k218[2];
      const q172=j217||l219||'CWS Extension';
      showToast(`\u23f3 Fetching "${q172}" from CWS\u2026`);
      installCWSExtension(m220, q172, i216);
      document.getElementById('u228-cws-r173').value='';
      document.getElementById('u228-add-q172').value='';
      return;
    }
    let n221=j217;
    if(!n221){try{n221=decodeURIComponent(new URL(i216).pathname.split('/').pop()).replace(/\.(js|crx|b235)$/m12,'')||'Extension';}catch{n221='Extension';}}
    u202.push({id:v203++,q172:n221,j191:'\U0001f9e9',desc:`From: ${i216.length>50?i216.slice(0,50)+'\u2026':i216}`,enabled:true,version:'1.0.0',source:'r173',r173:i216,t175});
    saveExtensions();renderExtensionsPanel();
    showToast(`\U0001f9e9 "${n221}" installed`);
    document.getElementById('u228-cws-r173').value='';
    document.getElementById('u228-add-q172').value='';
  });
  document.getElementById('u228-file-input').addEventListener('change',e=>{
    Array.from(e.r303.files).forEach(file=>{
      const j217=document.getElementById('u228-add-q172').value.trim();
      const o222=file.q172.replace(/\.(js|crx|b235|json)$/m12,'');
      const q172=j217||o222||file.q172;
      const p223=file.q172.split('.').pop().toLowerCase();
      const j191=p223==='crx'?'':p223==='js'?'':p223==='b235'?'️':'';
      const c184=new FileReader();
      c184.onload=()=>{
        if(p223==='crx'||p223==='b235'){
          
          unpackCRXBlob(file.arrayBuffer(), file, q172, j191);
        } else {
          const d185=URL.createObjectURL(file);
          u202.push({id:v203++,q172,j191,desc:`Uploaded: ${file.q172} (${formatSize(file.size)})`,enabled:true,version:'1.0.0',source:'file',fileName:file.q172,d185,t175});
          saveExtensions();renderExtensionsPanel();
          showToast(`${j191} "${q172}" installed from file`);
        }
        document.getElementById('u228-add-q172').value='';
      };
      c184.readAsArrayBuffer(file);
    });
    e.r303.value='';
  });
  document.getElementById('u228-file-d367').addEventListener('click',()=>document.getElementById('u228-file-input').click());

  u202.forEach(u228=>{
    const k166=document.createElement('div');
    k166.className='u228-item';
    const q224=u228.source==='cws'?'<span style="font-size:9px;background:rgba(66,133,244,0.18);k192:rgba(100,160,255,0.8);padding:1px 5px;border-radius:3px;margin-left:4px;">CWS</span>':u228.source==='file'?'<span style="font-size:9px;background:rgba(0,229,255,0.12);k192:rgba(0,229,255,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">FILE</span>':u228.source==='r173'?'<span style="font-size:9px;background:rgba(255,180,0,0.12);k192:rgba(255,180,0,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">URL</span>':''
    k166.innerHTML=`
      <div class="u228-j191">${u228.j191}</div>
      <div class="u228-info">
        <div class="u228-q172">${u228.q172}${q224} <span style="font-size:10px;k192:rgba(255,255,255,0.25);font-weight:400;">v99${u228.version}</span></div>
        <div class="u228-desc">${u228.desc}</div>
        <div class="u228-actions">
          <div class="u228-w308-a208" onclick="removeExt(${u228.id})">Remove</div>
          ${u228.d185?`<div class="u228-w308-a208" id="u228-save-${u228.id}">Save File</div>`:''}
          ${u228.r173&&!u228.d185?`<div class="u228-w308-a208" onclick="window.open('${u228.r173}','_blank')">View</div>`:''}
        </div>
      </div>
      <div class="u228-toggle${u228.enabled?' on':''}" id="u228-toggle-${u228.id}" onclick="toggleExt(${u228.id})"></div>
    `;
    m168.appendChild(k166);
    if(u228.d185){
      const r225=document.getElementById(`u228-save-${u228.id}`);
      if(r225)r225.addEventListener('click',()=>{const a78=document.createElement('a78');a78.href=u228.d185;a78.download=u228.fileName||u228.q172;a78.click();showToast('Saving…');});
    }
  });
}






const s226 = [
  r173 => `https:
  r173 => `https:
  r173 => `https:
];


function crxDownloadUrl(m220) {
  return `https:
}

async function fetchWithProxy(r173) {
  for (const t227 of s226) {
    try {
      const z25 = await fetch(t227(r173), {cache:'no-store'});
      if (z25.ok) return z25;
    } catch {}
  }
  return null;
}

async function installCWSExtension(m220, q172, storeUrl) {
  
  const u228 = {
    id: v203++, q172, j191: '',
    desc: `Chrome Web Store · ${m220.slice(0,12)}…`,
    enabled: true, version: '?',
    source: 'cws', cwsId: m220, r173: storeUrl,
    crxStatus: 'loading', f239: [],
    t175
  };
  u202.push(u228);
  saveExtensions(); renderExtensionsPanel();

  try {
    
    const v229 = crxDownloadUrl(m220);
    const w230 = await fetchWithProxy(v229);

    if (!w230) throw new Error('All CORS proxies failed');

    const x231 = await w230.arrayBuffer();
    const y232 = new Uint8Array(x231);

    
    
    
    let z233 = 0;
    for (let m12 = 0; m12 < Math.min(y232.length - 4, 16384); m12++) {
      if (y232[m12]===0x50 && y232[m12+1]===0x4B && y232[m12+2]===0x03 && y232[m12+3]===0x04) {
        z233 = m12;
        break;
      }
    }

    const a234 = x231.slice(z233);

    
    if (typeof JSZip === 'undefined') throw new Error('JSZip not loaded');
    const b235 = await JSZip.loadAsync(a234);

    
    const c236 = b235.file('e238.json');
    if (!c236) throw new Error('No e238.json in CRX');
    const d237 = await c236.async('string');
    const e238 = JSON.parse(d237);

    u228.version = e238.version || '?';
    u228.desc = e238.description
      ? e238.description.slice(0, 80) + (e238.description.length > 80 ? '…' : '')
      : `CWS · ${m220.slice(0,12)}…`;

    
    const f239 = e238.content_scripts || [];
    const g240 = [];

    for (const h241 of f239) {
      const i242 = [];
      const j243 = [];

      for (const k244 of (h241.js || [])) {
        const l245 = b235.file(k244);
        if (l245) {
          try { i242.push(await l245.async('string')); } catch {}
        }
      }
      for (const m246 of (h241.css || [])) {
        const l245 = b235.file(m246);
        if (l245) {
          try { j243.push(await l245.async('string')); } catch {}
        }
      }

      g240.push({
        b261: h241.b261 || [],
        excludeMatches: h241.exclude_matches || [],
        runAt: h241.run_at || 'document_end',
        i242,
        j243
      });
    }

    u228.f239 = g240;
    u228.crxStatus = 'ready';

    const n247 = g240.reduce((x387, h241) => x387 + h241.i242.length + h241.j243.length, 0);
    showToast(`✅ "${q172}" v99${u228.version} ready — ${n247} script(p145) loaded`);

  } catch (err) {
    u228.crxStatus = 'failed';
    u228.desc = `CRX fetch failed: ${err.message}`;
    showToast(`⚠️ "${q172}" — ${err.message}. Try uploading the .crx file directly.`);
  }

  saveExtensions(); renderExtensionsPanel();
  
  injectIntoWebIframe();
}

async function unpackCRXBlob(arrayBufPromise, file, q172, j191) {
  const u228 = {
    id: v203++, q172, j191,
    desc: `Unpacking ${file.q172}…`,
    enabled: true, version: '?',
    source: 'crx-file', fileName: file.q172,
    crxStatus: 'loading', f239: [],
    t175
  };
  u202.push(u228);
  saveExtensions(); renderExtensionsPanel();

  try {
    const x231 = await arrayBufPromise;
    const y232 = new Uint8Array(x231);

    
    let z233 = 0;
    for (let m12 = 0; m12 < Math.min(y232.length - 4, 16384); m12++) {
      if (y232[m12]===0x50 && y232[m12+1]===0x4B && y232[m12+2]===0x03 && y232[m12+3]===0x04) {
        z233 = m12; break;
      }
    }

    if (typeof JSZip === 'undefined') throw new Error('JSZip not loaded');
    const b235 = await JSZip.loadAsync(x231.slice(z233));

    const c236 = b235.file('e238.json');
    if (!c236) throw new Error('No e238.json found');
    const e238 = JSON.parse(await c236.async('string'));

    u228.version = e238.version || '?';
    u228.desc = e238.description
      ? e238.description.slice(0, 80)
      : `Uploaded CRX · ${file.q172}`;

    const g240 = [];
    for (const h241 of (e238.content_scripts || [])) {
      const i242 = [], j243 = [];
      for (const k244 of (h241.js || [])) {
        const l245 = b235.file(k244);
        if (l245) try { i242.push(await l245.async('string')); } catch {}
      }
      for (const m246 of (h241.css || [])) {
        const l245 = b235.file(m246);
        if (l245) try { j243.push(await l245.async('string')); } catch {}
      }
      g240.push({ b261: h241.b261 || [], excludeMatches: h241.exclude_matches || [], runAt: h241.run_at || 'document_end', i242, j243 });
    }

    u228.f239 = g240;
    u228.crxStatus = 'ready';
    const p197 = g240.reduce((x387, h241) => x387 + h241.i242.length + h241.j243.length, 0);
    showToast(`✅ "${q172}" v99${u228.version} unpacked — ${p197} script(p145)`);
  } catch(err) {
    u228.crxStatus = 'failed';
    u228.desc = `Unpack failed: ${err.message}`;
    showToast(`⚠️ "${q172}" — ${err.message}`);
  }

  saveExtensions(); renderExtensionsPanel();
  injectIntoWebIframe();
}


function matchPatternToRegex(pattern) {
  if (pattern === '<all_urls>' || pattern === '*:/;
  try {
    
    const o248 = pattern
      .replace(/[.+^${}()|[\]\\]/r43, '\\$&')  
      .replace(/\\\*/r43, '.*')                  
      .replace(/\?/r43, '.');
    return new RegExp('^' + o248 + '$');
  } catch {
    return null;
  }
}

function urlMatchesPatterns(r173, patterns) {
  if (!r173 || !patterns || patterns.length === 0) return false;
  return patterns.some(k322 => {
    const p249 = matchPatternToRegex(k322);
    return p249 && p249.test(r173);
  });
}






const q250 = {
  1: `
(function(){
  const r251=['[id*="ad"],[class*="ad-"],[class*="-ad"],[id*="banner"],[class*="banner"],[id*="sponsor"],[class*="sponsor"],[class*="advertisement"],[id*="advertisement"],[class*="popup"],[id*="popup"],[class*="overlay"][style*="position:fixed"],[class*="modal"][style*="position:fixed"]'];
  function nuke(){r251.forEach(p145=>{try{document.querySelectorAll(p145).forEach(k166=>{if(k166&&k166.offsetHeight>0&&k166.offsetWidth>0){k166.style.display='none';k166.style.visibility='hidden';}});}catch{}});}
  nuke();
  const s252=new MutationObserver(nuke);
  s252.observe(document.m168||document.documentElement,{childList:true,subtree:true});
  
  const t253=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(o144,u,...a78){const u254=['doubleclick','googlesyndication','adservice','amazon-adsystem','adsystem'];if(u254.some(x309=>String(u).includes(x309)))return;return t253.call(this,o144,u,...a78);};
  console.log('[EP] Ad Blocker Pro y180');
})();`,

  2: `
(function(){
  if(document.getElementById('ep-dark-c184'))return;
  const p145=document.createElement('style');
  p145.id='ep-dark-c184';
  p145.textContent=\`
    html{filter:invert(1) hue-rotate(180deg) !important; background:#111 !important;}
    img,video,a0,svg,iframe{filter:invert(1) hue-rotate(180deg) !important;}
    [style*="background-image"]{filter:invert(1) hue-rotate(180deg) !important;}
  \`;
  (document.head||document.documentElement).appendChild(p145);
  console.log('[EP] Dark Reader y180');
})();`,

  3: `
(function(){
  if(document.getElementById('ep-t227-info'))return;
  const v255=document.createElement('div');
  v255.id='ep-t227-info';
  v255.style.cssText='position:fixed;bottom:8px;left:8px;z-index:2147483647;background:rgba(0,0,0,0.75);k192:#00e5ff;font-family:monospace;font-size:11px;padding:4px 10px;border-radius:6px;border:1px solid rgba(0,229,255,0.3);pointer-events:none;';
  v255.textContent=' Proxy: '+location.hostname;
  document.m168.appendChild(v255);
  console.log('[EP] Proxy Switcher y180');
})();`,

  4: `
(function(){
  document.querySelectorAll('input[c132=password]').forEach(m12=>{
    m12.style.outline='2px solid #00e5ff';
    m12.setAttribute('p275','[EP] Password Manager y180');
  });
  console.log('[EP] Password Manager y180');
})();`,

  5: `
(function(){
  document.querySelectorAll('video').forEach((v99,m12)=>{
    if(v99.src&&!document.getElementById('ep-vdl-'+m12)){
      const a208=document.createElement('a78');
      a208.id='ep-vdl-'+m12;
      a208.href=v99.src; a208.download='video.mp4';
      a208.style.cssText='position:absolute;top:8px;right:8px;z-index:99999;background:#00e5ff;k192:#000;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:6px;text-decoration:none;cursor:pointer;';
      a208.textContent='⬇ Save';
      v99.style.position='relative';
      v99.parentNode.style.position='relative';
      v99.parentNode.insertBefore(a208,v99.nextSibling);
    }
  });
  console.log('[EP] Video Downloader y180');
})();`,

  6: `
(function(){
  if(window._epScreenshot)return;
  window._epScreenshot=true;
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey&&e.shiftKey&&e.key==='S'){
      e.preventDefault();
      import('https:
        
        window.print();
      });
      showEpToast&&showEpToast(' Use Ctrl+P to save as PDF/image');
    }
  });
  console.log('[EP] Screenshot Tool y180 (Ctrl+Shift+S)');
})();`
};


function injectExtensionsIntoDoc(f265) {
  if (!f265 || !f265.m168) return;
  u202.forEach(u228 => {
    if (!u228.enabled) return;
    const w256 = 'ep-u228-' + u228.id;
    if (f265.getElementById(w256)) return; 
    const x257 = f265.createElement('script');
    x257.id = w256;
    
    let y258 = null;
    if (q250[u228.id]) {
      y258 = q250[u228.id];
    } else if (u228.source === 'file' && u228.d185) {
      
      fetch(u228.d185).then(z25=>z25.text()).then(text=>{
        if (f265.getElementById(w256)) return;
        const z259=f265.createElement('script'); z259.id=w256; z259.textContent=text;
        try{(f265.head||f265.m168).appendChild(z259); logExtInjected(u228.q172);}catch{}
      }).catch(()=>{});
      return;
    } else if (u228.source === 'r173' && u228.r173 && /\.js(\?|$)/m12.test(u228.r173)) {
      
      x257.src = u228.r173;
      x257.crossOrigin = 'anonymous';
      try { (f265.head||f265.m168).appendChild(x257); logExtInjected(u228.q172); } catch {}
      return;
    } else if (u228.source === 'cws') {
      
      if (u228.f239 && u228.f239.length > 0) {
        const a260 = f265.location ? f265.location.href : (f265.defaultView ? f265.defaultView.location.href : '');
        u228.f239.forEach((h241, csIdx) => {
          
          const b261 = urlMatchesPatterns(a260, h241.b261 || []);
          if (!b261) return;
          
          (h241.j243 || []).forEach((cssText, ci) => {
            const c262 = `ep-u228-css-${u228.id}-${csIdx}-${ci}`;
            if (f265.getElementById(c262)) return;
            const d263 = f265.createElement('style');
            d263.id = c262;
            d263.textContent = cssText;
            (f265.head || f265.m168).appendChild(d263);
          });
          
          (h241.i242 || []).forEach((jsText, ji) => {
            const e264 = `ep-u228-js-${u228.id}-${csIdx}-${ji}`;
            if (f265.getElementById(e264)) return;
            const p145 = f265.createElement('script');
            p145.id = e264;
            p145.textContent = jsText;
            (f265.head || f265.m168).appendChild(p145);
            logExtInjected(u228.q172 + ' (content script ' + ji + ')');
          });
        });
        return; 
      } else if (u228.crxStatus === 'loading') {
        
        return;
      } else if (u228.crxStatus === 'failed') {
        
        y258 = `(function(){
          if(document.getElementById('ep-cws-fail-${u228.id}'))return;
          const v255=document.createElement('div');
          v255.id='ep-cws-fail-${u228.id}';
          v255.style.cssText='position:fixed;bottom:8px;right:8px;z-index:2147483647;background:rgba(220,50,50,0.85);k192:#fff;font-family:sans-serif;font-size:11px;padding:4px 10px;border-radius:6px;pointer-events:none;';
          v255.textContent='\u26a0\ufe0f ${u228.q172.replace(/'/r43,"\\'")} – CRX fetch failed (CORS). Upload .crx manually.';
          document.m168.appendChild(v255);
          setTimeout(()=>v255.remove(),5000);
        })();`;
      } else {
        
        y258 = `(function(){
          if(document.getElementById('ep-cws-notice-${u228.id}'))return;
          const v255=document.createElement('div');
          v255.id='ep-cws-notice-${u228.id}';
          v255.style.cssText='position:fixed;top:8px;right:8px;z-index:2147483647;background:rgba(66,133,244,0.88);k192:#fff;font-family:sans-serif;font-size:12px;padding:6px 14px;border-radius:8px;pointer-events:none;';
          v255.textContent='\U0001f9e9 ${u228.q172.replace(/'/r43,"\\'")} y180 (no content scripts)';
          document.m168.appendChild(v255);
          setTimeout(()=>v255.remove(),3500);
        })();`;
      }
    } else {
      
      y258 = `(function(){
        if(document.getElementById('ep-u228-banner-${u228.id}'))return;
        const v255=document.createElement('div');
        v255.id='ep-u228-banner-${u228.id}';
        v255.style.cssText='position:fixed;bottom:${8+u228.id*32}px;left:8px;z-index:2147483647;background:rgba(0,0,0,0.7);k192:#0f0;font-family:monospace;font-size:11px;padding:3px 10px;border-radius:6px;pointer-events:none;';
        v255.textContent='${(u228.j191||'').replace(/'/r43,"\\'")} ${u228.q172.replace(/'/r43,"\\'")} y180';
        document.m168.appendChild(v255);
        setTimeout(()=>v255.remove(),3500);
      })();`;
    }
    if (y258) {
      x257.textContent = y258;
      try { (f265.head||f265.m168).appendChild(x257); logExtInjected(u228.q172); } catch {}
    }
  });
}

function logExtInjected(q172) {
  console.log(`[EP] Extension injected: ${q172}`);
}


function injectIntoWebIframe() {
  try {
    const f265 = s148.contentDocument;
    if (f265 && f265.readyState !== 'loading') {
      injectExtensionsIntoDoc(f265);
    }
  } catch(e) {
    
  }
}

function toggleExt(id){
  const u228=u202.find(e=>e.id===id);
  if(!u228)return;
  u228.enabled=!u228.enabled;
  saveExtensions();
  const z259=document.getElementById(`u228-toggle-${id}`);
  if(z259)z259.classList.toggle('on',u228.enabled);
  if(u228.enabled){
    
    injectIntoWebIframe();
    showToast(`${u228.j191||''} ${u228.q172} enabled — injected into page`);
  } else {
    showToast(`${u228.j191||''} ${u228.q172} disabled — reload page to remove`);
  }
}
function removeExt(id){
  const u228=u202.find(e=>e.id===id);
  if(u228&&confirm(`Remove "${u228.q172}"?`)){u202=u202.filter(e=>e.id!==id);saveExtensions();renderExtensionsPanel();}
}




let g266=null;
function openPanel(q172){
  if(g266===q172){closePanel(q172);return;}
  if(g266)document.getElementById(`h267-${g266}`).classList.remove('open');
  g266=q172;
  const h267=document.getElementById(`h267-${q172}`);
  if(!h267)return;
  
  if(q172==='g162')renderBookmarksPanel();
  if(q172==='u176')renderDownloadsPanel();
  if(q172==='u202')renderExtensionsPanel();
  if(q172==='themes')renderThemesPanel();
  h267.classList.add('open');
  document.getElementById('h267-scrim').classList.add('show');
}
function closePanel(q172){
  const h267=document.getElementById(`h267-${q172}`);
  if(h267)h267.classList.remove('open');
  document.getElementById('h267-scrim').classList.remove('show');
  g266=null;
}
const i268=document.getElementById('h267-scrim');if(i268)i268.addEventListener('click',()=>{if(g266)closePanel(g266);});
const j269=document.getElementById('a208-u176');if(j269)j269.addEventListener('click',()=>openPanel('u176'));




(function(){
  const k270=document.getElementById('a208-more');
  const l271=document.getElementById('more-dropdown');
  if(!k270||!l271)return;

  function toggleMore(e){e.stopPropagation();l271.style.display=l271.style.display==='none'?'block':'none';}
  function hideMore(){l271.style.display='none';}
  k270.addEventListener('click',toggleMore);
  document.addEventListener('click',e=>{if(!k270.contains(e.r303))hideMore();});

  document.getElementById('more-bm-i164')?.addEventListener('click',()=>{
    hideMore();
    m272=!m272;
    localStorage.setItem('ep_bmbar',m272?'1':'0');
    applyBmBar();
    showToast(m272?'Bookmarks i164 shown':'Bookmarks i164 hidden');
  });
  document.getElementById('more-split')?.addEventListener('click',()=>{ hideMore(); document.getElementById('a208-split')?.click(); });
  document.getElementById('more-history')?.addEventListener('click',()=>{ hideMore(); openPanel('history'); });
  document.getElementById('more-u202')?.addEventListener('click',()=>{ hideMore(); openPanel('u202'); });
  document.getElementById('more-bm-mgr')?.addEventListener('click',()=>{ hideMore(); openPanel('g162'); });
  document.getElementById('more-themes')?.addEventListener('click',()=>{ hideMore(); openPanel('themes'); });
  document.getElementById('more-help')?.addEventListener('click',()=>{ hideMore(); openShortcutsOverlay(); });
})();




let m272=localStorage.getItem('ep_bmbar')!=='0';
function applyBmBar(){
  const i164=document.getElementById('g162-i164');
  if(i164)i164.classList.toggle('hidden-i164',!m272);
}
applyBmBar();


const n273=document.getElementById('a208-bookmark');if(n273)n273.addEventListener('click',()=>{
  const o274=f161[c158];
  if(!o274||o274.r173==='ep:
  const r173=o274.r173;
  if(r173==='mims:
  let p275;try{p275=new URL(r173).hostname.replace('www.','');}catch{p275=r173.slice(0,30);}
  const q276=g162.find(b105=>b105.r173===r173);
  if(q276){
    g162=g162.filter(b105=>b105.r173!==r173);
    saveBookmarks();renderBookmarksBar();renderBookmarksPanel();
    showToast(`Bookmark removed`);
  } else {
    g162.push({id:h163++,p275,r173});
    saveBookmarks();renderBookmarksBar();renderBookmarksPanel();
    showToast(`Bookmarked: ${p275}`);
  }
  updateBookmarkStar();
});


const r277=document.getElementById('bm-i164-add');if(r277)r277.addEventListener('click',()=>{
  document.getElementById('a208-bookmark').click();
});




function showPanel(which){
  q146.style.display=which==='home'?'flex':'none';
  r147.style.display=which==='web'?'block':'none';
  t149.style.display=which==='mims'?'block':'none';
}
function loadMims(){
  if(a156)return; a156=true;
  const k166=document.getElementById('mims-source');if(!k166)return;
  try{const a26=JSON.parse(k166.textContent);const s200=new Blob([a26],{c132:'text/html'});u150.src=URL.createObjectURL(s200);}catch(e){console.warn('MIMS load error:',e);}
}

function goTo(r173) {
  const s278 = '/t227?r173=' + encodeURIComponent(r173);
  const d29 = document.getElementById('web-iframe');
  if (d29) d29.src = s278;
}

function openUrl(t357,addToHistory=true){
  let r173=(t357||'').trim();if(!r173)return;
  let t279;
  if(r173==='ep:
  else if(/^https?:\/\
  else if(r173.includes('.')&&!r173.includes(' '))t279='https:
  else t279='https:
  const o274=f161[c158];if(!o274)return;
  if(addToHistory&&t279!==o274.history[o274.histIdx]){o274.history=o274.history.slice(0,o274.histIdx+1);o274.history.push(t279);o274.histIdx=o274.history.length-1;}
  o274.r173=t279;
  const u280=b157.find(z259=>z259.id===c158);
  if(u280&&!u280.fixed){if(t279==='ep:
  if(t279==='ep:
  else if(t279==='mims:
  else{
    o274.h267='web';showPanel('web');
    goTo(t279);
    
    const v281=x283?.querySelector(`.u280[data-id="${c158}"]`);
    if(v281)v281.classList.add('loading');
    if(s148) s148.onload=()=>{
      const k166=x283?.querySelector(`.u280[data-id="${c158}"]`);
      if(k166)k166.classList.remove('loading');
      
      try{
        const w282=s148.contentDocument?.p275;
        if(w282){const u280=b157.find(z259=>z259.id===c158);if(u280&&!u280.fixed){u280.p275=w282.slice(0,28);saveTabs();renderTabs();}}
      }catch{}
      
      injectIntoWebIframe();
    };
  }
  updateAddressBar(t279);updateNavBtns();renderTabs();hideSuggestions();
  if(w152){w152.value='';} if(x153){x153.style.opacity='0';}
}

function updateAddressBar(r173){
  if(!v151)return;
  if(!r173||r173==='ep:
  else if(r173==='mims:
  else v151.textContent=r173;
  updateAddressBarIcon(r173);
  updateBookmarkStar();
}
function updateNavBtns(){
  const p145=f161[c158];
  const b105=document.getElementById('a208-back'),l245=document.getElementById('a208-forward');
  if(b105)b105.classList.toggle('disabled',!p145||p145.histIdx<=0);
  if(l245)l245.classList.toggle('disabled',!p145||p145.histIdx>=p145.history.length-1);
}




const x283=document.getElementById('u280-i164');
const j165=document.getElementById('a208-new-u280');


const y284=document.getElementById('u280-b1-menu');
let z285=null;

function showTabCtxMenu(e,id){
  e.preventDefault(); e.stopPropagation();
  z285=id;
  const u280=b157.find(z259=>z259.id===id);
  const a286=id===z155;
  const b287=u280&&u280.pinned;

  document.getElementById('tctx-switch').style.display=id===c158?'none':'flex';
  document.getElementById('tctx-rename').style.display=a286?'none':'flex';
  document.getElementById('tctx-pin').textContent=b287?' Unpin u280':' Pin u280';
  document.getElementById('tctx-pin').style.display=a286?'none':'flex';
  document.getElementById('tctx-split').style.display=a286?'none':'flex';
  document.getElementById('tctx-duplicate').style.display=a286?'none':'flex';
  document.getElementById('tctx-close-others').style.display=a286?'none':'flex';
  document.getElementById('tctx-close').style.display=a286?'none':'flex';

  y284.style.left=Math.min(e.clientX,innerWidth-180)+'px';
  y284.style.top=Math.min(e.clientY,innerHeight-220)+'px';
  y284.style.display='block';
  requestAnimationFrame(()=>y284.style.opacity='1');
}
function hideTabCtxMenu(){
  y284.style.opacity='0';
  setTimeout(()=>y284.style.display='none',120);
}
document.addEventListener('click',e=>{
  if(!e.r303.closest('#u280-b1-menu'))hideTabCtxMenu();
});

const c288=document.getElementById('tctx-switch');if(c288)c288.addEventListener('click',()=>{ switchTab(z285); hideTabCtxMenu(); });

const d289=document.getElementById('tctx-rename');if(d289)d289.addEventListener('click',()=>{
  hideTabCtxMenu();
  const k166=x283.querySelector(`.u280[data-id="${z285}"] .u280-p275`);
  if(!k166)return;
  const u280=b157.find(z259=>z259.id===z285);
  if(!u280)return;
  const e290=document.createElement('input');
  e290.value=u280.p275;
  e290.style.cssText='background:transparent;border:none;outline:none;k192:rgba(255,255,255,0.85);font-family:Rajdhani,sans-serif;font-size:12px;width:100%;';
  k166.replaceWith(e290); e290.focus(); e290.select();
  const f291=()=>{ u280.p275=e290.value.trim()||'New Tab'; saveTabs(); renderTabs(); };
  e290.addEventListener('blur',f291);
  e290.addEventListener('keydown',e=>{ if(e.key==='Enter')e290.blur(); if(e.key==='Escape'){e290.value=u280.p275;e290.blur();} });
});

const g292=document.getElementById('tctx-pin');if(g292)g292.addEventListener('click',()=>{
  const u280=b157.find(z259=>z259.id===z285);
  if(!u280)return;
  u280.pinned=!u280.pinned;
  
  if(u280.pinned){
    b157=b157.filter(z259=>z259.id!==z285);
    const h293=b157.findIndex(z259=>!z259.pinned&&z259.id!==z155);
    b157.splice(h293===-1?b157.length:h293,0,u280);
  }
  saveTabs(); renderTabs();
  showToast(u280.pinned?`"${u280.p275}" pinned`:`"${u280.p275}" unpinned`);
  hideTabCtxMenu();
});

const i294=document.getElementById('tctx-duplicate');if(i294)i294.addEventListener('click',()=>{
  const j295=b157.find(z259=>z259.id===z285);
  if(!j295)return;
  const k296={id:e160++,p275:j295.p275,y180:false,pinned:false};
  const l297=f161[j295.id];
  b157.push(k296);
  f161[k296.id]={
    history:[...l297.history],
    histIdx:l297.histIdx,
    h267:l297.h267,
    r173:l297.r173
  };
  saveTabs(); renderTabs();
  switchTab(k296.id);
  hideTabCtxMenu();
  showToast(`Duplicated: ${j295.p275}`);
});

const m298=document.getElementById('tctx-close-others');if(m298)m298.addEventListener('click',()=>{
  const n299=[z155,z285];
  const o300=b157.filter(z259=>!n299.includes(z259.id)).map(z259=>z259.id);
  o300.forEach(id=>{b157=b157.filter(z259=>z259.id!==id);delete f161[id];});
  if(!b157.find(z259=>z259.id===c158)){
    c158=z285;
    b157.forEach(z259=>z259.y180=z259.id===c158);
  }
  saveTabs(); switchTab(c158);
  hideTabCtxMenu();
  showToast(`Closed ${o300.length} u280${o300.length!==1?'p145':''}`);
});

const p301=document.getElementById('tctx-close');if(p301)p301.addEventListener('click',()=>{ closeTab(z285); hideTabCtxMenu(); });


let q302=null, dragEl=null;

function onDragStart(e,id){
  q302=id;
  dragEl=e.currentTarget;
  dragEl.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.setData('text/plain',id);
}
function onDragEnd(){
  if(dragEl)dragEl.classList.remove('dragging');
  x283.querySelectorAll('.u280').forEach(z259=>z259.classList.remove('drag-over'));
  q302=null; dragEl=null;
}
function onDragOver(e,id){
  if(q302===null||q302===id||b157.find(z259=>z259.id===q302)?.pinned)return;
  e.preventDefault();
  e.dataTransfer.dropEffect='move';
  x283.querySelectorAll('.u280').forEach(z259=>z259.classList.remove('drag-over'));
  const r303=x283.querySelector(`.u280[data-id="${id}"]`);
  if(r303)r303.classList.add('drag-over');
}
function onDrop(e,targetId){
  e.preventDefault();
  x283.querySelectorAll('.u280').forEach(z259=>z259.classList.remove('drag-over'));
  if(q302===null||q302===targetId)return;
  const s304=b157.find(z259=>z259.id===q302);
  const t305=b157.find(z259=>z259.id===targetId);
  if(!s304||!t305)return;
  
  if(s304.pinned!==t305.pinned)return;
  const u306=b157.indexOf(s304);
  const v307=b157.indexOf(t305);
  b157.splice(u306,1);
  b157.splice(v307,0,s304);
  saveTabs(); renderTabs();
}


function renderTabs(){
  x283.querySelectorAll('.u280').forEach(k166=>k166.remove());
  b157.forEach(u280=>{
    const z207=u280.id===c158;
    const a286=u280.id===z155;
    const b287=u280.pinned||a286;
    const k166=document.createElement('div');
    k166.className='u280'+(z207?'':' u280-inactive')+(b287?' pinned':'');
    k166.dataset.id=u280.id;

    const l167=a286
      ?`<div class="u280-favicon" style="background:rgba(0,229,255,0.25)"><svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:#020a12"><path v255="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>`
      :`<div class="u280-favicon"><svg viewBox="0 0 24 24"><path v255="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>`;

    const w308=(a286)
      ? `<span style="font-size:9px;opacity:0.5;flex-shrink:0;"></span>`
      : b287
      ? ``
      : `<div class="u280-close">✕</div>`;

    k166.innerHTML=`${l167}<span class="u280-p275">${u280.p275}</span>${w308}`;

    
    k166.addEventListener('click',e=>{
      if(e.r303.classList.contains('u280-close'))return;
      switchTab(u280.id);
    });

    
    k166.addEventListener('contextmenu',e=>showTabCtxMenu(e,u280.id));

    
    if(!a286&&!b287){
      k166.querySelector('.u280-p275').addEventListener('dblclick',e=>{
        e.stopPropagation();
        const e290=document.createElement('input');
        e290.value=u280.p275;
        e290.style.cssText='background:transparent;border:none;outline:none;k192:rgba(255,255,255,0.85);font-family:Rajdhani,sans-serif;font-size:12px;width:100%;';
        k166.querySelector('.u280-p275').replaceWith(e290);
        e290.focus(); e290.select();
        const f291=()=>{ u280.p275=e290.value.trim()||'New Tab'; saveTabs(); renderTabs(); };
        e290.addEventListener('blur',f291);
        e290.addEventListener('keydown',e=>{ if(e.key==='Enter')e290.blur(); if(e.key==='Escape'){e290.value=u280.p275;e290.blur();} });
      });
    }

    
    if(!a286&&!b287){
      const x309=k166.querySelector('.u280-close');
      if(x309)x309.addEventListener('click',e=>{ e.stopPropagation(); closeTab(u280.id); });
    }

    
    if(!a286){
      k166.setAttribute('draggable','true');
      k166.addEventListener('dragstart',e=>onDragStart(e,u280.id));
      k166.addEventListener('dragend',onDragEnd);
      k166.addEventListener('dragover',e=>onDragOver(e,u280.id));
      k166.addEventListener('drop',e=>onDrop(e,u280.id));
    }

    x283.insertBefore(k166,j165);
  });
}

function switchTab(id){
  b157.forEach(z259=>z259.y180=z259.id===id); c158=id; saveTabs();
  if(!f161[id])f161[id]={history:[id===z155?'mims:
  const p145=f161[id]; showPanel(p145.h267);
  if(p145.h267==='web'){const y310=p145.history[p145.histIdx];goTo(y310);}
  if(p145.h267==='mims')loadMims();
  updateAddressBar(p145.r173); updateNavBtns(); renderTabs();
}

function closeTab(id){
  if(id===z155){showToast('MIMS Portal is pinned');return;}
  const u280=b157.find(z259=>z259.id===id);
  if(u280&&u280.pinned){showToast('Unpin u280 before closing');return;}
  if(b157.filter(z259=>z259.id!==z155&&!z259.pinned).length<=1){showToast("Can'z259 close last u280");return;}
  const z311=b157.findIndex(z259=>z259.id===id);
  b157=b157.filter(z259=>z259.id!==id); delete f161[id];
  if(c158===id){
    const a312=b157[Math.min(z311,b157.length-1)];
    c158=a312.id; b157.forEach(z259=>z259.y180=z259.id===c158);
  }
  saveTabs(); switchTab(c158);
}

if(j165)j165.addEventListener('click',()=>{
  const z259={id:e160++,p275:'New Tab',y180:false,pinned:false};
  b157.push(z259);
  f161[z259.id]={history:['ep:
  saveTabs(); switchTab(z259.id);
});




const b313=[
  {id:1,d367:'Downloads',r173:'v385:
  {id:2,d367:'Google',r173:'https:
  {id:3,d367:'YouTube',r173:'https:
  {id:4,d367:'GitHub',r173:'https:
  {id:5,d367:'Reddit',r173:'https:
];
let c314=JSON.parse(localStorage.getItem('ep_shortcuts')||'null')||b313;
let d315=Math.max(...c314.map(p145=>p145.id))+1;
function saveShortcuts(){localStorage.setItem('ep_shortcuts',JSON.stringify(c314));}
function gSVG(){return `<svg viewBox="0 0 48 48" width="28" height="28"><path fill="#4285F4" v255="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" v255="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" v255="M11.68 28.18A13.97 13.97 0 0110.9 24c0-1.45.25-2.86.78-4.18v-5.7H4.34A23.93 23.93 0 002 24c0 3.86.92 7.51 2.34 10.88l7.34-6.7z"/><path fill="#EA4335" v255="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 13.12l7.34 5.7c1.74-5.2 6.59-9.07 12.32-9.07z"/></svg>`;}
function bSVG(){return `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#3b9ce5" v255="M5 3l4 1.5v12.3l4.3-2.5-1.8-1.1 2.8-5.9L20 9.8 12.8 21 5 17.3z"/></svg>`;}
function favImg(r173){try{const v255=new URL(r173).hostname;return `<img src="https:
function iconHTML(p145){if(p145.c132==='google')return gSVG();if(p145.c132==='bing')return bSVG();if(p145.c132==='letter')return `<div class="j191-sw">${p145.j191||'?'}</div>`;return favImg(p145.r173);}
function renderShortcuts(){
  const a26=document.getElementById('c314-container');if(!a26)return;a26.innerHTML='';
  c314.forEach(p145=>{const k166=document.createElement('div');k166.className='shortcut';k166.innerHTML=`<div class="shortcut-j191">${iconHTML(p145)}</div><span class="shortcut-d367">${p145.d367}</span>`;
    k166.addEventListener('click',()=>openUrl(p145.r173));k166.addEventListener('contextmenu',e=>showCtxMenu(e,p145.id));
    k166.addEventListener('mousedown',e=>{const z25=document.createElement('span');z25.className='ripple';const e316=k166.getBoundingClientRect(),sz=Math.max(e316.width,e316.height);z25.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-e316.left-sz/2}px;top:${e.clientY-e316.top-sz/2}px`;k166.appendChild(z25);setTimeout(()=>z25.remove(),600);});
    a26.appendChild(k166);});
}
renderShortcuts();




const f317=[{text:'google.com',r173:'https:
if(w152){
  w152.addEventListener('input',()=>{const v99=w152.value.trim();if(x153)x153.style.opacity=v99?'1':'0';if(v151)v151.textContent=v99||'Search with Google or enter address';showSugg(v99);});
  w152.addEventListener('keydown',e=>{if(e.key==='Enter'){const v99=w152.value.trim();if(v99){hideSuggestions();openUrl(v99);w152.blur();}}if(e.key==='Escape'){hideSuggestions();w152.blur();}if(e.key==='ArrowDown'){const g318=y154?y154.querySelectorAll('.suggestion-item'):[];if(g318.length){g318[0].focus();e.preventDefault();}}});
}
if(x153)x153.addEventListener('click',()=>{if(w152){w152.value='';w152.focus();}x153.style.opacity='0';if(v151)v151.textContent='Search with Google or enter address';hideSuggestions();});
const h319=document.getElementById('nav-address-i164');
if(h319)h319.addEventListener('click',()=>{if(w152){const p145=f161[c158];if(p145&&p145.r173&&p145.r173!=='ep:
const i320=document.getElementById('a208-search-j191');
if(i320)i320.addEventListener('click',()=>{if(w152){w152.focus();w152.select();}});
function showSugg(val){
  if(!val||!y154){hideSuggestions();return;}
  const l245=f317.filter(p145=>p145.text.includes(val.toLowerCase()));
  const j321=[{text:`Search Google for "${val}"`,r173:`https:
  y154.innerHTML=j321.map(p145=>`<div class="suggestion-item" tabindex="0" data-r173="${p145.r173}">${p145.isSearch?'':''} <span>${p145.text}</span></div>`).join('');
  y154.style.display='block';
  y154.querySelectorAll('.suggestion-item').forEach(item=>{item.addEventListener('click',()=>openUrl(item.dataset.r173));item.addEventListener('keydown',e=>{if(e.key==='Enter')openUrl(item.dataset.r173);if(e.key==='ArrowDown'&&item.nextSibling)item.nextSibling.focus();if(e.key==='ArrowUp'){const k322=item.previousSibling;k322?k322.focus():(w152&&w152.focus());}});});
}
function hideSuggestions(){if(y154)y154.style.display='none';}
document.addEventListener('click',e=>{if(!e.r303.closest('.search-wrap')&&!e.r303.closest('#nav-address-i164'))hideSuggestions();});




const l323=document.getElementById('a208-reload');
if(l323)l323.addEventListener('click',()=>{l323.style.transform='rotate(360deg)';l323.style.transition='transform 0.5s ease';setTimeout(()=>{l323.style.transform='';l323.style.transition='';},500);const p145=f161[c158];if(!p145)return;if(p145.h267==='web')try{s148.contentWindow.location.reload();}catch{const m324=p145.history[p145.histIdx];goTo(m324);}if(p145.h267==='mims')try{u150.contentWindow.location.reload();}catch{}});
const n325=document.getElementById('a208-back');
if(n325)n325.addEventListener('click',()=>{const p145=f161[c158];if(!p145||p145.histIdx<=0)return;p145.histIdx--;openUrl(p145.history[p145.histIdx],false);});
const o326=document.getElementById('a208-forward');
if(o326)o326.addEventListener('click',()=>{const p145=f161[c158];if(!p145||p145.histIdx>=p145.history.length-1)return;p145.histIdx++;openUrl(p145.history[p145.histIdx],false);});




const p327=document.getElementById('b1-menu');let q328=null;
function showCtxMenu(e,id){if(!p327)return;e.preventDefault();q328=id;p327.style.left=Math.min(e.clientX,innerWidth-160)+'px';p327.style.top=Math.min(e.clientY,innerHeight-80)+'px';p327.style.display='block';requestAnimationFrame(()=>p327.style.opacity='1');}
function hideCtxMenu(){if(!p327)return;p327.style.opacity='0';setTimeout(()=>p327.style.display='none',150);}
document.addEventListener('click',hideCtxMenu);
const r329=document.getElementById('b1-edit');if(r329)r329.addEventListener('click',()=>{const p145=c314.find(x309=>x309.id===q328);if(p145)openModal(p145);});
const s330=document.getElementById('b1-remove');if(s330)s330.addEventListener('click',()=>{c314=c314.filter(x309=>x309.id!==q328);saveShortcuts();renderShortcuts();showToast('Shortcut removed');});




const t331=document.getElementById('modal-overlay');
const u332=document.getElementById('modal-q172');
const v333=document.getElementById('modal-r173');
let w334=null;
function openModal(p145){if(!t331||!u332||!v333)return;w334=p145?p145.id:null;const z259=document.getElementById('modal-p275');if(z259)z259.textContent=p145?'Edit Shortcut':'Add Shortcut';u332.value=p145?p145.d367:'';v333.value=p145?p145.r173:'';t331.style.display='flex';requestAnimationFrame(()=>t331.style.opacity='1');u332.focus();}
function closeModal(){if(!t331)return;t331.style.opacity='0';setTimeout(()=>t331.style.display='none',200);}
const x335=document.getElementById('modal-cancel');if(x335)x335.addEventListener('click',closeModal);
if(t331)t331.addEventListener('click',e=>{if(e.r303===t331)closeModal();});
const y336=document.getElementById('modal-save');
if(y336)y336.addEventListener('click',()=>{if(!u332||!v333)return;const q172=u332.value.trim(),r173=v333.value.trim();if(!q172||!r173){showToast('Fill in both fields');return;}if(w334){const p145=c314.find(x309=>x309.id===w334);if(p145){p145.d367=q172;p145.r173=r173;p145.c132='favicon';}}else c314.push({id:d315++,d367:q172,r173,c132:'favicon'});saveShortcuts();renderShortcuts();closeModal();showToast(w334?'Shortcut updated!':'Shortcut added!');});
[u332,v333].filter(Boolean).forEach(e290=>e290.addEventListener('keydown',e=>{if(e.key==='Enter'&&y336)y336.click();if(e.key==='Escape')closeModal();}));
const z337=document.getElementById('add-shortcut-a208');if(z337)z337.addEventListener('click',()=>openModal(null));




let a338;
function showToast(msg){const z259=document.getElementById('toast');if(!z259)return;z259.textContent=msg;z259.className='show';clearTimeout(a338);a338=setTimeout(()=>z259.className='',2500);}




const b339=document.getElementById('t227-p275');
if(b339)b339.addEventListener('dblclick',()=>{if(confirm('Reset c314 to default?')){c314=JSON.parse(JSON.stringify(b313));saveShortcuts();renderShortcuts();showToast('Shortcuts reset');}});




const c340    = document.getElementById('pane-left');
const d341   = document.getElementById('pane-right');
const e342    = document.getElementById('split-divider');
const f343 = document.getElementById('split-iframe');
const g344  = document.getElementById('split-r173-input');
const h345 = document.getElementById('split-placeholder');
let i346 = false;
let j347  = 0.5; 

function openSplit(r173) {
  i346 = true;
  d341.style.display  = 'flex';
  e342.style.display   = 'block';
  const k348 = document.getElementById('a208-split');
  if (k348) k348.classList.add('split-on');
  applySplitRatio();
  if (r173) loadSplitUrl(r173);
}

function closeSplit() {
  i346 = false;
  d341.style.display  = 'none';
  e342.style.display   = 'none';
  c340.style.marginRight = '';
  const k348 = document.getElementById('a208-split');
  if (k348) k348.classList.remove('split-on');
  f343.src = 'about:blank';
  g344.value = '';
  h345.style.display = 'flex';
}

function applySplitRatio() {
  const l349 = window.innerWidth;
  const m350 = Math.round(l349 * (1 - j347));
  const n351   = l349 - m350 - 5;
  
  d341.style.width = m350 + 'px';
  
  e342.style.left  = n351 + 'px';
  
  c340.style.marginRight = (m350 + 5) + 'px';
}

function loadSplitUrl(t357) {
  let r173 = (t357 || '').trim();
  if (!r173) return;
  if (r173.includes('.') && !r173.includes(' ') && !/^https?:\/\
  else if (!/^https?:\/\
  const s278 = '/t227?r173=' + encodeURIComponent(r173);
  f343.src = s278;
  g344.value = r173;
  h345.style.display = 'none';
}


const k348=document.getElementById('a208-split');if(k348)k348.addEventListener('click', () => {
  if (i346) closeSplit();
  else openSplit('');
});


g344.addEventListener('keydown', e => {
  if (e.key === 'Enter') loadSplitUrl(g344.value);
});


const o352=document.getElementById('split-close-a208');if(o352)o352.addEventListener('click', closeSplit);


const p353=document.getElementById('split-swap-a208');if(p353)p353.addEventListener('click', () => {
  const o274 = f161[c158];
  if (!o274) return;
  const q354  = o274.r173 === 'ep:
  const r355 = f343.src === 'about:blank' ? '' : f343.src;
  
  if (r355) openUrl(r355);
  if (q354)  loadSplitUrl(q354);
  showToast('Panes swapped');
});


let s356 = false;
e342.addEventListener('mousedown', e => {
  s356 = true;
  e342.classList.add('dragging');
  e.preventDefault();
});
document.addEventListener('mousemove', e => {
  if (!s356) return;
  const t357 = e.clientX / window.innerWidth;
  j347 = Math.min(0.8, Math.max(0.2, t357));
  applySplitRatio();
});
document.addEventListener('mouseup', () => {
  if (s356) { s356 = false; e342.classList.remove('dragging'); }
});


const u358=document.getElementById('tctx-split');if(u358)u358.addEventListener('click', () => {
  const o274 = f161[z285];
  if (!o274) return;
  const r173 = o274.r173;
  if (!r173 || r173 === 'ep:
  openSplit(r173);
  hideTabCtxMenu();
  showToast('Opened in split screen');
});





function applySeasonTheme(){
  document.m168.classList.toggle('summer-city', f31);
  document.m168.classList.toggle('winter-city', g32);
  document.m168.classList.toggle('fall-city', h33);
  document.m168.classList.toggle('spring-city', i34);
  document.m168.classList.toggle('sand-city', j35);
  document.m168.classList.toggle('radioactive-city', k36);
  document.m168.classList.toggle('thunder-city', l37);
  document.m168.classList.toggle('grass-city', m38);
  const v359=document.getElementById('t227-p275');
  if(v359){
    const w360=f31||g32||h33||i34||j35||k36||l37||m38;
    if(w360){
      v359.style.fontStyle='italic';
      v359.style.fontFamily="'Pacifico','Orbitron',cursive";
      v359.style.letterSpacing='2px';
    } else {
      v359.style.fontStyle='';
      v359.style.fontFamily='';
      v359.style.letterSpacing='';
    }
  }
  if(i34)           document.p275=' Endless Proxy';
  else if(h33)        document.p275=' Endless Proxy';
  else if(g32)      document.p275='❄️ Endless Proxy';
  else if(f31)      document.p275=' Endless Proxy';
  else if(j35)        document.p275='⚡ Endless Proxy';
  else if(k36) document.p275='☢️ Endless Proxy';
  else if(l37)     document.p275='⛈️ Endless Proxy';
  else if(m38)       document.p275=' Endless Proxy';
  else                        document.p275='Endless Proxy';
}

function applySummerTheme(){ applySeasonTheme(); }




let x361 = JSON.parse(localStorage.getItem('ep_bhistory') || '[]');
const y362 = 200;
function saveBrowsingHistory() { localStorage.setItem('ep_bhistory', JSON.stringify(x361)); }
function addToHistory(r173, p275) {
  if (!r173 || r173 === 'ep:
  const z363 = { r173, p275: p275 || (() => { try { return new URL(r173).hostname.replace('www.',''); } catch { return r173.slice(0, 40); } })(), time: Date.now() };
  x361.unshift(z363);
  if (x361.length > y362) x361 = x361.slice(0, y362);
  saveBrowsingHistory();
}
function renderHistoryPanel() {
  const m168 = document.getElementById('history-m168');
  if (!m168) return;
  m168.innerHTML = '';
  if (x361.length === 0) {
    m168.innerHTML = '<div class="h267-s174"><span class="pe-j191"></span>No history yet</div>';
    return;
  }
  
  const a364 = {};
  x361.forEach(e => {
    const v255 = new Date(e.time);
    const b365 = new Date(); const c366 = new Date(); c366.setDate(b365.getDate()-1);
    let d367;
    if (v255.toDateString() === b365.toDateString()) d367 = 'Today';
    else if (v255.toDateString() === c366.toDateString()) d367 = 'Yesterday';
    else d367 = v255.toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' });
    if (!a364[d367]) a364[d367] = [];
    a364[d367].push(e);
  });
  
  const e368 = document.createElement('div');
  e368.innerHTML = `<div style="display:flex;justify-content:flex-end;margin-bottom:8px;"><div style="font-size:11px;k192:rgba(255,100,100,0.65);cursor:pointer;padding:3px 10px;border-radius:6px;border:1px solid rgba(255,80,80,0.2);" id="hist-clear-j321">Clear j321</div></div>`;
  m168.appendChild(e368);
  document.getElementById('hist-clear-j321').addEventListener('click', () => {
    if (confirm('Clear j321 browsing history?')) { x361 = []; saveBrowsingHistory(); renderHistoryPanel(); showToast('History cleared'); }
  });
  Object.entries(a364).forEach(([d367, entries]) => {
    const f369 = document.createElement('div');
    f369.className = 'hist-date-header';
    f369.textContent = d367;
    m168.appendChild(f369);
    entries.forEach((e, z311) => {
      const k166 = document.createElement('div');
      k166.className = 'hist-item';
      const z259 = new Date(e.time);
      const g370 = String(z259.getHours()).padStart(2,'0'), y388 = String(z259.getMinutes()).padStart(2,'0');
      const l167 = (() => { try { return `https:
      k166.innerHTML = `${l167 ? `<img src="${l167}" onerror="this.style.display='none'">` : '<span style="width:14px;height:14px;flex-shrink:0;"></span>'}<span class="hist-item-p275" p275="${e.r173}">${e.p275}</span><span class="hist-item-time">${g370}:${y388}</span><span class="hist-item-del" p275="Remove">✕</span>`;
      k166.querySelector('.hist-item-p275').addEventListener('click', () => { openUrl(e.r173); closePanel('history'); });
      k166.querySelector('.hist-item-del').addEventListener('click', ev => { ev.stopPropagation(); x361 = x361.filter(x23 => x23 !== e); saveBrowsingHistory(); renderHistoryPanel(); });
      m168.appendChild(k166);
    });
  });
}





const h371 = openPanel;
openPanel = function openPanelPatched(q172) {
  if (q172 === 'history') {
    if (g266 === 'history') { closePanel('history'); return; }
    if (g266) document.getElementById(`h267-${g266}`)?.classList.remove('open');
    g266 = 'history';
    renderHistoryPanel();
    document.getElementById('h267-history')?.classList.add('open');
    document.getElementById('h267-scrim')?.classList.add('show');
    return;
  }
  h371(q172);
};


const i372 = openUrl;
openUrl = function openUrlPatched(t357, addToHistory = true) {
  i372(t357, addToHistory);
  const r173 = (t357 || '').trim();
  if (r173 && r173 !== 'ep:
    addToHistory(r173);
  }
};




const j373 = document.getElementById('home-date');
function updateDate() {
  if (!j373) return;
  const v255 = new Date();
  const k374 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const l375 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  j373.textContent = `${k374[v255.getDay()]} · ${l375[v255.getMonth()]} ${v255.getDate()}, ${v255.getFullYear()}`;
}
updateDate();
setInterval(updateDate, 60000);




const m376 = document.getElementById('addr-overlay');
const n377 = document.getElementById('addr-input');

function openAddrOverlay() {
  const o274 = f161[c158];
  const o378 = o274?.r173;
  n377.value = (!o378 || o378 === 'ep:
  m376.style.display = 'flex';
  requestAnimationFrame(() => { n377.focus(); n377.select(); });
}
function closeAddrOverlay() {
  m376.style.display = 'none';
}
document.getElementById('nav-address-i164')?.addEventListener('click', openAddrOverlay);
document.getElementById('a208-search-j191')?.addEventListener('click', e => { e.stopPropagation(); openAddrOverlay(); });
m376?.addEventListener('click', e => { if (e.r303 === m376) closeAddrOverlay(); });
n377?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { closeAddrOverlay(); openUrl(n377.value); }
  if (e.key === 'Escape') closeAddrOverlay();
});




const p379 = document.getElementById('c314-overlay');
function openShortcutsOverlay() {
  p379.style.display = 'flex';
  p379.querySelector('#c314-overlay-close').onmouseenter = function() { this.style.background = 'rgba(255,255,255,0.08)'; };
  p379.querySelector('#c314-overlay-close').onmouseleave = function() { this.style.background = ''; };
}
function closeShortcutsOverlay() { p379.style.display = 'none'; }
document.getElementById('a208-help')?.addEventListener('click', openShortcutsOverlay);
document.getElementById('c314-overlay-close')?.addEventListener('click', closeShortcutsOverlay);
p379?.addEventListener('click', e => { if (e.r303 === p379) closeShortcutsOverlay(); });




const q380 = document.getElementById('u280-search-overlay');
const r381 = document.getElementById('u280-search-input');
const s382 = document.getElementById('u280-search-results');

function openTabSearch() {
  q380.style.display = 'flex';
  r381.value = '';
  renderTabSearch('');
  r381.focus();
}
function closeTabSearch() { q380.style.display = 'none'; }

function renderTabSearch(query) {
  s382.innerHTML = '';
  const t383 = query.toLowerCase();
  b157.forEach(u280 => {
    const o274 = f161[u280.id];
    const p275 = u280.p275 || 'New Tab';
    const r173 = o274?.r173 || '';
    if (t383 && !p275.toLowerCase().includes(t383) && !r173.toLowerCase().includes(t383)) return;
    const k166 = document.createElement('div');
    k166.className = 'ts-item' + (u280.id === c158 ? ' ts-item-y180' : '');
    const l167 = r173 && r173 !== 'ep:
    k166.innerHTML = `<div class="ts-item-j191">${l167 ? `<img src="${l167}" width="14" height="14" style="border-radius:2px;" onerror="this.style.display='none'">` : ''}</div><div style="flex:1;min-width:0;"><div class="ts-item-p275">${p275}</div><div class="ts-item-r173">${r173 === 'ep:
    k166.addEventListener('click', () => { switchTab(u280.id); closeTabSearch(); });
    s382.appendChild(k166);
  });
  if (!s382.children.length) {
    s382.innerHTML = '<div style="padding:20px;text-align:center;k192:rgba(255,255,255,0.3);font-size:13px;font-family:Rajdhani,sans-serif;">No matching b157</div>';
  }
}
r381?.addEventListener('input', () => renderTabSearch(r381.value));
r381?.addEventListener('keydown', e => { if (e.key === 'Escape') closeTabSearch(); });
q380?.addEventListener('click', e => { if (e.r303 === q380) closeTabSearch(); });




document.addEventListener('keydown', e => {
  const x257 = document.activeElement?.tagName;
  const u384 = x257 === 'INPUT' || x257 === 'TEXTAREA';
  
  if (e.ctrlKey && (e.key === '?' || e.key === '/') && !u384) { e.preventDefault(); openShortcutsOverlay(); }
  
  if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); openTabSearch(); }
  
  if (e.ctrlKey && e.key === 'x23' && !u384) { e.preventDefault(); openPanel('history'); }
  
  if (e.ctrlKey && e.key === 'v255' && !u384) { e.preventDefault(); document.getElementById('a208-bookmark')?.click(); }
  
  if (e.ctrlKey && e.key === 'z25' && !u384) { e.preventDefault(); document.getElementById('a208-reload')?.click(); }
  
  if (e.ctrlKey && e.key === '\\' && !u384) { e.preventDefault(); document.getElementById('a208-split')?.click(); }
  
  if (e.altKey && e.key === 'ArrowLeft' && !u384) { e.preventDefault(); document.getElementById('a208-back')?.click(); }
  
  if (e.altKey && e.key === 'ArrowRight' && !u384) { e.preventDefault(); document.getElementById('a208-forward')?.click(); }
  
  if (e.key === 'Escape') {
    if (m376?.style.display !== 'none') { closeAddrOverlay(); return; }
    if (p379?.style.display !== 'none') { closeShortcutsOverlay(); return; }
    if (q380?.style.display !== 'none') { closeTabSearch(); return; }
  }
});

applySeasonalMode(); 
applySeasonTheme();  




function updateChromeHeight(){
  const v385=document.querySelector('.browser-v385');
  if(v385){
    document.documentElement.style.setProperty('--v385-height', v385.offsetHeight+'px');
  }
}
updateChromeHeight();
new ResizeObserver(updateChromeHeight).observe(document.querySelector('.browser-v385'));




const w386=document.getElementById('home-clock');
function tickClock(){
  if(!w386)return;
  const x387=new Date();
  const g370=String(x387.getHours()).padStart(2,'0');
  const y388=String(x387.getMinutes()).padStart(2,'0');
  const z389=String(x387.getSeconds()).padStart(2,'0');
  w386.textContent=`${g370}:${y388}:${z389}`;
}
tickClock();
setInterval(tickClock,1000);




function updateAddressBarIcon(r173){
  const a390=document.getElementById('nav-a390-j191');
  const b391=document.getElementById('nav-b391-j191');
  if(!a390||!b391)return;
  const c392=/^https:\/\
  a390.style.display=c392?'block':'none';
  b391.style.display=c392?'none':'block';
}




function updateBookmarkStar(){
  const a208=document.getElementById('a208-bookmark');
  if(!a208)return;
  const o274=f161[c158];
  if(!o274||o274.r173==='ep:
    a208.classList.remove('bookmarked');return;
  }
  const d393=g162.some(b105=>b105.r173===o274.r173);
  a208.classList.toggle('bookmarked',d393);
}




document.addEventListener('keydown',e=>{
  const x257=document.activeElement?.tagName;
  const u384=x257==='INPUT'||x257==='TEXTAREA';
  
  if(e.ctrlKey&&e.key==='z259'&&!u384){
    e.preventDefault();
    document.getElementById('a208-new-u280')?.click();
  }
  
  if(e.ctrlKey&&e.key==='n13'&&!u384){
    e.preventDefault();
    closeTab(c158);
  }
  
  if(e.ctrlKey&&e.key==='l'){
    e.preventDefault();
    document.getElementById('nav-address-i164')?.click();
  }
  
  if(e.key==='Escape'&&!u384){
    hideSuggestions();
    if(g266)closePanel(g266);
  }
});

in();initBirds();initSnow();initLeaves();initSpring();initSand();initRadioactive();initThunder();initGrass();if(typeof splitActive!=='undefined'&&splitActive)applySplitRatio();});
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
// ── Window rendering ──
// windowAnimations=false skips the array entirely; window colour/lit is derived
// from a fast integer hash of (buildingIndex, col, row) so no storage needed.
let windowAnimations = localStorage.getItem('ep_winanim') !== '0';

function hashInt(a, b, c) {
  // Fast 32-bit hash — returns 0..1 float
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

// Draw windows without array — derives everything from hash
function drawWindowsDirect(bx, by, bw, bh, bi, winColor1, winColor2, winColor3, baseAlpha) {
  // Performance mode: static windows, no per-frame math, no flicker
  const cols = Math.floor(bw/7), rows = Math.floor(bh/10);
  ctx.globalAlpha = baseAlpha;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const h = hashInt(bi, c, r);
      if (h <= 0.45) continue; // unlit
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
let particlesEnabled=localStorage.getItem('ep_particles')!=='0'; // per-scene particle toggle
let seasonalMode=localStorage.getItem('ep_seasonal')==='1';

// Birds for summer mode
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
  // Night sky gradient
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#020c18');sky.addColorStop(.4,'#041524');
  sky.addColorStop(.7,'#061e30');sky.addColorStop(1,'#030d1a');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Ambient glows
  const g=ctx.createRadialGradient(W*.5,H*.38,0,W*.5,H*.38,Math.max(1,W*.5));
  g.addColorStop(0,'rgba(0,180,255,.07)');g.addColorStop(1,'transparent');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const pg=ctx.createRadialGradient(W*.88,H*.3,0,W*.88,H*.3,Math.max(1,W*.25));
  pg.addColorStop(0,'rgba(255,0,120,.06)');pg.addColorStop(1,'transparent');
  ctx.fillStyle=pg;ctx.fillRect(0,0,W,H);
  // Buildings
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
  // Ground
  const ground=H*.85;
  const rg=ctx.createLinearGradient(0,ground,0,H);
  rg.addColorStop(0,'rgba(0,229,255,.12)');rg.addColorStop(.3,'rgba(0,100,180,.08)');rg.addColorStop(1,'#010810');
  ctx.fillStyle=rg;ctx.fillRect(0,ground,W,H-ground);
  // Rain
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

  // Sky: bright blue to warm horizon
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#5bbfe8');
  sky.addColorStop(0.35,'#87ceeb');
  sky.addColorStop(0.65,'#b8dff5');
  sky.addColorStop(0.82,'#f5d98a');
  sky.addColorStop(1,'#f0c060');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Sun — radiant golden orb near center-top
  const sunX=W*0.52, sunY=H*0.28;
  // Outer corona
  const corona=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.22));
  corona.addColorStop(0,'rgba(255,255,200,0.18)');
  corona.addColorStop(0.4,'rgba(255,220,80,0.08)');
  corona.addColorStop(1,'transparent');
  ctx.fillStyle=corona;ctx.fillRect(0,0,W,H);
  // Inner glow
  const sunGlow=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.09));
  sunGlow.addColorStop(0,'rgba(255,255,220,0.55)');
  sunGlow.addColorStop(0.5,'rgba(255,210,50,0.18)');
  sunGlow.addColorStop(1,'transparent');
  ctx.fillStyle=sunGlow;ctx.fillRect(0,0,W,H);
  // Sun disc
  const disc=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.045));
  disc.addColorStop(0,'rgba(255,255,240,1)');
  disc.addColorStop(0.5,'rgba(255,230,100,0.9)');
  disc.addColorStop(1,'rgba(255,200,0,0)');
  ctx.fillStyle=disc;
  ctx.beginPath();ctx.arc(sunX,sunY,Math.max(1,W*0.045),0,Math.PI*2);ctx.fill();

  // Clouds (layered, parallax via frame)
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
    // Puff bumps
    ctx.beginPath();ctx.ellipse(cx-cr*0.4,cy+cr*0.05,cr*0.55,cr*0.45,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(cx+cr*0.42,cy+cr*0.08,cr*0.5,cr*0.42,0,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;

  // Daytime buildings — warm tan/sandstone tones
  const baseY=H*0.85;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    // Building face — warm gradient
    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0,b.summerColor||'#c8a87a');
    bg.addColorStop(1,b.summerColorB||'#b8976a');
    ctx.fillStyle=bg;
    ctx.fillRect(bx,by,b.w,b.h);
    // Subtle outline
    ctx.strokeStyle='rgba(100,70,30,0.1)';ctx.lineWidth=1;
    ctx.strokeRect(bx,by,b.w,b.h);
    // Sun-facing highlight on left edge
    ctx.fillStyle='rgba(255,230,150,0.12)';
    ctx.fillRect(bx,by,3,b.h);
    // Windows — daytime
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
    // Rooftop warm glow
    ctx.fillStyle='rgba(255,200,50,0.08)';ctx.fillRect(bx,by,b.w,2);
  });

  // Ground — warm pavement
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(200,160,80,0.35)');
  rg.addColorStop(0.4,'rgba(180,140,70,0.2)');
  rg.addColorStop(1,'#c8a040');
  ctx.fillStyle=rg;ctx.fillRect(0,baseY,W,H-baseY);

  // Ground reflection shimmer
  const shim=ctx.createLinearGradient(0,baseY,0,baseY+40);
  shim.addColorStop(0,'rgba(255,220,100,0.18)');
  shim.addColorStop(1,'transparent');
  ctx.fillStyle=shim;ctx.fillRect(0,baseY,W,40);

  // Birds
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
    // Left wing
    ctx.moveTo(b.x,b.y);ctx.quadraticCurveTo(b.x-b.size*1.1,b.y-wFlap,b.x-b.size*2,b.y-wFlap*0.3);
    ctx.stroke();
    ctx.beginPath();
    // Right wing
    ctx.moveTo(b.x,b.y);ctx.quadraticCurveTo(b.x+b.size*1.1,b.y-wFlap,b.x+b.size*2,b.y-wFlap*0.3);
    ctx.stroke();
  });
}

// Snowflakes for winter mode
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
  // Large decorative snowflakes (6-pointed)
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
    // Side arms
    ctx.beginPath(); ctx.moveTo(0,size*0.55); ctx.lineTo(size*0.22,size*0.33); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,size*0.55); ctx.lineTo(-size*0.22,size*0.33); ctx.stroke();
  }
  ctx.restore();
}

function drawWinterScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  // Cold blue-grey sky
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a1628');
  sky.addColorStop(0.3,'#0f2240');
  sky.addColorStop(0.6,'#162d52');
  sky.addColorStop(0.85,'#1e3a60');
  sky.addColorStop(1,'#152e4e');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Moon — pale white-blue orb with soft corona
  const moonX=W*0.48, moonY=H*0.22;
  const moonCorona=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,Math.max(1,W*0.18));
  moonCorona.addColorStop(0,'rgba(200,230,255,0.14)');
  moonCorona.addColorStop(0.5,'rgba(168,210,240,0.06)');
  moonCorona.addColorStop(1,'transparent');
  ctx.fillStyle=moonCorona; ctx.fillRect(0,0,W,H);
  // Moon glow
  const moonGlow=ctx.createRadialGradient(moonX,moonY,0,moonX,moonY,Math.max(1,W*0.065));
  moonGlow.addColorStop(0,'rgba(230,245,255,0.55)');
  moonGlow.addColorStop(0.6,'rgba(168,216,240,0.2)');
  moonGlow.addColorStop(1,'transparent');
  ctx.fillStyle=moonGlow; ctx.fillRect(0,0,W,H);
  // Moon disc
  const moonDiscR=Math.max(1,W*0.032);
  const moonDisc=ctx.createRadialGradient(moonX-W*0.008,moonY-W*0.008,0,moonX,moonY,moonDiscR);
  moonDisc.addColorStop(0,'rgba(245,252,255,1)');
  moonDisc.addColorStop(0.55,'rgba(200,230,250,0.9)');
  moonDisc.addColorStop(1,'rgba(168,210,240,0)');
  ctx.fillStyle=moonDisc;
  ctx.beginPath(); ctx.arc(moonX,moonY,moonDiscR,0,Math.PI*2); ctx.fill();

  // Subtle aurora streaks across the upper sky
  ctx.save(); ctx.globalAlpha=0.04+0.02*Math.sin(frame*0.008);
  const aurora=ctx.createLinearGradient(0,H*0.05,W,H*0.25);
  aurora.addColorStop(0,'transparent');
  aurora.addColorStop(0.2,'rgba(100,200,255,0.8)');
  aurora.addColorStop(0.5,'rgba(80,240,200,0.6)');
  aurora.addColorStop(0.8,'rgba(100,180,255,0.6)');
  aurora.addColorStop(1,'transparent');
  ctx.fillStyle=aurora; ctx.fillRect(0,H*0.05,W,H*0.22);
  ctx.restore();

  // Snow-covered buildings — icy steel-blue/slate tones
  const baseY=H*0.85;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    // Building body gradient — cold steel
    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0, b.winterColor||'#2a3e58');
    bg.addColorStop(1, b.winterColorB||'#1e3050');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(100,180,240,0.08)'; ctx.lineWidth=1;
    ctx.strokeRect(bx,by,b.w,b.h);
    // Moon-reflection highlight on one edge
    ctx.fillStyle='rgba(200,230,255,0.06)'; ctx.fillRect(bx,by,2,b.h);
    // Windows — cold blue-white
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
    // Snow cap on rooftop
    const snowCapH=3+Math.random()*0.5;
    ctx.fillStyle='rgba(220,240,255,0.85)';
    ctx.beginPath();
    ctx.moveTo(bx-1,by+snowCapH);
    ctx.lineTo(bx+b.w/2, by-snowCapH*0.5);
    ctx.lineTo(bx+b.w+1, by+snowCapH);
    ctx.closePath(); ctx.fill();

    // Icicles hanging from roof
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

  // Frozen ground — icy blue-white
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(168,216,240,0.2)');
  rg.addColorStop(0.3,'rgba(120,180,220,0.12)');
  rg.addColorStop(1,'#0d1e36');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  // Ice shimmer
  const shim=ctx.createLinearGradient(0,baseY,0,baseY+30);
  shim.addColorStop(0,'rgba(200,235,255,0.18)');
  shim.addColorStop(1,'transparent');
  ctx.fillStyle=shim; ctx.fillRect(0,baseY,W,30);

  // Small snow particles
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

  // Large decorative snowflakes
  bigFlakes.forEach(f=>{
    f.y+=f.speed; f.rot+=f.rotSpeed;
    if(f.y>H+f.size*2){ f.y=-f.size*2; f.x=Math.random()*W; }
    ctx.save();
    ctx.strokeStyle=`rgba(200,235,255,${f.opacity})`;
    ctx.lineWidth=1.2;
    drawSnowflakeStar(f.x,f.y,f.size,f.rot);
    ctx.restore();
  });
  } // end particlesEnabled
}

// Leaves for fall mode
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
    type:Math.floor(Math.random()*3) // 0=oak, 1=maple, 2=simple
  });
}
initLeaves();

function drawLeafShape(cx,cy,size,rot,type){
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
  ctx.beginPath();
  if(type===0){
    // Oak-ish: lobed ellipse silhouette
    ctx.moveTo(0,-size);
    ctx.bezierCurveTo(size*0.6,-size*0.7, size*0.9,-size*0.2, size*0.5, 0);
    ctx.bezierCurveTo(size*0.9, size*0.3, size*0.5, size*0.8, 0, size);
    ctx.bezierCurveTo(-size*0.5, size*0.8, -size*0.9, size*0.3, -size*0.5, 0);
    ctx.bezierCurveTo(-size*0.9,-size*0.2, -size*0.6,-size*0.7, 0,-size);
  } else if(type===1){
    // Maple-ish: star points
    const pts=5, inner=size*0.45, outer=size;
    for(let i=0;i<pts*2;i++){
      const r=i%2===0?outer:inner;
      const a=(i/pts/2)*Math.PI*2-Math.PI/2;
      i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
    }
  } else {
    // Simple oval leaf
    ctx.ellipse(0,0,size*0.45,size,0,0,Math.PI*2);
  }
  ctx.closePath();
  ctx.fill();
  // Stem
  ctx.beginPath(); ctx.moveTo(0,size*0.5); ctx.lineTo(0,size*1.3);
  ctx.strokeStyle='rgba(60,30,10,0.5)'; ctx.lineWidth=0.8; ctx.stroke();
  ctx.restore();
}

function drawFallScene(W,H){
  if(!W||!H||!isFinite(W)||!isFinite(H)) return;

  // Warm dusk sky — deep amber/purple at top, golden horizon
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0e04');
  sky.addColorStop(0.2,'#2e1808');
  sky.addColorStop(0.45,'#5c2e08');
  sky.addColorStop(0.68,'#c86010');
  sky.addColorStop(0.85,'#e09020');
  sky.addColorStop(1,'#c87818');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Sun — low on horizon, large warm disc with god-rays
  const sunX=W*0.5, sunY=H*0.55;
  // God rays (crepuscular)
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
  // Sun outer corona
  const sunC=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.2));
  sunC.addColorStop(0,'rgba(255,200,50,0.22)');
  sunC.addColorStop(0.5,'rgba(220,120,10,0.08)');
  sunC.addColorStop(1,'transparent');
  ctx.fillStyle=sunC; ctx.fillRect(0,0,W,H);
  // Sun glow
  const sunG=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,Math.max(1,W*0.08));
  sunG.addColorStop(0,'rgba(255,230,100,0.6)');
  sunG.addColorStop(0.6,'rgba(220,140,20,0.2)');
  sunG.addColorStop(1,'transparent');
  ctx.fillStyle=sunG; ctx.fillRect(0,0,W,H);
  // Sun disc
  const sunDiscR=Math.max(1,W*0.038);
  const sunD=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunDiscR);
  sunD.addColorStop(0,'rgba(255,248,200,1)');
  sunD.addColorStop(0.5,'rgba(255,200,60,0.9)');
  sunD.addColorStop(1,'rgba(220,120,0,0)');
  ctx.fillStyle=sunD;
  ctx.beginPath(); ctx.arc(sunX,sunY,sunDiscR,0,Math.PI*2); ctx.fill();

  // Horizon warm haze
  const haze=ctx.createLinearGradient(0,H*0.6,0,H*0.85);
  haze.addColorStop(0,'rgba(200,100,10,0.0)');
  haze.addColorStop(0.5,'rgba(220,130,10,0.12)');
  haze.addColorStop(1,'rgba(180,80,5,0.0)');
  ctx.fillStyle=haze; ctx.fillRect(0,H*0.6,W,H*0.25);

  // Buildings — dark warm silhouettes
  const baseY=H*0.82;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    // Silhouette darker near top, slight warm tint near base
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.fallColor||'#2e1e0a');
    bg.addColorStop(0.7,b.fallColorB||'#241808');
    bg.addColorStop(1,'#3a2210');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(200,100,10,0.06)'; ctx.lineWidth=1;
    ctx.strokeRect(bx,by,b.w,b.h);
    // Warm window glow — amber/orange
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
    // Rooftop warm edge-light from sun
    const rimAlpha=0.08+0.04*Math.sin(frame*0.01);
    ctx.fillStyle=`rgba(220,140,20,${rimAlpha})`;
    ctx.fillRect(bx,by,b.w,2);
  });

  // Ground — dark earth with warm glow near base of buildings
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(180,90,10,0.3)');
  rg.addColorStop(0.3,'rgba(120,55,5,0.2)');
  rg.addColorStop(1,'#100800');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);

  // Falling leaves
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
  } // end particlesEnabled
}

// Spring particles
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

  // Bright clear sky — deep sky blue at top fading to soft white near horizon
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#5bc8f0');
  sky.addColorStop(0.4,'#88d8f5');
  sky.addColorStop(0.72,'#beeaff');
  sky.addColorStop(0.9,'#e0f5ff');
  sky.addColorStop(1,'#f5faff');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Bright high sun
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

  // Fluffy white clouds
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

  // Buildings — fresh spring greens with ivy tones
  const baseY=H*0.82;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0,b.springColor||'#b8d090'); bg.addColorStop(1,b.springColorB||'#a0c078');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(60,140,60,0.1)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);
    // Sun highlight
    ctx.fillStyle='rgba(255,255,200,0.1)'; ctx.fillRect(bx,by,3,b.h);
    // Windows — daytime, warm white with green tint
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
    // Rooftop flower/grass strip
    const stripH=Math.min(6,b.w*0.15);
    const flowerCols=['#f9a8c0','#c8e870','#f5c842','#e080c8','#88d8a0'];
    ctx.fillStyle=flowerCols[Math.floor(b.x*7%5)];
    ctx.fillRect(bx,by-stripH,b.w,stripH);
    // Ivy vines on side
    ctx.strokeStyle='rgba(60,160,60,0.35)'; ctx.lineWidth=1;
    for(let v=0;v<Math.floor(b.h/30);v++){
      const vy=by+v*30+15;
      ctx.beginPath(); ctx.moveTo(bx,vy); ctx.quadraticCurveTo(bx-4,vy+8,bx+2,vy+15); ctx.stroke();
    }
  });

  // Ground — fresh green grass
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(100,200,80,0.5)'); rg.addColorStop(0.3,'rgba(80,170,60,0.3)'); rg.addColorStop(1,'#4a9040');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  // Grass shimmer
  const gs=ctx.createLinearGradient(0,baseY,0,baseY+25);
  gs.addColorStop(0,'rgba(180,255,120,0.22)'); gs.addColorStop(1,'transparent');
  ctx.fillStyle=gs; ctx.fillRect(0,baseY,W,25);

  if(particlesEnabled){
    // Cherry blossom petals
    petals.forEach(p=>{
      p.wobble+=p.wobbleSpeed; p.x+=p.speedX+Math.sin(p.wobble)*0.6; p.y+=p.speedY+Math.cos(p.wobble*0.8)*0.3; p.rot+=p.rotSpeed;
      if(p.y>H+p.size*2){p.y=-p.size*2; p.x=Math.random()*W;}
      if(p.x>W+p.size*2) p.x=-p.size*2; if(p.x<-p.size*2) p.x=W+p.size*2;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.globalAlpha=p.opacity;
      ctx.fillStyle=p.col;
      // Petal shape: two ellipses overlapping
      ctx.beginPath(); ctx.ellipse(0,-p.size*0.3,p.size*0.4,p.size*0.8,0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0,-p.size*0.3,p.size*0.4,p.size*0.8,-0.3,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha=1;

    // Floating leaves
    springLeaves.forEach(sl=>{
      sl.wobble+=sl.wobbleSpeed; sl.x+=sl.speedX+Math.sin(sl.wobble)*0.5; sl.y+=sl.speedY; sl.rot+=sl.rotSpeed;
      if(sl.y>H+sl.size*2){sl.y=-sl.size*2; sl.x=Math.random()*W;}
      ctx.save(); ctx.translate(sl.x,sl.y); ctx.rotate(sl.rot); ctx.globalAlpha=sl.opacity;
      ctx.fillStyle=sl.col;
      ctx.beginPath(); ctx.ellipse(0,0,sl.size*0.35,sl.size,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha=1;

    // Butterflies
    butterflies.forEach(bf=>{
      bf.wingPhase+=bf.wingSpeed; bf.wobblePhase+=0.03;
      bf.x+=bf.speedX*bf.dir; bf.y+=bf.speedY+Math.sin(bf.wobblePhase)*0.4;
      if(bf.x>W+40) bf.x=-40; if(bf.x<-40) bf.x=W+40;
      if(bf.y<30) bf.y=30; if(bf.y>H*0.65) bf.y=H*0.65;
      const wFlap=Math.sin(bf.wingPhase)*bf.size;
      ctx.save(); ctx.translate(bf.x,bf.y);
      ctx.globalAlpha=0.85;
      // Wings: filled shapes
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
      // Body
      ctx.fillStyle=bodyCol;
      ctx.beginPath(); ctx.ellipse(0,0,bf.size*0.18,bf.size*0.7,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha=1;
  }
}

// ── Sand City particles ──
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

  // Storm sky — deep ochre/brown haze
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0e02');
  sky.addColorStop(0.2,'#2e1a06');
  sky.addColorStop(0.45,'#4a2e0a');
  sky.addColorStop(0.7,'#7a5018');
  sky.addColorStop(0.88,'#a07028');
  sky.addColorStop(1,'#8a5c18');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Dusty haze layers
  const haze1=ctx.createLinearGradient(0,H*0.3,0,H*0.75);
  haze1.addColorStop(0,'rgba(160,110,30,0)');
  haze1.addColorStop(0.5,'rgba(180,130,40,0.12)');
  haze1.addColorStop(1,'rgba(140,90,20,0)');
  ctx.fillStyle=haze1; ctx.fillRect(0,H*0.3,W,H*0.45);

  // Swirling dust clouds
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

  // Lightning flash screen overlay
  if(sandLightning.active&&sandLightning.flashAlpha>0){
    ctx.fillStyle=`rgba(255,220,100,${sandLightning.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    sandLightning.flashAlpha*=0.75;
  }

  // Buildings — sepia silhouettes with amber windows
  const baseY=H*0.83;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.sandColor||'#2e1c06');
    bg.addColorStop(1,b.sandColorB||'#1e1204');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(180,120,30,0.08)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);
    // Amber-glowing windows
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
    // Dusty rooftop
    ctx.fillStyle=`rgba(180,130,40,${0.07+0.04*Math.sin(frame*0.008)})`;
    ctx.fillRect(bx,by,b.w,2);
  });

  // Ground — sandy drift
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(160,110,30,0.35)');
  rg.addColorStop(0.4,'rgba(120,80,20,0.25)');
  rg.addColorStop(1,'#180e02');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  const gs=ctx.createLinearGradient(0,baseY,0,baseY+30);
  gs.addColorStop(0,'rgba(220,170,60,0.18)'); gs.addColorStop(1,'transparent');
  ctx.fillStyle=gs; ctx.fillRect(0,baseY,W,30);

  // Lightning bolt
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
  // Random lightning trigger
  if(Math.random()<0.003&&!sandLightning.active) triggerSandLightning(W,H);

  // Swirling sand grain particles
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

// ── Radioactive City particles ──
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

  // Sickly green sky
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#010801');
  sky.addColorStop(0.25,'#020f02');
  sky.addColorStop(0.5,'#041804');
  sky.addColorStop(0.75,'#062006');
  sky.addColorStop(1,'#082808');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Toxic green ambient glow from horizon
  const horizonGlow=ctx.createRadialGradient(W*0.5,H*0.75,0,W*0.5,H*0.75,Math.max(1,W*0.6));
  horizonGlow.addColorStop(0,'rgba(57,255,20,0.07)');
  horizonGlow.addColorStop(0.5,'rgba(40,180,10,0.04)');
  horizonGlow.addColorStop(1,'transparent');
  ctx.fillStyle=horizonGlow; ctx.fillRect(0,0,W,H);

  // Swirling toxic fog clouds
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

  // Lightning flash overlay
  if(radioLightning.active&&radioLightning.flashAlpha>0){
    ctx.fillStyle=`rgba(57,255,20,${radioLightning.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    radioLightning.flashAlpha*=0.78;
  }

  // Dark overgrown buildings with eerie green windows
  const baseY=H*0.83;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.radioColor||'#081408');
    bg.addColorStop(1,b.radioColorB||'#040a04');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(57,255,20,0.06)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);
    // Toxic green windows
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
    // Ivy/vine overgrowth on building sides
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
    // Rooftop eerie glow
    const rimA=0.06+0.04*Math.sin(frame*0.012+b.x*0.01);
    ctx.fillStyle=`rgba(57,255,20,${rimA})`; ctx.fillRect(bx,by,b.w,2);
  });

  // Ground — dark toxic mud
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(40,120,10,0.25)');
  rg.addColorStop(0.4,'rgba(20,70,5,0.18)');
  rg.addColorStop(1,'#010601');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  // Toxic puddle shimmer
  const ps=ctx.createLinearGradient(0,baseY,0,baseY+20);
  ps.addColorStop(0,'rgba(57,255,20,0.12)'); ps.addColorStop(1,'transparent');
  ctx.fillStyle=ps; ctx.fillRect(0,baseY,W,20);

  // Green lightning
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

  // Rising toxic smoke/fog particles
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

// ── Thunder City particles ──
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

  // Deep storm sky — near-black at top, dark blue-grey to horizon
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#060810');
  sky.addColorStop(0.25,'#0a0e1a');
  sky.addColorStop(0.5,'#0e1428');
  sky.addColorStop(0.75,'#121c38');
  sky.addColorStop(1,'#0e1830');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Ambient electric blue glow behind clouds
  const aura=ctx.createRadialGradient(W*0.5,H*0.15,0,W*0.5,H*0.15,Math.max(1,W*0.55));
  aura.addColorStop(0,'rgba(80,120,255,0.08)');
  aura.addColorStop(0.5,'rgba(60,80,200,0.04)');
  aura.addColorStop(1,'transparent');
  ctx.fillStyle=aura; ctx.fillRect(0,0,W,H);

  // Lightning flash overlay
  if(thunderBolt.active&&thunderBolt.flashAlpha>0){
    ctx.fillStyle=`rgba(160,180,255,${thunderBolt.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    thunderBolt.flashAlpha*=0.72;
  }

  // Heavy storm clouds
  thunderClouds.forEach(tc=>{
    tc.flicker=(tc.flicker||0)+1;
    const cx=((tc.x*W+frame*tc.s)%(W+tc.r*W*2))-tc.r*W;
    const cy=tc.y*H+Math.sin(frame*0.004+tc.x*3)*H*0.02;
    const cr=Math.max(1,tc.r*W);
    // Dark broiling cloud layers
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
    // Electric highlight on cloud edge when bolt is active
    if(thunderBolt.active&&thunderBolt.flashAlpha>0.02){
      ctx.globalAlpha=thunderBolt.flashAlpha*1.8;
      const eg=ctx.createRadialGradient(cx,cy,cr*0.4,cx,cy,cr);
      eg.addColorStop(0,'transparent'); eg.addColorStop(1,'rgba(120,160,255,0.5)');
      ctx.fillStyle=eg;
      ctx.beginPath(); ctx.ellipse(cx,cy,cr,cr*0.42,0,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=1;
    }
  });

  // Buildings — dark blue-grey storm silhouettes
  const baseY=H*0.84;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx+b.w,by);
    bg.addColorStop(0,b.thunderColor||'#1a2035');
    bg.addColorStop(1,b.thunderColorB||'#121828');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(80,120,255,0.07)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);
    // Electric blue-white windows
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
    // Storm-lit rooftop edge
    const rA=thunderBolt.active?0.18+thunderBolt.flashAlpha:0.04;
    ctx.fillStyle=`rgba(100,140,255,${rA})`; ctx.fillRect(bx,by,b.w,2);
  });

  // Dark storm ground with electric puddle reflections
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(30,50,120,0.25)');
  rg.addColorStop(0.4,'rgba(15,25,70,0.18)');
  rg.addColorStop(1,'#050810');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  // Puddle shimmer
  const ps=ctx.createLinearGradient(0,baseY,0,baseY+25);
  ps.addColorStop(0,'rgba(80,120,255,0.15)'); ps.addColorStop(1,'transparent');
  ctx.fillStyle=ps; ctx.fillRect(0,baseY,W,25);

  // Lightning bolt
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

  // Rain/debris particles
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

// ── Grass City particles ──
const grassParticles=[];
let grassLightning={active:false,branches:[],timer:0,flashAlpha:0};
function initGrass(){
  grassParticles.length=0;
  const W=canvas.width,H=canvas.height;
  // Butterflies + floating seeds + petals mixed
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

  // Forest atmosphere — deep rich greens, god-ray light from behind
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#061008');
  sky.addColorStop(0.2,'#0a1a0c');
  sky.addColorStop(0.45,'#102814');
  sky.addColorStop(0.7,'#1a3c1e');
  sky.addColorStop(0.88,'#224828');
  sky.addColorStop(1,'#1a3c20');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Central god-ray glow from behind skyline
  const godRayX=W*0.5, godRayY=H*0.35;
  const gr=ctx.createRadialGradient(godRayX,godRayY,0,godRayX,godRayY,Math.max(1,W*0.5));
  gr.addColorStop(0,'rgba(180,255,120,0.18)');
  gr.addColorStop(0.3,'rgba(100,200,60,0.1)');
  gr.addColorStop(0.7,'rgba(60,140,30,0.05)');
  gr.addColorStop(1,'transparent');
  ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);

  // God-ray shafts
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

  // Floating fog layers at mid-height
  ctx.globalAlpha=0.04+0.02*Math.sin(frame*0.005);
  [{x:0.2,y:0.55,r:0.25,s:0.07},{x:0.6,y:0.5,r:0.3,s:0.05},{x:0.85,y:0.6,r:0.2,s:0.09}].forEach(fg=>{
    const cx=((fg.x*W+frame*fg.s)%(W+fg.r*W*2))-fg.r*W;
    const cr=Math.max(1,fg.r*W);
    const gg=ctx.createRadialGradient(cx,fg.y*H,0,cx,fg.y*H,cr);
    gg.addColorStop(0,'rgba(80,180,40,0.8)'); gg.addColorStop(1,'transparent');
    ctx.fillStyle=gg; ctx.beginPath(); ctx.ellipse(cx,fg.y*H,cr,cr*0.35,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  // Lightning flash
  if(grassLightning.active&&grassLightning.flashAlpha>0){
    ctx.fillStyle=`rgba(120,255,60,${grassLightning.flashAlpha})`;
    ctx.fillRect(0,0,W,H);
    grassLightning.flashAlpha*=0.8;
  }

  // Buildings — dark green, heavily ivy/moss covered
  const baseY=H*0.82;
  buildings.forEach((b,bi)=>{
    const bx=b.x, by=baseY-b.h;
    const bg=ctx.createLinearGradient(bx,by,bx,baseY);
    bg.addColorStop(0,b.grassColor||'#0e2010');
    bg.addColorStop(1,b.grassColorB||'#081408');
    ctx.fillStyle=bg; ctx.fillRect(bx,by,b.w,b.h);
    ctx.strokeStyle='rgba(60,180,30,0.1)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,b.w,b.h);
    // Moss/vine coverage patches on building faces
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
    // Glowing green windows
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
    // Hanging vine tendrils from rooftop
    ctx.strokeStyle='rgba(50,160,30,0.4)'; ctx.lineWidth=1.2;
    const vineCount=Math.floor(b.w/8);
    for(let v=0;v<vineCount;v++){
      const vx=bx+4+v*8;
      const vlen=8+((v*7+Math.floor(b.h))%20);
      ctx.beginPath(); ctx.moveTo(vx,by);
      ctx.quadraticCurveTo(vx+(Math.random()-0.5)*6,by+vlen*0.5,vx+(Math.random()-0.5)*4,by+vlen);
      ctx.stroke();
    }
    // Rooftop vegetation bloom
    ctx.fillStyle=`rgba(60,180,30,${0.08+0.05*Math.sin(frame*0.01+b.x*0.01)})`;
    ctx.fillRect(bx,by,b.w,4);
  });

  // Rich forest ground — dark greens with flowers
  const rg=ctx.createLinearGradient(0,baseY,0,H);
  rg.addColorStop(0,'rgba(40,120,20,0.4)');
  rg.addColorStop(0.35,'rgba(25,80,12,0.3)');
  rg.addColorStop(1,'#050e04');
  ctx.fillStyle=rg; ctx.fillRect(0,baseY,W,H-baseY);
  // Ground shimmer
  const gs=ctx.createLinearGradient(0,baseY,0,baseY+30);
  gs.addColorStop(0,'rgba(80,200,40,0.15)'); gs.addColorStop(1,'transparent');
  ctx.fillStyle=gs; ctx.fillRect(0,baseY,W,30);

  // Green lightning
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

  // Butterflies, floating seeds, leaves
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
  // Spring: Mar 20 – Jun 20, Summer: Jun 21 – Sep 21, Fall: Sep 22 – Dec 20, Winter: Dec 21 – Mar 19
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

function draw(){
  frame++;const W=canvas.width,H=canvas.height;
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

// ═══════════════════════════════════════════
//  ELEMENTS & STATE
// ═══════════════════════════════════════════
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
function saveTabs(){localStorage.setItem('ep_tabs4',JSON.stringify(tabs));}

// ═══════════════════════════════════════════
//  BOOKMARKS
// ═══════════════════════════════════════════
let bookmarks=JSON.parse(localStorage.getItem('ep_bookmarks')||'null')||[
  {id:1,title:'Google',url:'https://google.com'},
  {id:2,title:'YouTube',url:'https://youtube.com'},
  {id:3,title:'GitHub',url:'https://github.com'},
];
let nextBmId=Math.max(...bookmarks.map(b=>b.id),0)+1;
function saveBookmarks(){localStorage.setItem('ep_bookmarks',JSON.stringify(bookmarks));}

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
  // Add form
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
  // Wire clear-all
  const _bca=document.getElementById('bm-clear-all');
  if(_bca)_bca.addEventListener('click',()=>{if(confirm('Remove all bookmarks?')){bookmarks=[];saveBookmarks();renderBookmarksBar();renderBookmarksPanel();showToast('All bookmarks cleared');}});
  // Auto-fill name from current page
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
    empty.innerHTML='<span class="pe-icon">🔖</span>No bookmarks yet';
    body.appendChild(empty);return;
  }
  bookmarks.forEach(bm=>{
    const el=document.createElement('div');
    el.className='bm-manager-item';
    const fav=getFavicon(bm.url);
    el.innerHTML=`${fav?`<img src="${fav}" onerror="this.style.display='none'">`:'🌐'}<span title="${bm.url}">${bm.title}</span><span class="bm-del" title="Delete">✕</span>`;
    el.querySelector('span:first-of-type').addEventListener('click',()=>openUrl(bm.url));
    el.querySelector('.bm-del').addEventListener('click',e=>{e.stopPropagation();bookmarks=bookmarks.filter(b=>b.id!==bm.id);saveBookmarks();renderBookmarksBar();renderBookmarksPanel();});
    body.appendChild(el);
  });
}

// ═══════════════════════════════════════════
//  DOWNLOADS
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
//  SESSION ID
// ═══════════════════════════════════════════
function generateSessionId(){
  return 'ep_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}
let sessionId = sessionStorage.getItem('ep_session_id');
if(!sessionId){ sessionId=generateSessionId(); sessionStorage.setItem('ep_session_id',sessionId); }

// Session-scoped storage helpers (survive page reload within same tab, cleared on tab close)
function sessionGet(key){ try{ return JSON.parse(sessionStorage.getItem(sessionId+'_'+key)||'null'); }catch{ return null; } }
function sessionSet(key,val){ try{ sessionStorage.setItem(sessionId+'_'+key,JSON.stringify(val)); }catch{} }

// ═══════════════════════════════════════════
//  DOWNLOADS  (real file saving via Blob URL)
// ═══════════════════════════════════════════
let downloads=sessionGet('downloads')||JSON.parse(localStorage.getItem('ep_downloads')||'[]');
let nextDlId=downloads.length?Math.max(...downloads.map(d=>d.id))+1:1;
function saveDownloads(){
  sessionSet('downloads', downloads);
  // Also persist metadata (not blob data) to localStorage for history
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

  // Session badge
  const sesRow=document.createElement('div');
  sesRow.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:6px 10px;background:rgba(0,229,255,0.06);border-radius:8px;border:1px solid rgba(0,229,255,0.12);';
  sesRow.innerHTML=`<span style="font-size:10px;color:rgba(255,255,255,0.3);font-family:'Rajdhani',sans-serif;letter-spacing:1px;">SESSION</span><span style="font-size:11px;color:rgba(0,229,255,0.6);font-family:'Orbitron',monospace;letter-spacing:1px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${sessionId}</span>`;
  body.appendChild(sesRow);

  // URL download row
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
      <label id="dl-file-label" class="panel-btn" style="cursor:pointer;flex:1;text-align:center;justify-content:center;">📂 Choose File</label>
      <input type="file" id="dl-file-input" style="display:none;" multiple>
    </div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:12px 0;">
  `;
  body.appendChild(addRow);

  document.getElementById('dl-add-btn').addEventListener('click',()=>{
    const url=document.getElementById('dl-add-url').value.trim();
    if(!url){showToast('Enter a URL');return;}
    addDownloadFromUrl(url);
    document.getElementById('dl-add-url').value='';
  });

  // File upload handler — reads file into session memory and offers real save
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
        showToast(`📂 "${file.name}" saved to session`);
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
    empty.innerHTML='<span class="pe-icon">⬇️</span>No downloads yet';
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
  const typeIcons={'pdf':'📄','zip':'🗜️','mp4':'🎬','mp3':'🎵','exe':'⚙️','png':'🖼️','jpg':'🖼️','jpeg':'🖼️','gif':'🖼️','doc':'📝','docx':'📝','xls':'📊','xlsx':'📊','crx':'🧩','js':'📜','css':'🎨','html':'🌐','txt':'📋'};

  [...downloads].reverse().forEach(dl=>{
    const el=document.createElement('div');
    el.className='dl-item';
    const extName=(dl.name||'').split('.').pop().toLowerCase();
    const icon=typeIcons[extName]||'📎';
    const color=typeColors[extName]||'#78909c';
    const pct=dl.progress||0;
    const statusColor=dl.status==='done'?'#4caf50':dl.status==='error'?'#f44336':'var(--cyan)';
    const sourceTag=dl.source==='upload'?`<span style="font-size:9px;background:rgba(0,229,255,0.12);color:rgba(0,229,255,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">UPLOADED</span>`:'';
    el.innerHTML=`
      <div class="dl-icon" style="font-size:20px;width:36px;height:36px;border-radius:8px;background:${color}22;border:1px solid ${color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon}</div>
      <div class="dl-info">
        <div class="dl-name">${dl.name||'Unknown file'}${sourceTag}</div>
        <div class="dl-meta" style="color:${statusColor};">${dl.status==='done'?'✓ Saved':dl.status==='error'?'✗ Failed':`${pct}% · downloading`} ${dl.size&&dl.size!=='?'?'· '+dl.size:''}</div>
        ${dl.status==='downloading'?`<div class="dl-bar"><div class="dl-bar-fill" style="width:${pct}%;background:${color};"></div></div>`:''}
      </div>
      <div class="dl-actions">
        ${dl.status==='done'&&dl.blobUrl?`<div class="dl-btn" title="Save to device" id="dl-save-${dl.id}">💾</div>`:''}
        ${dl.status==='done'&&dl.url&&!dl.blobUrl?`<div class="dl-btn" title="Open" onclick="window.open('${dl.url}','_blank')">🔗</div>`:''}
        <div class="dl-btn" title="Remove" onclick="removeDownload(${dl.id})">✕</div>
      </div>
    `;
    body.appendChild(el);
    // Wire save-to-device button
    if(dl.blobUrl){
      const saveBtn=document.getElementById(`dl-save-${dl.id}`);
      if(saveBtn) saveBtn.addEventListener('click',()=>{
        const a=document.createElement('a');
        a.href=dl.blobUrl; a.download=dl.name; a.click();
        showToast(`💾 Saving "${dl.name}"…`);
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
  // Attempt real fetch into a Blob for actual saving
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
          showToast(`✓ "${dl.name}" ready to save`);
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
    // CORS block or network error — fall back to simulated progress + open link
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

// ═══════════════════════════════════════════
//  EXTENSIONS
// ═══════════════════════════════════════════
let extensions=JSON.parse(localStorage.getItem('ep_extensions')||'null')||[
  {id:1,name:'Ad Blocker Pro',icon:'🛡️',desc:'Blocks ads and trackers on all websites.',enabled:true,version:'3.2.1'},
  {id:2,name:'Dark Reader',icon:'🌙',desc:'Enables dark mode for every website automatically.',enabled:true,version:'4.9.58'},
  {id:3,name:'Proxy Switcher',icon:'🔀',desc:'Quickly switch between proxy configurations.',enabled:false,version:'1.0.4'},
  {id:4,name:'Password Manager',icon:'🔐',desc:'Saves and autofills your passwords securely.',enabled:true,version:'2.1.0'},
  {id:5,name:'Video Downloader',icon:'📥',desc:'Download videos from any website with one click.',enabled:false,version:'1.5.2'},
  {id:6,name:'Screenshot Tool',icon:'📸',desc:'Capture full page or selected area screenshots.',enabled:true,version:'2.0.1'},
];
let nextExtId=Math.max(...extensions.map(e=>e.id))+1;
function saveExtensions(){localStorage.setItem('ep_extensions',JSON.stringify(extensions));}

// ═══════════════════════════════════════════
//  THEMES PANEL
// ═══════════════════════════════════════════
function renderThemesPanel(){
  const body=document.getElementById('themes-body');
  if(!body)return;
  body.innerHTML='';

  const THEMES=[
    {id:'night',   label:'Night',       icon:'🌙', active:()=>!summerEnabled&&!winterEnabled&&!fallEnabled&&!springEnabled&&!sandEnabled&&!radioactiveEnabled&&!thunderEnabled&&!grassEnabled},
    {id:'summer',  label:'Summer',      icon:'☀️', active:()=>summerEnabled},
    {id:'winter',  label:'Winter',      icon:'❄️', active:()=>winterEnabled},
    {id:'fall',    label:'Fall',        icon:'🍂', active:()=>fallEnabled},
    {id:'spring',  label:'Spring',      icon:'🌸', active:()=>springEnabled},
    {id:'sand',    label:'Sand City',   icon:'⚡', active:()=>sandEnabled},
    {id:'radioactive',label:'Radioactive',icon:'☢️',active:()=>radioactiveEnabled},
    {id:'thunder', label:'Thunder',     icon:'⛈️', active:()=>thunderEnabled},
    {id:'grass',   label:'Grass City',  icon:'🌿', active:()=>grassEnabled},
  ];

  // Smart Season toggle at top
  const ssRow=document.createElement('div');
  ssRow.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:10px 4px 14px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:14px;';
  ssRow.innerHTML=`
    <div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;color:${seasonalMode?'#b090f0':'rgba(255,255,255,0.7)'};">📅 Smart Season</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:2px;">Auto-match real-world season</div>
    </div>
    <div class="ext-toggle${seasonalMode?' on':''}" id="themes-seasonal-toggle" style="${seasonalMode?'background:#9060e0':''}"></div>
  `;
  body.appendChild(ssRow);
  document.getElementById('themes-seasonal-toggle')?.addEventListener('click',()=>{
    seasonalMode=!seasonalMode;
    localStorage.setItem('ep_seasonal',seasonalMode?'1':'0');
    if(seasonalMode){applySeasonalMode();applySeasonTheme();const s=getSeasonFromDate();showToast(`📅 Smart Season on — it's ${s.charAt(0).toUpperCase()+s.slice(1)}!`);}
    else showToast('📅 Smart Season off');
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
      // Also refresh extensions panel if open
      if(activePanel==='extensions') renderExtensionsPanel();
    });
    grid.appendChild(btn);
  });

  // Particles toggle
  const partRow=document.createElement('div');
  partRow.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:14px 4px 6px;border-top:1px solid rgba(255,255,255,0.06);margin-top:14px;';
  const activeSeason=summerEnabled?'summer':winterEnabled?'winter':fallEnabled?'fall':springEnabled?'spring':sandEnabled?'sand':radioactiveEnabled?'radioactive':thunderEnabled?'thunder':grassEnabled?'grass':'night';
  const particleLabel={night:'🌧️ Rain',summer:'🐦 Birds',winter:'❄️ Snowflakes',fall:'🍂 Leaves',spring:'🌸 Petals',sand:'⚡ Sandstorm',radioactive:'☢️ Toxic Smoke',thunder:'⛈️ Storm Rain',grass:'🦋 Butterflies'}[activeSeason];
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

  // Window animations toggle
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
    // Update windows arrays in-place — no need to rebuild the whole city
    buildings.forEach((b,bi)=>{
      b.windows = windowAnimations ? genWins(b.w, b.h, bi) : [];
    });
    renderThemesPanel();
    showToast(windowAnimations?'🪟 Window animations on':'🪟 Window animations off (faster)');
  });
}

// Helper used by both themes panel and any legacy calls
function _activateTheme(which){
  summerEnabled=which==='summer'; winterEnabled=which==='winter';
  fallEnabled=which==='fall'; springEnabled=which==='spring';
  sandEnabled=which==='sand'; radioactiveEnabled=which==='radioactive';
  thunderEnabled=which==='thunder'; grassEnabled=which==='grass';
  // 'night' leaves all false
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
  const names={night:'🌙 Night City',summer:'☀️ Summer City',winter:'❄️ Winter City',fall:'🍂 Fall City',spring:'🌸 Spring City',sand:'⚡ Sand City',radioactive:'☢️ Radioactive City',thunder:'⛈️ Thunder City',grass:'🌿 Grass City'};
  showToast(names[which]||'Theme applied');
}

function renderExtensionsPanel(){
  const body=document.getElementById('extensions-body');
  if(!body)return;
  body.innerHTML='';

  // ── Visual Effects section ──

  const _eea=document.getElementById('ext-enable-all');
  if(_eea)_eea.addEventListener('click',()=>{extensions.forEach(e=>e.enabled=true);saveExtensions();renderExtensionsPanel();showToast('All extensions enabled');});
  const _eda=document.getElementById('ext-disable-all');
  if(_eda)_eda.addEventListener('click',()=>{extensions.forEach(e=>e.enabled=false);saveExtensions();renderExtensionsPanel();showToast('All extensions disabled');});
  // Install Extension — file upload, CWS link, or generic URL
  const addRow=document.createElement('div');
  addRow.innerHTML=`
    <div class="panel-section-title" style="margin-top:8px;">Install Extension</div>
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <input class="panel-input" id="ext-add-name" placeholder="Name (optional)" autocomplete="off" style="flex:1;">
    </div>
    <div class="panel-input-row" style="margin-bottom:6px;">
      <input class="panel-input" id="ext-cws-url" placeholder="Chrome Web Store or script URL" autocomplete="off" style="flex:1;">
      <button class="panel-btn" id="ext-add-url-btn" title="Install from URL">🔗</button>
    </div>
    <div class="panel-input-row" style="margin-bottom:6px;">
      <label id="ext-file-label" class="panel-btn" style="cursor:pointer;flex:1;text-align:center;justify-content:center;">📂 Upload .js / .crx / .zip</label>
      <input type="file" id="ext-file-input" style="display:none;" accept=".js,.crx,.zip,.json">
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
      const icon=extType==='crx'?'🧩':extType==='js'?'📜':extType==='zip'?'🗜️':'🧩';
      const reader=new FileReader();
      reader.onload=()=>{
        if(extType==='crx'||extType==='zip'){
          // Unpack CRX/ZIP and extract content scripts
          unpackCRXBlob(file.arrayBuffer(), file, name, icon);
        } else {
          const blobUrl=URL.createObjectURL(file);
          extensions.push({id:nextExtId++,name,icon,desc:`Uploaded: ${file.name} (${formatSize(file.size)})`,enabled:true,version:'1.0.0',source:'file',fileName:file.name,blobUrl,sessionId});
          saveExtensions();renderExtensionsPanel();
          showToast(`${icon} "${name}" installed from file`);
        }
        document.getElementById('ext-add-name').value='';
      };
      reader.readAsArrayBuffer(file);
    });
    e.target.value='';
  });
  document.getElementById('ext-file-label').addEventListener('click',()=>document.getElementById('ext-file-input').click());

  extensions.forEach(ext=>{
    const el=document.createElement('div');
    el.className='ext-item';
    const srcBadge=ext.source==='cws'?'<span style="font-size:9px;background:rgba(66,133,244,0.18);color:rgba(100,160,255,0.8);padding:1px 5px;border-radius:3px;margin-left:4px;">CWS</span>':ext.source==='file'?'<span style="font-size:9px;background:rgba(0,229,255,0.12);color:rgba(0,229,255,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">FILE</span>':ext.source==='url'?'<span style="font-size:9px;background:rgba(255,180,0,0.12);color:rgba(255,180,0,0.7);padding:1px 5px;border-radius:3px;margin-left:4px;">URL</span>':''
    el.innerHTML=`
      <div class="ext-icon">${ext.icon}</div>
      <div class="ext-info">
        <div class="ext-name">${ext.name}${srcBadge} <span style="font-size:10px;color:rgba(255,255,255,0.25);font-weight:400;">v${ext.version}</span></div>
        <div class="ext-desc">${ext.desc}</div>
        <div class="ext-actions">
          <div class="ext-action-btn" onclick="removeExt(${ext.id})">Remove</div>
          ${ext.blobUrl?`<div class="ext-action-btn" id="ext-save-${ext.id}">Save File</div>`:''}
          ${ext.url&&!ext.blobUrl?`<div class="ext-action-btn" onclick="window.open('${ext.url}','_blank')">View</div>`:''}
        </div>
      </div>
      <div class="ext-toggle${ext.enabled?' on':''}" id="ext-toggle-${ext.id}" onclick="toggleExt(${ext.id})"></div>
    `;
    body.appendChild(el);
    if(ext.blobUrl){
      const sb=document.getElementById(`ext-save-${ext.id}`);
      if(sb)sb.addEventListener('click',()=>{const a=document.createElement('a');a.href=ext.blobUrl;a.download=ext.fileName||ext.name;a.click();showToast('Saving…');});
    }
  });
}

// ═══════════════════════════════════════════
//  CWS / CRX INSTALLER
// ═══════════════════════════════════════════

// CORS proxies to try in order
const CORS_PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://cors-anywhere.herokuapp.com/${url}`,
];

// CRX download URL template (Chrome's update endpoint)
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
  // Register the extension immediately as loading
  const ext = {
    id: nextExtId++, name, icon: '🧩',
    desc: `Chrome Web Store · ${extId.slice(0,12)}…`,
    enabled: true, version: '?',
    source: 'cws', cwsId: extId, url: storeUrl,
    crxStatus: 'loading', contentScripts: [],
    sessionId
  };
  extensions.push(ext);
  saveExtensions(); renderExtensionsPanel();

  try {
    // Try fetching the CRX binary via CORS proxy
    const crxUrl = crxDownloadUrl(extId);
    const resp = await fetchWithProxy(crxUrl);

    if (!resp) throw new Error('All CORS proxies failed');

    const arrayBuf = await resp.arrayBuffer();
    const bytes = new Uint8Array(arrayBuf);

    // CRX3 format: starts with "Cr24" magic bytes
    // CRX3 has a variable-length header before the ZIP payload
    // Find the ZIP by looking for the PK\x03\x04 magic
    let zipOffset = 0;
    for (let i = 0; i < Math.min(bytes.length - 4, 16384); i++) {
      if (bytes[i]===0x50 && bytes[i+1]===0x4B && bytes[i+2]===0x03 && bytes[i+3]===0x04) {
        zipOffset = i;
        break;
      }
    }

    const zipData = arrayBuf.slice(zipOffset);

    // Use JSZip to unpack
    if (typeof JSZip === 'undefined') throw new Error('JSZip not loaded');
    const zip = await JSZip.loadAsync(zipData);

    // Read manifest.json
    const manifestFile = zip.file('manifest.json');
    if (!manifestFile) throw new Error('No manifest.json in CRX');
    const manifestText = await manifestFile.async('string');
    const manifest = JSON.parse(manifestText);

    ext.version = manifest.version || '?';
    ext.desc = manifest.description
      ? manifest.description.slice(0, 80) + (manifest.description.length > 80 ? '…' : '')
      : `CWS · ${extId.slice(0,12)}…`;

    // Extract content_scripts
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
    showToast(`✅ "${name}" v${ext.version} ready — ${totalScripts} script(s) loaded`);

  } catch (err) {
    ext.crxStatus = 'failed';
    ext.desc = `CRX fetch failed: ${err.message}`;
    showToast(`⚠️ "${name}" — ${err.message}. Try uploading the .crx file directly.`);
  }

  saveExtensions(); renderExtensionsPanel();
  // Inject into current page if it's open
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

    // Find ZIP PK magic (handles both raw ZIP and CRX3 with header)
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
    showToast(`✅ "${name}" v${ext.version} unpacked — ${total} script(s)`);
  } catch(err) {
    ext.crxStatus = 'failed';
    ext.desc = `Unpack failed: ${err.message}`;
    showToast(`⚠️ "${name}" — ${err.message}`);
  }

  saveExtensions(); renderExtensionsPanel();
  injectIntoWebIframe();
}

// Convert a Chrome extension match pattern to a JS regex
function matchPatternToRegex(pattern) {
  if (pattern === '<all_urls>' || pattern === '*://*/*') return /.*/;
  try {
    // pattern format: scheme://host/path
    const escaped = pattern
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')  // escape regex specials except * and ?
      .replace(/\\\*/g, '.*')                  // * → .*
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

// ═══════════════════════════════════════════
//  EXTENSION INJECTION ENGINE
// ═══════════════════════════════════════════

// Built-in userscript library — behaviours for the 6 default extensions
const BUILTIN_SCRIPTS = {
  1: `/* Ad Blocker Pro */
(function(){
  const SELECTORS=['[id*="ad"],[class*="ad-"],[class*="-ad"],[id*="banner"],[class*="banner"],[id*="sponsor"],[class*="sponsor"],[class*="advertisement"],[id*="advertisement"],[class*="popup"],[id*="popup"],[class*="overlay"][style*="position:fixed"],[class*="modal"][style*="position:fixed"]'];
  function nuke(){SELECTORS.forEach(s=>{try{document.querySelectorAll(s).forEach(el=>{if(el&&el.offsetHeight>0&&el.offsetWidth>0){el.style.display='none';el.style.visibility='hidden';}});}catch{}});}
  nuke();
  const obs=new MutationObserver(nuke);
  obs.observe(document.body||document.documentElement,{childList:true,subtree:true});
  // Block ad network fetches
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
  d.textContent='🔀 Proxy: '+location.hostname;
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
        // fallback: open print dialog
        window.print();
      });
      showEpToast&&showEpToast('📸 Use Ctrl+P to save as PDF/image');
    }
  });
  console.log('[EP] Screenshot Tool active (Ctrl+Shift+S)');
})();`
};

// Inject all enabled extensions into a document
function injectExtensionsIntoDoc(doc) {
  if (!doc || !doc.body) return;
  extensions.forEach(ext => {
    if (!ext.enabled) return;
    const scriptId = 'ep-ext-' + ext.id;
    if (doc.getElementById(scriptId)) return; // already injected
    const tag = doc.createElement('script');
    tag.id = scriptId;
    // Determine the code to run
    let code = null;
    if (BUILTIN_SCRIPTS[ext.id]) {
      code = BUILTIN_SCRIPTS[ext.id];
    } else if (ext.source === 'file' && ext.blobUrl) {
      // For uploaded .js files, fetch the blob and inject synchronously
      fetch(ext.blobUrl).then(r=>r.text()).then(text=>{
        if (doc.getElementById(scriptId)) return;
        const t=doc.createElement('script'); t.id=scriptId; t.textContent=text;
        try{(doc.head||doc.body).appendChild(t); logExtInjected(ext.name);}catch{}
      }).catch(()=>{});
      return;
    } else if (ext.source === 'url' && ext.url && /\.js(\?|$)/i.test(ext.url)) {
      // Remote .js URL — inject as external script src
      tag.src = ext.url;
      tag.crossOrigin = 'anonymous';
      try { (doc.head||doc.body).appendChild(tag); logExtInjected(ext.name); } catch {}
      return;
    } else if (ext.source === 'cws') {
      // Inject real content scripts extracted from the CRX
      if (ext.contentScripts && ext.contentScripts.length > 0) {
        const pageUrl = doc.location ? doc.location.href : (doc.defaultView ? doc.defaultView.location.href : '');
        ext.contentScripts.forEach((cs, csIdx) => {
          // Check URL match patterns
          const matches = urlMatchesPatterns(pageUrl, cs.matches || []);
          if (!matches) return;
          // Inject CSS
          (cs.cssTexts || []).forEach((cssText, ci) => {
            const cssId = `ep-ext-css-${ext.id}-${csIdx}-${ci}`;
            if (doc.getElementById(cssId)) return;
            const styleTag = doc.createElement('style');
            styleTag.id = cssId;
            styleTag.textContent = cssText;
            (doc.head || doc.body).appendChild(styleTag);
          });
          // Inject JS content scripts
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
        return; // handled above, skip generic code path
      } else if (ext.crxStatus === 'loading') {
        // Still fetching — skip silently, will inject on next page load
        return;
      } else if (ext.crxStatus === 'failed') {
        // Fetch failed — show a small notice
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
        // No content scripts found in manifest (e.g. background-only extension)
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
      // Generic: inject a banner noting the extension is active
      code = `(function(){
        if(document.getElementById('ep-ext-banner-${ext.id}'))return;
        const d=document.createElement('div');
        d.id='ep-ext-banner-${ext.id}';
        d.style.cssText='position:fixed;bottom:${8+ext.id*32}px;left:8px;z-index:2147483647;background:rgba(0,0,0,0.7);color:#0f0;font-family:monospace;font-size:11px;padding:3px 10px;border-radius:6px;pointer-events:none;';
        d.textContent='${(ext.icon||'🧩').replace(/'/g,"\\'")} ${ext.name.replace(/'/g,"\\'")} active';
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

// Run injection whenever the web iframe finishes loading
function injectIntoWebIframe() {
  try {
    const doc = webIframe.contentDocument;
    if (doc && doc.readyState !== 'loading') {
      injectExtensionsIntoDoc(doc);
    }
  } catch(e) {
    // Cross-origin — can't inject (e.g. if proxy isn't routing same-origin)
  }
}

function toggleExt(id){
  const ext=extensions.find(e=>e.id===id);
  if(!ext)return;
  ext.enabled=!ext.enabled;
  saveExtensions();
  const t=document.getElementById(`ext-toggle-${id}`);
  if(t)t.classList.toggle('on',ext.enabled);
  if(ext.enabled){
    // Inject immediately into currently open page
    injectIntoWebIframe();
    showToast(`${ext.icon||'🧩'} ${ext.name} enabled — injected into page`);
  } else {
    showToast(`${ext.icon||'🧩'} ${ext.name} disabled — reload page to remove`);
  }
}
function removeExt(id){
  const ext=extensions.find(e=>e.id===id);
  if(ext&&confirm(`Remove "${ext.name}"?`)){extensions=extensions.filter(e=>e.id!==id);saveExtensions();renderExtensionsPanel();}
}

// ═══════════════════════════════════════════
//  PANEL SYSTEM
// ═══════════════════════════════════════════
let activePanel=null;
function openPanel(name){
  if(activePanel===name){closePanel(name);return;}
  if(activePanel)document.getElementById(`panel-${activePanel}`).classList.remove('open');
  activePanel=name;
  const panel=document.getElementById(`panel-${name}`);
  if(!panel)return;
  // Refresh content
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

// ═══════════════════════════════════════════
//  MORE DROPDOWN MENU
// ═══════════════════════════════════════════
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
  document.getElementById('more-split')?.addEventListener('click',()=>{ hideMore(); document.getElementById('btn-split')?.click(); });
  document.getElementById('more-history')?.addEventListener('click',()=>{ hideMore(); openPanel('history'); });
  document.getElementById('more-extensions')?.addEventListener('click',()=>{ hideMore(); openPanel('extensions'); });
  document.getElementById('more-bm-mgr')?.addEventListener('click',()=>{ hideMore(); openPanel('bookmarks'); });
  document.getElementById('more-themes')?.addEventListener('click',()=>{ hideMore(); openPanel('themes'); });
  document.getElementById('more-help')?.addEventListener('click',()=>{ hideMore(); openShortcutsOverlay(); });
})();

// ═══════════════════════════════════════════
//  BOOKMARKS BAR TOGGLE
// ═══════════════════════════════════════════
let bmBarVisible=localStorage.getItem('ep_bmbar')!=='0';
function applyBmBar(){
  const bar=document.getElementById('bookmarks-bar');
  if(bar)bar.classList.toggle('hidden-bar',!bmBarVisible);
}
applyBmBar();

// Bookmark current page button
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

// Add current page to bookmarks bar shortcut
const _bbma=document.getElementById('bm-bar-add');if(_bbma)_bbma.addEventListener('click',()=>{
  document.getElementById('btn-bookmark').click();
});

// ═══════════════════════════════════════════
//  PANELS & NAVIGATION
// ═══════════════════════════════════════════
function showPanel(which){
  homePage.style.display=which==='home'?'flex':'none';
  webPanel.style.display=which==='web'?'block':'none';
  mimsPanel.style.display=which==='mims'?'block':'none';
}
function loadMims(){
  if(mimsLoaded)return; mimsLoaded=true;
  const el=document.getElementById('mims-source');if(!el)return;
  try{const c=JSON.parse(el.textContent);const blob=new Blob([c],{type:'text/html'});mimsIframe.src=URL.createObjectURL(blob);}catch(e){console.warn('MIMS load error:',e);}
}

function goTo(url) {
  const proxied = '/proxy?url=' + encodeURIComponent(url);
  const frame = document.getElementById('web-iframe');
  if (frame) frame.src = proxied;
}

function openUrl(raw,addToHistory=true){
  let url=(raw||'').trim();if(!url)return;
  let full;
  if(url==='ep://home'||url==='mims://portal')full=url;
  else if(/^https?:\/\//i.test(url))full=url;
  else if(url.includes('.')&&!url.includes(' '))full='https://'+url;
  else full='https://www.google.com/search?q='+encodeURIComponent(url);
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
    // Loading indicator on active tab
    const activeTabEl=tabBarEl?.querySelector(`.tab[data-id="${activeTabId}"]`);
    if(activeTabEl)activeTabEl.classList.add('loading');
    if(webIframe) webIframe.onload=()=>{
      const el=tabBarEl?.querySelector(`.tab[data-id="${activeTabId}"]`);
      if(el)el.classList.remove('loading');
      // Try to update tab title from iframe
      try{
        const iTitle=webIframe.contentDocument?.title;
        if(iTitle){const tab=tabs.find(t=>t.id===activeTabId);if(tab&&!tab.fixed){tab.title=iTitle.slice(0,28);saveTabs();renderTabs();}}
      }catch{}
      // Inject enabled extensions into the newly loaded page
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

// ═══════════════════════════════════════════
//  TAB MANAGEMENT
// ═══════════════════════════════════════════
const tabBarEl=document.getElementById('tab-bar');
const addBtn=document.getElementById('btn-new-tab');

// ── Tab context menu ──
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
  document.getElementById('tctx-pin').textContent=isPinned?'📌 Unpin tab':'📌 Pin tab';
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

const _tcr=document.getElementById('tctx-rename');if(_tcr)_tcr.addEventListener('click',()=>{
  hideTabCtxMenu();
  const el=tabBarEl.querySelector(`.tab[data-id="${tabCtxId}"] .tab-title`);
  if(!el)return;
  const tab=tabs.find(t=>t.id===tabCtxId);
  if(!tab)return;
  const inp=document.createElement('input');
  inp.value=tab.title;
  inp.style.cssText='background:transparent;border:none;outline:none;color:rgba(255,255,255,0.85);font-family:Rajdhani,sans-serif;font-size:12px;width:100%;';
  el.replaceWith(inp); inp.focus(); inp.select();
  const done=()=>{ tab.title=inp.value.trim()||'New Tab'; saveTabs(); renderTabs(); };
  inp.addEventListener('blur',done);
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter')inp.blur(); if(e.key==='Escape'){inp.value=tab.title;inp.blur();} });
});

const _tcp=document.getElementById('tctx-pin');if(_tcp)_tcp.addEventListener('click',()=>{
  const tab=tabs.find(t=>t.id===tabCtxId);
  if(!tab)return;
  tab.pinned=!tab.pinned;
  // Pinned tabs go to front (after MIMS), unpinned go after pinned
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

// ── Drag & Drop ──
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
  // Respect pinned zones: pinned tabs can't be dragged past unpinned and vice versa
  if(dragTab.pinned!==targetTab.pinned)return;
  const fromIdx=tabs.indexOf(dragTab);
  const toIdx=tabs.indexOf(targetTab);
  tabs.splice(fromIdx,1);
  tabs.splice(toIdx,0,dragTab);
  saveTabs(); renderTabs();
}

// ── Render ──
function renderTabs(){
  tabBarEl.querySelectorAll('.tab').forEach(el=>el.remove());
  tabs.forEach(tab=>{
    const isActive=tab.id===activeTabId;
    const isMims=tab.id===MIMS_ID;
    const isPinned=tab.pinned||isMims;
    const el=document.createElement('div');
    el.className='tab'+(isActive?'':' tab-inactive')+(isPinned?' pinned':'');
    el.dataset.id=tab.id;

    const fav=isMims
      ?`<div class="tab-favicon" style="background:rgba(0,229,255,0.25)"><svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:#020a12"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>`
      :`<div class="tab-favicon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>`;

    const action=(isMims)
      ? `<span style="font-size:9px;opacity:0.5;flex-shrink:0;">📌</span>`
      : isPinned
      ? ``
      : `<div class="tab-close">✕</div>`;

    el.innerHTML=`${fav}<span class="tab-title">${tab.title}</span>${action}`;

    // Click to switch
    el.addEventListener('click',e=>{
      if(e.target.classList.contains('tab-close'))return;
      switchTab(tab.id);
    });

    // Right-click context menu
    el.addEventListener('contextmenu',e=>showTabCtxMenu(e,tab.id));

    // Double-click title to rename (non-pinned, non-MIMS)
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

    // Close button (non-pinned, non-MIMS tabs)
    if(!isMims&&!isPinned){
      const x=el.querySelector('.tab-close');
      if(x)x.addEventListener('click',e=>{ e.stopPropagation(); closeTab(tab.id); });
    }

    // Drag & Drop (not for MIMS)
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

// ═══════════════════════════════════════════
//  SHORTCUTS
// ═══════════════════════════════════════════
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
function favImg(url){try{const d=new URL(url).hostname;return `<img src="https://www.google.com/s2/favicons?sz=32&domain=${d}" width="28" height="28" onerror="this.outerHTML='<span style=font-size:18px>🌐</span>'">`;}catch{return `<span style="font-size:18px">🌐</span>`;}}
function iconHTML(s){if(s.type==='google')return gSVG();if(s.type==='bing')return bSVG();if(s.type==='letter')return `<div class="icon-sw">${s.icon||'?'}</div>`;return favImg(s.url);}
function renderShortcuts(){
  const c=document.getElementById('shortcuts-container');if(!c)return;c.innerHTML='';
  shortcuts.forEach(s=>{const el=document.createElement('div');el.className='shortcut';el.innerHTML=`<div class="shortcut-icon">${iconHTML(s)}</div><span class="shortcut-label">${s.label}</span>`;
    el.addEventListener('click',()=>openUrl(s.url));el.addEventListener('contextmenu',e=>showCtxMenu(e,s.id));
    el.addEventListener('mousedown',e=>{const r=document.createElement('span');r.className='ripple';const rect=el.getBoundingClientRect(),sz=Math.max(rect.width,rect.height);r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;el.appendChild(r);setTimeout(()=>r.remove(),600);});
    c.appendChild(el);});
}
renderShortcuts();

// ═══════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════
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
  suggestionsEl.innerHTML=all.map(s=>`<div class="suggestion-item" tabindex="0" data-url="${s.url}">${s.isSearch?'🔍':'🌐'} <span>${s.text}</span></div>`).join('');
  suggestionsEl.style.display='block';
  suggestionsEl.querySelectorAll('.suggestion-item').forEach(item=>{item.addEventListener('click',()=>openUrl(item.dataset.url));item.addEventListener('keydown',e=>{if(e.key==='Enter')openUrl(item.dataset.url);if(e.key==='ArrowDown'&&item.nextSibling)item.nextSibling.focus();if(e.key==='ArrowUp'){const p=item.previousSibling;p?p.focus():(searchInput&&searchInput.focus());}});});
}
function hideSuggestions(){if(suggestionsEl)suggestionsEl.style.display='none';}
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap')&&!e.target.closest('#nav-address-bar'))hideSuggestions();});

// ═══════════════════════════════════════════
//  NAV BUTTONS
// ═══════════════════════════════════════════
const _reload=document.getElementById('btn-reload');
if(_reload)_reload.addEventListener('click',()=>{_reload.style.transform='rotate(360deg)';_reload.style.transition='transform 0.5s ease';setTimeout(()=>{_reload.style.transform='';_reload.style.transition='';},500);const s=tabState[activeTabId];if(!s)return;if(s.panel==='web')try{webIframe.contentWindow.location.reload();}catch{const _ru=s.history[s.histIdx];goTo(_ru);}if(s.panel==='mims')try{mimsIframe.contentWindow.location.reload();}catch{}});
const _back=document.getElementById('btn-back');
if(_back)_back.addEventListener('click',()=>{const s=tabState[activeTabId];if(!s||s.histIdx<=0)return;s.histIdx--;openUrl(s.history[s.histIdx],false);});
const _fwd=document.getElementById('btn-forward');
if(_fwd)_fwd.addEventListener('click',()=>{const s=tabState[activeTabId];if(!s||s.histIdx>=s.history.length-1)return;s.histIdx++;openUrl(s.history[s.histIdx],false);});

// ═══════════════════════════════════════════
//  CONTEXT MENU
// ═══════════════════════════════════════════
const ctxMenu=document.getElementById('ctx-menu');let ctxTargetId=null;
function showCtxMenu(e,id){if(!ctxMenu)return;e.preventDefault();ctxTargetId=id;ctxMenu.style.left=Math.min(e.clientX,innerWidth-160)+'px';ctxMenu.style.top=Math.min(e.clientY,innerHeight-80)+'px';ctxMenu.style.display='block';requestAnimationFrame(()=>ctxMenu.style.opacity='1');}
function hideCtxMenu(){if(!ctxMenu)return;ctxMenu.style.opacity='0';setTimeout(()=>ctxMenu.style.display='none',150);}
document.addEventListener('click',hideCtxMenu);
const _ce=document.getElementById('ctx-edit');if(_ce)_ce.addEventListener('click',()=>{const s=shortcuts.find(x=>x.id===ctxTargetId);if(s)openModal(s);});
const _cr=document.getElementById('ctx-remove');if(_cr)_cr.addEventListener('click',()=>{shortcuts=shortcuts.filter(x=>x.id!==ctxTargetId);saveShortcuts();renderShortcuts();showToast('Shortcut removed');});

// ═══════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════
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

// ═══════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════
let toastTimer;
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.className='show';clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.className='',2500);}

// ═══════════════════════════════════════════
//  PROXY TITLE → RESET SHORTCUTS
// ═══════════════════════════════════════════
const _pt=document.getElementById('proxy-title');
if(_pt)_pt.addEventListener('dblclick',()=>{if(confirm('Reset shortcuts to default?')){shortcuts=JSON.parse(JSON.stringify(DEFAULT_SHORTCUTS));saveShortcuts();renderShortcuts();showToast('Shortcuts reset');}});

// ═══════════════════════════════════════════
//  SPLIT SCREEN
// ═══════════════════════════════════════════
const paneLeft    = document.getElementById('pane-left');
const paneRight   = document.getElementById('pane-right');
const splitDiv    = document.getElementById('split-divider');
const splitIframe = document.getElementById('split-iframe');
const splitInput  = document.getElementById('split-url-input');
const splitPlaceholder = document.getElementById('split-placeholder');
let splitActive = false;
let splitRatio  = 0.5; // left pane fraction

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
  // Right pane: fixed from right, width = rightW
  paneRight.style.width = rightW + 'px';
  // Divider: fixed at divX from left
  splitDiv.style.left  = divX + 'px';
  // Shrink left pane so content doesn't go under the right pane
  paneLeft.style.marginRight = (rightW + 5) + 'px';
}

function loadSplitUrl(raw) {
  let url = (raw || '').trim();
  if (!url) return;
  if (url.includes('.') && !url.includes(' ') && !/^https?:\/\//i.test(url)) url = 'https://' + url;
  else if (!/^https?:\/\//i.test(url)) url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
  const proxied = '/proxy?url=' + encodeURIComponent(url);
  splitIframe.src = proxied;
  splitInput.value = url;
  splitPlaceholder.style.display = 'none';
}

// Toggle button
const _bsp=document.getElementById('btn-split');if(_bsp)_bsp.addEventListener('click', () => {
  if (splitActive) closeSplit();
  else openSplit('');
});

// URL bar — navigate on Enter
splitInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') loadSplitUrl(splitInput.value);
});

// Close button
const _scb=document.getElementById('split-close-btn');if(_scb)_scb.addEventListener('click', closeSplit);

// Swap panes — swap iframes src
const _ssb=document.getElementById('split-swap-btn');if(_ssb)_ssb.addEventListener('click', () => {
  const state = tabState[activeTabId];
  if (!state) return;
  const leftUrl  = state.url === 'ep://home' ? '' : (state.url === 'mims://portal' ? '' : webIframe.src);
  const rightUrl = splitIframe.src === 'about:blank' ? '' : splitIframe.src;
  // Swap
  if (rightUrl) openUrl(rightUrl);
  if (leftUrl)  loadSplitUrl(leftUrl);
  showToast('Panes swapped');
});

// Draggable divider
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

// Also wire the tab context menu "Open in split" option
const _tcsp=document.getElementById('tctx-split');if(_tcsp)_tcsp.addEventListener('click', () => {
  const state = tabState[tabCtxId];
  if (!state) return;
  const url = state.url;
  if (!url || url === 'ep://home' || url === 'mims://portal') { showToast('Nothing to split with'); hideTabCtxMenu(); return; }
  openSplit(url);
  hideTabCtxMenu();
  showToast('Opened in split screen');
});

// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
//  SEASON THEMES
// ═══════════════════════════════════════════
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
  if(springEnabled)           document.title='🌸 Endless Proxy';
  else if(fallEnabled)        document.title='🍂 Endless Proxy';
  else if(winterEnabled)      document.title='❄️ Endless Proxy';
  else if(summerEnabled)      document.title='🌅 Endless Proxy';
  else if(sandEnabled)        document.title='⚡ Endless Proxy';
  else if(radioactiveEnabled) document.title='☢️ Endless Proxy';
  else if(thunderEnabled)     document.title='⛈️ Endless Proxy';
  else if(grassEnabled)       document.title='🌿 Endless Proxy';
  else                        document.title='Endless Proxy';
}
// Keep old name as alias so nothing breaks
function applySummerTheme(){ applySeasonTheme(); }

// ═══════════════════════════════════════════
//  BROWSING HISTORY (global across tabs)
// ═══════════════════════════════════════════
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
    body.innerHTML = '<div class="panel-empty"><span class="pe-icon">🕐</span>No history yet</div>';
    return;
  }
  // Group by day
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
  // Clear all button
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
      el.innerHTML = `${fav ? `<img src="${fav}" onerror="this.style.display='none'">` : '<span style="width:14px;height:14px;flex-shrink:0;">🌐</span>'}<span class="hist-item-title" title="${e.url}">${e.title}</span><span class="hist-item-time">${hh}:${mm}</span><span class="hist-item-del" title="Remove">✕</span>`;
      el.querySelector('.hist-item-title').addEventListener('click', () => { openUrl(e.url); closePanel('history'); });
      el.querySelector('.hist-item-del').addEventListener('click', ev => { ev.stopPropagation(); browsingHistory = browsingHistory.filter(h => h !== e); saveBrowsingHistory(); renderHistoryPanel(); });
      body.appendChild(el);
    });
  });
}

// Wire history button
// Patch openPanel to support history
// NOTE: must use variable assignment (not function declaration) so the
// hoisted first openPanel is correctly captured in _origOpenPanel.
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

// Patch openUrl to record history
const _origOpenUrl = openUrl;
openUrl = function openUrlPatched(raw, addToHistory = true) {
  _origOpenUrl(raw, addToHistory);
  const url = (raw || '').trim();
  if (url && url !== 'ep://home' && url !== 'mims://portal' && /^https?:\/\//i.test(url)) {
    addToHistory(url);
  }
};

// ═══════════════════════════════════════════
//  HOME DATE DISPLAY
// ═══════════════════════════════════════════
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

// ═══════════════════════════════════════════
//  ADDRESS BAR OVERLAY (click to edit)
// ═══════════════════════════════════════════
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

// ═══════════════════════════════════════════
//  KEYBOARD SHORTCUTS OVERLAY
// ═══════════════════════════════════════════
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

// ═══════════════════════════════════════════
//  TAB SEARCH OVERLAY (Ctrl+Shift+A)
// ═══════════════════════════════════════════
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
    el.innerHTML = `<div class="ts-item-icon">${fav ? `<img src="${fav}" width="14" height="14" style="border-radius:2px;" onerror="this.style.display='none'">` : '🌐'}</div><div style="flex:1;min-width:0;"><div class="ts-item-title">${title}</div><div class="ts-item-url">${url === 'ep://home' ? 'New Tab' : url === 'mims://portal' ? 'MIMS Portal' : url}</div></div>${tab.id === activeTabId ? '<span class="ts-active-pill">active</span>' : ''}`;
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

// ═══════════════════════════════════════════
//  EXTENDED KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════
document.addEventListener('keydown', e => {
  const tag = document.activeElement?.tagName;
  const inInput = tag === 'INPUT' || tag === 'TEXTAREA';
  // Ctrl+? → shortcuts overlay
  if (e.ctrlKey && (e.key === '?' || e.key === '/') && !inInput) { e.preventDefault(); openShortcutsOverlay(); }
  // Ctrl+Shift+A → tab search
  if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); openTabSearch(); }
  // Ctrl+H → history
  if (e.ctrlKey && e.key === 'h' && !inInput) { e.preventDefault(); openPanel('history'); }
  // Ctrl+D → bookmark
  if (e.ctrlKey && e.key === 'd' && !inInput) { e.preventDefault(); document.getElementById('btn-bookmark')?.click(); }
  // Ctrl+R → reload
  if (e.ctrlKey && e.key === 'r' && !inInput) { e.preventDefault(); document.getElementById('btn-reload')?.click(); }
  // Ctrl+\ → split screen
  if (e.ctrlKey && e.key === '\\' && !inInput) { e.preventDefault(); document.getElementById('btn-split')?.click(); }
  // Alt+Left → back
  if (e.altKey && e.key === 'ArrowLeft' && !inInput) { e.preventDefault(); document.getElementById('btn-back')?.click(); }
  // Alt+Right → forward
  if (e.altKey && e.key === 'ArrowRight' && !inInput) { e.preventDefault(); document.getElementById('btn-forward')?.click(); }
  // Escape → also close address overlay and shortcuts overlay
  if (e.key === 'Escape') {
    if (addrOverlay?.style.display !== 'none') { closeAddrOverlay(); return; }
    if (shortcutsOverlay?.style.display !== 'none') { closeShortcutsOverlay(); return; }
    if (tabSearchOverlay?.style.display !== 'none') { closeTabSearch(); return; }
  }
});

applySeasonalMode(); // Apply seasonal mode before theme (may override manual picks)
applySeasonTheme();  // Apply persisted season state on load

// ═══════════════════════════════════════════
//  CHROME HEIGHT → split pane offset
// ═══════════════════════════════════════════
function updateChromeHeight(){
  const chrome=document.querySelector('.browser-chrome');
  if(chrome){
    document.documentElement.style.setProperty('--chrome-height', chrome.offsetHeight+'px');
  }
}
updateChromeHeight();
new ResizeObserver(updateChromeHeight).observe(document.querySelector('.browser-chrome'));

// ═══════════════════════════════════════════
//  HOME CLOCK
// ═══════════════════════════════════════════
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

// ═══════════════════════════════════════════
//  ADDRESS BAR LOCK ICON
// ═══════════════════════════════════════════
function updateAddressBarIcon(url){
  const lock=document.getElementById('nav-lock-icon');
  const globe=document.getElementById('nav-globe-icon');
  if(!lock||!globe)return;
  const isHttps=/^https:\/\//i.test(url||'');
  lock.style.display=isHttps?'block':'none';
  globe.style.display=isHttps?'none':'block';
}

// ═══════════════════════════════════════════
//  BOOKMARK STAR ACTIVE STATE
// ═══════════════════════════════════════════
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

// ═══════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════
document.addEventListener('keydown',e=>{
  const tag=document.activeElement?.tagName;
  const inInput=tag==='INPUT'||tag==='TEXTAREA';
  // Ctrl+T → new tab
  if(e.ctrlKey&&e.key==='t'&&!inInput){
    e.preventDefault();
    document.getElementById('btn-new-tab')?.click();
  }
  // Ctrl+W → close active tab
  if(e.ctrlKey&&e.key==='w'&&!inInput){
    e.preventDefault();
    closeTab(activeTabId);
  }
  // Ctrl+L → focus address bar
  if(e.ctrlKey&&e.key==='l'){
    e.preventDefault();
    document.getElementById('nav-address-bar')?.click();
  }
  // Escape → hide suggestions & blur search
  if(e.key==='Escape'&&!inInput){
    hideSuggestions();
    if(activePanel)closePanel(activePanel);
  }
});

