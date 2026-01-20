document.addEventListener('DOMContentLoaded', init);
let idIntervaloCarga;
let productos;
let categorias = new Set();
let carrito = [];

async function init() {
    animacionCarga()

    productos = await cargarProductos()
    if (!productos) {
        window.alert('fallo pidiendo los datos.')
        return;
    }

    mostrarProductos();

    for (const producto of productos) {
        if (!categorias.has(producto.categoria)) {
            categorias.add(producto.categoria);
            document.querySelector('#categories').innerHTML += `
                <option value="${producto.categoria}">${producto.categoria}</option>`;
        }
    }

    document.querySelector('#order').addEventListener('change', mostrarProductos);
    document.querySelector('#categories').addEventListener('change', mostrarProductos);

    if (productos) {
        clearInterval(idIntervaloCarga);
        document.querySelector('.pantallaCarga').style.display = 'none';
        document.querySelector('.app').style.display = 'flex';
    }

    // parte del ej 14.1
    document.querySelector(`.temaClaro`).addEventListener('click', () => cambiarTema('claro'));
    document.querySelector(`.temaOscuro`).addEventListener('click', () => cambiarTema('oscuro'));
    cambiarTema()
}

// funcion del ej 14.1
function cambiarTema(temaRecibido) {
    let temaGuardado = sessionStorage.getItem('tema');

    if ((temaGuardado == null || temaGuardado == undefined) || (temaRecibido != undefined && temaRecibido.length > 0)) {
        sessionStorage.setItem('tema', temaRecibido);
        temaGuardado = sessionStorage.getItem('tema');
    }
    document.querySelector('body').className = temaGuardado;
}

async function cargarProductos() {
    return new Promise((resolve, reject) => {
        fetch('./data/productos.json')
            .then(res => res)
            .then(data => resolve(data.json()))
            .catch(error => reject(error))
    })
}

function mostrarProductos() {
    const contenedor = document.querySelector('.products');
    contenedor.innerHTML = '';

    let productosFiltrados = structuredClone(productos);

    const order = document.querySelector('#order').value;

    if (order == 'minor') {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (order == 'mayor') {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    } else if (order != 'all') console.error('orden inválido');

    const categories = document.querySelector('#categories').value;

    if (categories != 'all') {
        productosFiltrados = productosFiltrados.filter((producto) => {
            if (producto.categoria == categories) return producto;
        })
    }

    for (const producto of productosFiltrados) {
        contenedor.innerHTML += `<div class="product">
            <h3>${producto.nombre}</h3>
            <p>Precio: <b>${producto.precio}</b> €</p>
            <p>x<b>${producto.stock}</b></p>
            <p class="categoria">${producto.categoria}</p>
            <button class='addToCart' data-id='${producto.id}'>Añadir al carrito</button>
        </div>`;
    }

    // cargar los eventos para cada boton, coje el id del atributo data-id
    // y lo añade a div.carrito
    document.querySelectorAll('.addToCart').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log(carrito)
            addOneProduct(e.target.getAttribute('data-id'));
            syncLocalStorage();
            syncCartUI();
        })
    })

    // lo añade al localstorage
    if (localStorage.getItem('cart') != undefined || localStorage.getItem('cart') != null) {
        carrito = JSON.parse(localStorage.getItem('cart'));
    }
    syncCartUI();
}
// si no existe, devuelve false, si existe devuelve true, además lo inizializa a 1 o suma 1 si existes
function addOneProduct(id) {
    for (const productoEnCarrito of carrito) {
        if (productoEnCarrito.productId == id) {
            // add 1
            productoEnCarrito.quantity++;
            return true;
        }
    }
    // no devolvió true
    carrito = [
        ...carrito,
        {
            "productId": id,
            "quantity": 1
        }
    ];
    return false;
}

function syncLocalStorage() {
    // comprueba el localstorage, si hay contenido, lo saca y lo muestra, si no,
    // lo inicializa a []
    if (localStorage.getItem('cart') != undefined || localStorage.getItem('cart') != null) {
        if (localStorage.getItem('cart') != JSON.stringify(carrito)) {
            localStorage.setItem('cart', JSON.stringify(carrito));
        }
    } else {
        localStorage.setItem('cart', JSON.stringify(carrito));
    }
}

function syncCartUI() {
    let carritoHTML = document.querySelector('.carrito');
    carritoHTML.innerHTML = '';
    if (carrito) {
        let productosEnElCarrito = ``;
        for (const productoEnCarrito of carrito) {
            productosEnElCarrito += `
                <li>${getNombreProducto(productoEnCarrito.productId)} - x${productoEnCarrito.quantity}</li>
            `;
        }
        carritoHTML.innerHTML += `
            <ul>${productosEnElCarrito}</ul>
        `;
        
    } else carrito.innerHTML = 'no hay productos en el carrito';
}

function getNombreProducto(id) {
    for (const producto of productos) {
        if (producto.id == id) return producto.nombre;
    }
}

function animacionCarga() {
    const textoCarga = document.querySelector('.puntosCarga');
    idIntervaloCarga = setInterval(() => {
        if (textoCarga.innerHTML.length < 3) {
            textoCarga.innerHTML += '.';
        } else {
            textoCarga.innerHTML = '';
        }
    }, 300)
}