const startBtn = document.getElementById('startBtn');
const typewriter = document.getElementById('typewriter');
const subtext = document.getElementById('subtext');
const trollNote = document.getElementById('trollNote');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const lights = document.getElementById('emergencyLights');
const canvas = document.getElementById('scratchCanvas');
const secret = document.getElementById('secret');

const bgMusic = document.getElementById('bgMusic');
const typeSound = document.getElementById('typeSound');
const siren = document.getElementById('siren');

let attempts = 0;
let scratchReady = false;

startBtn.onclick = () => {
    startBtn.remove();
    bgMusic.volume = 0.7;
    bgMusic.play().catch(() => {});
    typeWriter("Why are you here? Do you want to know what lies behind the darkness?", typewriter, 110, () => {
        typeWriter("If yes then press red. If not then go for green.", subtext, 90, () => {
            document.getElementById('buttons').style.opacity = 1;
        });
    });
};

// Green button troll
noBtn.onmouseenter = noBtn.onclick = () => {
    attempts++;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * (innerWidth - 300) + 50 + 'px';
    noBtn.style.top = Math.random() * (innerHeight - 200) + 50 + 'px';
    noBtn.style.animation = 'vibrate 0.9s';
    yesBtn.classList.add('glow');
    setTimeout(() => yesBtn.classList.remove('glow'), 1300);

    if (attempts === 6) {
        typeWriter("Maybe the button doesn't want to let you touch it. Try the other one.", trollNote, 100);
    }
};

// Red button → emergency → scratch image
yesBtn.onclick = () => {
    document.getElementById('buttons').style.opacity = 0;
    typewriter.style.opacity = subtext.style.opacity = trollNote.style.opacity = 0;
    lights.style.opacity = 1;
    siren.volume = 0.9;
    siren.play().catch(() => {});

    setTimeout(() => {
        lights.style.opacity = 0;
        siren.pause();
        siren.currentTime = 0;
        showScratchCover();
    }, 6000);
};

function showScratchCover() {
    const img = new Image();
    img.src = 'scratchcover.jpeg';  // তোমার আছে
    img.onload = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.style.opacity = 1;
        canvas.style.pointerEvents = 'auto';
        secret.style.opacity = 1;
        ctx.globalCompositeOperation = 'destination-out';
        scratchReady = true;
    };
}

// Scratch
canvas.onmousemove = canvas.ontouchmove = (e) => {
    if (!scratchReady) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 85, 0, Math.PI * 2);
    ctx.fill();
};

// Typewriter
function typeWriter(text, el, speed, cb) {
    el.style.opacity = 1;
    el.innerHTML = '';
    let i = 0;
    typeSound.currentTime = 0;
    typeSound.play().catch(() => {});
    const interval = setInterval(() => {
        if (i < text.length) {
            el.innerHTML += text[i++];
        } else {
            clearInterval(interval);
            typeSound.pause();
            if (cb) cb();
        }
    }, speed);
}

// Copy
document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText('20.11.2001');
    document.getElementById('copyBtn').textContent = 'Copied!';
    setTimeout(() => document.getElementById('copyBtn').textContent = 'Copy', 2000);
};

window.addEventListener('resize', () => location.reload());
