import {imprimirAlerta,autenticarUsuario} from '../funciones.js'; 
import {URL_BACKEND} from '../variables.js';

(()=>{
const divContenedor=document.querySelector('.invisible');
const formulario=document.querySelector('.formulario');
//const archivoInput = document.getElementById('#imagen');
const vendedorSelect=formulario.querySelector('#vendedor');
const tituloInput=formulario.querySelector('#titulo');
const precioInput=formulario.querySelector('#precio');
const imagenInput=formulario.querySelector('#imagen');
const descripcionInput=formulario.querySelector('#descripcion');
const habitacionesInput=formulario.querySelector('#habitaciones');
const wcInput=formulario.querySelector('#wc');
const estacionamientoInput=formulario.querySelector('#estacionamiento');
let propiedad={};

document.addEventListener('DOMContentLoaded',eventListeners);

function eventListeners(){
    //verificar la autenticación del usuario
    autenticarUsuario();
    const token = localStorage.getItem("token");
    if(token){
        divContenedor.classList.remove('invisible');
    }

    formulario.addEventListener('submit',validarForm);
    imprimirSelect();
}

function validarForm(e){
    e.preventDefault();

    const titulo=tituloInput.value.trim();
    const precio=precioInput.value.trim();
    const imagen=imagenInput.value.trim();
    const descripcion=descripcionInput.value.trim();
    const habitaciones=habitacionesInput.value;
    const wc=wcInput.value;
    const estacionamiento=estacionamientoInput.value;
    //const vendedor=vendedorSelect.value;

    if(!titulo || !precio || !imagen){
        imprimirAlerta('Los campos TITULO, PRECIO e IMAGEN son obligatorios','error',formulario);
        return
    }
    propiedad.titulo=titulo;
    propiedad.precio=precio;
    propiedad.imagen=imagen;
    propiedad.descripcion=descripcion;
    propiedad.habitaciones=habitaciones;
    propiedad.wc=wc;
    propiedad.estacionamiento=estacionamiento;
    //propiedad.vendedor=vendedor;

    //console.log(propiedad);
    guardarPropiedad(propiedad,imagenInput);
}

function guardarPropiedad(propiedad){

    fetch(`${URL_BACKEND}/api/propiedades`, {
        method: "POST",
        body: JSON.stringify(propiedad),
        headers: {
                'Content-Type':'application/json'
        }
        })
        .then(response => response.json())
        .then(resultado => {
            if(resultado.msg){
                imprimirAlerta(resultado.msg,'error',formulario);
                propiedad={};
                return;
            }
            imprimirAlerta('Ha sido guardado correctamente','exito',formulario);
            tituloInput.value='';
            precioInput.value='';
            imagenInput.value='';
            descripcionInput.value='';
            habitacionesInput.value='';
            wcInput.value='';
            estacionamientoInput.value='';
            propiedad={};

            setTimeout(()=>{
                window.location.replace(`/frontend/admin`);
            },3000);
            
        })
        .catch(err => console.log(err));
}

function imprimirSelect(){
    
        fetch(`${URL_BACKEND}/api/vendedores`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            data.forEach((vendedor)=>{
                //console.log(vendedor);
                const opcion=document.createElement('OPTION');
                opcion.value=vendedor.id;
                opcion.textContent=vendedor.nombre;
                vendedorSelect.appendChild(opcion);
            });
        })
        .catch(error => console.error('Error:', error.message));
}

})()