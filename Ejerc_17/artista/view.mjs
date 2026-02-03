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
    <thead><tr><th>Id</th><th>Title</th><th>Year</th><th></th><th></th></tr></thead>
    <tbody>
      ${artistas
        .map(
          (artista) => `
        <tr>
          <td>${artista.id}</td>
          <td>${artista.title}</td>
          <td>${artista.year}</td>
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
