export function filtroCategoria(categoria, productos) {
    // si son todas, devolvemos el array completo
    if (categoria == 'all') return productos;
    return productos.filter((producto) => {
        if (producto.categoria.toLowerCase().includes(categoria.toLowerCase())) {
            return producto;
        }
    })
}