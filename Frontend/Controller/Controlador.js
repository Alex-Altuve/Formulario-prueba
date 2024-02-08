import { departamento } from '../Model/departamento.js';
import {empleado} from '../Model/empleado.js';

 (function() {
      switch (document.body.id){
          case  'Departamento':
              llenartabla();
              const boton = document.getElementById('Boton_Departamento'); 
              const dept= new departamento();
              boton.addEventListener('click', function(event) {
                  event.stopPropagation(); // Detiene la propagación del evento
                  event.preventDefault(); // Previene el comportamiento predeterminado del evento
                  let nombre = document.getElementById('NombreDepartamento').value;
                  let localidad = document.getElementById('DireccionDepartamento').value;
                  let correo = document.getElementById('CorreoDepartamento').value;
                  let telefono =  document.getElementById('TelefonoDepartamento').value;


                  if(dept.ValidarCamposVacios(nombre, localidad, correo,telefono)== 0){
                     //para separar el numero de telefono
                     let numeros = telefono.split(" ");
                     let codInt = parseInt(numeros[0].replace("+", ""));
                     let  codArea= parseInt(numeros[1]);
                     let numero = parseInt(numeros[2]);

                     if(confirm("Seguro que desea insertar este departamento?")){
                         dept.IngresarDatosObjeto(nombre,  localidad, correo, telefono);
                        dept.ValidarNombre(dept.Nombre).then((valor)=>{
                              if(valor){
                                   dept.IngresarDatosDepartamento(dept,codInt, codArea,numero);
                              }else{
                                   alert('No puede registrar un departamento que ya este registrado (no puede repetirse)')
                              } 
                        })     
                     }
 
                     
                  }
                   
               })
          break;
          case 'Empleado':
               const boton_emp = document.getElementById('Boton_empleado'); 
               const dept2= new departamento();
               const CheckBoxDept = document.getElementById('CheckBoxDepartamento');
               const emple = new empleado();
               ///llenar el combo box
               dept2. BuscarDatosDept(LLenarCheckBoxDepartamento);
               llenartablaEmp();

               boton_emp.addEventListener('click', function(event) {
                   event.stopPropagation(); // Detiene la propagación del evento
                   event.preventDefault(); // Previene el comportamiento predeterminado del evento

                   let cadena = parseInt(CheckBoxDept.value);
                   let primerN = document.getElementById('Pnombre').value;
                   let segundoN = document.getElementById('Snombre').value;
                   let primerA = document.getElementById('Papellido').value;
                   let segundoA = document.getElementById('Sapellido').value;
                   let DI = document.getElementById('DIempleado').value;
                   let telefono =document.getElementById('TelefonoEmpleado').value;
                   let  fecha_nac = document.getElementById('FechaNacEmpleado').value;
                   let correo = document.getElementById('CorreoEmpleado').value;
                   let direccion =document.getElementById('DireccionEmpleado').value;
                   
                   if(emple.ValidarCamposTextos(DI,primerN,segundoN, primerA, segundoA, direccion, correo, telefono,cadena)==0){
                         //para separar el numero de telefono
                         let numeros = telefono.split(" ");
                         let codInt = parseInt(numeros[0].replace("+", ""));
                         let  codArea= parseInt(numeros[1]);
                         let numero = parseInt(numeros[2]);
                         if(confirm("Seguro que desea insertar este departamento?")){   
                              emple.IngresarValorObtjeto(parseInt(DI),primerN,segundoN, primerA, segundoA, direccion,fecha_nac,correo);
                              emple.ValidarDI(parseInt(DI)).then((valor)=>{
                                   if(valor){
                                        emple.IngresarDatosEmpleado(emple,codInt,codArea, numero,cadena);
                                   }else{
                                        alert('No puede registrar un empleado que ya este registrado (no puede repetirse) ')
                                   } 
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




 function llenartablaEmp(){
     fetch("http://localhost:9000/empleado_ruta/Buscar")
          .then((response)=>response.json())
          .then((empleadoD)=>{
               let tablaemp = document.querySelector("#table-empleados tbody");
               for(const itemusuario  of empleadoD){
                 let tr= "<tr> <td>" + itemusuario.documento_identidad + "</td><td>" + itemusuario.primernombre + "</td><td>"+itemusuario.segundonombre +"</td><td>" + itemusuario.primerapellido + "</td><td>"+itemusuario.segundoapellido + "</td><td>"+itemusuario.direccion+"</td><td>"+itemusuario.fecha+"</td><td>"+itemusuario.correo +"</td><td>"+itemusuario.deptnumero+"</td></tr>"
                 tablaemp.innerHTML +=tr
               }
          })
    }
   

      
/////////// Check box Region////////////

function LLenarCheckBoxDepartamento(data,id){

     const selectElement = document.getElementById(id);
     
         data.forEach(item =>{
             const option = document.createElement("option");
             option.text = item.nombre;
             option.value = item.deptnumero; 
             selectElement.appendChild(option);
         });
     }
     