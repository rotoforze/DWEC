const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};
document.querySelectorAll('a').forEach((a) => a.addEventListener('click', (event) => {
    event.preventDefault();
    const href = event.target.getAttribute('href');

    document.querySelector('.activo')?.classList.remove('activo');
    event.target.classList.add('activo');

    history.pushState(pages[href.split("/")[1]], href.split("/")[1], href);
    document.querySelector('main').innerHTML = pages[href.split("/")[1]];
}));

window.addEventListener('popstate', (event) => {
    document.querySelector('main').innerHTML = event.state;
})

document.addEventListener('DOMContentLoaded', () => {
    history.pushState(pages.inicio, pages.inicio, '/inicio');
    document.querySelector('main').innerHTML = pages.inicio;
})