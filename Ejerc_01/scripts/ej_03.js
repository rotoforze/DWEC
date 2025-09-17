let producto = {
    nombre: "iPhone",
    precio: 895.99
};
let cliente = {
    nombreCliente: "Alex",
    esPremium: false
};
let pedido = {
    ...cliente,
    ...producto,
};
console.table(pedido);
// ¿qué pasa si combinamos otro producto que tenga las mismas claves?
let producto2 = {
    nombre: "iPad",
    precio: 1095.99
};
cliente = {
    ...cliente,
    ...producto2
}
pedido = {
    ...cliente,
    //...producto // se sobreescribe sobre lo anterior
};
console.table(pedido);