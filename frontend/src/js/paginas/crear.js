(()=>{
const formulario=document.querySelector('.formulario');
//const archivoInput = document.getElementById('#imagen');
const vendedorSelect=formulario.querySelector('#vendedor');
let propiedad={};
let vendedores=[];

document.addEventListener('DOMContentLoaded',eventListeners);

function eventListeners(){
    
    formulario.addEventListener('submit',validarForm);
    imprimirSelect();
}

function validarForm(e){
    e.preventDefault();
    
    const tituloInput=formulario.querySelector('#titulo');
    const precioInput=formulario.querySelector('#precio');
    const imagenInput=formulario.querySelector('#imagen');
    const descripcionInput=formulario.querySelector('#descripcion');
    const habitacionesInput=formulario.querySelector('#habitaciones');
    const wcInput=formulario.querySelector('#wc');
    const estacionamientoInput=formulario.querySelector('#estacionamiento');

    const titulo=tituloInput.value.trim();
    const precio=precioInput.value.trim();
    const imagen=imagenInput.value.trim();
    const descripcion=descripcionInput.value.trim();
    const habitaciones=habitacionesInput.value;
    const wc=wcInput.value;
    const estacionamiento=estacionamientoInput.value;
    const vendedor=vendedorSelect.value;

    if(!titulo || !precio || !imagen){
        imprimirAlerta('Los campos TITULO, PRECIO e IMAGEN son obligatorios','error',formulario);
        return
    }
    propiedad.titulo=titulo;
    propiedad.precio=precio;
    propiedad.imagen=imagen;
    propiedad.descripcion=descripcion;
    propiedad.habitaciones=habitaciones;
    propiedad.wc=wc;
    propiedad.estacionamiento=estacionamiento;
    propiedad.vendedor=vendedor;

    //console.log(propiedad);
    guardarPropiedad(propiedad,imagenInput);
}

function guardarPropiedad(propiedad){
    
    fetch(`http://localhost:4000/api/propiedades`, {
        method: "POST",
        body: JSON.stringify(propiedad),
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
            imprimirAlerta('Ha sido guardado correctamente','exito',formulario);
            tituloInput.value='';
            precioInput.value='';
            imagenInput.value='';
            descripcionInput.value='';
            
        })
        .catch(err => console.log(err));
}

function imprimirSelect(){
        fetch(`http://localhost:4000/api/vendedores`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach((vendedor)=>{
                console.log(vendedor);
                const opcion=document.createElement('OPTION');
                opcion.value=vendedor.id;
                opcion.textContent=vendedor.nombre;
                vendedorSelect.appendChild(opcion);
            });
        })
        .catch(error => console.error('Error:', error.message));
}

})()