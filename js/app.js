


//definicion de variables

const listaSuplementos=document.querySelector('#lista-suplementos');
const listacarrito=document.querySelector('#lista-carrito tbody');
const carrito=document.querySelector('#carrito');
const vaciasCarrito=document.querySelector('#vaciar-carrito');
let articulosCarrito=[];



cargarEventList();

function  cargarEventList()
{
listaSuplementos.addEventListener('click',seleccionSuplementos);
carrito.addEventListener('click',BorrarCurso);
vaciasCarrito.addEventListener('click',vaciarTotal);
}


function seleccionSuplementos(e)

{   e.preventDefault();
    if(e.target.classList.contains('agregar-carrito'))
{
    const cursoSeleccionado=e.target.parentElement.parentElement;
    leerDatos(cursoSeleccionado)
}
}

function leerDatos(e)
{
    const datosSuplemento={
        imagen:e.querySelector('img').src,
        nombre:e.querySelector('h4').textContent,
        precio:e.querySelector("span").textContent,
        idSuplemento:e.querySelector('a').getAttribute('data-id'),
        Cantidad:1

        

    }
//Comprobar si existe elemento en el carrito


        const existente=articulosCarrito.some(curso=>curso.idSuplemento==datosSuplemento.idSuplemento)
        if(existente)
        {
            const cursos=articulosCarrito.map(curso=>{

                if(curso.idSuplemento===datosSuplemento.idSuplemento)
                {
                    curso.Cantidad++;

                    return curso;



                }
                else{


                    return curso;
                } 
            });
            articulosCarrito=[...cursos];



        }
        else{
            articulosCarrito=[...articulosCarrito,datosSuplemento];

        }


    
    limpiarHtml();
    llenarCarrito()


}

function limpiarHtml(){

    while(listacarrito.firstChild){

        listacarrito.firstChild.remove();

    }



}

function llenarCarrito()
{       limpiarHtml();

    
    articulosCarrito.forEach(curso=>{
        const {imagen,nombre,precio,Cantidad,idSuplemento}=curso;

        const row=document.createElement('tr');
        row.innerHTML=`
        <td> <img src="${imagen}"  width=100></img>  </td>
        <td >${nombre}</td>
        <td >${precio}</td>
        <td >${Cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${idSuplemento}">X </a></td>`;
  
        listacarrito.appendChild(row);
    

    })
    


}

function BorrarCurso(e)
{
    if(e.target.classList.contains("borrar-curso"))
    {   
        const idCurso=e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(curso=>curso.idSuplemento!=idCurso);
        llenarCarrito();
        


    }


}

function vaciarTotal(){
    
    articulosCarrito=[];
    llenarCarrito();


}