let contenidoCarrito = [];
function parsearPorducto(producto) {
    let nombre = producto.querySelector('h3').textContent;
    let precio = producto.querySelector('.precio').textContent;
    if (!estaEnCarrito(nombre)) {
        var objetoProducto = {
            nombre,
            precio,
            cantidad: 1
        };
    }
    return objetoProducto;
}
function estaEnCarrito(nombre) {
    let sigue = true;
    let index = 0;
    
    while (sigue) {
        var existe = false;
            if (contenidoCarrito.find((n) => n.nombre == nombre)) {
            sigue = false;
            contenidoCarrito.findIndex((n) => {
                existe = n.nombre == nombre;
                if (existe) {
                    n.cantidad++;
                }
                return existe;
            });
        };
        index++;
        if (index >= contenidoCarrito.length) sigue = false;
    }
    return existe;
}
document.querySelectorAll('.producto').forEach((producto) => {
    producto.querySelector('button').addEventListener('click', () => {
        const objetoProducto = parsearPorducto(producto);
        if (objetoProducto) contenidoCarrito.push(objetoProducto);
        renderizarCarrito();
        document.querySelector('.total-info').textContent = calcularTotal();
    });
})
function nuevoProducto(producto) {
    const html = `  <div class="producto-en-carrito">
    <h3>${producto.nombre}</h3>
    <p>Precio: <span class="precio-en-carrito">${producto.precio}</span>€</p>
    <p>Cantidad: <span class="cantidad-en-carrito">${producto.cantidad}</span></p>
    </div>`
    const div = document.createElement('div');
    div.innerHTML = html;
    return div;
}
function renderizarCarrito() {
    const carritoAntiguo = document.querySelector('.carrito-info');
    const carritoNuevo = carritoAntiguo.cloneNode();
    contenidoCarrito.forEach((producto) => {
        carritoNuevo.appendChild(nuevoProducto(producto));
    });
    carritoAntiguo.parentElement.replaceChild(carritoNuevo, carritoAntiguo);
}
function calcularTotal() {
    return contenidoCarrito.reduce((valor, obj) => valor += obj.precio * obj.cantidad, 0);
}