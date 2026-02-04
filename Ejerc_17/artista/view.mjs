export function render(artistas) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>artista list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <table>
    <thead>
    <tr>
    <th>Id</th>
    <th>Nombre</th>
    <th>Pais</th>
    <th>Genero</th>
    <th>Fecha</th>
    </tr></thead>
    <tbody>
      ${artistas
      .map(
        (artista) => `
        <tr>
          <td>${artista.id}</td>
          <td>${artista.nombre}</td>
          <td>${artista.pais}</td>
          <td>${artista.genero}</td>
          <td>${artista.fecha_formacion}</td>
          <td><a href="/artista/delete/${artista.id}">delete</a></td>
          <td><a href="/artista/form/${artista.id}">edit</a></td> 
        </tr>`
      )
      .join('')}
    </tbody>
  </table>
  <a href="/artista/form">new</a>
</body>
</html>
  `;
}
