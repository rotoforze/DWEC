const paisBuscado = document.querySelector('#pais'); 
paisBuscado.addEventListener('input', () => {
    const listaPaises = document.querySelectorAll('li');
    listaPaises.forEach((pais) => {
        if ((pais.textContent).toLowerCase().includes((paisBuscado.value).toLowerCase())) {
            pais.style.display = 'block';
        }else {
            pais.style.display = 'none';
        }
    });
});