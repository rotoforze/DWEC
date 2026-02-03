let data = fetch('./data/artistas.json');

function getNextId() {
  return Math.max(...data.map((artista) => artista.id)) + 1;
}

function insert(artista) {
  artista.id = getNextId();
  data.push(artista);
}

function update(artista) {
  artista.id = parseInt(artista.id, 10);
  const index = data.findIndex((item) => item.id === artista.id);
  data[index] = artista;
}

export function getAll() {
  return Promise.resolve(data);
}

export function get(id) {
  return Promise.resolve(data.find((artista) => artista.id === id));
}

export function remove(id) {
  data = data.filter((artista) => artista.id !== id);
  return Promise.resolve();
}

export function save(artista) {
  if (artista.id === '') {
    insert(artista);
  } else {
    update(artista);
  }
  return Promise.resolve();
}
