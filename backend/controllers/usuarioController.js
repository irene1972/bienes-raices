import pool from '../config/db.js';
import generarId from '../helpers/generarId.js';

const registrar=async(req,res)=>{
    let {nombre,apellidos,password,email,telefono}=req.body;

    if(!email || !password){
        res.status(400).json({msg:'Los campos EMAIL y PASSWORD son obligatorios'});
        return;
    }

    if(!nombre) nombre='';
    if(!apellidos) apellidos='';
    if(!telefono) telefono='';

    //validar que el email del usuario no esté duplicado
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE email='${email}'`);
    //console.log(rows);
    
    if(rows.length){
        res.status(400).json({msg:'El email ya está registrado'});
        return;
    }

    //asignar token para guardarlo en la bd
    const token=generarId();

    try {
        const sql = `INSERT INTO usuarios (nombre, apellidos, password, email, telefono,token) VALUES ('${nombre}','${apellidos}','${password}','${email}','${telefono}','${token}')`;
        const result = await pool.execute(sql, [nombre, apellidos, password,email,telefono,token]);
        res.json({mensaje:`El registro se ha guardado correctamente, con id=${result[0].insertId}`});

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Ha habido un error'});
    }

}

const perfil=(req,res)=>{
    res.json({url:'Desde api/usuarios/perfil'});
}

const confirmar=async(req,res)=>{
    const token=req.params.token;
    const [rows]=await pool.query(`SELECT * FROM usuarios WHERE token='${token}'`);
    if(!rows.length){
        res.status(400).json({msg:'Token no válido'});
        return;
    }
    //console.log('usuario confirmado');
    const {id}=rows[0];
    console.log(id);
    const sql = `UPDATE usuarios SET token=NULL, confirmado=1 WHERE id=${id}`;
    try {
        await pool.execute(sql);
        res.json({mensaje:`Se ha confirmado el usuario`});
    } catch (error) {
        res.status(400).json({msg:'Ha habido un error'});
    }
  
}

export {
    registrar,
    perfil,
    confirmar
}