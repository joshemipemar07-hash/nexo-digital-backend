const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/product.routes.js');
const authRoutes = require('./routes/auth.routes.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Declaración correcta de la URI de MongoDB Atlas
const MONGO_URI = 'mongodb+srv://joshemipemar07_db_user:Theater76@cluster0.jfaetrq.mongodb.net/nexo_digital?retryWrites=true&w=majority&appName=Cluster0';

// veryficacion para ver la coneccion a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('¡Conectado exitosamente a MongoDB!'))
  .catch(err => {
    console.error('Error detallado de conexión a MongoDB:', err);
    process.exit(1);
  });

// Usar las rutas del MVC
app.use('/api', productRoutes);
// ...
app.use('/api', authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor MVC corriendo en http://localhost:${PORT}`);
});