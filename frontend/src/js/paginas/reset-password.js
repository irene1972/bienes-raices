import { imprimirAlerta } from "../funciones.js";
import {URL_API} from "../variables.js";

(()=>{

document.addEventListener('DOMContentLoaded',eventListeners);

const formulario=document.querySelector('.formulario');
const emailInput=document.querySelector('#email');

function eventListeners(){
    formulario.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();
    
    const email=emailInput.value.trim();

    if(!email){
        imprimirAlerta('El campo es obligatorio','error',formulario);
        return;
    }
    solicitarCambioPassword(email);
}

function solicitarCambioPassword(email){
    fetch(`${URL_API}/usuarios/reset-password`,{
        method:'POST',
        body:JSON.stringify({email}),
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(data=>{
            //console.log(data);
            if(data.msg){
                imprimirAlerta(data.msg,'error',formulario);
                return;
            }
            imprimirAlerta(data.mensaje,'exito',formulario);
        })
        .catch(error=>console.log({'Error':error.message}));
}

})()


