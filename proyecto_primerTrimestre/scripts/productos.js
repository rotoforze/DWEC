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
export function cargarDatos() {
    fetch("data/productos.json")
        .then((response) => {
            return response.json();
        })
        .then((datos) => {
            productos = datos;

            // recogemos todos los datos como las categorias etc.
            catchEveryData();
            // renderizamos los datos
            addMarcas(marcas);
            addCategorias(categorias);
            addProcedencias(procedencias);
            addTueste(tipoTueste)
            addAromas(tipoAromas);
            cambiarListaProductos(productos);


            // fin del método
            return true;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
}

/**
 * Guarda los datos de los productos en diferentes sets
 * para tenerlos ya guardados y más accesibles.
 */
function catchEveryData() {
    for (const producto of productos) {
        // marca
        if (!marcas.has(producto.marca)) marcas.add(producto.marca);
        // categoria
        if (!categorias.has(producto.categoria)) categorias.add(producto.categoria);
        // procendencia
        if (!procedencias.has(producto.informacion.procedencia)) procedencias.add(producto.informacion.procedencia);
        // tueste
        if (!tipoTueste.has(producto.informacion.tueste)) tipoTueste.add(producto.informacion.tueste);
        // aromas
        for (const aroma of producto.informacion.aromas) {
            if (!tipoAromas.has(aroma)) tipoAromas.add(aroma);
        }
    }
}