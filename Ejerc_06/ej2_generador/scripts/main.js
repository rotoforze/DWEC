const campoNombre = document.querySelector('#nombre');
const campoApellidos = document.querySelector('#apellidos');
function aniadirDatos() {
    const nombre = campoNombre.value;
    const apellidos = campoApellidos.value;

    document.querySelector('tbody').appendChild(nuevoTr(nuevoTd(nombre), nuevoTd(apellidos)));
}
function nuevoTd(texto) {
    const td = document.createElement('td');
    td.textContent = texto;
    return td;
}
function nuevoTr(...tds) {
    const tr = document.createElement('tr');
    tds.forEach((td) => {
        tr.appendChild(td);
    });
    return tr;
}

document.querySelector('[value="Añadir"]').addEventListener('click', () => {
    aniadirDatos();
    campoNombre.value = '';
    campoApellidos.value = '';
})