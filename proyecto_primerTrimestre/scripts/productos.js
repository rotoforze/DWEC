import { convert } from "./currency.js";
import { addAromas, addMarcas, addCategorias, addProcedencias, addTueste, cambiarListaProductos, actualizarTotalCarrito } from "./renderer.js";

let productos;
let productosFiltrados;
let marcas = [undefined];
let categorias = [undefined];
let procedencias = [undefined];
let tipoTueste = [undefined];
let tipoAromas = [undefined];
/**
 * para saber los iconos de los símbolos
 */
export const simbolosDivisa = {
    EUR: "€",
    USD: "$",
    JPY: "¥",
    MXN: "Mex$"
};


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
        addMarcas(marcas);
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
        for (const data of temporalData) {
            if (!variable.includes(data.valor)) variable.push(data.valor);
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

/**
 * Recibe el id de una marca y devuelve el String correspondiente al nombre
 * @param {int} id 
 * @returns {String}
 */
export function getMarca(id) {
    return marcas[id];
}

/**
 * Recibe el id de una categoria y devuelve el String correspondiente al nombre
 * @param {int} id 
 * @returns {String}
 */
export function getCategoria(id) {
    return categorias[id];
}

/**
 * Recibe el id de una procedencia y devuelve el String correspondiente al nombre
 * @param {int} id 
 * @returns {String}
 */
export function getProcedencia(id) {
    return procedencias[id];
}

/**
 * Recibe el id de un tueste y devuelve el String correspondiente al nombre
 * @param {int} id 
 * @returns {String}
 */
export function getTueste(id) {
    return tipoTueste[id];
}

/**
 * Recibe el String de un aroma y devuelve el id correspondiente al String
 * @param {String} aroma 
 * @returns {int}
 */
export function getAromaId(aroma) {
    return tipoAromas.findIndex((i) => i == aroma);
}

/**
 * Recibe el id de un aroma y devuelve el String correspondiente al nombre
 * @param {int} id 
 * @returns {String}
 */
export function getAroma(id) {
    return tipoAromas[id];
}

/**
 * Recibe el id de un producto y devuelve el producto correspondiente
 * @param {int} id 
 * @returns {Object}
 */
export function getProducto(id) {
    for (const prod of productos) {
        if (prod.id == id) return prod;
    }
}
/**
 * Devuelve los productos.
 * @returns {Object}
 */
export function getProductos() {
    return productos;
}
/**
 * Recibe unos productos y los almacena
 * @param {Object} nuevosProductos 
 */
export function setProductos(nuevosProductos) {
    productos = nuevosProductos;
}

/**
 * Recibe un id y una cantidad a sumar (o restar...)
 * Actualiza el stock de los productos y los guarda con su nuevo stock
 * 
 * @param {int} idProducto 
 * @param {int} cantidad 
 * @returns {void}
 */
export function actualizarStockProducto(idProducto, cantidad) {
    const productos = getProductos(); // array completo

    const index = productos.findIndex(p => p.id === idProducto);
    if (index === -1) return;

    productos[index].stock += cantidad;

    if (productos[index].stock < 0) {
        productos[index].stock = 0;
    }

    setProductos(productos);
}

/**
 * Recibe un id y un cambio (1 o -1).
 * Si recibe -1 y el stock es 1, esta función no hace nada (no se podrá añadir al carrito).
 * Si aún hay stock suficiente, actualiza el stock, la cantidad en el carrito y el total del carrito.
 * 
 * @param {int} idProducto 
 * @param {int} cambio 
 * @returns {void}
 */
export function modificarCantidad(idProducto, cambio) {
    const tbody = document.querySelector(".cart-container tbody");
    const tr = [...tbody.querySelectorAll("tr")]
        .find(row => parseInt(row.dataset.idProductid) === idProducto);

    if (!tr) return;

    const spanCantidad = tr.querySelector(".cantidad-control span");
    let cantidad = parseInt(spanCantidad.textContent);

    // Si se resta y queda en 1, no bajar más
    if (cambio === -1 && cantidad === 1) return;

    // Actualizar cantidad
    spanCantidad.textContent = cantidad + cambio;

    // Actualizar stock
    actualizarStockProducto(idProducto, -cambio);

    actualizarTotalCarrito();
}

/**
 * Recibe un id de un producto, lo borra del carrito (toda la cantidad), actualiza el stock y el total del carrito.
 * 
 * @param {int} idProducto 
 * @returns {void}
 */
export function eliminarProductoDelCarrito(idProducto) {
    const tbody = document.querySelector(".cart-container tbody");
    const tr = [...tbody.querySelectorAll("tr")]
        .find(row => parseInt(row.dataset.idProductid) === idProducto);

    if (!tr) return;

    // Recuperar cuántas unidades tenía
    const cantidad = parseInt(tr.querySelector(".cantidad-control span").textContent);

    // Devolver stock
    actualizarStockProducto(idProducto, cantidad);

    // Eliminar fila
    tr.remove();

    actualizarTotalCarrito();
}

/**
 * Recibe la divisa del usuario y parsea el precio de los productos a la divisa del usuario.
 * Actualiza la UI con la nueva moneda.
 * 
 * @param {String} divisaUsuario 
 */
export async function actualizarPreciosProductos(divisaUsuario) {
    const productos = getProductos();

    for (const producto of productos) {

        if (!producto.precioEUR) {
            producto.precioEUR = producto.precio;
        }

        if (divisaUsuario === "EUR") {
            producto.precio = producto.precioEUR;
            continue;
        }

        producto.precio = await convert("EUR", divisaUsuario, producto.precioEUR);
    }

    setProductos(productos);
    cambiarListaProductos(productos);
    await actualizarCarritoConDivisa(divisaUsuario);
}

/**
 * Actualiza los precios del carrito con la divisa recibida.
 * 
 * @param {String} divisaUsuario 
 */
export async function actualizarCarritoConDivisa(divisaUsuario) {
    const filas = document.querySelectorAll(".cart-container tbody tr");
    const productos = getProductos();
    const simbolo = simbolosDivisa[divisaUsuario];

    for (const tr of filas) {
        const id = parseInt(tr.dataset.idProductid);
        const producto = productos.find(p => p.id === id);

        if (!producto) continue;

        let precioConvertido;

        if (divisaUsuario === "EUR") {
            precioConvertido = producto.precioEUR;
        } else {
            precioConvertido = await convert("EUR", divisaUsuario, producto.precioEUR);
        }

        tr.children[2].textContent = `${precioConvertido} ${simbolo}`;
    }

    actualizarTotalCarrito();
}

/**
 * Vacia el carrito al completo, devolviendo el stock.
 * Actualiza la UI.
 */
export function vaciarCarrito() {
    const tbody = document.querySelector(".cart-container tbody");
    const filas = [...tbody.querySelectorAll("tr")];

    filas.forEach(tr => {
        const id = parseInt(tr.dataset.idProductid);
        const cantidad = parseInt(tr.querySelector(".cantidad-control span").textContent);

        actualizarStockProducto(id, +cantidad);
        tr.remove();
    });

    actualizarTotalCarrito();
}

/**
 * Según los filtros de la UI, devuelve los productos filtrados.
 * 
 * @returns {Object}
 */
export function filtrado() {
    productosFiltrados = productos;

    const busqueda = document.querySelector('[type="search"]').value;
    productosFiltrados = productosFiltrados.filter((prod) => {
        if (prod.nombre.toLowerCase().includes(busqueda.toLowerCase())) return prod;
    })

    const marcaSeleccionada = document.querySelector('#marcaSelect').value;
    if (marcaSeleccionada != "Marca") {
        productosFiltrados = productosFiltrados.filter((prod) => {
            if (getMarca(prod.marca) == marcaSeleccionada) return prod;
        });
    }

    const categoriaSeleccionada = document.querySelector('#categoriaSelect').value;
    if (categoriaSeleccionada != "Categoría") {
        productosFiltrados = productosFiltrados.filter((prod) => {
            if (getCategoria(prod.categoria) == categoriaSeleccionada) return prod;
        });
    }

    const procedenciaSeleccionada = document.querySelector('#procedenciaSelect').value
    if (procedenciaSeleccionada != "Procedencia") {
        productosFiltrados = productosFiltrados.filter((prod) => {
            if (getProcedencia(prod.informacion.procedencia) == procedenciaSeleccionada) return prod;
        });
    }

    const teusteSeleccionado = document.querySelector('#tuesteSelect').value;
    if (teusteSeleccionado != "Tueste") {
        productosFiltrados = productosFiltrados.filter((prod) => {
            if (getTueste(prod.informacion.tueste) == teusteSeleccionado) return prod;
        });
    }

    const tipoSeleccionado = document.querySelector('#tipoSelect').value;
    if (tipoSeleccionado != "Tipo") {
        productosFiltrados = productosFiltrados.filter((prod) => {
            if (prod.informacion.tipo == tipoSeleccionado) return prod;
        });
    }

    let aromasMarcados = [];
    document.querySelectorAll('[name="aroma"]').forEach((aroma) => {
        if (aroma.checked) aromasMarcados.push(aroma.value);
    })
    if (aromasMarcados.length > 0) {
        productosFiltrados = productosFiltrados.filter((prod) => {
            for (const aroma of aromasMarcados) {
                if (prod.informacion.aromas.includes(getAromaId(aroma))) {
                    return prod;
                }
            }
        })
    }

    return productosFiltrados;
}