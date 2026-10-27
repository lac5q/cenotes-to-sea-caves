(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// countdown
const T=new Date('2026-11-20T00:00:00-08:00').getTime();const p=n=>String(n).padStart(2,'0');
function tick(){let d=Math.max(0,T-Date.now())/1000;$('#cd-d').textContent=Math.floor(d/86400);$('#cd-h').textContent=p(Math.floor(d%86400/3600));$('#cd-m').textContent=p(Math.floor(d%3600/60));$('#cd-s').textContent=p(Math.floor(d%60));if(d<=0)$('.cd-label').textContent="It's go time. Go Blue."}tick();setInterval(tick,1000);
// tilts
$$('.pol').forEach((el,i)=>el.style.setProperty('--rot',((i*37%9)-4)*1.1+'deg'));
$$('.bubbles i').forEach((b,i)=>{b.style.left=(i*71%100)+'%';b.style.animationDelay=(-i*.45)+'s';b.style.transform='scale('+(.5+i%4*.3)+')'});
// progress
addEventListener('scroll',()=>{const h=document.documentElement;$('.progress span').style.width=(h.scrollTop/(h.scrollHeight-innerHeight)*100)+'%'},{passive:true});
// lightbox
const lb=$('#lb'),P=window.PHOTOS;let cur=0;const show=i=>{cur=(i+P.length)%P.length;$('img',lb).src=P[cur].src;$('img',lb).alt=P[cur].alt;$('figcaption',lb).textContent=P[cur].cap};
$$('.pol').forEach(el=>$('.pol-btn',el).addEventListener('click',()=>{show(+el.dataset.i);lb.hidden=false;$('.lb-close',lb).focus()}));
$('.lb-close',lb).onclick=()=>lb.hidden=true;$('.lb-prev',lb).onclick=()=>show(cur-1);$('.lb-next',lb).onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)lb.hidden=true});addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
// confetti (tasteful: maize/blue/tropical, short)
const cv=$('#confetti'),cx=cv.getContext('2d');function burst(){if(RM){document.body.animate([{background:'#FFCB05'},{}],{duration:400});return}cv.width=innerWidth;cv.height=innerHeight;const C=['#FFCB05','#00274C','#3DDBD9','#FF6F59','#E8418C'];const ps=Array.from({length:120},()=>({x:innerWidth/2,y:innerHeight*.75,vx:(Math.random()-.5)*14,vy:-Math.random()*16-6,s:Math.random()*8+5,r:Math.random()*6,c:C[Math.random()*5|0]}));let f=0;(function a(){cx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.vy+=.45;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=.1;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});if(++f<150)requestAnimationFrame(a);else cx.clearRect(0,0,cv.width,cv.height)})()}
$('#goblue').onclick=burst;
// title split
const h1=$('h1.split');
function fallback(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el))}
if(RM||!window.gsap){fallback();return}
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);
h1.childNodes.forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();[...n.textContent].forEach(c=>{const s=document.createElement('span');s.className='ch';s.textContent=c===' '?'\u00a0':c;f.append(s)});n.replaceWith(f)}});
gsap.from('h1 .ch, h1 em',{y:80,opacity:0,rotate:()=>gsap.utils.random(-25,25),stagger:.04,duration:.9,ease:'back.out(2)'});
gsap.from('.eyebrow,.hero-dek,.hero-sub,.hero-meta span',{y:30,opacity:0,stagger:.12,delay:.5,duration:.8,ease:'back.out(1.6)'});
gsap.to('.hero-media img',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hero-b',{opacity:1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
// polaroids drop and settle
$$('.scrap .pol').forEach(el=>gsap.from(el,{y:120,opacity:0,rotate:gsap.utils.random(-25,25),scale:.8,duration:1,ease:'elastic.out(1,.6)',scrollTrigger:{trigger:el,start:'top 92%'}}));
gsap.from('.sticker',{scale:0,rotate:-180,duration:.9,ease:'back.out(3)',stagger:.2,scrollTrigger:{trigger:'.scrap',start:'top 80%'}});
$$('.doodle path,.doodle circle').forEach(p=>{const L=p.getTotalLength();gsap.fromTo(p,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,duration:1.4,ease:'power2.out',scrollTrigger:{trigger:'.scrap',start:'top 75%'}})});
$$('.half-head').forEach(h=>gsap.from(h.children,{y:50,opacity:0,stagger:.12,duration:.9,ease:'back.out(1.8)',scrollTrigger:{trigger:h,start:'top 85%'}}));
// dive
const tl=gsap.timeline({scrollTrigger:{trigger:'.dive',start:'top top',end:'bottom bottom+=-20%',scrub:1}});
tl.from('.dive-from',{y:-60,opacity:0}).from('.dive-line',{scaleY:0}).to('.dive',{background:'linear-gradient(#0a6f8a,#00274C 60%,#06121f)'},'<').to('.cave',{opacity:1,scale:1},'<').from('.dive-to',{y:60,opacity:0,scale:.6,ease:'back.out(2)'});
gsap.to('.fish',{x:()=>innerWidth*.3,scrollTrigger:{trigger:'.dive',scrub:1}});
// reveals
$$('.reveal').forEach(el=>gsap.fromTo(el,{y:50,opacity:0},{y:0,opacity:1,duration:.9,ease:'back.out(1.7)',scrollTrigger:{trigger:el,start:'top 90%'}}));
gsap.from('.countdown div',{y:40,opacity:0,scale:.6,stagger:.1,duration:.8,ease:'back.out(2.5)',scrollTrigger:{trigger:'.countdown-band',start:'top 85%'}});
gsap.to('.tl-line span',{height:'100%',ease:'none',scrollTrigger:{trigger:'.timeline',start:'top 70%',end:'bottom 60%',scrub:true}});
$$('.day-n').forEach(d=>gsap.from(d,{scale:0,rotate:-90,duration:.8,ease:'back.out(2.5)',scrollTrigger:{trigger:d,start:'top 85%'}}));
$$('.pz img').forEach(i=>gsap.fromTo(i,{yPercent:-6,scale:1.12},{yPercent:6,ease:'none',scrollTrigger:{trigger:i,scrub:true}}));
gsap.from('.block-m',{y:200,scrollTrigger:{trigger:'.signoff',start:'top bottom',end:'bottom bottom',scrub:true}});
})();
/* waves ambience: CC0 recording, Web Audio seamless loop, starts muted */
(()=>{const b=document.getElementById('waves'),hint=document.getElementById('waves-hint');if(!b)return;
let ctx,gain,src,buf,on=false;const K='ctos-waves';
async function start(){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();await ctx.resume();
if(!buf){const r=await fetch('waves.mp3');buf=await ctx.decodeAudioData(await r.arrayBuffer());}
gain=gain||(()=>{const g=ctx.createGain();g.gain.value=0;g.connect(ctx.destination);return g})();
if(!src){src=ctx.createBufferSource();src.buffer=buf;src.loop=true;src.connect(gain);src.start();}
const t=ctx.currentTime;gain.gain.cancelScheduledValues(t);gain.gain.setValueAtTime(gain.gain.value,t);gain.gain.linearRampToValueAtTime(.55,t+2.5);set(true);}catch(e){set(false)}}
function stop(){if(ctx&&gain){const t=ctx.currentTime;gain.gain.cancelScheduledValues(t);gain.gain.setValueAtTime(gain.gain.value,t);gain.gain.linearRampToValueAtTime(0,t+1.2);}set(false)}
function set(v){on=v;b.setAttribute('aria-pressed',v);b.setAttribute('aria-label',v?'Mute the waves':'Play the waves');b.classList.toggle('on',v);try{localStorage.setItem(K,v?'on':'off')}catch(e){}}
b.addEventListener('click',()=>{if(hint)hint.hidden=true;try{localStorage.setItem(K+'-hint','1')}catch(e){}on?stop():start()});
let pref=null,seen=null;try{pref=localStorage.getItem(K);seen=localStorage.getItem(K+'-hint')}catch(e){}
if(pref==='on'){b.classList.add('wants');const go=()=>{document.removeEventListener('pointerdown',go);document.removeEventListener('keydown',go);if(!on)start()};document.addEventListener('pointerdown',go);document.addEventListener('keydown',go);}
if(!seen&&hint){setTimeout(()=>{hint.hidden=false;setTimeout(()=>hint.hidden=true,7000)},2500);try{localStorage.setItem(K+'-hint','1')}catch(e){}}
})();
if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('img[src="img/steps.webp"]').forEach(i=>i.src='img/steps-still.webp');(window.PHOTOS||[]).forEach(p=>{if(p.src==='img/steps.webp')p.src='img/steps-still.webp'})}
