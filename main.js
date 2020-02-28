var nros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var id_tiempo
var primerCuadro = null;
var turnos=0;
init();
document.querySelector("#boton").addEventListener('click', () =>{
    const tablero = document.querySelector("#tablero");
    cronometrar();
    asignarColor(nros);
    manejarEventos(tablero);

});

function init(){

    h = 0;
    m = 0;
    s = 0;

    document.getElementById("hms").innerHTML="Tiempo: 00:00:00";
}     

function cronometrar(){
    escribir();
    id_tiempo = setInterval(escribir,1000);
    document.querySelector("#boton").classList = "ocultarBoton";
}

function pararTiempo(id_tiempo){
    clearInterval(id_tiempo);
}

function escribir(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = "Tiempo: "+ hAux + ":" + mAux + ":" + sAux; 
}
function asignarColor(nros){

    nros = nros.sort( ()=>{
       return Math.random() - 0.5
    });

    for(let i=0; i<nros.length; i++){
        document.querySelector("#col"+(i)).className ='col'+' '+'color'+nros[i]+' '+'oculto';
    }
}

function manejarEventos(tablero){
    tablero.onclick= function(e){

        const elemento = e.target;

        if(elemento.classList.contains('col')){
            manejarEventosClick(elemento);
        }
    }
}

function manejarEventosClick(elemento){
    mostrarCuadro(identificarID(elemento), elemento);
    let cuadroActual = elemento;

    if(primerCuadro === null){
        primerCuadro = cuadroActual;

    }else {
        if(cuadroActual === primerCuadro){
            return;
        }



        turnos++;

        if(cuadrosSonIguales(primerCuadro, cuadroActual)){
            desactivar(primerCuadro);
            desactivar(cuadroActual);
        }else{
            ocultarCuadro(primerCuadro);
            ocultarCuadro(cuadroActual)
        }
        primerCuadro = null;
    }
    
}

function identificarID(elemento){
    let id = elemento.id;


    for(let i = 0; i<nros.length; i++){
        if(id === 'col'+i){
            return i;
        }
    }

}

function mostrarCuadro(id, elemento){
    elemento.className = 'col'+' '+'color'+nros[id];
}

function cuadrosSonIguales(primerCuadro, cuadroActual){

    if(primerCuadro.className === cuadroActual.className){

        return true;
    }else{
        return false;
    }

}

function desactivar(cuadro){
    setTimeout(()=>{
    cuadro.remove();
    cuadro.className = 'col'+' '+'desactivado';
    evaluarFindelJuego();
    },500);
}

function ocultarCuadro(cuadro){
    let id_cuadro = identificarID(cuadro);

    setTimeout(()=>{
        cuadro.className = 'col'+' '+'color'+nros[id_cuadro]+' '+'oculto';
    },500);
    

}
function evaluarFindelJuego(){
    let tablero = document.querySelectorAll(".col");
    if(tablero.length === 0){
        pararTiempo(id_tiempo);
        alert("Fin del juego!! Terminaste en "+turnos+" turnos");
        location.reload();
    }
}
