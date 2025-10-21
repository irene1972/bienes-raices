import express from 'express';
import {
    obtenerPropiedades,
    crearPropiedad
} from '../controllers/propiedadController.js';

const router=express.Router();

//area pública
router.get('/',obtenerPropiedades);
router.post('/',crearPropiedad);

export default router;