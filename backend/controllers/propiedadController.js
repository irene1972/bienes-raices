import pool from '../config/db.js';
import {formatDateISO} from '../src/js/funciones.js';

const obtenerPropiedades=async (req, res) => {
  try {
    // Obtener una conexión del pool
    const [rows] = await pool.query('SELECT * FROM propiedades');
    res.json(rows);
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).send('Error interno del servidor');
  }
}

const crearPropiedad=async(req,res)=>{
  let {titulo,precio,imagen,descripcion,habitaciones,wc,estacionamiento,creado}=req.body;
  if(!titulo || !precio || !imagen){
    return res.status(400).json({msg:'Los campos TITULO, PRECIO e IMAGEN son obligatorios'});
  }

  if(!descripcion) descripcion='';
  if(!habitaciones) habitaciones=0;
  if(!wc) wc=0;
  if(!estacionamiento) estacionamiento=0;
  
  const currentDate = new Date();
  if(!creado) creado=formatDateISO(currentDate);

  const sql = `INSERT INTO propiedades (titulo, precio, imagen, descripcion, habitaciones, wc, estacionamiento, creado) VALUES ('${titulo}','${precio}','${imagen}','${descripcion}','${habitaciones}','${wc}','${estacionamiento}','${creado}')`;
  try {
    const [result] = await pool.execute(sql, [titulo, precio, imagen,descripcion,habitaciones,wc,estacionamiento,creado]);
    console.log('Propiedad insertada con ID:', result.insertId);
    return res.json({mensaje:`Se ha insertado la propiedad con id: ${result.insertId}`});
  } catch (err) {
    console.error('Error al insertar propiedad:', err);
    return res.status(500).json({msg:err.message});
  }
}

const obtenerPropiedad=async(req,res)=>{
  const id=req.params.id;
  try {
    // Obtener una conexión del pool
    const [row] = await pool.query(`SELECT * FROM propiedades WHERE id=${id}`);
    res.json(row);
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).send('Error interno del servidor');
  }
}

const actualizarPropiedad=async (req,res)=>{
  const id=req.params.id;
  const {titulo, precio, imagen, descripcion, habitaciones, wc, estacionamiento}=req.body;
  if(!titulo || !precio || !imagen) return res.status(400).json({msg:'Los campos TITULO, PRECIO e IMAGEN son obligatorios'});
  if(!descripcion) descripcion='';
  if(!habitaciones) habitaciones=0;
  if(!wc) wc=0;
  if(!estacionamiento) estacionamiento=0;

  const sql = `UPDATE propiedades SET titulo='${titulo}', precio='${precio}', imagen='${imagen}', descripcion='${descripcion}', habitaciones='${habitaciones}', wc='${wc}', estacionamiento='${estacionamiento}' WHERE id='${id}'`;
  try {
    const [result] = await pool.execute(sql, [titulo, precio, imagen,descripcion,habitaciones,wc,estacionamiento]);
    console.log('Propiedad modificado con ID:', result.insertId);
    return res.json({mensaje:`Se ha modificado la propiedad con id: ${result.insertId}`});
  } catch (err) {
    console.error('Error al modificar propiedad:', err);
    return res.status(500).json({msg:err.message});
  }

}

const eliminarPropiedad=async (req,res)=>{
  const id=req.params.id;
  const sql = `DELETE FROM propiedades WHERE id=${id}`;
  try {
    // Ejecutamos la consulta SQL para eliminar datos
    const [result] = await pool.execute(sql); 
    // Mostramos el resultado de la operación
    console.log('Propiedad eliminada con ID:', result.insertId);
    return res.json({mensaje:`Se ha eliminado la propiedad`});
  } catch (error) {
    // Manejamos cualquier error que ocurra durante la eliminación de datos
    console.error('Error al eliminar datos:', error);
    return res.status(500).json({msg:error.message});
  } 

}

export {
    obtenerPropiedades,
    crearPropiedad,
    obtenerPropiedad,
    actualizarPropiedad,
    eliminarPropiedad
}