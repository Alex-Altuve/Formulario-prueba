const { Pool } = require('pg');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const app = express();

const pool = new Pool({
  
  user: 'postgres',
  host: 'localhost',
  database: 'prueba',
  password: 'adminadmin',
  port: 5432

});

app.get('/Buscar',(req,res)=>{
  pool.query('SELECT * FROM empleado', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    res.json(result.rows);
  });
})


module.exports = app;