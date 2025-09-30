import { agregarLibro, nuevoLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas } from "./biblioteca.js";

console.table(obtenerLibros());

agregarLibro(nuevoLibro(obtenerLibros().length, 'Así es la puta vida', 'Jordi Wild', 480));

console.table(obtenerLibros());

// ejercicio 3.4
console.log(buscarLibro(5));
eliminarLibro(5);
console.table(obtenerLibros());

// ejercicio 3.5
console.log(calcularTotalPaginas());
