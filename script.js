/**
 * Script para el contador regresivo y el formulario de "Notify Me"
 */

// ------------------------------------
// --- SECCIÓN 1: CONTADOR REGRESIVO ---
// ------------------------------------

// --- CONFIGURACIÓN ---
// El usuario ha indicado que la fecha objetivo es el 16 de Noviembre.
// El contador mostrará el tiempo restante hasta esa fecha.
const targetDate = new Date("Nov 16, 2025 00:00:00").getTime();
// -------------------

// Selecciona los elementos del DOM del contador
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownEl = document.getElementById('countdown');

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        countdownEl.innerHTML = "<h3 style='color: var(--success-color)'>¡Ya está disponible!</h3>";
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


// ----------------------------------------------------
// --- SECCIÓN 2: FORMULARIO "AVÍSAME" (Envío real) ---
// ----------------------------------------------------

const notifyForm = document.getElementById('notify-form');
const formMessage = document.getElementById('form-message');
const submitButton = notifyForm.querySelector('.cta-button');

notifyForm.addEventListener('submit', async (e) => {
    // 1. Previene que el formulario se envíe de la forma tradicional
    e.preventDefault(); 
    
    // 2. Deshabilita el formulario para evitar envíos múltiples
    submitButton.disabled = true;
    submitButton.innerText = 'Enviando...';

    // 3. Prepara los datos para enviar
    const formData = new FormData(notifyForm);
    const action = notifyForm.action;
    
    try {
        // 4. Envía los datos a Formspree (o cualquier endpoint)
        const response = await fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // 5. Comprueba si el envío fue exitoso
        if (response.ok) {
            // 6. Muestra el mensaje de éxito
            formMessage.innerText = '¡Gracias! Te hemos añadido a la lista.';
            formMessage.style.color = 'var(--success-color)';
            
            // 7. Oculta el formulario y resetea
            notifyForm.style.display = 'none';
            document.getElementById('newsletter-form').querySelector('p').style.display = 'none';
            formMessage.style.fontSize = '1.2rem';
            notifyForm.reset();
        } else {
            // 8. Muestra un error si algo falló
            throw new Error('Error al enviar el formulario.');
        }
    } catch (error) {
        // 9. Maneja errores de red o del servidor
        console.error(error);
        formMessage.innerText = 'Hubo un error. Inténtalo de nuevo.';
        formMessage.style.color = 'red';
        submitButton.disabled = false;
        submitButton.innerText = 'Avísame';
    }
});


// ---------------------------------------------
// --- SECCIÓN 3: ANIMACIONES DE ENTRADA (GSAP) ---
// ---------------------------------------------

// Espera a que todo el contenido (incluyendo GSAP) esté cargado
window.addEventListener('load', () => {
    
    // 1. Oculta todo al inicio para evitar "flashes"
    gsap.set(['.hero h2', '.hero .subtitle', '#countdown .time-block', '#newsletter-form', '.features', '.phone-preview'], { opacity: 0 });
    gsap.set('.logo', { opacity: 0, y: -30 });
    
    // 2. Crea una línea de tiempo (timeline) para secuenciar las animaciones
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.logo', { 
        duration: 1, 
        y: 0, 
        opacity: 1 
    })
    .to('.hero h2', { 
        duration: 1, 
        y: 0, 
        opacity: 1 
    }, '-=0.8') // Se solapa 0.8s con la anterior
    .to('.hero .subtitle', { 
        duration: 1, 
        y: 0, 
        opacity: 1 
    }, '-=0.8')
    .fromTo('#countdown .time-block', { // Animación "pop-in"
        scale: 0.5,
        opacity: 0
    }, {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        stagger: 0.1, // Anima uno después del otro
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .to('#newsletter-form', { 
        duration: 1, 
        y: 0, 
        opacity: 1 
    }, '-=0.5')
    .to('.features', { 
        duration: 1, 
        x: 0, 
        opacity: 1 
    }, 'split') // Crea una etiqueta "split"
    .to('.phone-preview', { 
        duration: 1, 
        x: 0, 
        opacity: 1 
    }, 'split'); // Se anima al mismo tiempo que "features"

});