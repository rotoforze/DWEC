function nuevaTarea(texto) {
    if (texto) {
        const elem = document.createElement('li');
        elem.textContent = texto;
        elem.appendChild(crearBotonEliminar());
        document.querySelector('ul').appendChild(elem);
    }else {
        window.alert("Debes escribir algo!");
    }
}
function crearBotonEliminar() {
    const boton = document.createElement("input");
    boton.type = 'button';
    boton.value = 'Eliminar';
    boton.addEventListener('click', () => {
        boton.parentNode.remove();
    });
    return boton;
}
document.querySelector('[type="button"]').addEventListener('click', () => {
    nuevaTarea(document.querySelector('[type="text"]').value);
});