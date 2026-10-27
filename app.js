(function(){
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Countdown to Fri Nov 20 2026, midnight Pacific (PST, UTC-8)
var target=Date.parse('2026-11-20T00:00:00-08:00');
function pad(n){return String(n).padStart(2,'0')}
function tick(){var ms=target-Date.now(),el=document.getElementById('countdown');
 if(ms<=0){el.innerHTML='<div style="padding:.6rem 1rem"><span>It\'s on.</span><small>Go Blue</small></div>';return}
 var s=Math.floor(ms/1000);document.getElementById('cd-d').textContent=Math.floor(s/86400);
 document.getElementById('cd-h').textContent=pad(Math.floor(s%86400/3600));document.getElementById('cd-m').textContent=pad(Math.floor(s%3600/60));document.getElementById('cd-s').textContent=pad(s%60);setTimeout(tick,1000)}
tick();
// Scroll reveal
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
// Parallax
var bg=document.querySelector('.hero-bg');
if(!reduce&&bg){window.addEventListener('scroll',function(){var y=window.scrollY;if(y<innerHeight)bg.style.setProperty('--py',(y*.35)+'px')},{passive:true})}
// Tap effect for photos on touch
document.querySelectorAll('.photo').forEach(function(p){p.addEventListener('click',function(){p.classList.toggle('tapped')})});
// Board toggle: purely client-side, stores nothing
var lines=["Noted. Mentally. Nowhere else.","Excellent. Now actually tell Luis.","This button saves nothing. Like a Big Ten defense in overtime.","Respect. The bay thanks you in advance."],i=0;
var b=document.getElementById('board'),n=document.getElementById('board-note');
b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);
 b.textContent=on?"Board: confirmed 🏄":"I'm bringing a board 🏄";n.textContent=on?' '+lines[i++%lines.length]:' Cold feet. Understandable.'});
// Confetti
var c=document.getElementById('confetti'),x=c.getContext('2d'),parts=[],running=false;
function size(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio}size();addEventListener('resize',size);
function burst(){if(reduce){flash();return}var cols=['#FFCB05','#00274C','#0e7c9b','#ffffff'];
 for(var k=0;k<160;k++)parts.push({x:c.width/2,y:c.height*.6,vx:(Math.random()-.5)*22*devicePixelRatio,vy:(-Math.random()*22-8)*devicePixelRatio,r:(Math.random()*6+4)*devicePixelRatio,a:Math.random()*6,va:(Math.random()-.5)*.3,col:cols[k%4],life:160});
 if(!running){running=true;requestAnimationFrame(step)}}
function step(){x.clearRect(0,0,c.width,c.height);parts=parts.filter(function(p){return p.life-->0&&p.y<c.height+50});
 parts.forEach(function(p){p.vy+=.6*devicePixelRatio;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.col;x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore()});
 if(parts.length)requestAnimationFrame(step);else{running=false;x.clearRect(0,0,c.width,c.height)}}
function flash(){document.body.style.background='#FFCB05';setTimeout(function(){document.body.style.background=''},250)}
var said=["Go Blue.","Hail to the Victors.","Still Go Blue.","You can stop now.","Okay, one more."],j=0;
['goblue','goblue2'].forEach(function(id){var e=document.getElementById(id);e.addEventListener('click',function(){burst();e.setAttribute('aria-label',said[j%said.length]);e.textContent=said[j++%said.length]+' 〽️'})});
})();
