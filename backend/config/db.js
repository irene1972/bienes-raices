import {DB_HOST, DB_USER, DB_PASS, DB_NAME_DB} from '../src/js/variables.js';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: DB_HOST, // o la IP del servidor
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME_DB
});

export default pool;