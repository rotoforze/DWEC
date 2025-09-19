import {crearPerfil as crear, esMayorDeEdad, obtenerMayoresDeEdad, calcularPromedioEdad} from './gestorUsuarios.js';
import mostrarPerfil from './gestorUsuarios.js';
const usuarios = [
    crear(`Alex`, `alexbg87@educastur.es`, 22),
    crear(`Cova`, `cova@educastur.es`, 21),
    crear(`Eneas`, `eneas@educastur.es`, 19),
    crear(`Miguel`, `Miguel@educastur.es`, 17),
    crear(`Gonzalo`, `Gonzalo@educastur.es`, 14)
]

let usuariosMayoresDeEdad = obtenerMayoresDeEdad(usuarios);
console.log(`Usuarios mayores de edad:`);
usuariosMayoresDeEdad.map((usuario)=> console.log(mostrarPerfil(usuario)));

console.log(`La edad promedio de los usuarios es: [${calcularPromedioEdad(usuarios)}].`);