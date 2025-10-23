import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const checkAuth=async (req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //extraermos el token del header y lo decodificamos para sacarle el id
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const id=decoded.id;
            //************************************* */
            //verificamos que el id que trae el token se corresponde con algún usuario
            const [rows]=await pool.query(`SELECT id,nombre,apellidos,email,telefono FROM usuarios WHERE id=${id}`);
            const usuario=rows[0];
            
            if(!usuario){
                return res.status(40).json({msg:'Usuario no válido'});
            }else{
                //res.json(usuario);
                //creamos una sesión con la información del usuario
                req.usuario=usuario;
                return next();
            }
            
        } catch (error) {
            return res.status(400).json({msg:'Token no válido'});
        }
    }
}
    
export default checkAuth;