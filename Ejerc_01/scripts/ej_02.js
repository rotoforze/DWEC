// declaro el objeto coche
let coche = {
    marca: "Ford",
    modelo: "Fiesta",
    anio: 1992,
    estaDisponible: false
};

console.table(coche);
const {marca: marca, modelo: modelo} = coche;
console.log(marca, modelo);
coche.estaDisponible = true;
coche.color = "rojo";
delete coche.anio;
console.table(coche);