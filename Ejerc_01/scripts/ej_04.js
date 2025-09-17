let ciudades = [`Madrid`, `Buenos Aires`, `Tokio`, `Nueva York`, `París`];
ciudades.push(`Roma`);
let ciudadesMayusculas = ciudades.map((string) => {
    return string.toUpperCase();
});
let ciudadesFiltradas = ciudades.filter((string) => {
    if (string.length >= 6) return string;
});
console.table(ciudades);
console.table(ciudadesMayusculas);
console.table(ciudadesFiltradas);