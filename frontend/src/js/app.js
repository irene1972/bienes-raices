import {cargarCasasYDepsEnVenta,autenticarUsuario} from './funciones.js';

(()=>{
const nav=document.querySelector('.navegacion');

document.addEventListener('DOMContentLoaded',function(){
    //si auth se muestra el botón admin
    autenticarUsuario();
    const token = localStorage.getItem("token");

    if(token){
        const aAdmin=document.createElement('A');
        aAdmin.textContent='Admin';
        aAdmin.href='/frontend/admin/';
        nav.appendChild(aAdmin);
    }

    eventListeners();
    darkMode();
    cargarCasasYDepsEnVenta(3);
});

function darkMode(){
    const prefiereDarkMode=window.matchMedia('(prefers-color-scheme:dark)');

    if(prefiereDarkMode.matches){
        document.body.classList.add('dark-mode');
    }else{
        document.body.classList.remove('dark-mode');
    }

    prefiereDarkMode.addEventListener('change',function(){
        if(prefiereDarkMode.matches){
        document.body.classList.add('dark-mode');
    }else{
        document.body.classList.remove('dark-mode');
    }
    });

    const botonDarkMode=document.querySelector('.dark-mode-boton');
    botonDarkMode.addEventListener('click',function(){
        document.body.classList.toggle('dark-mode');
    });
}

function eventListeners(){
    const mobilMenu=document.querySelector('.mobile-menu');
    const aCerrarSesion=document.querySelector('.cerrar-sesion');
    mobilMenu.addEventListener('click',navegacionResponsive);
    aCerrarSesion.addEventListener('click',function(){
        localStorage.removeItem("token");
        window.location.reload();

    });
}

function navegacionResponsive(){
    const navegacion=document.querySelector('.navegacion');
    navegacion.classList.toggle('mostrar');
}
    


})()