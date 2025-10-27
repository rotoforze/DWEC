export function ordenar(criterio, productos) {
    if (criterio == "ordenPrecioASC") {
        return productos.sort((a, b) => b.precio - a.precio);
    }else if (criterio == "ordenPrecioDESC") {
        return productos.sort((a, b) => a.precio - b.precio);
    }else if (criterio == "ordenNombre") {
        return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }else return productos
}