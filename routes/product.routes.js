/**
 * Este archivo define las rutas HTTP correspondientes al catálogo de productos 
 * Su propósito es utilizar el enrutador de Express para 
 * mapear los endpoints de la API (como GET, POST, PUT y DELETE) y conectarlos 
 * de manera directa con los métodos correspondientes del 'productController', 
 * permitiendo que la aplicación móvil interactúe con el CRUD completo.
 */

// Importamos el framework Express para gestionar el servidor web y el enrutamiento
const express = require('express');

// Creamos un módulo de enrutamiento independiente con Express Router
const router = express.Router();

// Importamos el controlador de productos que contiene toda la lógica de negocio 
const productController = require('../controllers/product.controller.js');


// Ruta GET para obtener el listado completo de productos (/products)
router.get('/products', productController.getProducts);

// Ruta POST para registrar un nuevo producto en la base de datos (/products)
router.post('/products', productController.createProduct);


// Ruta GET con para consultar la información de un solo producto.
// Es un requisito fundamental para que la 'ProductDetailScreen' en Android cargue los detalles al hacer clic.
router.get('/products/:id', productController.getProductById);


// Ruta PUT para actualizar los datos de un producto existente
router.put('/products/:id', productController.updateProduct);

// Ruta DELETE para eliminar permanentemente un producto de la base de datos
router.delete('/products/:id', productController.deleteProduct);

// Exportamos el enrutador completo para integrarlo en el servidor principal de la aplicación
module.exports = router;