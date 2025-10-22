const registrar=(req,res)=>{
    res.send('Desde api/usuarios');
}

const perfil=(req,res)=>{
    res.send('Desde api/usuarios/perfil');
}

export {
    registrar,
    perfil
}