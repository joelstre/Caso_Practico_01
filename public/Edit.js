// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const notaId = params.get('id');

// Función para cargar la información de la nota
async function cargarNota(id) {
  const response = await fetch(`/notas/${id}`);
  const nota = await response.json();
  document.getElementById('titulo').value = nota.titulo;
  document.getElementById('contenido').value = nota.contenido;
  document.getElementById('etiquetas').value = nota.etiquetas.join(', ');
}

// Función para guardar los cambios en la nota
async function guardarCambios(id, titulo, contenido, etiquetas) {
  const notaActualizada = {
    titulo,
    contenido,
    etiquetas
  };
  await fetch(`/notas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notaActualizada)
  });
  window.location.href = 'Home.html'; // Redirigir a la página principal
}

// formulario de edición de nota
document.getElementById('form-nota').addEventListener('submit', (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const contenido = document.getElementById('contenido').value.trim();
  const etiquetas = document.getElementById('etiquetas').value.trim();
  if (titulo !== '' && contenido !== '') {
    guardarCambios(notaId, titulo, contenido, etiquetas);
  } else {
    alert('Llenar todos los campos');
  }
});

// Cargar la nota al iniciar la página
window.onload = function() {
  cargarNota(notaId);
};
