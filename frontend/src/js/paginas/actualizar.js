 import {imprimirAlerta,autenticarUsuario} from '../funciones.js';
 import {URL_BACKEND} from '../variables.js';
 
(()=>{
    const divContenedor=document.querySelector('.invisible');

    const idInput=document.querySelector('#id200');
    const tituloInput=document.querySelector('#titulo200');
    const precioInput=document.querySelector('#precio200');
    const imagenInput=document.querySelector('#imagen200');
    const descripcionInput=document.querySelector('#descripcion200');
    const habitacionesInput=document.querySelector('#habitaciones200');
    const wcInput=document.querySelector('#wc200');
    const estacionamientoInput=document.querySelector('#estacionamiento200');
    
    const formulario=document.querySelector('form.actualizar200');

    document.addEventListener('DOMContentLoaded',function(){
        //verificar la autenticación del usuario
        autenticarUsuario();
        const token = localStorage.getItem("token");
        if(token){
            divContenedor.classList.remove('invisible');
        }

        //console.log(document.title);
        formulario.addEventListener('submit',modificarPropiedad);
    
        cargarPropiedad();
            
       
    });

     
    function cargarPropiedad(){
        //console.log('cargar propiedad');
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");
        
        fetch(`${URL_BACKEND}/api/propiedades/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            
            if(data.length === 0){
                imprimirAlerta('No hay resultados','error',formulario);
                return;
            }
            const propiedad=data[0];

            idInput.value=propiedad.id;
            tituloInput.value=propiedad.titulo;
            precioInput.value=propiedad.precio;
            imagenInput.value=propiedad.imagen;
            descripcionInput.value=propiedad.descripcion;
            habitacionesInput.value=propiedad.habitaciones;
            wcInput.value=propiedad.wc;
            estacionamientoInput.value=propiedad.estacionamiento;
            
        })
        .catch(error => console.error('Error:', error.message));
    }

    function modificarPropiedad(e){
        e.preventDefault();
        const id=idInput.value;
        let propiedad={
            titulo:tituloInput.value,
            precio:precioInput.value,
            imagen:imagenInput.value,
            descripcion:descripcionInput.value,
            habitaciones:habitacionesInput.value,
            wc:wcInput.value,
            estacionamiento:estacionamientoInput.value
        }

        fetch(`${URL_BACKEND}/api/propiedades/${id}`, {
            method: "PUT",
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
                propiedad={};
                
            })
            .catch(err => console.log(err));
    }
        
})()