import { borrarAlumno, getAlumnoPorID } from "./gestionAlumnos.js";

/*
* Recibe un array de alumnos y visualiza su contenido en la tabla
*/
export function actualizarTabla(arrayAlumnos) {
    console.log(`%c actualizando tabla...`, 'color:#cccc22');

    document.querySelector('tbody').innerHTML = '';
    // si la longitud del array es 0, muestra un mensaje
    if (arrayAlumnos.length == 0) {
        document.querySelector('tbody').innerHTML = 'No hay alumnos.';
        return;
    }
    // añade cada alumno
    arrayAlumnos.forEach((contenido) => {
        // añadimos al tbody la fila
        document.querySelector('tbody').innerHTML += `
            <tr data-id="${contenido.id}">
                <td>${contenido.nombre}</td>
                <td>${contenido.apellidos}</td>
                <td>${contenido.email}</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            </tr>
            `;
        document.querySelector(`[data-id="${contenido.id}"]`).addEventListener('click', (e) => {
            document.querySelector('.selected')?.classList.remove('selected');
            document.querySelector(`[data-id="${contenido.id}"]`).classList.add('selected');
            mostrarDetalles(document.querySelector(`[data-id="${contenido.id}"]`).getAttribute('data-id'));
        })
    })
    // cogemos en la fila con id clave los botones btn-edit y btn-delete
    document.querySelectorAll(`.btn-edit`).forEach((boton) => {
        boton.addEventListener('click', () => {
            alternarEditando(true, boton.parentElement.parentElement.getAttribute('data-id'));
        });
    })
    document.querySelectorAll(`.btn-delete`).forEach((boton) => {
        boton.addEventListener('click', () => {
            actualizarTabla(borrarAlumno(boton.parentElement.parentElement.getAttribute('data-id')));
            alternarEditando(false);
        });
    })
}

/*
*   Recibe un parametro true si se va a editar un alumno o false 
*   para volver a ponerse en modo añadir
*/
let seEstaEditando = false;
export function alternarEditando(editando = seEstaEditando, idAlumno) {
    const tituloFrom = document.querySelector('#panel-gestion-titulo');
    if (editando) {
        let alumno = getAlumnoPorID(idAlumno);
        // ponemos en true para saber que se estaEditando
        seEstaEditando = true;
        // cambiamos el texto del from
        tituloFrom.textContent = 'Editando alumno';
        // metemos los datos del alumno
        document.querySelector('#id').value = alumno.id;
        document.querySelector('#nombre').value = alumno.nombre;
        document.querySelector('#apellidos').value = alumno.apellidos;
        document.querySelector('#email').value = alumno.email;
        document.querySelector('#edad').value = alumno.edad;
        document.querySelector('#direccion').value = alumno.direccion;
        document.querySelector('#localidad').value = alumno.localidad;
        document.querySelector('#btn-cancelar').classList.remove('hidden');
    } else {
        seEstaEditando = false;
        tituloFrom.textContent = 'Añadir Nuevo Alumno';
        document.querySelector('#id').value = "";
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellidos').value = "";
        document.querySelector('#email').value = "";
        document.querySelector('#edad').value = "";
        document.querySelector('#direccion').value = "";
        document.querySelector('#localidad').value = "";
        document.querySelector('#btn-cancelar').classList.add('hidden');
    }
}

/**
 * Recibe un ID, lo busca y muetra sus detalles
*/
export function mostrarDetalles(id) {
    if (!id) return;
    let alumno = getAlumnoPorID(id);

    // muestro los datos del alumno
    document.querySelector('#detalles-content').innerHTML = `
        <p><b>Nombre</b>: ${alumno.nombre}</p>
        <p><b>Apellidos</b>: ${alumno.apellidos}</p>
        <p><b>Email</b>: ${alumno.email}</p>
        <p><b>Edad</b>: ${alumno.edad}</p>
        <p><b>Direccion</b>: ${alumno.direccion}</p>
        <p><b>Localidad</b>: ${alumno.localidad}</p>
        <p><b>Calificaciones</b>:</p>
    `;

    // si no hay calificones, muestro un mensaje
    if (alumno.calificaciones.lenght != 0) {
        for (const calificacion in alumno.calificaciones) {
            document.querySelector('#detalles-content').innerHTML += `
                <p><i>${alumno.calificaciones[calificacion].asignatura}</i>: ${alumno.calificaciones[calificacion].nota}</p>`;
        }
    } else {
        document.querySelector('#detalles-content').innerHTML += `
                <p>Éste alumno no tiene calificaciones</p>`;
    }

    document.querySelector('#detalles-content').innerHTML += `
        <p><b>Nota media</b></p>
        <p>${alumno.notaMedia}</p>`;


    // muestro el apartado de nueva calificacion
    document.querySelector('#gestion-calificaciones').classList.remove('hidden')
}