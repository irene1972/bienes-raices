import {URL_BACKEND,URL_API} from './variables.js';

export function imprimirAlerta(mensaje,tipo,referencia){
    const alertaPrevia=document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
        return;
    }

    const alerta=document.createElement('DIV');
    alerta.classList.add(tipo, 'alerta');
    alerta.textContent=mensaje;
    referencia.appendChild(alerta);

    setTimeout(()=>{
        alerta.remove();
    },3000);
    
}

export function cargarCasasYDepsEnVenta(num){
    const contenedor=document.querySelector('.contenedor-anuncios');

    fetch(`${URL_BACKEND}/api/propiedades/varias/${num}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'        }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            data.forEach(propiedad=>{
                let anuncio=document.createElement('DIV');
                const {titulo,descripcion,precio,imagen,habitaciones,estacionamiento,wc,id}=propiedad;
                
                anuncio.classList.add('anuncio');
                anuncio.innerHTML=`
                <picture>
                    <source  srcset="${imagen}.webp" type="image/webp">
                    <source  srcset="${imagen}.jpg" type="image/jpeg">
                    <img loading="lazy" src="${imagen}.jpg" alt="anuncio">
                </picture>
                <div class="contenido-anuncio">
                    <h3>${titulo}</h3>
                    <p>${descripcion}</p>
                    <p class="precio">$${precio}</p>
                    <ul class="iconos-caracteristicas">
                        <li>
                            <img class="icono" loading="lazy" src="build/img/icono_wc.svg" alt="icono wc">
                            <p>${wc}</p>
                        </li>
                        <li>
                            <img class="icono" loading="lazy" src="build/img/icono_estacionamiento.svg" alt="icono estacionamiento">
                            <p>${estacionamiento}</p>
                        </li>
                        <li>
                            <img class="icono" loading="lazy" src="build/img/icono_dormitorio.svg" alt="icono habitaciones">
                            <p>${habitaciones}</p>
                        </li>
                    </ul>
                    <a href="anuncio.html?id=${id}" class="boton-amarillo-block">
                        Ver Propiedad
                    </a>
                </div>
                `
                contenedor.appendChild(anuncio);

            });
        })
        .catch(error=>console.error('Error',error.message));
}
    
export function validarEmail(email) {
    // Expresión regular para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

export function autenticarUsuario(referencia){
        //extraemos de local storage el token
        const token = localStorage.getItem("token");

        fetch(`${URL_API}/usuarios/admin`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response=>response.json())
            .then(data=>{
                //console.log(data.admin.nombre);
                if(data.msg) {
                    localStorage.removeItem('token');
                    if(referencia){
                        imprimirAlerta(data.msg,'error',referencia);
                        return;
                    }
                    
                };
                //mensaje saludo
                const divDerecha=document.querySelector('.derecha');
                const parrafo=document.createElement('P');
                parrafo.textContent=`Hola ${data.admin.nombre}`;
                parrafo.classList.add('saludo');
                divDerecha.prepend(parrafo);
                
            })
            .catch(error=>console.error({'Error':error.message}));

    }