import express from 'express';
import {
    obtenerPropiedades,
    crearPropiedad,
    obtenerPropiedad,
    actualizarPropiedad
} from '../controllers/propiedadController.js';

const router=express.Router();

//area pública
router.get('/',obtenerPropiedades);
router.post('/',crearPropiedad);

router.get('/:id',obtenerPropiedad);
router.put('/:id',actualizarPropiedad);

export default router;