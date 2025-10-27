export function mostrarListaProductos(producto) {
    const contenedor = document.createElement('div');
    contenedor.id = producto.id;
    contenedor.className = 'col';

    const contenedorProducto = document.createElement('div');
    contenedorProducto.className = 'card h-100 shadow-sm border-0';
    contenedorProducto.appendChild(crearImagen(producto.imagen));

    const cuerpoProducto = document.createElement('div');
    cuerpoProducto.className = 'card-body container';
    cuerpoProducto.appendChild(crearNombre(producto.nombre));
    cuerpoProducto.appendChild(crearPrecio(producto.precio));
    cuerpoProducto.appendChild(crearCategoria(producto.categoria));

    contenedorProducto.appendChild(cuerpoProducto);
    contenedor.appendChild(contenedorProducto);

    return contenedor;
}
function crearNombre(nombre) {
    const h5 = document.createElement('h5');
    h5.className = 'nombre card-title';
    h5.textContent = nombre;
    return h5;
}
function crearPrecio(precio) {
    const p = document.createElement('p');
    p.className = 'fw-bold fs-5 text-primary';
    const span = document.createElement('span');
    span.classList.add('precio');
    span.textContent = precio;
    p.appendChild(span);
    p.innerHTML += '€';
    return p;
}
function crearCategoria(categoria) {
    const p = document.createElement('p');
    p.className = 'card-text mb-1 text-muted categoria';
    p.textContent = categoria;
    return p;
}
function crearImagen(imgUrl) {
    const img = document.createElement('img');
    img.className = 'imagen img-card';
    img.setAttribute('src', imgUrl);
    img.setAttribute('alt', 'Imagen del producto');
    return img;
}