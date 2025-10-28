export function creadorTarjetas(id, nombre, destino, precio,
    duracionHoras, tipo, imagen) {
    // creamos cada parte de la tarjeta
    const contenedor = document.createElement('div');
    contenedor.id = id;
    contenedor.classList.add('card', 'p-3', 'm-3', 'shadow', 'text-center', 'align-items-center');
    contenedor.style.width = '18rem';
    contenedor.appendChild(getElementoNombre(nombre));
    contenedor.appendChild(getElementoDestino(destino));
    contenedor.appendChild(getElementoPrecio(precio));
    contenedor.appendChild(getElementoDuracionHoras(duracionHoras));
    contenedor.appendChild(getElementoTipo(tipo));
    contenedor.appendChild(getElementoImg(imagen));
    return contenedor;
}

function getElementoNombre(nombre) {
    const elemento = document.createElement('h5');
    elemento.textContent = nombre;
    elemento.classList.add('card-title', 'text-primary', 'fw-bold', 'mt-2');
    return elemento;
}

function getElementoDestino(destino) {
    const elemento = document.createElement('h6');
    elemento.textContent = destino;
    elemento.classList.add('card-subtitle', 'text-muted', 'mb-2');
    return elemento;
}

function getElementoPrecio(precio) {
    const elemento = document.createElement('p');
    elemento.textContent = `Precio de la actividad: ${precio}`;
    elemento.classList.add('card-text', 'text-success', 'fw-semibold');
    return elemento;
}

function getElementoDuracionHoras(duracionHoras) {
    const elemento = document.createElement('p');
    elemento.textContent = `Duración de la actividad: ${duracionHoras} horas`;
    elemento.classList.add('card-text', 'text-secondary');
    return elemento;
}

function getElementoTipo(tipo) {
    const elemento = document.createElement('p');
    elemento.textContent = `Tipo de actividad: ${tipo}`;
    elemento.classList.add('badge', 'bg-info', 'text-dark', 'mb-2');
    return elemento;
}

function getElementoImg(imagen) {
    const elemento = document.createElement('img');
    elemento.setAttribute('height', 200);
    elemento.setAttribute('width', 200);
    elemento.setAttribute('src', imagen);
    elemento.classList.add('card-img-top', 'rounded', 'mb-3', 'shadow-sm');
    return elemento;
}
