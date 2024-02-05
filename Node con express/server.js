const express = require('express')
const cors = require('cors')
const app =express()
const depart = require('./Rutas/Departamento.js')
const emple = require('./Rutas/Empleado.js')

app.set('port',process.env.PORT || 9000)


// Reglas del CORS
app.use(cors()); // NO MOVER ESTA LÍNEA DE CÓDIGO

// Middleware para analizar el cuerpo de las solicitudes del cliente a servidor 
// sirve para comprender los formularios o data tipo json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routes ---------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})

  /// rutas para peticiones y envio de datos
app.use('/departamento_ruta',depart)
app.use('/empleado_ruta',emple)

//server running ---------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port',app.get('port'))
})