export function buscar(busqueda, productos) {
    // si viene busqueda vacío va a devolver
    // una lista de productos vacía porque ninguno incluye undefinded
    // por eso si no se recibe busqueda, devolvemos el array como vino
    if (!busqueda) return productos
    return productos.filter((producto) => {
        if (producto.nombre.toLowerCase().includes(busqueda.toLowerCase())) {
            return busqueda
        }
    })
}