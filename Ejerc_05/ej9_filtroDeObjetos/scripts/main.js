const informacionCiudades = [
    {
        pais: 'España',
        ciudades: ['Madrid', 'Barcelona','Oviedo', 'Gijón', 'Segovia']
    },
    {
        pais: 'Francia',
        ciudades: ['París', 'Marsella']
    },
    {
        pais: 'Italia',
        ciudades: ['Nápoles', 'Roma','Pisa']
    },
];

function filtroPais(nombrePais) {
    const listaCiudades = document.querySelectorAll('li');
    listaCiudades.forEach((li) => {
            if (informacionCiudades.find(x => x.pais === nombrePais).ciudades.includes(li.textContent)) {
                if (li.classList.contains('oculto')) li.classList.toggle('oculto');
            }else {
                if (!li.classList.contains('oculto')) li.classList.toggle('oculto');
            }
    }) 
}
document.querySelector('[value="Enviar"]').addEventListener('click', () => {
    filtroPais(document.querySelector("#pais").value);
});
document.querySelector('[value="Limpiar filtro"]').addEventListener('click', () => {
    const listaCiudades = document.querySelectorAll('li');
    listaCiudades.forEach((li) => {
            if (li.classList.contains('oculto')) li.classList.remove('oculto');
    }) 
});