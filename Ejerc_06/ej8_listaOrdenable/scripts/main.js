document.querySelectorAll('.subir').forEach((boton) => {
    boton.addEventListener('click', () => {
        eventoSubirEnBoton(boton);
    });
});
document.querySelectorAll('.bajar').forEach((boton) => {
    boton.addEventListener('click', () => {
        eventoBajarEnBoton(boton);
    });
});
function eventoSubirEnBoton(boton) {
    const elementoAnterior = boton.parentNode.previousElementSibling;
    if (!elementoAnterior) {
        window.alert('No hay ningún elemento por encima!');
        return;
    }

    boton.parentNode.parentNode.insertBefore(boton.parentNode, elementoAnterior);
}
function eventoBajarEnBoton(boton) {
    const siguienteElemento = boton.parentNode.nextElementSibling;
    if (!siguienteElemento) {
        window.alert('No hay ningún elemento por debajo!');
        return;
    }

    boton.parentNode.parentNode.insertBefore(siguienteElemento, boton.parentNode);
}