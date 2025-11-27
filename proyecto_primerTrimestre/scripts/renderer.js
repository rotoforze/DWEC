import { iniciarSesion, cerrarSesion } from "./userManager.js";

/**
 * Recibe un Set con las marcas y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Set} setMarcas 
 */
export function addMarcas(setMarcas) {
    for (const marca of setMarcas) {
        document.querySelector("#marcaSelect").innerHTML += (`
            <option value="${marca}">${marca}</option>
            `);
    }
}

/**
 * Recibe un Set con las Categorias y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Set} setCategorias 
 */
export function addCategorias(setCategorias) {
    for (const item of setCategorias) {
        document.querySelector("#categoriaSelect").innerHTML += (`
            <option value="${item}">${item}</option>
            `);
    }
}

/**
 * Recibe un Set con las Procedencias y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Set} setProcedencias 
 */
export function addProcedencias(setProcedencias) {
    for (const item of setProcedencias) {
        document.querySelector("#procedenciaSelect").innerHTML += (`
            <option value="${item}">${item}</option>
            `);
    }
}

/**
 * Recibe un Set con los tuestes y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Set} setTueste 
 */
export function addTueste(setTueste) {
    for (const item of setTueste) {
        document.querySelector("#tuesteSelect").innerHTML += (`
            <option value="${item}">${item}</option>
            `);
    }
}

/**
 * Recibe un Set con los aromas y las añade al correspondiente espacio
 * de la web.
 * 
 * @param {Set} setAromas 
 */
export function addAromas(setAromas) {
    document.querySelector(".aromas-list").innerHTML = "";
    for (const aroma of setAromas) {
        document.querySelector(".aromas-list").innerHTML += (`
            <div class="checkbox-item">
                <input type="checkbox" class="btn-check" name="aroma" id="${aroma}">
                <label class="btn btn-outline-secondary" for="${aroma}">${aroma}</label>
            </div>
            `);
    }
}

/**
 * Recibe un array de productos y los muestra en la web
 * usando de mostrarProducto().
 * 
 * @param {Array} productos 
 */
export function cambiarListaProductos(productos) {
    document.querySelector("#productos").innerHTML = "";
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
    document.querySelector("#productos").innerHTML += (`
            <div class="card product-card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Marca: ${producto.marca}<br>Stock: ${producto.stock}<br><strong>${producto.precio}<span id="divisa">€</span></strong></p>
                    <div>
                        <button class="btn btn-info me-2">Ver Características</button>
                        <button class="btn btn-success">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `);
}

/**
 * Recibe un usuario como parámetro, muestra la información
 * menos sensible del usuario (mail, preferencias...).
 * 
 * @param {Object} usuario 
 */
export function mostrarInfoUsuario(usuario) {
    const contLogin = document.querySelector(".contenedor-login");
    contLogin.innerHTML = "";

    contLogin.innerHTML += (`
            <p><b>Correo</b>: <span>${usuario.mail}</span></p>
            <div id="user-preferences">
                <p><b>Divisa</b> <span class="divisa">${usuario.preferences.currency}</p>
            </div>
            <button class="btn btn-warning cerrar-sesion">Cerrar sesión</button>
            `);
    document.querySelector('.cerrar-sesion').addEventListener('click', cerrarSesion);
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
                            <div class="mb-3">
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
        document.querySelector(".form-login button").disabled = true;
        // si el inicio es correcto...
        await iniciarSesion(
            document.querySelector('[type="email"]').value,
            document.querySelector('[type="password"]').value).catch(error => {
                setTimeout(() => {
                    document.querySelector(".form-login button").disabled = false;
                    quitarRuedaCargado(document.querySelector(".form-login button"));
                    errorLogin();
                }, 1000)
            });
    });
}

function errorLogin(){
    const elemento = document.querySelector(".error-login");
    elemento.hidden = false;
    elemento.classList.add("mostrar");
    setTimeout(() => {
        elemento.classList.remove("mostrar");
        elemento.classList.add("desvanecer");
        setTimeout(() => {
            elemento.hidden = true;
            elemento.classList.remove("desvanecer");
        }, 1000)
    }, 3000)
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
    elemento.querySelector('#loading-spinner').remove();
}