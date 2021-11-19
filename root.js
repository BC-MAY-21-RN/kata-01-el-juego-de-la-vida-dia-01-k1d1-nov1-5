var cantidadGeneraciones = 5; //Math.floor(Math.random() * (5 - 2)) + 2;
var matriz = [
  ["O","O","O","O","O","O","O","O",],
  ["O","O","O","O","X","O","O","O",],
  ["O","O","O","X","O","O","O","O",],
  ["O","O","O","O","O","O","O","O",]
];
/*
  ------------------------------------------------------------------------------------------
  -----------------------------------REGLAS-------------------------------------------------
  ------------------------------------------------------------------------------------------
  1. Cualquier célula viva con menos de dos vecinos vivos muere, como si fuera causada por la subpoblación.
  2. Cualquier celda viva con más de tres vecinos vivos muere, como por hacinamiento.
  3. Cualquier célula viva con dos o tres vecinos vivos vive para la próxima generación.
  4. Cualquier celda muerta con exactamente tres vecinos vivos se convierte en una celda viva.
*/

let result = document.getElementById('result');

for(var i = 1; i<= cantidadGeneraciones; i++){
    console.log(`Gen ${i}`);

    result.innerHTML += `<h4>Gen: ${i}</h4>`;

    matriz.forEach(renglon => {
      let renglonn = ""
      renglon.map(celula => {
        renglonn += ` ${celula}`
      })
      console.log(renglonn)
      result.innerHTML += renglon + "<br></br>"
    })

    result.innerHTML += "<br></br>"

    matrizPrincipal();
}





function validarEstado (vecinosVivos, celula){
  if(celula == "O" && vecinosVivos < 2 ){
    return "X"
  }else if(celula == "O" && vecinosVivos > 3){
    return "X"
  }else if(celula == "O" && (vecinosVivos == 2 || vecinosVivos == 3)){
    return "O"
  }else if(celula == "X" && vecinosVivos == 3){
    return "O"
  }else if(celula == "X" && vecinosVivos != 3){
    return "X"
  }else {
    console.log("No hay validacion para esto", celula, vecinosVivos)
  }
  // Esta funcion retorna el nuevo estado de la celula
}

function matrizPrincipal(){
  
  
  matriz.map( (renglon, i) => {
    if(i == 0) {
      renglon.map( (celula, index) => {
        primerRenglon(matriz, renglon,  i, index, celula);
      })  
    }
    
    else if(i == matriz.length-1) {
      renglon.map( (celula, index) => {
        ultimoRenglon(matriz, renglon,  i, index, celula);
      })  
  
    }else {
      renglon.map( (celula, index) => {
        renglonesMedio(matriz, renglon,  i, index, celula);
      })  
    }
  })
}


function primerRenglon(matriz, renglon,  i, index, celula){
  let vecinasVivas = 0

  if(index == 0){

    renglon[index+1] == "X" ? null : vecinasVivas++
    matriz[i+1][index] == "X" ? null : vecinasVivas++
    matriz[i+1][index+1] == "X" ? null : vecinasVivas++ 
          
  }else if(index == renglon.length -1) {

    renglon[index-1] == "X" ? null : vecinasVivas++
    matriz[i+1][index] == "X" ? null : vecinasVivas++   
    matriz[i+1][index-1] == "X" ? null : vecinasVivas++ 

  } else {

    renglon[index-1] == "X" ? null : vecinasVivas++
    renglon[index+1] == "X" ? null : vecinasVivas++
    matriz[i+1][index] == "X" ? null : vecinasVivas++
    matriz[i+1][index-1] == "X" ? null : vecinasVivas++   
    matriz[i+1][index+1] == "X" ? null : vecinasVivas++

  }

  matriz[i][index] = validarEstado(vecinasVivas, celula)
}

function ultimoRenglon(matriz, renglon,  i, index, celula){
  let vecinasVivas = 0

    if(index == 0){

      renglon[index+1] == "X" ? null : vecinasVivas++
      matriz[i-1][index] == "X" ? null : vecinasVivas++
      matriz[i-1][index+1] == "X" ? null : vecinasVivas++ 
          
    }else if(index == renglon.length -1) {

      renglon[index+1] == "X" ? null : vecinasVivas++
      matriz[i-1][index] == "X" ? null : vecinasVivas++   
      matriz[i-1][index-1] == "X" ? null : vecinasVivas++ 

    } else {

      renglon[index-1] == "X" ? null : vecinasVivas++
      renglon[index+1] == "X" ? null : vecinasVivas++
      matriz[i-1][index] == "X" ? null : vecinasVivas++
      matriz[i-1][index-1] == "X" ? null : vecinasVivas++   
      matriz[i-1][index+1] == "X" ? null : vecinasVivas++
    }

    matriz[i][index] = validarEstado(vecinasVivas, celula)
}

function renglonesMedio(matriz, renglon,  i, index, celula){
  let vecinasVivas = 0

    if(index == 0){

      renglon[index+1] == "X" ? null : vecinasVivas++
      matriz[i-1][index] == "X" ? null : vecinasVivas++
      matriz[i-1][index+1] == "X" ? null : vecinasVivas++ 
      matriz[i+1][index] == "X" ? null : vecinasVivas++
      matriz[i+1][index+1] == "X" ? null : vecinasVivas++ 
          
    }else if(index == renglon.length -1) {

      renglon[index-1] == "X" ? null : vecinasVivas++
      matriz[i-1][index] == "X" ? null : vecinasVivas++   
      matriz[i-1][index-1] == "X" ? null : vecinasVivas++ 
      matriz[i+1][index] == "X" ? null : vecinasVivas++   
      matriz[i+1][index-1] == "X" ? null : vecinasVivas++ 

    } else {
        
      // Renglon actual
      renglon[index-1] == "X" ? null : vecinasVivas++
      renglon[index+1] == "X" ? null : vecinasVivas++
        
      //renglon anterior
      matriz[i-1][index] == "X" ? null : vecinasVivas++
      matriz[i-1][index-1] == "X" ? null : vecinasVivas++   
      matriz[i-1][index+1] == "X" ? null : vecinasVivas++
        
      // Renglon siguiente
      matriz[i+1][index] == "X" ? null : vecinasVivas++
      matriz[i+1][index-1] == "X" ? null : vecinasVivas++   
      matriz[i+1][index+1] == "X" ? null : vecinasVivas++
    }

    matriz[i][index] = validarEstado(vecinasVivas, celula)
  }