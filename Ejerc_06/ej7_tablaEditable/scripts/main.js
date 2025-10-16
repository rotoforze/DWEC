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
// todo esto mete los valores del array en la tabla
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

// ahora por cada td en el documento vamos a ir comprobando si hacen doble click encima.
// Al hacerlo, debemos reemplazar el elemento td por un input de tipo texto
// cone el valor del td, y que al perder el foco, vuelva a ser un td con el nuevo valor
document.querySelectorAll('td').forEach((celda) => {
    celda.addEventListener('dblclick', () => {
        // creamos el elemento input, y le damos el valor de la celda
        const nuevoInput = document.createElement('input');
        nuevoInput.type = 'text';
        nuevoInput.value = celda.textContent;
        // cuando pierda el foco lo volvemos a reemplazar
        nuevoInput.addEventListener('blur', () => {
            celda.textContent = nuevoInput.value;
            // reemplazamos
            nuevoInput.parentElement.replaceChild(celda, nuevoInput);
        })
        // reemplazamos la celda con el nuevo input
        celda.parentNode.replaceChild(nuevoInput, celda);
    });
});