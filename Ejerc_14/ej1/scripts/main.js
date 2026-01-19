document.addEventListener('DOMContentLoaded', init);
let idIntervaloCarga;
let productos;
let categorias = new Set();

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
        document.querySelector('.app').hidden = false;
    }

    // parte del ej 14.1
    document.querySelector(`.temaClaro`).addEventListener('click', () => cambiarTema('claro'));
    document.querySelector(`.temaOscuro`).addEventListener('click', () => cambiarTema('oscuro'));
    cambiarTema()
}

// funcion del ej 4.1
function cambiarTema(temaRecibido) {
    console.log('cambiando tema... ', temaRecibido);
    let temaGuardado = sessionStorage.getItem('tema');

    if ((temaGuardado != null && temaGuardado != undefined) || (temaRecibido != undefined && temaRecibido.length > 0)) {
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
        </div>`;
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