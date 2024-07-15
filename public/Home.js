// Constabntes
const notasContainer = document.getElementById('notas-container');
const mensajeNoNotas = document.getElementById('mensaje-no-notas');
const btnMostrarNotas = document.getElementById('btnMostrarNotas');
const formNota = document.getElementById('form-nota');
const btnLimpiar = document.getElementById('btnLimpiar');

// Función para mostrar las notas
function renderizarNotas(notas) {
  notasContainer.innerHTML = '';

  if (notas.length === 0) {
    mensajeNoNotas.style.display = 'block';
  } else {
    mensajeNoNotas.style.display = 'none';

    notas.forEach((nota) => {
      const notaElement = document.createElement('div');
      notaElement.classList.add('nota');
      notaElement.innerHTML = `
        <h2>${nota.titulo}</h2>
        <p>${nota.contenido}</p>
        <p><strong>Fecha de Creación:</strong> ${new Date(nota.fechaCreacion).toLocaleString()}</p>
        <p><strong>Última Modificación:</strong> ${new Date(nota.fechaModificacion).toLocaleString()}</p>
        <p><strong>Etiquetas:</strong> ${nota.etiquetas.join(', ')}</p>
        <button class="btn-borrar" data-id="${nota.id}">Borrar</button>
      `;
      notasContainer.appendChild(notaElement);
    });

    // Agregar la funcion para botones de borrar
    const botonesBorrar = document.querySelectorAll('.btn-borrar');
    botonesBorrar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        borrarNota(id);
      });
    });
  }
}

// Función para mostrar todas las notas almacenadas en el servidor
async function mostrarTodasLasNotas() {
  const response = await fetch('/notas');
  const notas = await response.json();
  renderizarNotas(notas);
}

// Función para borrar una nota por ID
async function borrarNota(id) {
  await fetch(`/notas/${id}`, { method: 'DELETE' });
  mostrarTodasLasNotas(); // Actualizar la lista de notas mostradas
}

// Función para agregar una nueva nota y redirigir a Home.html
async function agregarNota(titulo, contenido, etiquetas) {
  const nuevaNota = {
    titulo,
    contenido,
    etiquetas: etiquetas || ''
  };
  await fetch('/notas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaNota)
  });
  window.location.href = 'Home.html'; // Redirigir a la página principal
}

// Metod de evento para el formulario de agregar nota
if (formNota) {
  formNota.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const contenido = document.getElementById('contenido').value.trim();
    const etiquetas = document.getElementById('etiquetas').value.trim();
    if (titulo !== '' && contenido !== '') {
      agregarNota(titulo, contenido, etiquetas);
    } else {
      alert('Por favor ingresa un título y contenido para la nota.');
    }
  });
}

// Event listener para limpiar el formulario
if (btnLimpiar) {
  btnLimpiar.addEventListener('click', () => {
    document.getElementById('titulo').value = '';
    document.getElementById('contenido').value = '';
    document.getElementById('etiquetas').value = '';
  });
}

// Inicialización: renderizar las notas al cargar la página
window.onload = function() {
  if (btnMostrarNotas) {
    btnMostrarNotas.addEventListener('click', mostrarTodasLasNotas);
  }
  mostrarTodasLasNotas();
};

// Función para renderizar las notas en el contenedor
function renderizarNotas(notas) {
    notasContainer.innerHTML = '';
  
    if (notas.length === 0) {
      mensajeNoNotas.style.display = 'block';
    } else {
      mensajeNoNotas.style.display = 'none';
  
      notas.forEach((nota) => {
        const notaElement = document.createElement('div');
        notaElement.classList.add('nota');
        notaElement.innerHTML = `
          <h2>${nota.titulo}</h2>
          <p>${nota.contenido}</p>
          <p><strong>Fecha de Creación:</strong> ${new Date(nota.fechaCreacion).toLocaleString()}</p>
          <p><strong>Última Modificación:</strong> ${new Date(nota.fechaModificacion).toLocaleString()}</p>
          <p><strong>Etiquetas:</strong> ${nota.etiquetas.join(', ')}</p>
          <button class="btn-borrar" data-id="${nota.id}">Borrar</button>
          <button class="btn-editar" data-id="${nota.id}">Editar</button>
        `;
        notasContainer.appendChild(notaElement);
      });
  
      // Agregar event listener para botones de borrar
      const botonesBorrar = document.querySelectorAll('.btn-borrar');
      botonesBorrar.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          borrarNota(id);
        });
      });
  
      // Agregar event listener para botones de editar
      const botonesEditar = document.querySelectorAll('.btn-editar');
      botonesEditar.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          window.location.href = `Edit.html?id=${id}`;
        });
      });
    }
  }
  
  // ... (resto del código sigue igual)
  