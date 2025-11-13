/**
 * Script para LePokedex
 * - SECCIÓN 0: Lógica de Modo Oscuro
 * - SECCIÓN 1: Contador regresivo (Presentación Manuel Lora)
 * - SECCIÓN 2: Animaciones de entrada (GSAP)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // --- SECCIÓN 0: LÓGICA DE MODO OSCURO ---
    // ------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Función para aplicar el tema (guarda en localStorage)
    const applyTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('lepokedex-theme', theme);
    };

    // Función para cambiar el tema
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    // Event listener para el botón
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Cargar tema guardado al inicio
    const savedTheme = localStorage.getItem('lepokedex-theme');

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light');
    }


    // ---------------------------------------------------------
    // --- SECCIÓN 1: CONTADOR PRESENTACIÓN MANUEL LORA ---
    // ---------------------------------------------------------
    
    // CONFIGURACIÓN DE FECHA: 15 de Junio de 2025, 9:00 AM
    const targetDate = new Date("June 15, 2025 09:00:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');
    
    // Mensaje final
    const finalMessage = "<h3 style='color: var(--success-color); font-size: 1.2rem;'>¡Hora de presentar! Suerte 🍀</h3>";

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (countdownEl) {
                countdownEl.innerHTML = finalMessage;
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const formatTime = (time) => (time < 10 ? `0${time}` : time);

        if (daysEl) daysEl.innerText = formatTime(days);
        if (hoursEl) hoursEl.innerText = formatTime(hours);
        if (minutesEl) minutesEl.innerText = formatTime(minutes);
        if (secondsEl) secondsEl.innerText = formatTime(seconds);

    }, 1000);

});


// ---------------------------------------------
// --- SECCIÓN 2: ANIMACIONES DE ENTRADA (GSAP) ---
// ---------------------------------------------

window.addEventListener('load', () => {
    
    // Elementos a animar
    gsap.set([
        '.logo', '.hero h2', '.hero .subtitle', 
        '#hero-actions', '.presentation-counter',
        '.features', '.phone-preview', 'footer', '.theme-toggle'
    ], { 
        opacity: 0, 
        y: 20 
    });
    
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

    tl.to(['.logo', '.theme-toggle'], { 
        duration: 0.8, 
        y: 0, 
        opacity: 1,
        stagger: 0.1
    })
    .to('.hero h2', { 
        duration: 0.8, 
        y: 0, 
        opacity: 1 
    }, '-=0.6')
    .to('.hero .subtitle', { 
        duration: 0.8, 
        y: 0, 
        opacity: 1 
    }, '-=0.6')
    .to('#hero-actions', { 
        duration: 0.8, 
        y: 0, 
        opacity: 1 
    }, '-=0.5')
    .to('.presentation-counter', {
        duration: 0.8,
        y: 0,
        opacity: 1
    }, '-=0.4')
    .to('.features', { 
        duration: 0.8, 
        y: 0, 
        opacity: 1 
    }, 'split') 
    .to('.phone-preview', { 
        duration: 0.8, 
        y: 0, 
        opacity: 1, 
        ease: 'circ.out' 
    }, 'split') 
    .to('footer', { 
        duration: 1.0, 
        y: 0, 
        opacity: 1 
    }, '-=0.5');

});