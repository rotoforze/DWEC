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

    const anterior = elementoAnterior.cloneNode(true);
    ambosEventosAlBotonHijo(anterior);
    const actual = boton.parentNode.cloneNode(true);
    ambosEventosAlBotonHijo(actual);

    const lista = boton.parentNode.parentNode;
    // remplazamos el anterior con este
    lista.replaceChild(actual, elementoAnterior);
    // // ahora al revés
    lista.replaceChild(anterior, boton.parentNode);
}
function eventoBajarEnBoton(boton) {
    const siguienteElemento = boton.parentNode.nextElementSibling;
    if (!siguienteElemento) {
        window.alert('No hay ningún elemento por debajo!');
        return;
    }

    const siguiente = siguienteElemento.cloneNode(true);
    ambosEventosAlBotonHijo(siguiente);
    const actual = boton.parentNode.cloneNode(true);
    ambosEventosAlBotonHijo(actual);

    const lista = boton.parentNode.parentNode;
    // remplazamos el anterior con este
    lista.replaceChild(actual, siguienteElemento);
    // // ahora al revés
    lista.replaceChild(siguiente, boton.parentNode);
}
function ambosEventosAlBotonHijo(boton) {
    boton.querySelector('.subir').addEventListener('click', () => eventoSubirEnBoton(boton.querySelector('.subir')));
    boton.querySelector('.bajar').addEventListener('click', () => eventoBajarEnBoton(boton.querySelector('.bajar')));
}