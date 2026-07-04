/* 100 cute names */
const CUTE_NAMES = [
  "my qtyy paan masala","sikhuuu","babuuu","shikharr bbyy","mahh lovv","baby","qtyy",
  "shikharrr","jii bby","lysmm bby","mwahhh","honeyy","sugarr plum",
  "shikhu bear 🐻","cutie patootie","my sunshine ☀️","jaan","meri jaan","cuddle bug",
  "my prince 👑","shikhu babu","bubba","sweet pea","my heartbeat","lil dumpling",
  "buttercup","cupcake","muffin","my kokoro","smol bean","pookie","pookums",
  "sikhu monster 🥺","teddy bear","my moon 🌙","star boy ✨","my universe","gummy bear",
  "peachy","peach 🍑","sunny boy","raja","raja bby","shikharoo","meri duniya",
  "my soulmate","twin flame","sikhu bunny 🐰","cinnamon roll","marshmallow",
  "shikhu bear hug","hubby vibes","mister cute","chweetu","chotu","meri jaanuuu",
  "shikhu shikhu","sikhu snuggles","my forever","loverboy","shikhu shona","shona bby",
  "sona baby","jaanu","cutie pie 🥧","sweetie","darling","my everything","shikhu tadka",
  "chocolate boy 🍫","shikhu paani puri","meri golgappa 💕","shikhu ladoo","meri jalebi",
  "my rasgulla","kulfi bby","my mango 🥭","shikhu chai ☕","my chota packet","big teddy",
  "shikhu bhalu","meri chocolate","my kitkat","shikhu dairy milk","bubblegum boy",
  "shikhu smiley 😊","giggles","shikhu shukhu","my cloud ☁️","shikhu snowflake ❄️",
  "little heart","my magic","my wish","sikhu star","shikhu dreamer","my treasure 💎",
  "shikhu pearl","my gem","shikhu firefly","my glow"
];

/* 100 motivational / love lines */
const CUTE_LINES = [
  "you are so loved 💖","i believe in you always ✨","you make the world softer 🌸",
  "one step at a time, my love","you are not alone, i'm here 🤍","your smile fixes everything 😊",
  "keep going, shikhu, i got you","you are enough, always","breathe. i love you 💕",
  "brave heart, kind soul","the world is lucky to have you","you shine even on cloudy days ☁️",
  "us against the world, baby","you are my safe place","proud of you every single day 💫",
  "your dreams are valid, chase them","small wins count too 🏆","you're doing amazing sweetie",
  "i'm cheering for you always 📣","tough days don't define you","you make me so proud 💗",
  "your heart is pure gold","keep being unapologetically you","i love your soft heart",
  "you handle so much so well","you're stronger than you feel today","i see you. i love you.",
  "rest is productive too 🌙","you deserve every good thing","your effort is not invisible",
  "one hug from me, incoming 🫂","you're my favourite human","growth is messy, keep going 🌱",
  "your kindness is your superpower","i'll always pick you 💘","you are magic, shikhu ✨",
  "no bad day lasts forever","you are my whole world 🌍","the future is bright with you",
  "i'm here through every mood","your feelings are valid, love","take a deep breath, i've got you",
  "you're doing better than you think","little joys count too 🌷","you are held, always",
  "keep that soft heart safe","your presence heals me","you're a gift to this world 🎁",
  "even lost, you're never alone","your light is my favourite light","i love loving you 💞",
  "you make ordinary days magical","every version of you is loved","i'll fight the world with you",
  "your peace matters most","you deserve softness always","i am so grateful for you 🌻",
  "rest, my love, tomorrow's yours","you are so incredibly kind","the world is better with you in it",
  "believe in your becoming 🦋","your dreams don't scare me, we got this","you are worthy of every love 💌",
  "you are art. keep creating.","your heart is my home 🏡","keep planting the seeds 🌱",
  "you carry so much grace","i pick you, everyday","your existence is a blessing",
  "you are made of stars ✨","keep smiling that pretty smile","the storm passes, i promise",
  "you are prayed for 🤲","keep your soft heart","little steps make big journeys",
  "your comeback will be beautiful","you deserve to feel light","i believe in your magic 🪄",
  "your love changes my world","cheering for you, forever ✨","you can rest. i'll watch over.",
  "you are already so much","your becoming is beautiful 🌸","we bloom together 🌺",
  "you turn my world pink 💗","your voice is my favourite sound","you have oceans of love in you 🌊",
  "chin up, cutie","you make me want to be softer","hold on, magic is coming",
  "you are seen. deeply.","you are the calm & the spark","your feelings deserve room 💭",
  "i love you at your loudest & quietest","you are worth every effort","keep going, my favourite person",
  "you are healing, one day at a time","the world needs your kind heart 🌍",
  "you're the reason i believe in love","come here, i've got a hug for you 🫂",
  "you are so, so loved. always. 💖"
];

const stage = document.getElementById("stage");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const popupClose = document.getElementById("popupClose");
const playAgain = document.getElementById("playAgain");
const popCountEl = document.getElementById("popCount");
const floatingHearts = document.getElementById("floatingHearts");

const ALL_MESSAGES = [...CUTE_NAMES, ...CUTE_LINES]; // 200 total
let queue = [];
let popped = 0;

function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function resetQueueIfNeeded(){ if(queue.length===0) queue = shuffle(ALL_MESSAGES); }

/* WebAudio pop sound (no file needed) */
let audioCtx;
function playPop(){
  try{
    audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type="sine"; o.frequency.setValueAtTime(880,t);
    o.frequency.exponentialRampToValueAtTime(180,t+0.15);
    g.gain.setValueAtTime(0.001,t);
    g.gain.exponentialRampToValueAtTime(0.35,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.2);
    o.connect(g).connect(audioCtx.destination);
    o.start(t); o.stop(t+0.22);
    const o2 = audioCtx.createOscillator(), g2 = audioCtx.createGain();
    o2.type="triangle"; o2.frequency.setValueAtTime(1600,t+0.05);
    o2.frequency.exponentialRampToValueAtTime(2400,t+0.18);
    g2.gain.setValueAtTime(0.0001,t+0.05);
    g2.gain.exponentialRampToValueAtTime(0.12,t+0.08);
    g2.gain.exponentialRampToValueAtTime(0.0001,t+0.22);
    o2.connect(g2).connect(audioCtx.destination);
    o2.start(t+0.05); o2.stop(t+0.24);
  }catch(e){}
}

function spawnBubbles(count=12){
  stage.innerHTML = "";
  const rect = stage.getBoundingClientRect();
  const isSmall = window.innerWidth < 600;
  const bw = isSmall?80:110, bh = isSmall?72:100, padding = 10;
  const placed = [];
  resetQueueIfNeeded();
  const n = Math.min(count, queue.length);
  for(let i=0;i<n;i++){
    const msg = queue.shift();
    let x,y,tries=0,ok=false;
    while(tries<60 && !ok){
      x = padding + Math.random()*(rect.width-bw-padding*2);
      y = padding + Math.random()*(rect.height-bh-padding*2);
      ok = placed.every(p=>Math.hypot(p.x-x,p.y-y) > bw*0.85);
      tries++;
    }
    placed.push({x,y});
    const b = document.createElement("div");
    b.className = "bubble";
    b.style.left = x+"px"; b.style.top = y+"px";
    b.style.animationDelay = (Math.random()*2)+"s, "+(i*0.05)+"s";
    const h = document.createElement("div"); h.className = "heart"; b.appendChild(h);
    b.dataset.msg = msg;
    b.addEventListener("click", onPop);
    stage.appendChild(b);
  }
}

function onPop(e){
  const bubble = e.currentTarget;
  if(bubble.classList.contains("pop")) return;
  playPop();
  const rect = bubble.getBoundingClientRect();
  const sr = stage.getBoundingClientRect();
  const cx = rect.left - sr.left + rect.width/2;
  const cy = rect.top  - sr.top  + rect.height/2;
  const emojis = ["💖","💕","✨","🌸","💗","💫"];
  for(let i=0;i<8;i++){
    const p = document.createElement("div");
    p.className = "burst";
    p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    const ang = (Math.PI*2*i)/8 + Math.random()*0.4;
    const dist = 60 + Math.random()*40;
    p.style.left = cx+"px"; p.style.top = cy+"px";
    p.style.setProperty("--dx", Math.cos(ang)*dist+"px");
    p.style.setProperty("--dy", Math.sin(ang)*dist+"px");
    stage.appendChild(p);
    setTimeout(()=>p.remove(), 800);
  }
  bubble.classList.add("pop");
  const msg = bubble.dataset.msg;
  setTimeout(()=>bubble.remove(), 500);
  popped++;
  popCountEl.textContent = popped;
  showPopup(msg);
}

function showPopup(msg){ popupText.textContent = msg; popup.classList.add("show"); }
popupClose.addEventListener("click", ()=>popup.classList.remove("show"));
popup.addEventListener("click", e=>{ if(e.target===popup) popup.classList.remove("show"); });

playAgain.addEventListener("click", ()=>{
  const count = 10 + Math.floor(Math.random()*6); // 10–15
  spawnBubbles(count);
});

function seedFloatingHearts(){
  const hearts = ["💖","💕","💗","🌸","✨","🫧"];
  for(let i=0;i<18;i++){
    const h = document.createElement("div");
    h.className = "bg-heart";
    h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    h.style.left = Math.random()*100+"vw";
    h.style.fontSize = (14+Math.random()*22)+"px";
    h.style.animationDuration = (10+Math.random()*14)+"s";
    h.style.animationDelay = (Math.random()*12)+"s";
    floatingHearts.appendChild(h);
  }
}

seedFloatingHearts();
spawnBubbles(12);
