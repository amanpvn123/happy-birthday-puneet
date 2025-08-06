
// Confetti animation using canvas
window.onload = function() {
    createConfetti();
};

function showSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
    document.getElementById('music').play();
    document.getElementById('confetti-canvas').style.display = 'block';
    startConfetti();
}

// Confetti logic
let confettiActive = false;
let confettiParticles = [];
let confettiCanvas, ctx;

function createConfetti() {
    confettiCanvas = document.getElementById('confetti-canvas');
    ctx = confettiCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function startConfetti() {
    if (confettiActive) return;
    confettiActive = true;
    confettiParticles = [];
    for (let i = 0; i < 120; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -confettiCanvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 40 + 10,
            color: randomColor(),
            tilt: Math.random() * 10 - 10,
            tiltAngle: 0,
            tiltAngleIncremental: (Math.random() * 0.07) + .05
        });
    }
    requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d / 5);
        ctx.stroke();
    }
    updateConfetti();
    if (confettiActive) requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
    for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i];
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(0.01 * p.d);
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > confettiCanvas.height) {
            p.x = Math.random() * confettiCanvas.width;
            p.y = -10;
        }
    }
}

function randomColor() {
    const colors = ['#ff4e50', '#f9d423', '#4e54c8', '#43cea2', '#fc913a', '#f9d423', '#e1eec3'];
    return colors[Math.floor(Math.random() * colors.length)];
}
