export function filtrarPrecio(precioMaximo, productos) {
    // si no hay precio, devolvemos el array completo
    if (!precioMaximo) return productos;
    return productos.filter((producto) => {
        if (producto.precio <= precioMaximo) {
            return producto;
        }
    })
}