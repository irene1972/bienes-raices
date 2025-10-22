import express from 'express';
import {
    obtenerPropiedades,
    crearPropiedad,
    obtenerPropiedad,
    actualizarPropiedad,
    eliminarPropiedad,
    obtenerNumPropiedades
} from '../controllers/propiedadController.js';

const router=express.Router();

//area pública
router.get('/',obtenerPropiedades);
router.post('/',crearPropiedad);

router.get('/:id',obtenerPropiedad);
router.put('/:id',actualizarPropiedad);
router.delete('/:id',eliminarPropiedad);

router.get('/varias/:num',obtenerNumPropiedades);


export default router;