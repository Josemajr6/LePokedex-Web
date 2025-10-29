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

