import { agregarLibro, nuevoLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos } from "./biblioteca.js";

console.table(obtenerLibros());

agregarLibro(nuevoLibro(obtenerLibros().length, 'Así es la puta vida', 'Jordi Wild', 480));

console.table(obtenerLibros());

// ejercicio 3.4
console.log(buscarLibro(5));
eliminarLibro(5);
console.table(obtenerLibros());

// ejercicio 3.5
console.log(calcularTotalPaginas());

// ejercicio 3.6
ordenarPorPaginas();
console.table(obtenerLibros());

// ejercicio 3.7
console.log(hayLibrosLargos(1200)); // false, el libro con más pagínas tiene 1178
console.log(hayLibrosLargos(1100)); // true

console.log(todosSonLibrosCortos(1200)); // true, porque todos los libros tienen menos de 1200 páginas
console.log(todosSonLibrosCortos(200)); // false, porque no todos tienen menos de 200