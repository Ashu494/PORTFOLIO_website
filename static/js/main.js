document.addEventListener('DOMContentLoaded', () => {
    // 1. Techy Background Canvas (Connecting Particles)
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
            this.color = Math.random() > 0.5 ? '#158AE4' : '#55B5F3';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        const numParticles = Math.min(window.innerWidth / 10, 100);
        for (let i = 0; i < numParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(21, 138, 228, ${0.15 - distance/1000})`; // #158AE4 with varying opacity
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    initParticles();
    animateParticles();
    
    // 2. Typing Effect for Hero Section
    const roleText = window.portfolioRole || "Software Developer & AI/ML Enthusiast";
    const typingElement = document.querySelector('.typing-text');
    let textIndex = 0;
    
    function typeText() {
        if (textIndex < roleText.length) {
            typingElement.innerHTML += roleText.charAt(textIndex);
            textIndex++;
            setTimeout(typeText, 70);
        } else {
            // Add blinking cursor
            typingElement.style.borderRight = "2px solid #55B5F3";
            setInterval(() => {
                typingElement.style.borderColor = typingElement.style.borderColor === 'transparent' ? '#55B5F3' : 'transparent';
            }, 500);
        }
    }
    
    setTimeout(typeText, 1000); // Start after 1 second
    
    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
    
    // 4. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(248, 250, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(248, 250, 255, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
});
