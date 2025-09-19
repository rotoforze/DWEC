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