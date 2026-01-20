
document.addEventListener('DOMContentLoaded', () => {
    const tareas = document.querySelectorAll('.tarea');
    const columnas = document.querySelectorAll('.columna');
    tareas.forEach(tarea => {
        tarea.addEventListener('dragstart', (e) => {
            tarea.classList.add('arrastrando');
            e.dataTransfer.setData('text/plain', tarea.id);
            e.dataTransfer.effectAllowed = 'move';
        });

        tarea.addEventListener('dragend', () => {
            tarea.classList.remove('arrastrando');
        });
    });
    columnas.forEach(columna => {
        columna.addEventListener('dragenter', (e) => {
            e.preventDefault();
            columna.classList.add('dragover');
        });

        columna.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        columna.addEventListener('dragleave', () => {
            columna.classList.remove('dragover');
        });

        columna.addEventListener('drop', (e) => {

            e.preventDefault();
            columna.classList.remove('dragover');
            const idTarea = e.dataTransfer.getData('text/plain');
            const tareaArrastrada = document.getElementById(idTarea);

            if (tareaArrastrada) {
                columna.appendChild(tareaArrastrada);
                console.log(`Tarea '${idTarea}' movida a la columna '${columna.id}'.`);
            }
        });
    });
});
