 
 export class empleado{
    constructor(DI, PNombre, SNombre, PApellido, SApellido, Direccion, fecha_nacimiento, correo) {
        this.documento_identidad= DI;
        this.primernombre=PNombre;
        this.segundonombre= SNombre;
        this.primerapellido= PApellido;
        this.segundoapellido= SApellido;
        this.direccion= Direccion;
        this.fecha_nacimiento= fecha_nacimiento;
        this.correo= correo;
    }
    IngresarValorObtjeto(DI, PNombre, SNombre, PApellido, SApellido, Direccion, fecha_nacimiento, correo){
      this.documento_identidad= DI;
      this.primernombre=PNombre;
      this.segundonombre= SNombre;
      this.primerapellido= PApellido;
      this.segundoapellido= SApellido;
      this.direccion= Direccion;
      this.fecha_nacimiento= fecha_nacimiento;
      this.correo= correo;
    }
   ValidarCamposTextos(DI, PNombre, SNombre, PApellido, SApellido, Direccion, correo, telefono, Dept){
    let contador =0
    ///para validar checkbox
    if(Dept==0){
      alert("Error Debes elegir en que departamento trabaja el empleado");
      contador++ 
    }   
    ///Para validar nombres y apellidos
    if(PNombre.length ==0){
        alert("El campo de primer nombre, no puede estar vacio, debe llenarlo");
        contador++  
    }else if(/^[a-zA-ZñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(PNombre) == false){
        alert("Error en Primer Nombre, no se aceptan caracteres especiales");
        contador++ 
    }
    if(SNombre.length ==0){
      alert("El campo de segundo nombre, no puede estar vacio, debe llenarlo");
      contador++  
    }else if(/^[a-zA-ZñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(SNombre) == false){
        alert("Error en Segundo Nombre, no se aceptan caracteres especiales");
        contador++ 
    }
    if(PApellido.length ==0){
      alert("El campo de primer apellido, no puede estar vacio, debe llenarlo");
      contador++  
    }else if(/^[a-zA-ZñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(PApellido) == false){
        alert("Error en Primer Apellido, no se aceptan caracteres especiales");
        contador++ 
    }
    if(!(SApellido.length == 0)){
      if(/^[a-zA-ZñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(SApellido) == false){
        alert("Error en Segundo Apellido, no se aceptan caracteres especiales");
        contador++ 
      }
    }
    
    ///// Para validad el DI 
    if(DI.length ==0){
      alert("El documento de identidad no puede estar vacio, debe llenarlo");
      contador++  
    }else if(/^[\d]{6,8}$/.test(DI) == false){
        alert("Error en documento de identidad, debe tener de 6 a 8 digitos");
        contador++ 
    }
    

    ///////////
    if(Direccion.length==0){
        alert("La direccion no puede estar vacio, debe llenarlo");
        contador++  
    }if(!/^[a-zA-Z0-9ñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(Direccion)){
        alert("Error en Direccion no se aceptan caracteres especiales");
        contador++;
    }

    if(correo.length==0){
        alert("La correo no puede estar vacio, debe llenarlo");
        contador++  
    }else if( /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(correo) == false){
        alert("Error en Correo, no cumple con el formato correo@gmail.com");
        contador++ 
    }

    if(telefono.length==0){
        alert("El telefono no puede estar vacio, debe llenarlo");
        contador++  
    }else if(!/^\+\d{1,2}\s+\d{2,4}\s+\d{6,10}$/.test(telefono)){
        alert("Error en telefono no se aceptan caracteres especiales");
        contador++;
    }
    return contador;
   }


   async obtenerDatosDeTabla() {
    try {
        const response = await fetch("http://localhost:9000/empleado_ruta/Buscar");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return []; // Manejo de errores: retorna un arreglo vacío
    }
}


  async ValidarDI(DI) {
      try {
          const datosTabla =  this.obtenerDatosDeTabla();
          let contador=0;
          await datosTabla.then((datos)=>{
              for (const itemusuario of datos) {
              if (itemusuario.documento_identidad == DI) {
                  contador=contador+1;
              }
              }
          })
          return (contador==0);
      } catch (error) {
          console.error("Error al obtener datos de la tabla:", error);
          return false; // Manejar el error según tus necesidades
      }
  }   

    IngresarDatosEmpleado(empleado,codInt, codArea, numero, pkapartamento){
        fetch('http://localhost:9000/empleado_ruta/Insertar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Aqui se indican los valores de cada parametro que se va a insertar 
              documento_identidad:empleado.documento_identidad,
              primernombre:empleado.primernombre,
              segundonombre: empleado.segundonombre,
              primerapellido:empleado.primerapellido,
              segundoapellido: empleado.segundoapellido,
              direccion: empleado.direccion,
              fecha_nacimiento: empleado.fecha_nacimiento,
              correo:empleado.correo,
              deptnumero: pkapartamento
            })
        })
            .then(response => response.json())
            .then(data => {
              alert("Funciono el ingreso del empleado")
              // this.InsertarDatosTelefono(codInt, codArea, numero, empleado.documento_identidad);    
            })
            .catch(error => {
              console.error('Error al agregar al empleado ingresado:', error);
            });
    }             
           
    
    InsertarDatosTelefono(ci,ca,num, fkempleado){
        fetch('http://localhost:9000/empleado_ruta/InsertarTelefono', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Aqui se indican los valores de cada parametro que se va a insertar 
              codigoint: ci,
                codarea: ca,
                numero: num,  
                di_empleado: fkempleado          
            })
        })
            .then(response => response.json())
            .then(data => {
    
                alert("Funciono el ingreso del telefono")
    
            })
            .catch(error => {
              console.error('Error al agregar el numero de tlf del empleado ingresado:', error);
            });
    }
   
}