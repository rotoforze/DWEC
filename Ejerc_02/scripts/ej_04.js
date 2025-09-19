const usuario = {
    nombre: `Alex`,
    email: `alexbg87@educastur.es`
};
const perfil = {
    puesto: `Desarrollador`,
    empresa: `EDP`
};
const empleado = {
    ...usuario,
    ...perfil
};

// console.log(empleado.perfil?.direccion?.ciudad);
console.log(empleado.perfil?.direccion?.ciudad ?? `Ciudad no especificada`);