import { agregarLibro, nuevoLibro, obtenerLibros } from "./biblioteca.js";

console.table(obtenerLibros());

agregarLibro(nuevoLibro(obtenerLibros().length, 'Así es la puta vida', 'Jordi Wild', 480));

console.table(obtenerLibros());