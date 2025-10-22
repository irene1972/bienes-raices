
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
    