export function crearPerfil(nombre, email, edad) {
    return {
        nombreUsuario: nombre,
        emailUsuario: email,
        edadUsuario: edad
    };
};
export default function mostrarPerfil(usuario) {
    return `Nombre: [${usuario?.nombreUsuario}], Email: [${usuario?.emailUsuario}], Edad: [${usuario?.edadUsuario}].`
}
export function esMayorDeEdad(usuario) {
    return usuario.edadUsuario >= 18 ? true : false;
}
export function obtenerMayoresDeEdad(usuarios) {
    return usuarios.filter((usuario) => esMayorDeEdad(usuario));
}
export function calcularPromedioEdad(usuarios) {
    return usuarios.reduce((acumulador, usuario) => acumulador + usuario.edadUsuario, 0)/usuarios.length;
}