import express from 'express';
import {
    obtenerVendedores,
    crearVendedor
} from '../controllers/vendedorController.js';

const router=express.Router();

//area pública
router.get('/',obtenerVendedores);
router.post('/',crearVendedor);

export default router;