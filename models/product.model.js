/**
 * aqui definimos el modelo de Mongoose para Producto en el backend de Node.js. 
 * Su es estructurar que indica qué campos, tipos de datos y reglas de validación tendrán 
 * los productos que se almacenan y consultan en la base de datos de Mongito.
 */

// Importamos la librería 'mongoose' para poder definir esquemas y conectar nuestra lógica 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    // Campo 'title': Almacena el nombre o título del producto.
    title: { type: String, required: true },
    
    // Campo 'price': Almacena el costo del producto.
    price: { type: Number, required: true },
    
    // Campo 'description': Almacena los detalles o especificacionesss del artículo 
    description: { type: String },
    
    // Campo 'image': Almacena la URL o enlace de la imagen del product
    image: { type: String },
    
    // Campo 'category': Clasifica el producto 
    category: { type: String, required: true }

});

/**
 * Compilamos el esquema anterior en un modelo de Mongoose y lo exportamos.
 */
module.exports = mongoose.model('Product', productSchema);