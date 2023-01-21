// Inicializacion de variablles
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 0;
let tiempoRegresivoId = null;

//audio
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let correctAudio = new Audio('./sounds/correct.wav');
let errorAudio = new Audio('./sounds/error.wav');

//apuntando a documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");

let mostrarAciertos = document.getElementById("aciertos");

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

let mostrarTiempo = document.getElementById("tiempoRestante")
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//Funciones
function contarTiempo(){
  tiempoRegresivoId = setInterval(()=>{
    timer++;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`; if(timer == 40){
      clearInterval(tiempoRegresivoId);
      alert("Game Over - Se acabó el tiempo 😭")
      bloquearTarjetas(numeros);
      loseAudio.play();
  
    }
  }, 1000)
  
}

function bloquearTarjetas(){
  for(let i = 0; i<=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

// Funcion principal

function destapar(id) {
  if(temporizador == false){
    contarTiempo();
    temporizador = true;
  }



  tarjetasDestapadas++;
  //   console.log(tarjetasDestapadas);
  if (tarjetasDestapadas == 1) {
    //Mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
    clickAudio.play();

    //deshabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;
    clickAudio.play();

    //deshabilitar segundo boton
    tarjeta2.disabled = true;

    //movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasDestapadas = 0;

      //aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      correctAudio.play();


      if(aciertos === 8){
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}😲 ` 
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}👏😎 `
        
        
        winAudio.play();
        alert("¡Has ganado!")
      }



    } else {
      //Mostrar un momento y volver a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
        errorAudio.play();
      }, 800);
    }
  }
}
