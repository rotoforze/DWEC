import {crearPerfil} from './gestorUsuarios.js';
import mostrarPerfil from './gestorUsuarios.js';
const usuarios = [
    crearPerfil(`Alex`, `alexbg87@educastur.es`, 22),
    crearPerfil(`Cova`, `cova@educastur.es`, 22)
]
for (const usuario of usuarios) {
    console.log(mostrarPerfil(usuario));
}