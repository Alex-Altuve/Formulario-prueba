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


app.get('/Buscar', async (req,res) => {
  pool.query('SELECT * from departamento', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    // Envía los datos como un objeto JSON
    res.json(result.rows );
  });
});

app.post('/Insertar', async (req, res) => {

  const datos = req.body;
  try {
    const query = 'INSERT INTO Departamento (nombre, localidad, correo) VALUES ($1, $2, $3) RETURNING deptnumero';
    result= await pool.query(query, [
      datos.nombre,
      datos.localidad,
      datos.correo
    ]);

    res.json(result.rows[0].deptnumero);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al insertar datos');
  }
});

app.post('/InsertarTelefono', async (req, res) => {
  const datos = req.body;
  try {
    const query = ` insert into telefono (deptnumero,codigoint, codarea, numero)
                   VALUES ($1, $2, $3, $4, $5, $6)`;
     result= await pool.query(query, [
      datos.deptnumero,
      datos.CI,
      datos.CA,
      datos.Numero
    ]);

    res.json('Se ingreso el numero de telefono de la empresa');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al insertar datos');
  }
});

module.exports = app;