const estudiantes = [
    {
        nombre: 'Alex',
        apellidos: 'Bernardos',
        correo: 'alex@clases.edu'
    },
    {
        nombre: 'Eneas',
        apellidos: 'de la rosa',
        correo: 'eneas@clases.edu'
    },
    {
        nombre: 'Covadonga',
        apellidos: 'Blanco',
        correo: 'covadonga@clases.edu'
    },
    {
        nombre: 'Gonzalo',
        apellidos: 'Alconero',
        correo: 'gonazalo@clases.edu'
    },
    {
        nombre: 'Adrian',
        apellidos: 'Naves',
        correo: 'adrian@clases.edu'
    }
];

estudiantes.forEach((estudiante) => {
    document.querySelector('table').appendChild(nuevaFila(estudiante));
});
function nuevaFila(estudiante) {
    const fila = document.createElement('tr');
    for (const valor in estudiante) {
        fila.appendChild(nuevaCelda(estudiante[valor]))
    }
    return fila;
}
function nuevaCelda(texto) {
    const td = document.createElement('td');
    td.textContent = texto;
    return td;
}
document.querySelectorAll('td').forEach((celda) => {
    celda.addEventListener('dblclick', () => {
        const nuevoInput = document.createElement('input');
        nuevoInput.type = 'text';
        nuevoInput.value = celda.textContent;
        nuevoInput.addEventListener('blur', () => {
            celda.textContent = nuevoInput.value;
            nuevoInput.parentElement.replaceChild(celda, nuevoInput)
        })
        celda.parentNode.replaceChild(nuevoInput, celda)
        console.log('hola')
    });
});