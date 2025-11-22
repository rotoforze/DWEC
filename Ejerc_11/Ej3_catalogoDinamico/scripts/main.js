let datos;
let marcas = [];
let categorias = [];

function init() {
    getData();

    document.querySelector("#filtro-categoria").addEventListener('input', ordenarYRepintarProductos);
    document.querySelector("#filtro-marca").addEventListener('input', ordenarYRepintarProductos);
    document.querySelector("#filtro-precio").addEventListener('input', ordenarYRepintarProductos);
}

async function getData() {
    await fetch('./data/products.json')
        .then((response) => {
            return response.json();
        })
        .then((resultado) => {
            datos = resultado;
            parseDatos();
        })
        .catch((error) => {
            console.error(error);
        });
}

function ordenarYRepintarProductos() {
    let datosOrdenados = datos;
    // primero ordenamos por el valor en el select de categoria
    const categoriaSeleccionada = document.querySelector("#filtro-categoria").value;

    // si no es por defecto
    if (categoriaSeleccionada != "default") {
        // si la categoria está en el array de categorías
        if (categorias.includes(categoriaSeleccionada)) {
            // miramos producto por producto si su categoría coincide
            // sobreescribiendo los datos
            datosOrdenados = datosOrdenados.filter((producto) => {
                if (producto.category == categoriaSeleccionada) {
                    return producto;
                };
            });
        }
    }
    // segundo ordenamos por el valor en el select de marca
    const marcaSeleccionada = document.querySelector("#filtro-marca").value;
    // si no es por defecto
    if (marcaSeleccionada != "default") {
        // si la categoria está en el array de categorías
        if (marcas.includes(marcaSeleccionada)) {
            // miramos producto por producto si su categoría coincide
            // sobreescribiendo los datos
            datosOrdenados = datosOrdenados.filter((producto) => {
                if (producto.brand == marcaSeleccionada) {
                    return producto;
                };
            });
        }
    }

    // tercero ordenamos por el select del orden de precio
    const precioSeleccionado = document.querySelector("#filtro-precio").value;
    // sobreescribo los datos con el nuevo orden
    if (precioSeleccionado == "asc") {
        datosOrdenados = Array.from(datosOrdenados).sort((a, b) => {
            return a.price - b.price;
        });
    }else if (precioSeleccionado == "desc") {
        datosOrdenados = Array.from(datosOrdenados).sort((a, b) => {
            return b.price - a.price;
        });
    }

    // vacio la lista y pinto
    document.querySelector("#product-list").innerHTML = "";
    for (const producto of datosOrdenados) {
        pintarProducto(producto);
    }

    // si no hay nada en la lista, ponemos un mensaje informativo.
    if (document.querySelector("#product-list").innerHTML == "") document.querySelector("#product-list").innerHTML = "No hay productos para los filtros seleccionados";
}

function parseDatos() {
    // segmentamos las marcas y categorias, además
    // pintamos el producto
    for (const dato of datos) {
        if (!marcas.includes(dato.brand)) marcas.push(dato.brand);
        if (!categorias.includes(dato.category)) categorias.push(dato.category);
    }

    ordenarYRepintarProductos();

    cargarMarcas();
    cargarCategorias();
}

function pintarProducto(producto) {
    document.querySelector("#product-list").innerHTML += (`
            <div id="item" data-id="${producto.id}">
                <h2>${producto.name}</h2>
                <p>${producto.description}</p>
                <p>Precio: ${producto.price}</p>
                <p>Categoría: ${producto.category}</p>
                <p>Marca: ${producto.brand}</p>
                <p>Valoraciones: ${producto.rating}</p>
                <p>STOCK: ${producto.stock}</p>
                <img src="${producto.imageURL}" alt="imagen de ${producto.name}"/>
            </div>
        `);
}

function cargarMarcas() {
    for (const marca of marcas) {
        document.querySelector('#filtro-marca').innerHTML += (`
                <option value="${marca}">${marca}</option>
            `);
    }
}

function cargarCategorias() {
    for (const categoria of categorias) {
        document.querySelector('#filtro-categoria').innerHTML += (`
                <option value="${categoria}">${categoria}</option>
            `);
    }
}

document.addEventListener('DOMContentLoaded', init);