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

    console.log(productos);

    mostrarProductos();


    if (productos) {
        clearInterval(idIntervaloCarga);
        document.querySelector('.pantallaCarga').style.display = 'none';
        document.querySelector('.app').hidden = false;
    }

    for (const producto of productos) {
        if (!categorias.has(producto.categoria)) {
            categorias.add(producto.categoria);
        }
        // meter en el select de categories
        // document.querySelector
    }

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

    document.querySelector('#order');


    for (const producto of productos) {
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