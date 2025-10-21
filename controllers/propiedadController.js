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
    console.log('Usuario insertado con ID:', result.insertId);
    return res.json({mensaje:`Se ha insertado el usuario con id: ${result.insertId}`});
  } catch (err) {
    console.error('Error al insertar usuario:', err);
    return res.status(500).json({msg:err.message});
  }
}

export {
    obtenerPropiedades,
    crearPropiedad
}