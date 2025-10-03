let cursos = new Set();
document.querySelectorAll(".card").forEach((curso) => cursos.add(curso));
console.table(cursos);