import {imprimirAlerta} from '../funciones.js';
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
        const encabezado4=document.createElement('TH');
        encabezado4.textContent='Acciones';

        fila1.appendChild(encabezado0);
        fila1.appendChild(encabezado1);
        fila1.appendChild(encabezado2);
        fila1.appendChild(encabezado3);
        fila1.appendChild(encabezado4);

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
                const col4=document.createElement('TD');
                col4.classList.add('flex');
                col4.innerHTML=`
                <a href="#" id="${vendedor.id}" class="boton boton-rojo-block eliminar">Eliminar</a>
                <a href="#" id="${vendedor.id}" class="boton boton-naranja-block actualizar">Actualizar</a>
                `;
                
                fila.appendChild(col0);
                fila.appendChild(col1);
                fila.appendChild(col2);
                fila.appendChild(col3);
                fila.appendChild(col4);

                tabla.appendChild(fila);

                let botonEliminar=document.querySelector('a.eliminar');
                let botonActualizar=document.querySelector('a.actualizar');

                for (botonActualizar of document.querySelectorAll('.actualizar')) {
                    // here i add the the event Listener to the button 
                    botonActualizar.addEventListener('click', (e) => {
                        const id=e.target.getAttribute('id');
                        window.location.replace(`/frontend/admin/vendedores/actualizar.html?id=${id}`);
                    });
                }

                botonEliminar.onclick=(e)=>{
                    //console.log(e.target);
                    if (window.confirm("¿Desea eliminar el vendedor?")) {
                        const id=e.target.id;
                        fetch(`${URL_BACKEND}/api/vendedores/${id}`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type':'application/json'
                            }
                            })
                            .then(response => response.json())
                            .then(resultado => {
                                if(resultado.msg){
                                    imprimirAlerta(resultado.msg,'error',main);
                                    return;
                                }
                                imprimirAlerta(resultado.mensaje,'exito',main);

                                setTimeout(()=>{
                                    window.location.reload();
                                },3000);
                                
                                
                            })
                            .catch(err => console.log(err));

                    }
                };

            });
            
        })
        .catch(error => console.error('Error:', error.message));
    }

})()