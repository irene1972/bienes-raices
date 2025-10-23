import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import emailRegistro from '../helpers/emailRegistro.js';

const registrar=async(req,res)=>{
    let {nombre,apellidos,password,email,telefono}=req.body;

    if(!email || !password) return res.status(400).json({msg:'Los campos EMAIL y PASSWORD son obligatorios'});

    if(!nombre) nombre='';
    if(!apellidos) apellidos='';
    if(!telefono) telefono='';

    //validar que el email del usuario no esté duplicado
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE email='${email}'`);
    //console.log(rows);
    
    if(rows.length) return res.status(400).json({msg:'El email ya está registrado'});
    
    //asignar token para guardarlo en la bd
    const token=generarId();

    //antes de guardar el password lo hasheamos
    const salt=await bcrypt.genSalt(10);
    const newPassword=await bcrypt.hash(password,salt);

    try {
        const sql = `INSERT INTO usuarios (nombre, apellidos, password, email, telefono,token) VALUES ('${nombre}','${apellidos}','${newPassword}','${email}','${telefono}','${token}')`;
        const result = await pool.execute(sql, [nombre, apellidos, password,email,telefono,token]);

        //envio del email de confirmación
        emailRegistro({
            email,
            nombre,
            token
        });

        res.json({mensaje:`El registro se ha guardado correctamente, con id=${result[0].insertId}`});

    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:'Ha habido un error'});
    }

}

const perfil=(req,res)=>{
    const {usuario}=req;
    res.json({perfil:usuario});
}

const confirmar=async(req,res)=>{
    const token=req.params.token;
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE token='${token}'`);
    if(!rows.length) return res.status(400).json({msg:'Token no válido'});
    
    //console.log('usuario confirmado');
    const {id}=rows[0];
    const sql = `UPDATE usuarios SET token=NULL, confirmado=1 WHERE id=${id}`;
    try {
        await pool.execute(sql);
        res.json({mensaje:`Se ha confirmado el usuario`});
    } catch (error) {
        res.status(400).json({msg:'Ha habido un error'});
    }
  
}

const autenticar=async (req,res)=>{
    //validar que vienen los dos campos
    const {email,password}=req.body;
    if(!password) return res.status(400).json({msg:'Los dos campos son obligatorios'});
        
    //buscar al usuario correspondiente
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE email='${email}'`);
    if(!rows.length) return res.status(404).json({msg:'Usuario no encontrado'});

    //comprobar si el usuario está confirmado
    const usuario=rows[0];
    const confirmado=usuario.confirmado;
    if(!confirmado) return res.status(400).json({msg:'Usuario no confirmado'});

    //comprobar que el password recibido y el obtenido son iguales
    const passwordBD=usuario.password;
    
    bcrypt.compare(password, passwordBD, (err, result) => {
    if (err) throw err;
    if (result) {
        console.log('Password is correct!');
        //res.json({mensaje:'Se ha autenticado con éxito'});
        res.json({token:generarJWT(usuario.id)});
        return;
    } else {
        console.log('Password is incorrect.');
        res.status(404).json({msg:'El password es incorrecto'});
        return;
    }
    });
}

const resetPassword=async (req,res)=>{
    const {email}=req.body;
    
    //buscar al usuario correspondiente
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE email='${email}'`);
    if(!rows.length) return res.status(404).json({msg:'Usuario no encontrado'});
    
    const usuario=rows[0];
    
    try {
        usuario.token=generarId();
        const sql = `UPDATE usuarios SET token='${usuario.token}' WHERE id=${usuario.id}`;
        await pool.execute(sql);
        res.json({mensaje:`Hemos enviado un email con las instrucciones`});
        
    } catch (error) {
        return res.status(400).json({msg:'Ha habido un error'});
    }

}

const comprobarToken=async (req,res)=>{
    const token=req.params.token;
    
    //buscar al usuario correspondiente
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE token='${token}'`);
    if(!rows.length) return res.status(404).json({msg:'Token no válido'});
    res.json({mensaje:'Token válido y el usuario existe'});
}

const nuevoPassword=async(req,res)=>{
    //validación campos
    const token=req.params.token;
    const {password,repeatPassword}=req.body;
    if(!password || !repeatPassword) return res.status(400).json({msg:'Los dos campos son obligatorios'}); 
    if(password !== repeatPassword) return res.status(400).json({msg:'Los dos campos deben ser iguales'});
    if(password.length < 6) return res.status(400).json({msg:'El password debe tener al menos 6 carácteres'});

    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE token='${token}'`);
    if(!rows.length) return res.status(404).json({msg:'Token no válido'});
    
    //se guardan los datos en la bd
    const usuario=rows[0];
    //antes de guardar el password lo hasheamos
    const salt=await bcrypt.genSalt(10);
    const newPassword=await bcrypt.hash(password,salt);

    try {
        const sql = `UPDATE usuarios SET password='${newPassword}', token=NULL WHERE id=${usuario.id}`;
        await pool.execute(sql);
        res.json({mensaje:`Se ha actualizado el password correctamente`});
    } catch (error) {
        return res.status(400).json({msg:'Ha habido un error'});
    }
    
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    resetPassword,
    comprobarToken,
    nuevoPassword
}