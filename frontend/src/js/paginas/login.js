import { imprimirAlerta } from "../funciones.js";
import { URL_API } from "../variables.js";

(()=>{

document.addEventListener('DOMContentLoaded',eventListeners);

const formulario=document.querySelector('.formulario');

const emailInput=document.querySelector('#email');
const passwordInput=document.querySelector('#password');

function eventListeners(){
    formulario.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();
    
    const email=emailInput.value.trim();
    const password=passwordInput.value.trim();

    if(!email || !password){
        imprimirAlerta('Los dos campos son obligatorios','error',formulario);
        return;
    }
    iniciarSesion(email,password);
}

function iniciarSesion(email,password){
    const usuario={email,password};
    fetch(`${URL_API}/usuarios/login`,{
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
            //almacenar token en storage
            const token=data.token;
            localStorage.setItem("token", token);

            window.location.replace(`/frontend`);
        })
        .catch(error=>console.error({'Error':error.message}));
}

})()