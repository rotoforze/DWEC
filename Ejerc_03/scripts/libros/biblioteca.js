let libros = [
    { id: 0, titulo: 'Harry Potter', autor: 'JK Rowling', paginas: 640 },
    { id: 1, titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', paginas: 1178 },
    { id: 2, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', paginas: 417 },
    { id: 3, titulo: '1984', autor: 'George Orwell', paginas: 328 },
    { id: 4, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', paginas: 863 },
    { id: 5, titulo: 'Crónica de una Muerte Anunciada', autor: 'Gabriel García Márquez', paginas: 122 },
    { id: 6, titulo: 'Orgullo y Prejuicio', autor: 'Jane Austen', paginas: 432 },
    { id: 7, titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón', paginas: 565 },
    { id: 8, titulo: 'Los Juegos del Hambre', autor: 'Suzanne Collins', paginas: 374 },
    { id: 9, titulo: 'El Código Da Vinci', autor: 'Dan Brown', paginas: 489 }
];
export function nuevoLibro(id, titulo, autor, paginas) {
    return {id, titulo, autor, paginas};
};
export function agregarLibro(nuevoLibro) {
    libros.push(nuevoLibro);
};
export function obtenerLibros() {
    return libros;
};

// ejercicio 3.4
export function buscarLibro(id) {
    return libros.find(libro => libro.id === id);
}
function reordenarIDs() {
    libros.reduce((acumulador, libro) => libro.id = acumulador + 1, -1);
}
export function eliminarLibro(id) {
    libros.splice(libros.findIndex(libro => libro.id === id), 1);
    // reordeno los libros para evitar duplicados
    reordenarIDs();
}

// ejercicio 3.5
export function calcularTotalPaginas() {
    return libros.reduce((acumulador, libro) => acumulador + libro.paginas, 0);
};

// ejercicio 3.6
export function ordenarPorPaginas(){
    libros.sort((libro1, libro2) => libro1.paginas - libro2.paginas); // menor a mayor
}

// ejercicio 3.7
export function hayLibrosLargos(limitePaginas) {
    return libros.some(libro => libro.paginas > limitePaginas);  
}
export function todosSonLibrosCortos(limitePaginas) {
    return libros.every(libro => libro.paginas < limitePaginas);
}