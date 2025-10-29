import { recalcular, validar } from "./main.js";

export function addNuevaActividad(nombre, precio, duracionHoras) {
    let fila = document.createElement('tr');
    fila.setAttribute('horas', duracionHoras);
    fila.appendChild(crearClumnaNombre(nombre));
    fila.appendChild(crearClumnaPrecio(precio));
    fila.appendChild(crearColumnaBoton());
    return fila;
}
function crearClumnaNombre(nombre) {
    const contenedor = document.createElement('td');
    const p = document.createElement('p');
    p.textContent = nombre;
    contenedor.appendChild(p);
    return contenedor;
}
function crearClumnaPrecio(precio) {
    const contenedor = document.createElement('td');
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('precio-actividad-itinerario');
    span.textContent = precio;
    p.appendChild(span);
    p.innerHTML += `€`;
    contenedor.appendChild(p);
    return contenedor;
}
function crearColumnaBoton() {
    const contenedor = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = 'X';
    contenedor.appendChild(boton);
    boton.addEventListener('click', () => {
        contenedor.parentElement.remove();
        recalcular();
        validar();
    })
    return contenedor;
}