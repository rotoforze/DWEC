let categorias = [];
document.querySelectorAll(".categoria").forEach((categoria) => {
    if (!categorias.includes(categoria.textContent)) {
        categorias.push(categoria.textContent);
    }
});
console.table(categorias);