import { actualizarPreciosProductos, filtrado, getMarca, getProductos, setProductos, simbolosDivisa } from "./productos.js";
import { iniciarSesion, cerrarSesion, getDivisaDelUsuario, setUserData, getUserData, guardarCarritoEnUsuario } from "./userManager.js";

/**
 * Recibe un Set con las marcas y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Array} setMarcas 
 */
export function addMarcas(setMarcas) {
    for (const marca of setMarcas) {
        if (marca) {
            document.querySelector("#marcaSelect").innerHTML += (`
                <option value="${marca}">${marca}</option>
                `);
        }
    }
}

/**
 * Recibe un Set con las Categorias y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Array} setCategorias 
 */
export function addCategorias(setCategorias) {
    for (const item of setCategorias) {
        if (item) {
            document.querySelector("#categoriaSelect").innerHTML += (`
                <option value="${item}">${item}</option>
                `);
        }
    }
}

/**
 * Recibe un Set con las Procedencias y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Array} setProcedencias 
 */
export function addProcedencias(setProcedencias) {
    for (const item of setProcedencias) {
        if (item) {
            document.querySelector("#procedenciaSelect").innerHTML += (`
                <option value="${item}">${item}</option>
                `);
        }
    }
}

/**
 * Recibe un Set con los tuestes y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Array} setTueste 
 */
export function addTueste(setTueste) {
    for (const item of setTueste) {
        if (item) {
            document.querySelector("#tuesteSelect").innerHTML += (`
                <option value="${item}">${item}</option>
                `);
        }
    }
}

/**
 * Recibe un Set con los aromas y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Array} setAromas 
 */
export function addAromas(setAromas) {
    for (const aroma of setAromas) {
        if (aroma) {

            document.querySelector(".aromas-list").innerHTML += (`
                <li class=" dropdown-item">
                <input type="checkbox" name="aroma" id="${aroma}" value="${aroma}">
                <label for="${aroma}">${aroma}</label>
                </li>
                `);
        }
    }

    document.querySelectorAll('[name="aroma"]').forEach((aroma) => {
        aroma.addEventListener('input', () => {
            cambiarListaProductos(filtrado());
        });
    })
}

/**
 * Actualiza el total del carrito, teniendo en cuenta la divisa.
 */
export function actualizarTotalCarrito() {
    const user = getUserData();
    const divisa = user.preferences.currency;
    const simbolo = simbolosDivisa[divisa];

    const tbody = document.querySelector(".cart-container tbody");
    const filas = tbody.querySelectorAll("tr");

    let total = 0;

    filas.forEach(tr => {
        const precioTexto = tr.children[2].textContent; // "12.50 €"
        const cantidad = parseInt(tr.querySelector(".cantidad-control span").textContent);

        // Extraer número del precio
        const precio = parseFloat(precioTexto.replace(/[^\d.,]/g, "").replace(",", "."));

        total += precio * cantidad;
    });

    // Actualizar el total en el DOM
    const totalElement = document.querySelector(".cart-container p strong").parentElement;
    totalElement.innerHTML = `<strong>Total:</strong> ${total.toFixed(2)} ${simbolo}`;
    guardarCarritoEnUsuario();
    comprobarCarritoVacio();
}

/**
 * Comprueba si el carrito está vacío, si lo está muestra un mensaje.
 */
export function comprobarCarritoVacio() {
    const tbody = document.querySelector(".cart-container tbody");
    const mensaje = document.getElementById("carrito-vacio");

    if (tbody.children.length != 0) {
        mensaje.style.display = "none";
    } else {
        mensaje.style.display = "block";
    }
}

/**
 * Agrega un producto al carrito.
 * 
 * @param {Object} producto 
 */
export function agregarProductoAlCarrito(producto) {
    const tbody = document.querySelector(".cart-container tbody");

    let fila = [...tbody.querySelectorAll("tr")]
        .find(tr => parseInt(tr.dataset.idProductid) === producto.id);

    if (fila) {
        // Si ya existe → incrementamos cantidad en 1
        const spanCantidad = fila.querySelector(".cantidad-control span");
        const cantidadActual = parseInt(spanCantidad.textContent);
        spanCantidad.textContent = cantidadActual + 1;
    } else {
        // Si no existe → creamos fila con cantidad 1
        const tr = document.createElement("tr");
        tr.dataset.idProductid = producto.id;

        tr.innerHTML = `
            <td><img src="${producto.imagen}" width="40" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio} ${producto.moneda}</td>
            <td>
                <div class="cantidad-control">
                    <button class="btn btn-sm btn-outline-secondary btn-restar">-</button>
                    <span>1</span>
                    <button class="btn btn-sm btn-outline-secondary btn-sumar">+</button>
                </div>
            </td>
            <td>
                <button class="btn btn-sm btn-danger btn-eliminar">✕</button>
            </td>
        `;

        tbody.appendChild(tr);
    }

    actualizarTotalCarrito();
}

/**
 * Recibe un array de productos y los muestra en la web
 * usando de mostrarProducto().
 * 
 * @param {Array} productos 
 */
export function cambiarListaProductos(productos) {
    const elementoProductos = document.querySelector("#productos");
    elementoProductos.innerHTML = "";
    if (productos.length == 0) {
        elementoProductos.innerHTML = "No hay productos para los filtros."
    }
    for (const producto of productos) {
        mostrarProducto(producto);
    }
}

/**
 * Recibe un objeto y lo muestra en la web.
 *
 * @param {Object} producto 
 */
function mostrarProducto(producto) {
    const user = getUserData();
    let divisa = "EUR";
    if (user) {
        divisa = user.preferences.currency;
    }

    const simbolos = {
        EUR: "€",
        USD: "$",
        JPY: "¥",
        MXN: "Mex$"
    };

    document.querySelector("#productos").innerHTML += (`
        <div class="card product-card" data-id-productId="${producto.id}">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">
                    Marca: ${getMarca(producto.marca)}<br>
                    Stock: ${producto.stock}<br>
                    <strong>${producto.precio} ${simbolos[divisa]}</strong>
                </p>
                <div>
                    <button class="btn btn-info me-2">Ver Características</button>
                    <button class="btn btn-success">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `);
}

/**
 * Carga los productos del carrito del usuario.
 * 
 * @returns {void}
 */
export async function cargarCarritoDesdeUsuario() {
    try {

        const user = getUserData();
        const inventory = user.inventory || [];
        const productos = getProductos();
        const tbody = document.querySelector(".cart-container tbody");

        // Vaciar carrito actual del DOM
        tbody.innerHTML = "";

        // Si no hay inventario, mostrar mensaje de carrito vacío
        if (inventory.length === 0) {
            actualizarTotalCarrito();
            comprobarCarritoVacio();
            return;
        }

        // Obtener divisa del usuario
        const divisa = user.preferences.currency;

        for (const item of inventory) {
            const producto = productos.find(p => p.id == item.id);
            if (!producto) continue;

            // Convertir precio según divisa del usuario
            let precioConvertido;
            if (divisa === "EUR") {
                precioConvertido = producto.precioEUR ?? producto.precio;
            } else {
                precioConvertido = await convert("EUR", divisa, producto.precioEUR ?? producto.precio);
            }

            // Crear fila del carrito
            const tr = document.createElement("tr");
            tr.dataset.idProductid = producto.id;

            tr.innerHTML = `
                <td><img src="${producto.imagen}" width="40"></td>
                <td>${producto.nombre}</td>
                <td>${precioConvertido} ${simbolosDivisa[divisa]}</td>
                <td>
                    <div class="cantidad-control">
                        <button class="btn btn-sm btn-outline-secondary btn-restar">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary btn-sumar">+</button>
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger btn-eliminar">✕</button>
                </td>
            `;

            tbody.appendChild(tr);

            // Ajustar stock global
            producto.stock -= item.quantity;
            if (producto.stock < 0) producto.stock = 0;
        }

        // Guardar productos con stock actualizado
        setProductos(productos);

        // Actualizar total y estado del carrito
        actualizarTotalCarrito();
        comprobarCarritoVacio();
    } catch (error) {
        errorCarrito();
    }
}

/**
 * Recibe un usuario como parámetro, muestra la información
 * menos sensible del usuario (mail, preferencias...).
 * 
 * @param {Object} usuario 
 */
export function mostrarInfoUsuario(usuario) {
    loginCorrecto();
    // como un usuario ha iniciado sesión
    document.querySelector(".must-be-logged").hidden = true;

    const contLogin = document.querySelector(".contenedor-login");
    // vaciamos el contenedor del login
    contLogin.innerHTML = "";

    // y metemos la info
    contLogin.innerHTML += (`
            <p><b>Correo</b>: <span>${usuario.mail}</span></p>
            <div id="user-preferences">
                <p><b>Divisa</b>             <select id="select-divisa" class="form-select form-select-sm w-50">
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="MXN">MXN (Mex$)</option>
            </select></p>
            </div>
            <button class="btn btn-warning cerrar-sesion">Cerrar sesión</button>
            `);


    const divisaActual = getDivisaDelUsuario(); // EUR, USD, JPY, MXN
    // Seleccionar la divisa del usuario
    document.getElementById("select-divisa").value = divisaActual;

    // Listener para cambio de divisa
    document.getElementById("select-divisa").addEventListener("change", async (e) => {
        const nuevaDivisa = e.target.value;
        const data = getUserData();
        data.preferences.currency = nuevaDivisa;
        setUserData(data);

        await actualizarPreciosProductos(nuevaDivisa);
    });

    document.querySelector('.cerrar-sesion').addEventListener('click', cerrarSesion);
    actualizarPreciosProductos(getDivisaDelUsuario());

}

/**
 * Muestra de nuevo el formulario de login.
 */
export function mostrarFormLogin() {
    const contLogin = document.querySelector(".contenedor-login");
    contLogin.innerHTML = (`
                        <h6 class="dropdown-header text-center">Iniciar Sesión</h6>
                        <form class="form-login">
                            <div class="mb-3">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="ana.garcia@example.com">
                            </div>
                            <div class="mb-3">
                                <label>Contraseña</label>
                                <input type="password" class="form-control">
                            </div>
                            <div class="mb-3 form-keep-logged">
                                <input type="checkbox" name="keep-logged" id="keep-logged">
                                <label for="keep-logged">Mantener sesión iniciada</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                        </form>
            `);
    eventoBotonLogin();
}

/**
 * Crea el evento para el boton en el login
 */
export function eventoBotonLogin() {
    document.querySelector(".form-login").addEventListener("submit", async (e) => {
        e.preventDefault();
        // si es valido... intenta iniciar sesión.
        if (validarInicio()) {
            await tryToLogIn();
        } else errorLogin();
    });
}

/**
 * Valida si los campos del formulario de inicio de sesión son válidos.
 * 
 * @returns {boolean}
 */
function validarInicio() {
    const mail = document.querySelector('[type="email"]').value;
    const password = document.querySelector('[type="password"]').value;

    if (!mail || !password) return false;
    return true;
}

/**
 * Intenta iniciar sesión, pone una rueda de carga y la quita si hay algún error.
 * Si no hay error, se carga los elementos y eneseña la información del user.
 * 
 * @returns {Promise}
 */
export async function tryToLogIn() {
    const btn = document.querySelector(".form-login button");
    btn.disabled = true;
    mostrarRuedaCargando(btn);

    try {
        const email = document.querySelector('[type="email"]').value;
        const password = document.querySelector('[type="password"]').value;

        return await iniciarSesion(email, password);

    } catch (error) {
        setTimeout(() => {
            btn.disabled = false;
            quitarRuedaCargado(btn);
            errorLogin();
        }, 1000);

        throw error; // rechaza correctamente
    }
}

/**
 * Muestra un modal de error en el login.
 */
function errorLogin() {
    const elemento = document.querySelector(".error-login");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}

/**
 * Muestra un modal de error en el carrito.
 */
function errorCarrito() {
    const elemento = document.querySelector(".error-carrito");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}

/**
 * Muestra un modal ok sobre el login.
 */
function loginCorrecto() {
    const elemento = document.querySelector(".ok-login");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}

/**
 * Muestra un modal ok sobre producto añadido.
 */
export function productoAdded() {
    const elemento = document.querySelector(".item-added");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}
/**
 * Muestra un modal ok sobre producto eliminado.
 */
export function productoRemoved() {
    const elemento = document.querySelector(".item-removed");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}
/**
 * Muestra un modal error sobre producto.
 */
export function productoError() {
    const elemento = document.querySelector(".item-error");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}
/**
 * Muestra un modal para informar que debe tener sesión iniciada.
 */
export function debeIniciarSesion() {
    const elemento = document.querySelector(".must-logged");
    elemento.hidden = false;
    elemento.classList.add("mostrar");

    // Cuando termine la animación, ocultar y resetear
    elemento.addEventListener("animationend", () => {
        elemento.hidden = true;
        elemento.classList.remove("mostrar");
    }, { once: true });

}

/**
 * Recibe un elemento como parámetro al que le añadirá una rueda de cargando.
 * 
 * @param {Node} elemento 
 */
export function mostrarRuedaCargando(elemento) {
    elemento.innerHTML += `<div id="loading-spinner"></div>`;
}

/**
 * Recibe un elemento como parámetro al que le quita la rueda de cargado.
 * 
 * @param {Node} elemento 
 */
export function quitarRuedaCargado(elemento) {
    elemento.querySelector('#loading-spinner')?.remove();
}