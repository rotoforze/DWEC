let data = [
  {
    "id": 1,
    "nombre": "The Beatles",
    "pais": "Reino Unido",
    "genero": "Rock",
    "fecha_formacion": 1960,
    "foto": "https://picsum.photos/id/101/150/150"
  },
  {
    "id": 2,
    "nombre": "Led Zeppelin",
    "pais": "Reino Unido",
    "genero": "Hard Rock",
    "fecha_formacion": 1968,
    "foto": "https://picsum.photos/id/102/150/150"
  },
  {
    "id": 3,
    "nombre": "Pink Floyd",
    "pais": "Reino Unido",
    "genero": "Rock Progresivo",
    "fecha_formacion": 1965,
    "foto": "https://picsum.photos/id/103/150/150"
  },
  {
    "id": 4,
    "nombre": "Queen",
    "pais": "Reino Unido",
    "genero": "Rock",
    "fecha_formacion": 1970,
    "foto": "https://picsum.photos/id/10/150/150"
  },
  {
    "id": 5,
    "nombre": "Nirvana",
    "pais": "Estados Unidos",
    "genero": "Grunge",
    "fecha_formacion": 1987,
    "foto": "https://picsum.photos/id/110/150/150"
  },
  {
    "id": 6,
    "nombre": "Radiohead",
    "pais": "Reino Unido",
    "genero": "Rock Alternativo",
    "fecha_formacion": 1985,
    "foto": "https://picsum.photos/id/106/150/150"
  }
]

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
