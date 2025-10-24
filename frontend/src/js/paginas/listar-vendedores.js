//import {imprimirAlerta} from '../funciones.js';
import {URL_BACKEND} from '../variables.js';
import { autenticarUsuario } from '../funciones.js';

(()=>{
    const divContainer=document.querySelector('.response');
    const main=document.querySelector('main.contenedor');

    document.addEventListener('DOMContentLoaded',function(){
        //primero autenticamos al usuario
        
        autenticarUsuario(divContainer);
        const token = localStorage.getItem("token");
        if(token) cargarPagina();
        
        
    });

    function cargarPagina(){
        const botonVerde=document.querySelector('.boton-verde');
        botonVerde.classList.remove('invisible');
        const botonAmarillo=document.querySelector('.boton-amarillo');
        botonAmarillo.classList.remove('invisible');

        const tabla=document.createElement('TABLE');
        tabla.classList.add('tabla');
        const fila1=document.createElement('TR');
        fila1.classList.add('encabezados');
        const encabezado0=document.createElement('TH');
        encabezado0.textContent='Id';
        const encabezado1=document.createElement('TH');
        encabezado1.textContent='Nombre';
        const encabezado2=document.createElement('TH');
        encabezado2.textContent='Apellidos';
        const encabezado3=document.createElement('TH');
        encabezado3.textContent='Telefono';

        fila1.appendChild(encabezado0);
        fila1.appendChild(encabezado1);
        fila1.appendChild(encabezado2);
        fila1.appendChild(encabezado3);

        tabla.appendChild(fila1);

        main.appendChild(tabla);

        fetch(`${URL_BACKEND}/api/vendedores`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            
            data.forEach((vendedor)=>{
                

                const fila=document.createElement('TR');
                const col0=document.createElement('TD');
                col0.textContent=vendedor.id;
                const col1=document.createElement('TD');
                col1.textContent=vendedor.nombre;
                const col2=document.createElement('TD');
                col2.textContent=vendedor.apellido;
                const col3=document.createElement('TD');
                col3.textContent=vendedor.telefono;
                
                fila.appendChild(col0);
                fila.appendChild(col1);
                fila.appendChild(col2);
                fila.appendChild(col3);

                tabla.appendChild(fila);

            });
            
        })
        .catch(error => console.error('Error:', error.message));
    }

})()