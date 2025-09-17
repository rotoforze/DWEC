function nuevoEstudiante(nombre, calificacion) {
    return {
        nombre: nombre,
        calificacion: calificacion
    };
};
function nuevoCurso(nombre, profesor, estudiantes) {
    return {
        nombreCurso: nombre,
        profesor: profesor,
        listaEstudiantes: estudiantes
    };
};
function getListaEstudiantes(cantidad) {
    const nombres = ["Alex", "Covadonga", "Eneas", "José Miguel", "Esteban", "Gonzalo"];
    let lista = [];
    for (let i = 0; i<=cantidad; i++) {
        lista.push(nuevoEstudiante(nombres[Math.floor(Math.random()*nombres.length)], Math.floor((Math.random()*10+1))));
    }
    return lista;
}
let cursos = [
    nuevoCurso("DWEC", "Pablo", getListaEstudiantes(3)),
    nuevoCurso("DIW", "Daniel", getListaEstudiantes(3)),
    nuevoCurso("DAW", "Marco", getListaEstudiantes(3))
];
console.table(cursos);