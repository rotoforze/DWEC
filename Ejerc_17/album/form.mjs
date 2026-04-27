import {getNextId as getNextArtistId} from '../artista/models.mjs';

export function render(album) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>album list</title>
    <link rel="stylesheet" href=" /style.css" />
  </head>
  <body>
    <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>
  <a href="/album">Volver</a>
    <h1>${album.id ? "Editar " : "Crear "}album</h1>
    <form action="/album/save" method="post">
      <input type="hidden" id="id" name="id" value="${album.id}" />
      <div>
        <label for="titulo">titulo:</label>
        <input type="text" id="titulo" name="titulo" value="${album.titulo}" />
      </div>
      <div>
        <label for="anio">Año:</label>
        <input type="number" min="0" max="${new Date().getFullYear()}" id="anio" name="anio" value="${album.anio}" />
      </div>
        <label for="artistaId">ID Artista: <em id="artistaNombre"></em> </label>
        <input type="number" id="artistaId" min="1" max="${getNextArtistId() - 1}" name="artistaId" value="${album.artistaId}" />
          <script>
            const input = document.querySelector('#artistaId');
            const nombreDisplay = document.querySelector('#artistaNombre');
            input.addEventListener('change', async () => {
                const id = input.value;
                if (!id) return;
                const response = await fetch('/artista/api/' + id);
                const artista = await response.json();
                nombreDisplay.textContent = artista.nombre;
              });
            input.dispatchEvent(new Event('change'));
          </script>
      </div>
      <div>
        <label for="foto">foto:</label>
        <input type="text" id="foto" name="foto" value="${album.foto}" />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
  </body>
  </html>  
  `;
}
