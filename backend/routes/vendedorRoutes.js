import express from 'express';
import {
    obtenerVendedores,
    crearVendedor,
    actualizarVendedor,
    obtenerVendedor,
    eliminarVendedor
} from '../controllers/vendedorController.js';

const router=express.Router();

//area pública
router.post('/',crearVendedor);
router.get('/',obtenerVendedores);
router.get('/:id',obtenerVendedor);
router.put('/:id',actualizarVendedor);
router.delete('/:id',eliminarVendedor);

export default router;