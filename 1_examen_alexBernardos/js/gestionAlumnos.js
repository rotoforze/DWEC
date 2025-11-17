// cargar y parsear los datos de data/alumnos.xml y data/calificaciones.xml

// guardamos los alumnos
let alumnos = [];
const asignaturas = [];

/*
* Esta función se encarga de pedir los datos a un documento XML
* y returnea la response del documento.
*/
async function cargarDatosDesdeXML(documento) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.onload = () => {
            if (peticion.status == 200) {
                console.log(`%c Datos recibidos en ${documento}`, 'color: #87e833ff');
                resolve(peticion.response);
            } else if (peticion.status == 404) {
                console.log(`%c El archivo ${documento} no se ha encontrado.`, 'color: #ff3434ff');
                window.alert(`No se ha encontrado el archivo ${documento}`);
                reject;
            } else {
                console.log(`%c Error en la petición.`, 'color: #ff3434ff');
                reject;
            }
        };
        peticion.onerror = reject;
        peticion.open('GET', `./data/${documento}`);
        peticion.responseType = 'document';
        peticion.setRequestHeader('Accept', 'text/html');
        peticion.send();
    });
}

/*
* Recoge todos los datos de cada alumno y los mete en un array
* un objeto con los datos de cada alumno. 
*/
export async function cargarAlumnos() {
    // hacemos la petición para quedarnos con la estrucutra XML
    const datosAlumnos = await cargarDatosDesdeXML('alumnos.xml');

    // guardo en el map de alumnos cada alumno cuya 
    // clave es su id y valor un objeto con sus datos
    for (const alumno of datosAlumnos.querySelectorAll('alumno')) {
        const calificaciones = await getNotasAlumnoDesdeXML(alumno.getAttribute('id'))
        alumnos.push({
            id: alumno.getAttribute('id'),
            nombre: alumno.querySelector('nombre').textContent,
            apellidos: alumno.querySelector('apellidos').textContent,
            email: alumno.querySelector('email').textContent,
            edad: alumno.querySelector('edad').textContent,
            direccion: alumno.querySelector('direccion').textContent,
            localidad: alumno.querySelector('localidad').textContent,
            calificaciones: calificaciones,
            notaMedia: getNotaMedia(calificaciones)
        })
    }
}

async function getNotasAlumnoDesdeXML(id) {
    const datosNotas = await cargarDatosDesdeXML('calificaciones.xml');
    let arrayADevolver = [];
    for (const notas of datosNotas.querySelectorAll(`calificacion[alumno_id="${id}"]`)) {
        asignaturas.push(notas.querySelector('asignatura').textContent)
        arrayADevolver.push({
            asignatura: notas.querySelector('asignatura').textContent,
            nota: notas.querySelector('nota').textContent
        });
    }

    return arrayADevolver;
}

function getNotaMedia(arrayCalificaciones) {
    if (arrayCalificaciones.length == 0) return 0;
    let total = 0;
    let suma = 0;
    for (const calificacion in arrayCalificaciones) {
        total++;
        suma += Number.parseFloat(arrayCalificaciones[calificacion].nota);
    }
    return Number.parseFloat(suma / total, 2);
}

export function addNota(idAlumno, asignaturaAAsignar, nuevaNota) {
    console.log(idAlumno)
    for (const alumno of alumnos) {
        if (alumno.id == idAlumno) {
            alumno.calificaciones.push({
                asignatura: asignaturaAAsignar,
                nota: nuevaNota
            });
            alumno.notaMedia = getNotaMedia(alumno.calificaciones);
        }
    }
    console.log(alumnos)
}

/*
* Recibe un tipo de orden y filtra según el recibido.
*/
export function getArrayAlumnosFiltrado() {
    const filtro = document.querySelector('#ordenar-por').value;
    let arrayADevolver = alumnos;
    switch (filtro) {
        case 'nombre-asc':
            arrayADevolver = alumnos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre-desc':
            arrayADevolver = alumnos.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'apellidos-asc':
            arrayADevolver = alumnos.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
            break;
        case 'apellidos-desc':
            arrayADevolver = alumnos.sort((a, b) => b.apellidos.localeCompare(a.apellidos));
            break;
    }

    // Tras filtrar según orden, filtramos por búsqueda.
    const busqueda = document.querySelector('#filtro-nombre').value;
    if (busqueda) {
        arrayADevolver = arrayADevolver.filter((alumno) => {
            if (alumno.nombre.toLowerCase().includes(busqueda.toLowerCase())) {
                return alumno;
            }
        })
    }

    return arrayADevolver;
}

/*
* Recibe un id de alumno, lo busca y lo borra, devuelve el array
*/
export function borrarAlumno(id) {
    console.log(`%c borrando usuario ${id}...`, 'color:#ff2222');
    alumnos = alumnos.filter((alumno) => {
        // si el alumno tiene un id diferente, lo devuelve
        if (alumno.id != id) {
            return alumno;
        }
    });
    return alumnos;
}

/*
* Recibe un id de un alumno y modifica los campos
* del formulario alumno con sus datos para poder modificarlo
*/
export function editarAlumno(id) {
    console.log(`%c Editando/agregando usuario ${id}...`, 'color:#222ccc');
    if (id) {
        // se edita
        for (const alumno of alumnos) {
            if (alumno.id == id) {
                alumno.id = alumno.id;
                alumno.nombre = document.querySelector('#nombre').value;
                alumno.apellidos = document.querySelector('#apellidos').value;
                alumno.email = document.querySelector('#email').value;
                alumno.edad = document.querySelector('#edad').value;
                alumno.direccion = document.querySelector('#direccion').value;
                alumno.localidad = document.querySelector('#localidad').value;
            }
        }
    } else {
        // lo añadimos
        alumnos.push({
            id: alumnos.length + 1,
            nombre: document.querySelector('#nombre').value,
            apellidos: document.querySelector('#apellidos').value,
            email: document.querySelector('#email').value,
            edad: document.querySelector('#edad').value,
            direccion: document.querySelector('#direccion').value,
            localidad: document.querySelector('#localidad').value,
            calificaciones: [],
            notaMedia: 0
        })
    }
    return alumnos;
}

/*
*   Devuelve el alumno según el id
*/
export function getAlumnoPorID(id) {
    for (const alumno of alumnos) {
        if (alumno.id == id) return alumno;
    }
}

// devuelve el array de alumnos
export function getArrayAlumnos() {
    return alumnos;
}

// cambia el array de alumnos por uno nuevo
export function setArrayAlumnos(nuevosAlumnos) {
    alumnos = nuevosAlumnos;
}