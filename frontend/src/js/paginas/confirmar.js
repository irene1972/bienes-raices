import { imprimirAlerta } from "../funciones.js";

(()=>{
const divResponse=document.querySelector('.response');

document.addEventListener('DOMContentLoaded',function(){
    //extraemos el parámetro token de la url
    const params = new URLSearchParams(document.location.search);
    const token = params.get("token");

    fetch(`${URL_API}/usuarios/confirmar/${token}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if(data.msg) return imprimirAlerta(data.msg,'error',divResponse);
            imprimirAlerta(data.mensaje,'exito',divResponse);
            
        })
        .catch(error=>console.error({'Error':error.message}));
});

})()