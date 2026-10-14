function updateBirthdayCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let birthdayDate = new Date(currentYear, 9, 22);

    if (now > birthdayDate && (now.getDate() !== 22 || now.getMonth() !== 9)) {
        birthdayDate = new Date(currentYear + 1, 9, 22);
    }

    const diff = birthdayDate - now;

    if (diff <= 0 && now.getDate() === 22 && now.getMonth() === 9) {
        document.getElementById('cd-days').innerText = "00";
        document.getElementById('cd-hours').innerText = "00";
        document.getElementById('cd-minutes').innerText = "00";
        document.getElementById('cd-seconds').innerText = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').innerText = String(days).padStart(2, '0');
    document.getElementById('cd-hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateBirthdayCountdown, 1000);
updateBirthdayCountdown();

const startDate = new Date(2026, 7, 27);

function updateLoveCounter() {
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) {
        document.getElementById('love-days').innerText = "0";
        document.getElementById('love-hours').innerText = "0";
        document.getElementById('love-minutes').innerText = "0";
        document.getElementById('love-seconds').innerText = "0";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('love-days').innerText = days;
    document.getElementById('love-hours').innerText = hours;
    document.getElementById('love-minutes').innerText = minutes;
    document.getElementById('love-seconds').innerText = seconds;
}

setInterval(updateLoveCounter, 1000);
updateLoveCounter();

function checkDateAnswer(selectedDate, isCorrect, element) {
    const container = document.getElementById('gameResultContainer');
    const messageBox = document.getElementById('gameResultMessage');
    const allButtons = document.querySelectorAll('.date-option-btn');

    container.classList.remove('hidden');

    if (isCorrect) {
        messageBox.className = "p-4 rounded-2xl font-semibold text-center text-sm sm:text-base bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-md animate-bounce";
        messageBox.innerHTML = "Bravo mon amour, je savais que t’allais trouver. Le jour où on s’est vu dans votre annexe ❤️✨";

        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });

        allButtons.forEach(btn => btn.classList.remove('ring-4', 'ring-romanticRed', 'bg-rose-100'));
        element.classList.add('ring-4', 'ring-emerald-400', 'bg-emerald-50');

    } else {
        messageBox.className = "p-4 rounded-2xl font-semibold text-center text-sm sm:text-base bg-rose-100 text-rose-800 border border-rose-300 shadow-md animate-pulse";
        messageBox.innerHTML = "Oups mon cœur ! Réessaie encore, je sais que tu t'en souviens... 😉";

        allButtons.forEach(btn => btn.classList.remove('ring-4', 'ring-emerald-400', 'bg-emerald-50'));
        element.classList.add('ring-4', 'ring-rose-400', 'bg-rose-50');
    }
}

function openLoveLetter() {
    document.getElementById('envelopeCard').classList.add('hidden');
    document.getElementById('letterModal').classList.remove('hidden');
    
    confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
    });
    confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
    });
}

function closeLoveLetter() {
    document.getElementById('letterModal').classList.add('hidden');
    document.getElementById('envelopeCard').classList.remove('hidden');
}

function blowCandles() {
    const flames = document.getElementById('flamesContainer');
    const btn = document.getElementById('blowCandlesBtn');

    flames.style.opacity = '0';
    flames.style.transition = 'opacity 0.5s ease';

    btn.innerHTML = '<i class="fas fa-check"></i> Vœu exaucé ! Joyeux Anniversaire ! ❤️';
    btn.className = "bg-emerald-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg cursor-default inline-flex items-center gap-3";

    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');

    if (audio.paused) {
        audio.play();
        icon.className = "fas fa-volume-up text-xl text-romanticRed";
    } else {
        audio.pause();
        icon.className = "fas fa-music text-xl text-romanticRed";
    }
}

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 1.2 + 0.5;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 77)}, ${Math.floor(Math.random() * 100 + 109)}, ${this.opacity})`;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < -20) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

function initHearts() {
    hearts = [];
    const count = Math.floor(window.innerWidth / 25);
    for (let i = 0; i < count; i++) {
        hearts.push(new Heart());
    }
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animateHearts);
}

initHearts();
animateHearts();