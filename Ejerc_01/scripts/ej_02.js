// declaro el objeto coche
let coche = {
    marca: "Ford",
    modelo: "Fiesta",
    anio: 1992,
    estaDisponible: false
};

console.table(coche);
const {marca: MARCA, modelo: MODELO} = coche;
console.log(MARCA, MODELO);
coche.estaDisponible = true;
coche.color = "rojo";
delete coche.anio;
console.table(coche);