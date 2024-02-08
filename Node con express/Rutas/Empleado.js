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
  pool.query("SELECT documento_identidad, primernombre, segundonombre, primerapellido, segundoapellido, direccion, to_char(fecha_nacimiento, 'dd/mm/yyyy') as fecha, correo, deptnumero  FROM empleado", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    res.json(result.rows);
  });
})

app.get('/BuscarDepartamento',(req,res)=>{
  pool.query('SELECT nombre, deptnumero FROM departamento', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    res.json(result.rows);
  });
})



app.post('/Insertar', async (req, res) => {

  const datos = req.body;
  try {
    const query = 'INSERT INTO Empleado (documento_identidad, primernombre, segundonombre, primerapellido, segundoapellido, direccion, fecha_nacimiento, correo, deptnumero) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    result= await pool.query(query, [
      datos.documento_identidad,
      datos.primernombre,
      datos.segundonombre,
      datos.primerapellido,
      datos.segundoapellido,
      datos.direccion,
      datos.fecha_nacimiento,
      datos.correo,
      datos.deptnumero,
    ]);

    res.json('Se ingreso el empleado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al insertar datos');
  }
});

app.post('/InsertarTelefono', async (req, res) => {
  const datos = req.body;
  try {
    const query = ` insert into telefono (codigoint, codarea, numero, di_empleado)
                   VALUES ($1, $2, $3, $4)`;
     result= await pool.query(query, [
      datos.codigoint,
      datos.codarea,
      datos.numero,
      datos.di_empleado
      
    ]);

    res.json('Se ingreso el numero de telefono de la empresa');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al insertar datos');
  }
});


module.exports = app;