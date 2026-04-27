export function render(artista) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>artista list</title>
    <link rel="stylesheet" href=" /style.css" />
  </head>
  <body>
    <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>
  <a href="/artista">Volver</a>
    <h1>${artista.id != '' ? "Editar " : "Crear "}Artista</h1>
    <form action="/artista/save" method="post">
      <input type="hidden" id="id" name="id" value="${artista.id}" />
      <div>
        <label for="nombre">nombre:</label>
        <input type="text" id="nombre" name="nombre" value="${artista.nombre}" />
      </div>
      <div>
        <label for="pais">pais:</label>
        <input type="text" id="pais" name="pais" value="${artista.pais}" />
      </div>
      <div>
        <label for="genero">genero:</label>
        <input type="text" id="genero" name="genero" value="${artista.genero}" />
      </div>
      <div>
        <label for="fecha_formacion">fecha_formacion:</label>
        <input type="number" min="0" max="${new Date().getFullYear()}" id="fecha_formacion" name="fecha_formacion" value="${artista.fecha_formacion}" />
      </div>
      <div>
        <label for="foto">foto:</label>
        <input type="text" id="foto" name="foto" value="${artista.foto}" />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
  </body>
  </html>  
  `;
}
