import {URL_BACKEND} from '../variables.js';

(()=>{

document.addEventListener('DOMContentLoaded',function(){
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const id=searchParams.get("id");

    fetch(`${URL_BACKEND}/api/propiedades/${id}`,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(data=>{
            const {titulo,imagen,precio,wc,estacionamiento,habitaciones} = data[0];
            const h1=document.querySelector('.anuncio h1');
            h1.textContent=titulo;
            const picture=document.querySelector('.anuncio picture');
            picture.innerHTML=`
                <source  srcset="${imagen}.webp" type="image/webp">
                <source  srcset="${imagen}.jpg" type="image/jpeg">
                <img loading="lazy" src="${imagen}.jpg" alt="imagen de la propiedad">
            `;
            const parrafoPrecio=document.querySelector('p.precio');
            parrafoPrecio.textContent=`$${precio}`;
            const ulIconos=document.querySelector('.iconos-caracteristicas');
            ulIconos.innerHTML=`
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
            `;
            
        })
        .catch(err=>console.error('Error:',err.message));
});

})()