// Cargar las variables de entorno al inicio de todo (solo actúa en desarrollo local)
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Módulo nativo para manejar rutas de archivos

const productRoutes = require('./routes/product.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const cartRoutes = require('./routes/cart.routes.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Declaración segura de la URI usando la variable de entorno
const MONGO_URI = process.env.MONGO_URI;

// Verificación para ver la conexión a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('¡Conectado exitosamente a MongoDB!'))
    .catch(err => {
        console.error('Error detallado de conexión a MongoDB:', err);
        process.exit(1);
    });

// Ruta raíz que sirve el archivo HTML externo desde la carpeta 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usar las rutas del MVC
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor MVC corriendo en http://localhost:${PORT}`);
});