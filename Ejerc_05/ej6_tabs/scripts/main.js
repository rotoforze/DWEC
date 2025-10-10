function crearBotones() {
    const elementos = document.querySelectorAll('.seccion');
    elementos.forEach((elemento) => {
        document.querySelector('.botones').appendChild(crearBoton(elemento));
    });
}
function crearBoton(elemento) {
    const boton = document.createElement('input');
    boton.type = 'button';
    boton.value = `Mostrar sección ${elemento.textContent.split(" ")[0]}`;
    boton.addEventListener('click', () => {
        elemento.classList.toggle('oculto');
    });
    return boton;
}
crearBotones();