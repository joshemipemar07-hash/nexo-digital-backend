/**
 * Este archivo implementa el controlador para la gestión del catálogo de productos 
 * Su propósito es centralizar toda la lógica CRUD (Crear,Leer, Actualizar y Eliminar), 
 * recibe las solicitudes HTTP desde la app de 
 * interactuamos con la base de datos, 
 * devolvemos las respuestas en formato JSON
 */

// Importamos el modelo 'Product' para poder ejecutar operaciones como find, create, update, delet sobre la colección de productos
const Product = require('../models/product.model.js');

class ProductController {
    
    /**
     * aqui obtenemos todos los productos registrados (GET /products)
     */
    async getProducts(req, res) {
        try {
            // Buscamos y recuperamos todos los documentos almacenados en la colección de productos
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    }

    /**
     * Metod obtener un producto específico por su identificador único (GET /products/:id)
     */
    async getProductById(req, res) {
        try {
            // Buscamos un documento cuyo _id coincida
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar el producto' });
        }
    }

    /**
     * Método para registrar un nuevo producto en el sistema (POST /products)
     */
    async createProduct(req, res) {
        try {
            // Creamos una nueva instancia del objeto Product utilizando los datos enviados
            const newProduct = new Product(req.body);
            
            // Guardamos el documento 
            const savedProduct = await newProduct.save();            
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ error: 'Error al crear el producto' });
        }
    }

    /**
     * logica para actualizar un producto existente mediante su ID (PUT /products/:id)
     */
    async updateProduct(req, res) {
        try {
            // Buscamos el producto por su ID y actualizamos sus campos
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true } 
            );
            
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
            }
            
            // Respondemos con el producto actualizado en formato JSON
            res.json(updatedProduct);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar el producto' });
        }
    }

    /**
     * Método para eliminar de forma permanente un producto del sistema utilizando su ID (DELETE /products/:id)
     */
    async deleteProduct(req, res) {
        try {
            // Buscamos el producto por su ID y procedemos a eliminarlo de la base de datos
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
            }
            
            res.json({ message: 'Producto eliminado permanentemente' });
        } catch (error) {
            res.status(400).json({ error: 'Error al eliminar el producto' });
        }
    }
}

// Instanciamos la clase y exportamos para que puedanenlazarse con las rutas del servidor
module.exports = new ProductController();