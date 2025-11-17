import { addNota, cargarAlumnos, editarAlumno, getArrayAlumnos, getArrayAlumnosFiltrado } from "./gestionAlumnos.js";
import { actualizarTabla, alternarEditando, mostrarDetalles } from "./ui.js";


async function init() {
    // cargamos los alumnos en el archivo gestionAlumnos
    await cargarAlumnos();
    // actualizamos la tabla
    actualizarTabla(getArrayAlumnos());
    // ponemos el evento change a ordenar por para que cuando se cambie
    // actualize la tabla con la lista filtrada
    document.querySelector('#ordenar-por').addEventListener('change', () => {
        actualizarTabla(getArrayAlumnosFiltrado());
    });
    document.querySelector('#filtro-nombre').addEventListener('input', () => {
        actualizarTabla(getArrayAlumnosFiltrado());
    });
    document.querySelector('#btn-cancelar').addEventListener('click', () => {
        alternarEditando(false);
    });
    document.querySelector('#btn-guardar').addEventListener('click', (event) => {
        event.preventDefault();
        // si valida el form, modificamos o añadimos al alumno
        if (validarForm()) {
            if (document.querySelector('#id').value) {
                actualizarTabla(editarAlumno(document.querySelector('#id').value));
            } else {
                actualizarTabla(editarAlumno());
            }
        }
    });
    document.querySelectorAll('tr').forEach((fila) => {
        fila.addEventListener('click', (e) => {
            document.querySelector('.selected')?.classList.remove('selected');
            fila.classList.add('selected');
            mostrarDetalles(fila.getAttribute('data-id'));
        })
    })
    document.querySelector('#form-nueva-calificacion button').addEventListener('click', (e) => {
        e.preventDefault();
        if (document.querySelector('#asignatura').value && document.querySelector('#nota').value > 0 && document.querySelector('#nota').value <= 10) {
            addNota(document.querySelector('.selected').getAttribute('data-id'), document.querySelector('#asignatura').value, document.querySelector('#nota').value );
            mostrarDetalles(document.querySelector('.selected').getAttribute('data-id'));
            document.querySelector('#asignatura').value = '';
            document.querySelector('#nota').value = '';
        }
    })
}

function validarForm() {
    let valida = true;
    document.querySelectorAll('#form-gestion-alumno .form-group').forEach((grupo) => {
        if (!grupo.querySelector('input').value) {
            valida = false;
            grupo.querySelector('.error-message').textContent = grupo.querySelector('input').validationMessage;
        } else {
            // si el tipo es un correo y además no valida, soltamos error, si no, vaciamos el span de error
            if (grupo.querySelector('input').type == "email" && !grupo.querySelector('input').validity.valid) {
                valida = false;
                grupo.querySelector('.error-message').textContent = "Correo inválido";
            } else grupo.querySelector('.error-message').textContent = "";
        }
    })
    return valida;
}


window.addEventListener('DOMContentLoaded', init);