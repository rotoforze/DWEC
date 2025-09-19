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
    const NOMBRES = ["Alex", "Covadonga", "Eneas", "José Miguel", "Esteban", "Gonzalo"];
    let lista = [];
    for (let i = 0; i<cantidad; i++) {
        lista.push(nuevoEstudiante(NOMBRES[Math.floor(Math.random()*NOMBRES.length)], Math.floor((Math.random()*10+1))));
    }
    return lista;
}
let cursos = [
    nuevoCurso("DWEC", "Pablo", getListaEstudiantes(3)),
    nuevoCurso("DIW", "Daniel", getListaEstudiantes(3)),
    nuevoCurso("DAW", "Marco", getListaEstudiantes(3)),
    nuevoCurso("DWES", "SinProfesor", getListaEstudiantes(3))
];
console.table(cursos);
let resumenCursos = cursos.map((curso) => {
    let notas = 0; // si no lo inicializo como un número al hacer la op. += me dara NaN
    curso.listaEstudiantes.map((alumno) => {
        notas += Number.parseInt(alumno.calificacion);       
    });
    return {
        nombreCurso: curso.nombreCurso, 
        calificacionPromedio: Math.floor(notas/curso.listaEstudiantes.length)
    };
});
let cursosDestacados = resumenCursos.filter((curso) => {
    if (curso.calificacionPromedio >= 7) return curso;
    return;
});
cursosDestacados.map((curso) => {
    console.info(`📘 El curso ${curso.nombreCurso} tiene un promedio de ${curso.calificacionPromedio} y es considerado destacado.`);
});
cursos.map((curso) => {
    if (curso.listaEstudiantes.map((alumno) => {
        return alumno.calificacion < 4 ? true : false;
    }).includes(true)) {
        console.warn(`⚠️ Atención: En el curso ${curso.nombreCurso} hay estudiantes con calificaciones muy bajas.`);
    }
});