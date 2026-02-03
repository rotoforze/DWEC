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
    <form action="/artista/save" method="post">
      <input type="hidden" id="id" name="id" value="${artista.id}" />
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="${artista.title}" />
      </div>
      <div>
        <label for="id">Year:</label>
        <input type="text" id="year" name="year" value="${artista.year}" />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
  </body>
  </html>  
  `;
}
