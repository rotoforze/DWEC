import { crearProducto, calcularValorTotalInventario, filtrarPorCategoria, listarProductosAgotados } from "./inventario.js";
import resumenInventario from "./inventario.js";

let inventario = [];

inventario.push(crearProducto("Agua mineral", "Bebida", 0.5, 40));
inventario.push(crearProducto("Chocolatina", "Golosina", 1.95, 20));
inventario.push(crearProducto("Camiseta", "Ropa", 9.90, 10));
inventario.push(crearProducto("Sudadera", "Ropa", 12.40, 5));
inventario.push(crearProducto("Pepsi", "Bebida", 5.5, 0));
inventario.push(crearProducto("Melones", "Golosina", 0.99, -5));

console.info(`Productos con categoria Ropa:`);
console.table(filtrarPorCategoria(inventario, "Ropa"));

console.info(`Productos agotados:`)
console.table(listarProductosAgotados(inventario));

console.info(`Valor total del inventario: ${calcularValorTotalInventario(inventario)}`);

console.info(`Resumen del inventario: ${resumenInventario(inventario)}`);