import {imprimirAlerta} from '../funciones.js';

(()=>{
    
    document.addEventListener('DOMContentLoaded',function(){
        //console.log(document.title);
        
        cargarPropiedades();
        
    });

    const main=document.querySelector('main.main300');

    function cargarPropiedades(){
        const tabla=document.createElement('TABLE');
        tabla.classList.add('tabla');
        const fila1=document.createElement('TR');
        fila1.classList.add('encabezados');
        const encabezado1=document.createElement('TH');
        encabezado1.textContent='Título';
        const encabezado2=document.createElement('TH');
        encabezado2.textContent='Precio';
        const encabezado3=document.createElement('TH');
        encabezado3.textContent='Descripción';
        const encabezado4=document.createElement('TH');
        encabezado4.textContent='Acciones';

        fila1.appendChild(encabezado1);
        fila1.appendChild(encabezado2);
        fila1.appendChild(encabezado3);
        fila1.appendChild(encabezado4);

        tabla.appendChild(fila1);

        main.appendChild(tabla);

        fetch(`http://localhost:4000/api/propiedades`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            data.forEach((propiedad)=>{
                //console.log(vendedor);

                const fila=document.createElement('TR');
                const col1=document.createElement('TD');
                col1.textContent=propiedad.titulo;
                const col2=document.createElement('TD');
                col2.textContent=propiedad.precio;
                const col3=document.createElement('TD');
                col3.textContent=propiedad.descripcion;
                const col4=document.createElement('TD');
                col4.classList.add('flex');
                col4.innerHTML=`
                <a href="#" id="${propiedad.id}" class="boton boton-rojo-block eliminar">Eliminar</a>
                <a href="#" id="${propiedad.id}" class="boton boton-naranja-block actualizar">Actualizar</a>
                `;
                
                fila.appendChild(col1);
                fila.appendChild(col2);
                fila.appendChild(col3);
                fila.appendChild(col4);

                tabla.appendChild(fila);

                let botonEliminar=document.querySelector('a.eliminar');
                //const botonActualizar=document.querySelector('a.actualizar');

                for (let botonActualizar of document.querySelectorAll('.actualizar')) {
                    // here i add the the event Listener to the button 
                    botonActualizar.addEventListener('click', (e) => {
                        const id=e.target.getAttribute('id');
                        window.location.replace(`/frontend/admin/propiedades/actualizar.html?id=${id}`);
                    });
                }
                
                botonEliminar.onclick=(e)=>{
                    //console.log(e.target);
                    if (window.confirm("¿Desea eliminar la propiedad?")) {
                        const id=e.target.id;
                        fetch(`http://localhost:4000/api/propiedades/${id}`, {
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