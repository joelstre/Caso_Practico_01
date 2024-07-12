const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Puerto (Error: Cerrar otros proyectos)
const PUBLIC = path.join(__dirname, 'public'); // Ruta a la carpeta PUBLIC abreviada

// Ruta Principal
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'home.html'));  // Envía el archivo 'Home.html' al browser
});

// Mensaje del servidor
app.listen(port, () => {
  console.log(`El servidor esta funcionando😊`);
});
