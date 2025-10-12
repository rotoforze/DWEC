const productos = [
    {
        nombre: 'BigMac',
        precio: 8
    },
    {
        nombre: 'Cuarto de Libra',
        precio: 9
    },
    {
        nombre: 'McPollo',
        precio: 8.5
    },
    {
        nombre: 'McRoyale Deluxe',
        precio: 9.25
    },
    {
        nombre: 'McExtreme Bacon',
        precio: 11.75
    }
];

// para cada objeto en productos, añado al
// ul.productos un producto nuevo (compuesto por un div, un p y 
// un boton para añadir al carrito).
productos.forEach((producto) => {
    document.querySelector('.productos').appendChild(nuevoProducto(producto.nombre, producto.precio));
});

// función que devuelve una etiqueta li con el atributo del precio
// cuyo valor es el precio recibido por parámetro, también recibe un nombre
// que estará en una etiqueta p y por último
// crea un boton que añade el producto al carrito
function nuevoProducto(nombre, precio) {
    // creamos el elemento p que contrendrá nombre
    const elementoNombre = document.createElement('p');
    // le ponemos en el texto el nombre
    elementoNombre.textContent = nombre;

    // creamos el contenedor para el producto
    const contenedorProducto = document.createElement('li');
    // le añadimos el atributo data-price con el valor recibido en precio
    contenedorProducto.setAttribute('data-price', precio);
    // le metemos la etiqueta p del nombre
    contenedorProducto.appendChild(elementoNombre);
    // usando una funcion que creo adelante, creo un boton
    // para añadirlo al carrito y se lo meto dentro al li
    contenedorProducto.appendChild(crearBotonAddCarrito(contenedorProducto));
    
    return contenedorProducto;
}

// esta funcion recibe un producto (un elemnto li)
// y devuelve un boton creado para ese elemento
// donde al hacer click, clona ese elemento y 
// lo añade al ul.carrito, además, quita el propio boton
// al añadirlo y crea uno nuevo para eliminarlo del carrito
function crearBotonAddCarrito(producto) {
    // creamos el boton
    const boton = document.createElement('button');
    // le ponemos un texto descriptivo sobre lo que hace
    boton.innerText = 'Añadir al carrito';
    // creamos el evento
    boton.addEventListener('click', () => {
        // clonamos el producto
        const productoSinBoton = producto.cloneNode(true);
        // le quitamos el boton
        productoSinBoton.querySelector('button').remove();
        // le ponemos el boton para eliminarlo usando una
        // funcion que hice para crear el boton con 
        // su propio evento para eliminarlo del carrito
        productoSinBoton.appendChild(crearBotonDelCarrito());
        // y lo añadimos al ul.carrito
        document.querySelector('.carrito').appendChild(productoSinBoton);
        
        // por último calculamos el total
        calcularTotal();
    });

    return boton;
}

// esta función crea un boton que se encarga
// de eliminar al contenedor en el que está del carrito
function crearBotonDelCarrito() {
    // creamos el elemento boton
    const botonBorrar = document.createElement('button');
    // le ponemos un texto con un - para referirnos a que elimina
    botonBorrar.innerText = '-';
    // creamos el evento de click
    botonBorrar.addEventListener('click', () => {
        // donde elimina al padre (el elemnto li)
        botonBorrar.parentNode.remove();
        // y calcula de nuevo el total
        calcularTotal();
    });

    return botonBorrar;
}

function calcularTotal() {
    // recoge la lista del carrito con todos los elementos
    // que contengan el atributo data-price
    const listaCarrito = document.querySelectorAll('.carrito [data-price]');
    // inicializo una variable para sumar el total
    let total = 0;
    
    // recorro todos los elementos del carrito
    for (const producto of listaCarrito) {
        // parseo en float el valor del atributo y lo añado al total
        total += Number.parseFloat(producto.getAttribute('data-price'));
    }
    
    // modifico el valor que se está mostrando en span#total
    document.querySelector('#total').textContent = `Total: ${total}`;
}
// para que se vea en 0 al abrir el documento html
calcularTotal();