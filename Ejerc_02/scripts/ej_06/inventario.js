export function crearProducto(nombre, categoria, precio, stock) {
    return {
        nombreProducto: nombre,
        categoriaProducto: categoria,
        precioProducto: precio,
        stockProducto: stock
    };
}; 