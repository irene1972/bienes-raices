import express from 'express';
import { 
    registrar,
    admin,
    confirmar, 
    autenticar,
    resetPassword,
    comprobarToken,
    nuevoPassword
 } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router=express.Router();

//rutas públicas
router.post('/',registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login',autenticar);
router.post('/reset-password',resetPassword);
router.get('/reset-password/:token',comprobarToken);
router.post('/reset-password/:token',nuevoPassword);
//esto es lo mismo que las dos de arriba
//router.route('/reset-password/:token').get(comprobarToken).post(nuevoPassword)

//rutas privadas
router.get('/admin',checkAuth,admin);


export default router;