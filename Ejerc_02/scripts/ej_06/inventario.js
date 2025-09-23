export function crearProducto(nombre, categoria, precio, stock) {
    return {
        nombreProducto: nombre,
        categoriaProducto: categoria,
        precioProducto: precio,
        stockProducto: stock
    };
}; 
export function filtrarPorCategoria(inventario, categoria) {
    return inventario.filter((producto) =>{
        if (producto.categoriaProducto == categoria) return producto;
    });
};
export function listarProductosAgotados(inventario) {
    return inventario.filter((producto) => {
        if (producto.stockProducto <= 0) return producto;
    });
};
export function calcularValorTotalInventario(inventario) {
    let valorTotal = 0;
    for (const producto of inventario) {
      valorTotal += producto.stockProducto * producto.precioProducto;  
    };
    return valorTotal;
};
export default function resumenInventario(inventario) {
    return `Número total de productos: ${inventario.length}. Número de categorías distintas: ${(new Set(inventario.map(producto => producto.categoriaProducto))).size}. Valor total: ${calcularValorTotalInventario(inventario)}`;
};