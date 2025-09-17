
function nuevoEstudiante(nombre, apellidos, calificacion, aprobado) {
    return {
        nombre: nombre,
        apellidos: apellidos,
        calificacion: calificacion,
        aprobado: aprobado
    };
}

let estudiantes = [
    nuevoEstudiante("Alex", "Bernardos", 3, true), 
    nuevoEstudiante("Covadonga", "Blanco", 5, false),
    nuevoEstudiante("Eneas", "De la Rosa", 8, true)
];
estudiantes.map((estudiante) => {
    if ((estudiante.calificacion < 5 && estudiante.aprobado) || (estudiante.calificacion >= 5 && !estudiante.aprobado)) {
        console.warn(`⚠️ Incoherencia en el registro de ${estudiante.nombre} ${estudiante.apellidos}: calificación = ${estudiante.calificacion}, aprobado = ${estudiante.aprobado}. Se ha corregido.`);
        return estudiante.aprobado = !estudiante.aprobado;
    }
    return;
});
console.table(estudiantes);

let estudiantesNumerados = estudiantes.map((estudiante) => {
    estudiante.id = estudiantes.indexOf(estudiante);
    return estudiante;
});
console.table(estudiantesNumerados);

let estudiantesAprobados = estudiantes.filter((estudiante) => {
    if (estudiante.calificacion >= 5) return estudiante;
    return;
});
console.table(estudiantesAprobados);
estudiantesAprobados.map((estudiante) => {
    console.log(`¡Felicidades ${estudiante.nombre} ${estudiante.apellidos}, has aprobado con ${estudiante.calificacion}!`);
});
