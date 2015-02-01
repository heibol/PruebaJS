var tablero, direccion;
var obstaculo = [ 
                    [200 , 0],
                    [200 , 50],
                    [200 , 100],
                    [200 , 150],
                    [200 , 200],

                    [100 , 200],
                    [50 , 200],
                    [0 , 200],

                    [150 , 350],
                    [200 , 350], 
                    [250 , 350], 
                    [300 , 350], 
                    [350 , 350], 
                    [400 , 350], 
                    [450 , 350], 
                ];


var teclas = {

    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT:39
}

var fondo = //objeto con colección de variables
{
    imagenURL: "img/fondo.png",
    imagenOK: false
};

var tifis = {
    x: 50,
    y: 50,

    frenteURL: "img/diana-frente.png",
    frenteOK: false,
    atrasURL: "img/diana-atras.png",
    atrasOK: false,
    derURL: "img/diana-der.png",
    derOK: false,
    izqURL: "img/diana-izq.png",
    izqOK: false,
    velocidad: 50
};

var liz = {

    x: 400,
    y: 200,
    lizURL: "img/liz.png",
    lizOK: false

};

function inicio(){
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");
    
    fondo.imagen = new Image();     //imagen es una variable dentro de fondo
    fondo.imagen.src = fondo.imagenURL;
    fondo.imagen.onload = confirmarFondo; // que se dispare cuando cargue la imagen

    tifis.frente = new Image();
    tifis.frente.src = tifis.frenteURL;
    tifis.frente.onload = confirmarFrente;

    tifis.atras = new Image();
    tifis.atras.src = tifis.atrasURL;
    tifis.atras.onload = confirmarAtras;

    tifis.izq = new Image();
    tifis.izq.src = tifis.izqURL;
    tifis.izq.onload = confirmarIzq;

    tifis.der = new Image();
    tifis.der.src = tifis.derURL;
    tifis.der.onload = confirmarDer;

    liz.lizzy = new Image();
    liz.lizzy.src = liz.lizURL;
    liz.lizzy.onload = confirmarLiz;

    /*var m = document.getElementById("mover");
    m.addEventListener("click",movimiento); */

    document.addEventListener("keydown", teclado); // keydown es un evento que hace referencia al teclado
}

/*function dibujar(){

    tablero.drawImage(fondo.imagen, 0,0);
}*/

function obstaculos(x, y){
    var bandera = true;
    obstaculo.forEach(function(punto, index){
        if (x == punto[0] && y == punto[1]) {
            bandera = false;
        };
    });
    return bandera;
}

function teclado(datos){
    var codigo = datos.keyCode; // Guardo en codigo el num de la letra oprimida

    if (codigo == teclas.UP){
        mover_y = tifis.y - tifis.velocidad;
        if ( (mover_y >= 0) && obstaculos(tifis.x, mover_y) ) {
            tifis.y -= tifis.velocidad
        }
    }
    if (codigo == teclas.DOWN){
        mover_y = tifis.y + tifis.velocidad;
        if( (mover_y <= 450) && obstaculos(tifis.x, mover_y) ) {
            tifis.y += tifis.velocidad
        }
    }
    if (codigo == teclas.LEFT){
        mover_x = tifis.x - tifis.velocidad;
        if ( (mover_x >= 0) && obstaculos(mover_x, tifis.y) ) {
            tifis.x -= tifis.velocidad
        }
    }
    if (codigo == teclas.RIGHT){
        mover_x = tifis.x + tifis.velocidad;
        if( (mover_x <= 450) && obstaculos(mover_x, tifis.y) ){
            tifis.x += tifis.velocidad
        }
    }

    direccion = codigo;
    dibujar();
}

function confirmarFondo(){

    fondo.imagenOK = true;
    dibujar();

}

function confirmarFrente(){

    tifis.frenteOK = true;
    dibujar();

}

function confirmarAtras(){

    tifis.atrasOK = true;
    dibujar();

}

function confirmarIzq(){

    tifis.izqOK = true;
    dibujar();

}

function confirmarDer(){

    tifis.derOK = true;
    dibujar();

}

function confirmarLiz(){

    liz.lizOK = true;
    dibujar();

}

function dibujar() {

    //Capa 1: Fondo
    if(fondo.imagenOK == true){
        tablero.drawImage(fondo.imagen, 0,0);
    }

    //Capa 2: Liz
    //Como lizOk es booleana no necesito comparar

    if(liz.lizOK){
        tablero.drawImage(liz.lizzy, liz.x, liz.y);
    }

    //Capa 3: Tifis
    var tifiDibujo = tifis.frente;
    if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK){

        if(direccion == teclas.UP){

            tifiDibujo = tifis.atras;
        }
        if(direccion == teclas.DOWN){

            tifiDibujo = tifis.frente;
        }
        
        if(direccion == teclas.LEFT){

            tifiDibujo = tifis.izq;
        }
        
        if(direccion == teclas.RIGHT){

            tifiDibujo = tifis.der;
        }
        
        tablero.drawImage(tifiDibujo, tifis.x, tifis.y);
    }
    
}

function movimiento(){
    tifis.x += 10;
    dibujar();
}