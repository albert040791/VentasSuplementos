//CARGAR PAGINA.

document.addEventListener('DOMContentLoaded',function(){
    const email={
    email:'',
    asunto:'',
    cc:'',
    mensaje:''


    }
    
   
    //CrearVaribles
    const formulario=document.querySelector('#formulario');
    const inputEmail=document.querySelector('#email');
    const inputAsunto=document.querySelector('#asunto');
    const inputCc=document.querySelector('#cc');
    const inputMensaje=document.querySelector('#mensaje');
    const btnFormulario=document.querySelector('#formulario button[type="submit"]');
    const btnReset=document.querySelector('#formulario button[type="submit"]');
    const spinner=document.querySelector('#spinner');

    inputEmail.addEventListener('blur',leerDatos);
    inputAsunto.addEventListener('blur',leerDatos);
    inputCc.addEventListener('blur',leerDatos);
    inputMensaje.addEventListener('blur',leerDatos);

    formulario.addEventListener('submit',enviarEmail);
    btnReset.addEventListener('click',e=>{

        e.preventDefault()
        restablecerFormulario();
    })

    

    function leerDatos(e){


        if(e.target.value.trim()==='')
        {   //limpiarAlerta(e.target.parentElement)
            console.log(`El campo ${e.target.id} No puede estar vacio.`);
            email[e.target.name]='';
            mostrarAlerta(`El campo ${e.target.id} No puede estar vacio.`,e.target.parentElement);
            console.log(email);
            enviarMail();

            return
        }


        if(e.target.type==="email" &&!ValidarMail(e.target.value))
        {   limpiarAlerta(e.target.parentElement)
            mostrarAlerta('Debe colocar una dirección de correo valida',e.target.parentElement)
            console.log(email)
            email[e.target.name]='';
            enviarMail();
            return


        }

        //llenar objeto
        limpiarAlerta(e.target.parentElement)

        email[e.target.name]=e.target.value.trim().toLowerCase();
       
        console.log(email)
        enviarMail();
    }

    //Enviando Mail

    function enviarMail()
    {
        if(email.email===''||email.asunto===''||email.cc===''||email.mensaje==='')
        {
            btnFormulario.classList.add('opacity-50');
            btnFormulario.disabled=true;
        }

        else{

            btnFormulario.classList.remove('opacity-50');
            btnFormulario.disabled=false;
        }
    

    }

    function ValidarMail(email){

        const regex =/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado=regex.test(email);
        return resultado;

    }

    function mostrarAlerta(mensaje,referencia)
    {  limpiarAlerta(referencia);
        const error=document.createElement('P');
        error.textContent=mensaje;
        error.classList.add('bg-red-600','text-white','P-2');
        referencia.appendChild(error);


    }

    function limpiarAlerta(referencia)
    {
        const alerta=document.querySelector('.bg-red-600');
        if(referencia && alerta)
        {
            alerta.remove();


        }


    }
//Enviando info
    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        restablecerFormulario();
       

        setTimeout(()=>{

           
            spinner.classList.remove('flex');
        spinner.classList.add('hidden');
       

        const mensajeExitoso=document.createElement('P');
        mensajeExitoso.textContent='El mensaje fue enviado Exitosamente';
        mensajeExitoso.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase')
        formulario.appendChild(mensajeExitoso);
        

        setTimeout(()=>{
            mensajeExitoso.remove();
        },3000);

       
        




    },3000);

    

    }
    function  restablecerFormulario(){
        email.asunto='';
        email.cc='';
        email.mensaje='';
        email.email='';
        formulario.reset();
        enviarMail();
        


    }









})

