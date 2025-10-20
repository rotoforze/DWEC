document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
    document.querySelector('#outer-box').addEventListener('click', (Event) => {
        //Event.stopPropagation();
        console.log(Event.target.id, Event.currentTarget.id);
        Event.target.style.backgroundColor = 'coral';
    });

    // --- Solución Ejercicio 2 ---
    document.querySelector('#test-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.alert('Navegación prevenida');
    });

    // --- Solución Ejercicio 3 ---
    window.onscroll = (() => {
        const botonVolverArriba = document.querySelector('#back-to-top');
        const scrollActual = Math.floor(window.scrollY);
        if (scrollActual >= 250) {
            botonVolverArriba.classList.remove('hidden');
        } else if (scrollActual < 250) {
            botonVolverArriba.classList.add('hidden');
        }
    });
    document.querySelector('#back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    })

    // --- Solución Ejercicio 5 ---
    
    document.querySelector('#notification-btn').addEventListener('click', () => {
        const notification = new CustomEvent("notification", {
            detail: {
                mensaje: "test",
                fecha: new Date()
            }
        });
        document.body.dispatchEvent(notification);
    });
    document.body.addEventListener("notification", (e) => {
        const p = document.createElement('p');
        p.textContent = `Mensaje: ${e.detail.mensaje} @ Fecha: ${e.detail.fecha}`;
        document.querySelector('#notification-area').appendChild(p);
    });
});
