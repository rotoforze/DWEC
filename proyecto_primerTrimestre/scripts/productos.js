import { addAromas, addMarcas, addCategorias, addProcedencias, addTueste, cambiarListaProductos } from "./renderer.js";

let productos;
let marcas = new Set();
let categorias = new Set();
let procedencias = new Set();
let tipoTueste = new Set();
let tipoAromas = new Set();

/**
 * Carga los datos del documento 'productos.json',
 * 
 * Además, almacena en una variable la información
 * de los productos. 
 * 
 * Guarda en objetos Set las categorías, marcas,
 * procedencias, tueste y aromas.
 * 
 * Devuelve true si se ha cargado con éxito.
 * Devuelve false si ha ocurrido algún error.
 */
export async function cargarDatos() {
    try {
        productos = await fetchJSON("data/productos.json");

        // recogemos todos los datos como las categorias etc.
        await catchEveryData();

        // renderizamos los datos
        addMarcas(categorias);
        addCategorias(categorias);
        addProcedencias(procedencias);
        addTueste(tipoTueste)
        addAromas(tipoAromas);
        cambiarListaProductos(productos);


        // fin del método
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Guarda los datos de los productos en diferentes sets
 * para tenerlos ya guardados y más accesibles.
 */
async function catchEveryData() {
    await fetchYGuardado("data/marcas.json", marcas);
    await fetchYGuardado("data/categorias.json", categorias);
    await fetchYGuardado("data/procedencias.json", procedencias);
    await fetchYGuardado("data/tuestes.json", tipoTueste);
    await fetchYGuardado("data/aromas.json", tipoAromas);
}

/**
 * Hace una petición mediante fetchJSON a ruta y guarda los datos
 * en el Set recibido.
 * 
 * @usage fetchJSON
 * @param {File} ruta 
 * @param {Set} variable
 */
async function fetchYGuardado(ruta, variable) {
    try {
        // let temporalData = await fetchJSON("data/categorias.json");
        
        let temporalData = await fetchJSON(ruta);
        for (const categoria of temporalData) {
            if (!variable.has(categoria.valor)) variable.add(categoria.valor);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Recibe un archivo para hacerle un fetch,
 * devuelve su contenido.
 * 
 * @param {File} ruta 
 */
async function fetchJSON(ruta) {
    return new Promise(
        function (resolve, reject) {
            fetch(ruta)
                .then((response) => {
                    // lo devuelvo
                    return resolve(response.json());
                })
                .catch((error) => {
                    console.error(error);
                    return reject(false);
                });
        }
    );
}