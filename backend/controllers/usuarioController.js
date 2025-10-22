import pool from '../config/db.js';

const registrar=async(req,res)=>{
    let {nombre,apellidos,password,email,telefono}=req.body;

    if(!email || !password){
        res.json({msg:'Los campos EMAIL y PASSWORD son obligatorios'});
        return;
    }

    if(!nombre) nombre='';
    if(!apellidos) apellidos='';
    if(!telefono) telefono='';

    try {
        const sql = `INSERT INTO usuarios (nombre, apellidos, password, email, telefono) VALUES ('${nombre}','${apellidos}','${password}','${email}','${telefono}')`;
        const result = await pool.execute(sql, [nombre, apellidos, password,email,telefono]);
        res.json({mensaje:`El registro se ha guardado correctamente, con id=${result[0].insertId}`});

    } catch (error) {
        console.log(error);
        res.json({msg:'Ha habido un error'});
    }

    res.json({url:'Desde api/usuarios'});
}

const perfil=(req,res)=>{
    res.json({url:'Desde api/usuarios/perfil'});
}

export {
    registrar,
    perfil
}