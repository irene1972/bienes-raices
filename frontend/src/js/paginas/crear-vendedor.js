import {imprimirAlerta,autenticarUsuario} from '../funciones.js'; 
import {URL_BACKEND} from '../variables.js';

(()=>{

const divContenedor=document.querySelector('.invisible');
const formulario=document.querySelector('.formulario');
//const archivoInput = document.getElementById('#imagen');
const nombreInput=formulario.querySelector('#nombre');
const apellidoInput=formulario.querySelector('#apellido');
const telefonoInput=formulario.querySelector('#telefono');
let vendedor={};

document.addEventListener('DOMContentLoaded',eventListeners);

function eventListeners(){
    //verificar la autenticación del usuario
    autenticarUsuario();
    const token = localStorage.getItem("token");
    if(token){
        divContenedor.classList.remove('invisible');
    }

    formulario.addEventListener('submit',validarForm);
}

function validarForm(e){
    e.preventDefault();
    const nombre=nombreInput.value.trim();
    const apellido=apellidoInput.value.trim();
    const telefono=telefonoInput.value.trim();

    if(!nombre) return imprimirAlerta('El campo NOMBRE es obligatorio','error',formulario);

    vendedor.nombre=nombre;
    vendedor.apellido=apellido;
    vendedor.telefono=telefono;

    guardarVendedor(vendedor);

}

function guardarVendedor(vendedor){
    fetch(`${URL_BACKEND}/api/vendedores`,{
        method:'POST',
        body:JSON.stringify(vendedor),
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(data=>{
            if(data.msg) return imprimirAlerta(data.msg,'error',formulario);
            nombreInput.value='';
            apellidoInput.value='';
            telefonoInput.value='';
            imprimirAlerta(data.mensaje,'exito',formulario);
        })
        .catch(error=>console.error({'Error':error.message}));
}

})()