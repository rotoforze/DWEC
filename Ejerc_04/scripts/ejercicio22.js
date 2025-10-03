const form = document.querySelector("#formulario-contacto");
form.addEventListener('submit', () => {
    event.preventDefault();
    console.log(`nombre: ${form.querySelectorAll("input")[0].value}. mensaje: ${form.querySelector("textarea").value}`);
})