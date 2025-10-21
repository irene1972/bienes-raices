// db.js
const mysql = require('mysql2/promise');
//console.log(process.env.DB_HOST);
const pool = mysql.createPool({
    host: 'localhost', // o la IP del servidor
    user: 'root',
    password: 'root',
    database: 'bienesraices_crud'
    /*
    host: process.env.DB_HOST, // o la IP del servidor
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DB
    */
});

module.exports = pool;