document.addEventListener('DOMContentLoaded',function(){
    eventListeners();
    darkMode();
});

function darkMode(){
    const botonDarkMode=document.querySelector('.dark-mode-boton');
    botonDarkMode.addEventListener('click',function(){
        document.body.classList.toggle('dark-mode');
    });
}

function eventListeners(){
    const mobilMenu=document.querySelector('.mobile-menu');
    mobilMenu.addEventListener('click',navegacionResponsive);
}

function navegacionResponsive(){
    const navegacion=document.querySelector('.navegacion');
    navegacion.classList.toggle('mostrar');
}