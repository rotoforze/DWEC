import { convert } from "./currency.js";
import { actualizarStockProducto, cargarDatos, eliminarProductoDelCarrito, filtrado, getAroma, getAromaId, getCategoria, getMarca, getProcedencia, getProducto, getTueste, modificarCantidad, vaciarCarrito } from "./productos.js";
import { actualizarTotalCarrito, agregarProductoAlCarrito, cambiarListaProductos, comprobarCarritoVacio, debeIniciarSesion, eventoBotonLogin, mostrarRuedaCargando, productoAdded, productoRemoved, quitarRuedaCargado, tryToLogIn } from "./renderer.js";
import { getDivisaDelUsuario, isUserLogged, tieneSesionGuardada } from "./userManager.js";
let productoActualID = null;
/**
 * Función que inicia la aplicación
 */
async function init() {
    console.log(localStorage)
    mostrarRuedaCargando(document.querySelector("body"));
    cargarDatos();
    eventoBotonLogin();
    quitarRuedaCargado(document.querySelector("body"));
    document.querySelector(".app").hidden = false;
    if (tieneSesionGuardada()) {
        await tryToLogIn();
    }

    document.querySelector('[type="search"]').addEventListener('input', () => {
        cambiarListaProductos(filtrado());
    })
    document.querySelector('#marcaSelect').addEventListener('input', () => {
        cambiarListaProductos(filtrado());
    });
    document.querySelector('#categoriaSelect').addEventListener('input', () => {
        cambiarListaProductos(filtrado());
    });
    document.querySelector('#procedenciaSelect').addEventListener('input', () => {
        cambiarListaProductos(filtrado());
    });
    document.querySelector('#tuesteSelect').addEventListener('input', () => {
        cambiarListaProductos(filtrado());
    });
    document.querySelector('#tipoSelect').addEventListener('input', () => {
        cambiarListaProductos(filtrado());
    });
    eventoMasInfo();
    añadirAlCarrito();
    botonesCarrito();
    comprobarCarritoVacio();

}

/**
 * Añade el evento para que al pulsar +info nos muestre la información del producto
 */
function eventoMasInfo() {
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-info")) {

            const card = e.target.closest(".product-card");
            const id = parseInt(card.dataset.idProductid);

            productoActualID = id;

            const producto = getProducto(id);
            if (!producto) return;

            // Rellenar modal
            document.getElementById("modalProductoTitulo").textContent = producto.nombre;
            document.getElementById("modalProductoImagen").src = producto.imagen;

            document.getElementById("modalProductoMarca").textContent = getMarca(producto.marca);
            document.getElementById("modalProductoCategoria").textContent = getCategoria(producto.categoria);
            document.getElementById("modalProductoProcedencia").textContent = getProcedencia(producto.informacion.procedencia);
            document.getElementById("modalProductoTueste").textContent = getTueste(producto.informacion.tueste);

            document.getElementById("modalProductoAromas").textContent =
                producto.informacion.aromas.map(a => getAroma(a)).join(", ");

            document.getElementById("modalProductoTipo").textContent = producto.informacion.tipo;
            document.getElementById("modalProductoDescripcion").textContent = producto.informacion.descripcion;

            document.getElementById("modalProductoPrecio").textContent =
                `${producto.precio} ${producto.moneda}`;

            document.getElementById("modalProductoStock").textContent = producto.stock;

            const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
            modal.show();
        }
    });
}
/**
 * Añade los eventos para los botones de la tarjeta y del modal de añadir al carrito
 */
function añadirAlCarrito() {
    // añadir al carrito desde la tarjeta
    document.addEventListener("click", function (e) {

        // Botón "Agregar al Carrito"
        if (e.target.matches(".btn-success")) {

            if (!isUserLogged()){
                debeIniciarSesion();
                return;
            } 

            const card = e.target.closest(".product-card");
            const id = parseInt(card.dataset.idProductid);

            const producto = getProducto(id);
            if (!producto) return;

            // Si no hay stock, no añadimos
            if (producto.stock <= 0) return;

            // Añadir 1 unidad al carrito
            agregarProductoAlCarrito(producto);

            // Restar 1 al stock global
            actualizarStockProducto(id, -1);
            productoAdded();
        }
    });
    // añadir al carrito desde el modal
    document.getElementById("modal-add-cart").addEventListener("click", function () {

        if (!isUserLogged()) return;

        if (!productoActualID) return;

        const producto = getProducto(productoActualID);
        if (!producto) return;

        if (producto.stock <= 0) return;

        // Añadir al carrito
        agregarProductoAlCarrito(producto);

        // Actualizar stock
        actualizarStockProducto(productoActualID, -1);

        // Actualizar total
        actualizarTotalCarrito();

        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalProducto"));
        modal.hide();
    });
}

/**
 * Añade los eventos a todos los botones del carrito
 */
function botonesCarrito() {
    document.addEventListener("click", function (e) {

        // SUMAR
        if (e.target.matches(".btn-sumar")) {
            const tr = e.target.closest("tr");
            const id = parseInt(tr.dataset.idProductid);

            const producto = getProducto(id);
            if (!producto || producto.stock <= 0) return; // no hay stock para sumar

            const spanCantidad = tr.querySelector(".cantidad-control span");
            const cantidad = parseInt(spanCantidad.textContent);

            spanCantidad.textContent = cantidad + 1;
            actualizarStockProducto(id, -1);
            actualizarTotalCarrito();
            productoAdded();
        }

        // RESTAR
        if (e.target.matches(".btn-restar")) {
            const tr = e.target.closest("tr");
            const id = parseInt(tr.dataset.idProductid);

            const spanCantidad = tr.querySelector(".cantidad-control span");
            const cantidad = parseInt(spanCantidad.textContent);

            if (cantidad <= 1) return; // no bajamos de 1

            spanCantidad.textContent = cantidad - 1;
            actualizarStockProducto(id, +1);
            actualizarTotalCarrito();
            productoRemoved();
        }

        // ELIMINAR FILA
        if (e.target.matches(".btn-eliminar")) {
            const tr = e.target.closest("tr");
            const id = parseInt(tr.dataset.idProductid);
            const spanCantidad = tr.querySelector(".cantidad-control span");
            const cantidad = parseInt(spanCantidad.textContent);

            actualizarStockProducto(id, +cantidad);
            tr.remove();
            actualizarTotalCarrito();
            productoRemoved();
        }

        // VACIAR CARRITO
        if (e.target.matches(".cart-container .btn-warning")) { // el botón "Vaciar Carrito"
            vaciarCarrito();
            productoRemoved();
        }
    });
}
document.addEventListener('DOMContentLoaded', init);