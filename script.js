// Konfeti efekti için canvas ayarları
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Konfeti parçacıkları
const particles = [];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

// Performans optimizasyonu için ayarlar
const MAX_PARTICLES = window.innerWidth < 768 ? 50 : 100;
const PARTICLE_INTERVAL = window.innerWidth < 768 ? 150 : 100;
let activeParticles = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Konfetileri oluştur
function init() {
    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(new Particle());
    }
}

// Animasyon döngüsü
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

// Pencere boyutu değiştiğinde canvas'ı yeniden boyutlandır
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Başlat
init();
animate();

// Kar taneleri için ayarlar
function createSnowflake() {
    if (activeSnowflakes >= MAX_PARTICLES) return;
    activeSnowflakes++;
    
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Rastgele kar tanesi karakteri seç
    const snowflakeChars = ['❆', '❅', '❄', '✻', '✺', '❋', '❊', '❉', '❈', '❇'];
    snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    
    // Başlangıç pozisyonu
    const startPositionX = Math.random() * window.innerWidth;
    snowflake.style.left = startPositionX + 'px';
    
    // Rastgele boyut ve opaklık
    const size = window.innerWidth < 768 ? (Math.random() * 15 + 5) : (Math.random() * 25 + 8);
    snowflake.style.fontSize = size + 'px';
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;
    
    document.body.appendChild(snowflake);
    
    // Animasyon parametreleri
    let posY = -10;
    let posX = startPositionX;
    const speed = 0.3 + Math.random() * 2;
    const wobbleSpeed = Math.random() * 0.3;
    let rotation = Math.random() * 360;
    let time = 0;
    
    function fall() {
        time += 0.01;
        posY += speed;
        posX += Math.sin(time) * wobbleSpeed + (Math.random() - 0.5) * 0.5;
        rotation += 0.8;
        
        snowflake.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
        
        if (posY > window.innerHeight) {
            snowflake.remove();
            activeSnowflakes--;
        } else {
            requestAnimationFrame(fall);
        }
    }
    
    fall();
}

// Kar yağışını başlat
function startSnowfall() {
    setInterval(createSnowflake, PARTICLE_INTERVAL);
}

// Sayfa yüklendiğinde kar yağışını başlat
window.addEventListener('load', () => {
    startSnowfall();
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createSnowflake(), i * 100);
    }
});

// Modal işlemleri
const modal = document.getElementById('contactModal');
const btn = document.getElementById('contactBtn');
const span = document.getElementsByClassName('close')[0];

// Modal açma
btn.onclick = function() {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Modal kapatma
span.onclick = function() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Modal dışına tıklayınca kapatma
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}
