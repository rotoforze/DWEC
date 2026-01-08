import { addFecha, renderTarjetas } from "./renderer.js";

let horarios;
let artistas;
let escenarios;
let generos = [];
let fechas = [];


export async function cargarDatos() {

    console.log('%c Cargando datos de horarios.json, artistas.json, escenarios.json.', 'color:blue;');
    // guardo los horarios
    horarios = await fetchRute("./data/horarios.json");
    // guardo los artistas
    artistas = await fetchRute("./data/artistas.json");
    // guardo los escenarios
    escenarios = await fetchRute("./data/escenarios.json");
    console.log('%c Datos de horarios.json, artistas.json, escenarios.json, cargados correctamente.', 'color:blue;');

    sacarGeneros();
    ponerGenerosEnSelect();
    ponerFechas();
    renderTarjetas(horarios);
}

/**
 * Saca los generos de los artistas y los mete en un array
 * no admite duplicados
 */
function sacarGeneros() {
    for (const artista of artistas) {
        if (!generos.includes(artista.genero)) {
            generos.push(artista.genero);
        }
    }
}

/**
 * Pone los generos en el select.
 */
function ponerGenerosEnSelect() {
    const listaGeneros = document.querySelector('#filter-genre');
    generos.map((genero, clave) => {
        listaGeneros.innerHTML += (`
            <option value="${clave}">${genero}</option>
            `);
    })
}
/**
 * Separa las fechas únicas y llama a addFecha para meter las fechas en el DOM
 * Después se encarga de poner los eventos.
 */
function ponerFechas() {
    for (const horario of horarios) {
        if (!fechas.includes(horario.dia)) {
            fechas.push(horario.dia);
        }
    }
    for (const fecha of fechas) {
        addFecha(fecha);
    }

    document.querySelectorAll('[name="day"]').forEach((radioBtn) => {
        radioBtn.addEventListener("click", filtrar)
    })
}

/**
 * Recibe un id de un artista y devuelve el objeto correspondiente
 * 
 * @param {String} id 
 * @returns {object}
 */
export function getArtista(id) {
    for (const artista of artistas) {
        if (artista.id == id) {
            return artista;
        }
    }
}

/**
 * Recibe un id de un escenario y devuelve el objeto correspondiente
 * 
 * @param {String} id 
 * @returns {object}
 */
export function getEscenario(id) {
    for (const escenario of escenarios) {
        if (escenario.id == id) {
            return escenario;
        }
    }
}

/**
 * Recibe una ruta, usando una promesa, hace un fetch y devuelve su resultado.
 * 
 * @param {File} rute 
 */
async function fetchRute(rute) {
    return new Promise((resolve, reject) =>
        fetch(rute)
            .then(resp => resp.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error)));
}