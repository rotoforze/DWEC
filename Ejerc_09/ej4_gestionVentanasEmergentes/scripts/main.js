let popup;
document.addEventListener('DOMContentLoaded', () => {
    let intervalo;
    intervalo = setInterval(() => {
        abrirPopup();
        clearInterval(intervalo);
    }, 5000);
});

document.querySelector('.abrir').addEventListener('click', () => {
    if (popup == undefined | popup?.closed) {
        abrirPopup();
    }
})
document.querySelector('.cerrar').addEventListener('click', () => {
    if (popup) popup.close();
})

function abrirPopup() {
  const width = 300;
  const height = 400;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  const configPopup = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
  popup = window.open('./popup.html', 'ventanaEmergente', configPopup);
}