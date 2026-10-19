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

// Verificación para ver la conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('¡Conectado exitosamente a MongoDB!'))
  .catch(err => {
    console.error('Error detallado de conexión a MongoDB:', err);
    process.exit(1);
  });

// ==========================================
// RUTA PRINCIPAL (PORTADA / MEME EN HTML)
// ==========================================
// Aquí es donde se pone la portada que aparece al entrar a la raíz de tu dominio en Vercel
app.get('/', (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nexo Digital API</title>
            <style>
                body {
                    background-color: #0f172a;
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                h1 { color: #818cf8; margin-bottom: 10px; }
                p { color: #94a3b8; margin-bottom: 20px; }
                img {
                    max-width: 350px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                }
            </style>
        </head>
        <body>
            <h1>🚀 Backend Nexo Digital Activo</h1>
            <p>¡Qué haces aquí sospechoso! Esta es una API REST, no una página web 🤖</p>
            <!-- Puedes cambiar el enlace de esta imagen por cualquier otro GIF o imagen que prefieras -->
            <img src="https://tenor.com/uJfxe42nKLI.gif" alt="Meme">
        </body>
        </html>
    `);
});

// Usar las rutas del MVC
app.use('/api', productRoutes);
app.use('/api', authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor MVC corriendo en http://localhost:${PORT}`);
});