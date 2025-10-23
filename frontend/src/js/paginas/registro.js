import { imprimirAlerta, validarEmail } from "../funciones.js";
import { URL_API } from "../variables.js"; 

(()=>{

document.addEventListener('DOMContentLoaded',eventListeners);

let usuario={};
const formulario=document.querySelector('.formulario');

const nombreInput=document.querySelector('#nombre');
const apellidosInput=document.querySelector('#apellidos');
const telefonoInput=document.querySelector('#telefono');
const emailInput=document.querySelector('#email');
const passwordInput=document.querySelector('#password');

function eventListeners(){
    formulario.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();
    
    const nombre=nombreInput.value.trim();
    const apellidos=apellidosInput.value.trim();
    const telefono=telefonoInput.value.trim();
    const email=emailInput.value.trim();
    const password=passwordInput.value.trim();
    

    if(!email || !password){
        imprimirAlerta('Los campos EMAIL y PASSWORD son obligatorios','error',formulario);
        return;
    }
    if(!validarEmail){
        imprimirAlerta('Debe usar un email válido','error',formulario);
        return;
    }

    usuario.nombre=nombre;
    usuario.apellidos=apellidos;
    usuario.telefono=telefono;
    usuario.email=email;
    usuario.password=password;

    guardarDatos(usuario);
        
}

function guardarDatos(usuario){
    fetch(`${URL_API}/usuarios`,{
        method:'POST',
        body:JSON.stringify(usuario),
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(data=>{
            if(data.msg){
                imprimirAlerta(data.msg,'error',formulario);
                return;
            }
            //console.log(data.mensaje);
            imprimirAlerta(data.mensaje,'exito',formulario);

        })
        .catch(error=>console.error({'Error':error.message}));
}
})()