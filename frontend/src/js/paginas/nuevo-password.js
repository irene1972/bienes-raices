import { imprimirAlerta } from "../funciones.js";
import { URL_API } from "../variables.js";

(()=>{

document.addEventListener('DOMContentLoaded',eventListers);

const formulario=document.querySelector('.formulario');
const passwordInput=document.querySelector('#password');
const repeatPasswordInput=document.querySelector('#repeatPassword');

function eventListers(){
    formulario.addEventListener('submit',validarFormulario)
}

function validarFormulario(e){
    e.preventDefault();

    const password=passwordInput.value.trim();
    const repeatPassword=repeatPasswordInput.value.trim();

    if(!password || !repeatPassword) return imprimirAlerta('Los dos campos son obligatorios','error',formulario);
    if(password !== repeatPassword) return imprimirAlerta('Los dos campos deben ser iguales','error',formulario);
    if(password.length < 6) return imprimirAlerta('El password debe tener al menos 6 carácteres','error',formulario);

    cambiarPassword(password,repeatPassword);

}

function cambiarPassword(password,repeatPassword){
    //extraemos el parámetro token de la url
    const params = new URLSearchParams(document.location.search);
    const token = params.get("token");

    fetch(`${URL_API}/usuarios/reset-password/${token}`,{
        method:'POST',
        body:JSON.stringify({password,repeatPassword}),
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(data=>{
            if(data.msg) return imprimirAlerta(data.msg,'error',formulario);
            return imprimirAlerta(data.mensaje,'exito',formulario);
        })
        .catch(error=>console.error({'Error':error.message}));
}

})()