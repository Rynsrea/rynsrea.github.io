let cvs = document.querySelector('#stars');
let ctx = cvs.getContext('2d');
let ratio = window.devicePixelRatio;
let width = window.innerWidth;
let height = window.innerHeight;

ctx.scale(ratio, ratio);

cvs.style.width = window.innerWidth + "px";
cvs.style.height = window.innerHeight + "px";
cvs.width = width * ratio;
cvs.height = height * ratio;

let layers = [
   { count: 200, speed: 0.5, rad: 0.5, intensity: 0.1 },
   { count: 100, speed: 1, rad: 1, intensity: 0.25  },
   { count: 50, speed: 1.5, rad: 2, intensity: 0.5  }
];

function generateStars(count, intensity) {
   let stars = [];
   let randomX = () => Math.round(Math.random() * width * ratio);
   let randomY = () => Math.round(Math.random() * height * ratio);
   for (let i = 0; i < count; i++) {
      stars.push({
         x: randomX(),
         y: randomY(),
         angle: Math.random() * 2 * Math.PI,
         intensity: intensity 
      });
   }
   return stars;
}

let starLayers = layers.map(layer => ({
   stars: generateStars(layer.count, layer.intensity),
   speed: layer.speed,
   rad: layer.rad,
   opacity: layer.opacity
}));

function drawStars(stars, rad) {
   for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, rad, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      let gradient = ctx.createRadialGradient(
         star.x, star.y, 0,
         star.x, star.y, rad * 5
      );
      gradient.addColorStop(0, '#ffff');
      gradient.addColorStop(1, '#fff0');
      
      ctx.beginPath();
      ctx.ellipse(star.x, star.y, rad * 5, rad * 0.25, 0, 0, 2 * Math.PI); // بیضی با شعاع‌های متفاوت
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(star.x, star.y, rad * 0.25, rad * 5, 0, 0, 2 * Math.PI); // بیضی با شعاع‌های متفاوت
      ctx.fillStyle = gradient;
      ctx.fill();
   }
}

function updateStars(stars, speed) {
   for (let star of stars) {
      star.y += speed;
      star.angle += 0.02;
      star.x += Math.sin(star.angle) * star.intensity;
      
      if (star.y > height * ratio) {
         star.y = 0;
         star.x = Math.round(Math.random() * width * ratio);
      }
   }
}

function animate() {
   ctx.clearRect(0, 0, width * ratio, height * ratio);
   for (let layer of starLayers) {
      updateStars(layer.stars, layer.speed);
      drawStars(layer.stars, layer.rad);
   }
   
   requestAnimationFrame(animate);
}

animate();