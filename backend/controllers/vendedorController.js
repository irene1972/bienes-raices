import pool from '../config/db.js';

const obtenerVendedores=async (req, res) => {
  try {
    // Obtener una conexión del pool
    const [rows] = await pool.query('SELECT * FROM vendedores');
    res.json(rows);
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).send('Error interno del servidor');
  }
}

export {
    obtenerVendedores
}