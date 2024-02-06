import { departamento } from '../Model/departamento.js';
/*import {Empleado} from '../Model/empleado.js';*/

 (function() {
      switch (document.body.id){
            case  'Departamento':


          console.log('entro1')
              const boton = document.getElementById('Boton_Departamento'); 
              const dept= new departamento();
              const ad= dept.ValidarNombre('Juanitos')
              const a= dept.obtenerDatosDeTabla();
              console.log(a)

              a.then( (data)=>{

               console.log(data)

              }

              ) 


              boton.addEventListener('click', function(event) {
                  event.stopPropagation(); // Detiene la propagación del evento
                  event.preventDefault(); // Previene el comportamiento predeterminado del evento
                  let nombre = document.getElementById('NombreDepartamento').value;
                  let localidad = document.getElementById('DireccionDepartamento').value;
                  let correo = document.getElementById('CorreoDepartamento').value;
                  let telefono =  document.getElementById('TelefonoDepartamento').value;
                  if(dept.ValidarCamposVacios(nombre, localidad, correo,telefono)== 0){
                    console.log('entro2')
                     //para separar el numero de telefono
                     let numeros = telefono.split(" ");
                     let codInt = parseInt(numeros[0].replace("+", ""));
                     let  codArea= parseInt(numeros[1]);
                     let numero = parseInt(numeros[2]);
                     if(confirm("Seguro que desea insertar este departamento?")){
                        dept.IngresarDatosObjeto(nombre,  localidad, correo, telefono);
                        console.log("///////////////////////////////////")
                        console.log(dept.ValidarNombre(dept.Nombre))
                        dept.ValidarNombre(dept.Nombre).then((valor)=>{
                              if(valor) alert('puto')
                              else alert('no eres puto ')
                        })     
                     }
 
                     
                  }
                   
               })
          break;
      }
 })();


 function llenartabla(){
  fetch("http://localhost:9000/departamento_ruta/Buscar")
       .then((response)=>response.json())
       .then((departamentos)=>{
            let tablausuario = document.querySelector("#table-usuario tbody");
            for(const itemusuario  of departamentos){
              let tr= "<tr> <td>" + itemusuario.deptnumero + "</td><td>" + itemusuario.nombre + "</td><td>"+itemusuario.correo +"</td><td>" + itemusuario.localidad +"</td></tr>"
              tablausuario.innerHTML +=tr
            }
       })
 }

 llenartabla()

   