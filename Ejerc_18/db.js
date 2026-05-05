// Configuro la conexión a MySQL 
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config()

//Creo el pool de conexiones para la BD
export const conexionBD = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port
});