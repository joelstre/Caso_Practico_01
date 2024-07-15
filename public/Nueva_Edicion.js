// Script para la página de edición/creación de notas

document.addEventListener('DOMContentLoaded', () => {
    const formNota = document.getElementById('formNota');

    formNota.addEventListener('submit', (event) => {
        event.preventDefault();

        const titulo = document.getElementById('txtTitulo').value;
        const contenido = document.getElementById('txtContenido').value;
        const etiquetas = document.getElementById('txtEtiquetas').value.split(',').map(tag => tag.trim());

        const nuevaNota = {
            titulo,
            contenido,
            etiquetas
        };

        fetch('/notas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaNota),
        })
        .then(response => response.json())
        .then(nota => {
            // Redireccionar a Home.html después de guardar la nota
            window.location.href = 'Home.html';
        })
        .catch(error => console.error('Error al guardar la nota:', error));
    });
});

function cancelarEdicion() {
    // Implementar lógica de cancelación si es necesario
}

function eliminarNota() {
    // Implementar lógica para eliminar nota si es necesario
}
