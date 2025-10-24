import pool from '../config/db.js';

const obtenerVendedores=async (req, res) => {
  try {
    // Obtener una conexión del pool
    const [rows] = await pool.query('SELECT * FROM vendedores');
    res.json(rows);
  } catch (err) {
    res.status(500).json({msg:'Error al ejecutar la consulta'});
  }
}

const obtenerVendedor=async (req, res) => {
  const id=req.params.id;
  try {
    // Obtener una conexión del pool
    const [row] = await pool.query(`SELECT * FROM vendedores WHERE id=${id}`);
    res.json(row);
  } catch (err) {
    res.status(500).json({msg:'Error al ejecutar la consulta'});
  }
}

const crearVendedor=async(req,res)=>{
  let {nombre,apellido,telefono}=req.body;
  if(!nombre) return res.status(400).json({msg:'El campo NOMBRE es obligatorio'});
  if(!apellido) apellido='';
  if(!telefono) telefono='';

  const sql=`INSERT INTO vendedores (nombre,apellido,telefono) VALUES ('${nombre}','${apellido}','${telefono}')`;
  try {
    const [result]=await pool.execute(sql,[nombre,apellido,telefono]);
    res.json({mensaje:`Se ha insertado el vendedor con id ${result.insertId}`}); 
  } catch (error) {
    res.status(500).json({msg:'Error al insertar vendedor'});
  }

}

const actualizarVendedor=async(req,res)=>{
  const id=req.params.id;
  let {nombre,apellido,telefono}=req.body;
  if(!nombre) res.status(400).json({msg:'El campo NOMBRE es obligatorio'});
  if(!apellido) apellido='';
  if(!telefono) telefono='';

  const sql=`UPDATE vendedores SET nombre='${nombre}',apellido='${apellido}',telefono='${telefono}' WHERE id=${id}`;
  try {
    const [result]=await pool.execute(sql,[nombre,apellido,telefono]);
    res.json({mensaje:`Se ha actualizado el vendedor`});
  } catch (error) {
    res.status(500).json({msg:'Error al actualizar vendedor'});
  }

}

const eliminarVendedor=async(req,res)=>{
  const id=req.params.id;
  const sql=`DELETE FROM vendedores WHERE id=${id}`;
  try {
    const [result]=await pool.execute(sql);
    res.json({mensaje:`Se ha eliminado el vendedor`});
  } catch (error) {
    res.status(500).json({msg:'Error al eliminar vendedor'});
  }
}

export {
    obtenerVendedores,
    crearVendedor,
    actualizarVendedor,
    obtenerVendedor,
    eliminarVendedor
}