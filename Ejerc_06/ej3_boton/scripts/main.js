const checkTerminos = document.querySelector('#terminos');
checkTerminos.addEventListener('change', () => {
    if (checkTerminos.checked == true) {
        checkTerminos.nextElementSibling.disabled = false;
    }else {
        checkTerminos.nextElementSibling.disabled = true;
    }
})