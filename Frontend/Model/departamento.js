export class departamento{ 
    
    constructor(Nombre, Localidad, Correo) {
         this.Localidad = Localidad;
         this.Correo = Correo;   
         this.Nombre = Nombre;    
    }

    ValidarCamposVacios(Nombre,  Localidad, Correo, Telefono){  
       let contador =0
     
        if(Nombre.length ==0){
            alert("El nombre no puede estar vacio, debe llenarlo");
            contador++  
        }else if(/^[a-zA-Z0-9ñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(Nombre) == false){
            alert("Error en Nombre no se aceptan caracteres especiales");
            contador++ 
        }
        if(Localidad.length==0){
            alert("La direccion no puede estar vacio, debe llenarlo");
            contador++  
        }if(!/^[a-zA-Z0-9ñÑ ,.áéíóúÁÉÍÓÚ]+$/.test(Localidad)){
            alert("Error en Direccion no se aceptan caracteres especiales");
            contador++;
        }

        if(Correo.length==0){
            alert("La correo no puede estar vacio, debe llenarlo");
            contador++  
        }else if( /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(Correo) == false){
            alert("Error en Correo, no cumple con el formato correo@gmail.com");
            contador++ 
        }

        if(Telefono.length==0){
            alert("El telefono no puede estar vacio, debe llenarlo");
            contador++  
        }else if(!/^\+\d{1,2}\s+\d{2,4}\s+\d{6,10}$/.test(Telefono)){
            alert("Error en telefono no se aceptan caracteres especiales");
            contador++;
        }
        return contador;
    }
 
    IngresarDatosObjeto(nombre,  localidad, correo){
    
        this.Localidad = localidad;
        this.Correo = correo;   
        this.Nombre = nombre; 
    }
 //// TODO ESTO PROBAR
   
    async obtenerDatosDeTabla() {
        try {
            const response = await fetch("http://localhost:9000/departamento_ruta/Buscar");
            const data = await response.json();
            return data; // Retorna los datos obtenidos
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            return []; // Manejo de errores: retorna un arreglo vacío
        }
    }


    async ValidarNombre(nombre) {
        try {
            const datosTabla = await this.obtenerDatosDeTabla();
            for (const itemusuario of datosTabla) {
                if (nombre.localeCompare(itemusuario.nombre) === 0) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error al obtener datos de la tabla:", error);
            return false; // Manejar el error según tus necesidades
        }
    }
    
    
    IngresarDatosDepartamento(departamento){
        console.log('entro')
        fetch('http://localhost:9001/departamento_ruta/Insertar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Aqui se indican los valores de cada parametro que se va a insertar 
                nombre: departamento.Nombre,
                localidad: departamento.Localidad,
                correo: departamento.Correo    
            })
        })
            .then(response => response.json())
            .then(data => {
    
              this.InsertarDatosTelefono(departamento,ci,ca,num,data)
    
            })
            .catch(error => {
              console.error('Error al agregar el departamento a la bd', error);
            });
    }
    
    InsertarDatosTelefono(ci,ca,num, fkdeptnumero){
        fetch('http://localhost:9001/departamento_ruta/InsertarTelefono', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Aqui se indican los valores de cada parametro que se va a insertar 
                codigoint: ci,
                codarea: ca,
                numero: num,
                deptnumero: fkdeptnumero
            })
        })
            .then(response => response.json())
            .then(data => {
    
                alert("Funciono el ingreso del telefono")
    
            })
            .catch(error => {
              console.error('Error al agregar el numero del departamento ingresado:', error);
            });
    }
   
}
