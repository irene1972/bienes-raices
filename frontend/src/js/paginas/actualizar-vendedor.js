import {imprimirAlerta,autenticarUsuario} from '../funciones.js';
 import {URL_BACKEND} from '../variables.js';
 
(()=>{
    const divContenedor=document.querySelector('.invisible');

    const idInput=document.querySelector('#id');
    
    const formulario=document.querySelector('form.actualizar');
    const nombreInput=document.querySelector('#nombre');
    const apellidoInput=document.querySelector('#apellido');
    const telefonoInput=document.querySelector('#telefono');

    document.addEventListener('DOMContentLoaded',function(){
        //verificar la autenticación del usuario
        autenticarUsuario();
        const token = localStorage.getItem("token");
        if(token){
            divContenedor.classList.remove('invisible');
        }

        //console.log(document.title);
        formulario.addEventListener('submit',modificarVendedor);
    
        cargarVendedor();
            
       
    });

    function cargarVendedor(){
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");
        
        fetch(`${URL_BACKEND}/api/vendedores/${id}`, {
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
            const vendedor=data[0];

            idInput.value=vendedor.id;
            nombreInput.value=vendedor.nombre;
            apellidoInput.value=vendedor.apellido;
            telefonoInput.value=vendedor.telefono;
            
        })
        .catch(error => console.error('Error:', error.message));
    }

    function modificarVendedor(e){
        e.preventDefault();
        const id=idInput.value;

        if(!nombreInput.value)return imprimirAlerta('El campo NOMBRE es obligatorio','error',formulario);

        const datos={
            nombre:nombreInput.value,
            apellido:apellidoInput.value,
            telefono:telefonoInput.value,
        }

        fetch(`${URL_BACKEND}/api/vendedores/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                    'Content-Type':'application/json'
            }
            })
            .then(response => response.json())
            .then(resultado => {
                if(resultado.msg){
                    imprimirAlerta(resultado.msg,'error',formulario);
                    return;
                }
                imprimirAlerta(resultado.mensaje,'exito',formulario);
                
            })
            .catch(err => console.log(err));
            
    }
})()