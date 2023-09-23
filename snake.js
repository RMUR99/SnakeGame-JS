var blocksize = 25 ;
var rows = 20; 
var cols =30 ; 
var board ;
var context ; 


//snake head 
var snakeX = blocksize*5 ;
var snakeY = blocksize*5;

//speed 
var velocityX = 0;
var velocityY = 0 ;

//Array for the snake body 

var snakeBody = [];

//food 
var foodX ;
var foodY ;


//Game over 

var gameOver = false; 

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize ; 
    board.width = cols * blocksize;
    
    // to draw on the board 
    context = board.getContext("2d"); 

    foodLocation();
    document.addEventListener("keyup" , changeDirection)
    //update(); 
    setInterval(update, 1000/10);
}


function update(){
    if ( gameOver) {
        return ;
    }


    context.fillStyle = "black";
    context.fillRect(0,0,board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY , blocksize, blocksize);

    //collision 
    if ( snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX , foodY])
        foodLocation();
    }

    for (let i = snakeBody.length-1 ; i >0 ; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX , snakeY];
    }
    context.fillStyle = "lightgreen";
    snakeX += velocityX *blocksize; 
    snakeY += velocityY *blocksize;
    context.fillRect(snakeX, snakeY , blocksize, blocksize);
    for (let i =0 ; i < snakeBody.length ; i++) {

        context.fillRect(snakeBody[i][0] , snakeBody[i][1] ,blocksize , blocksize);
    }
  
    // GAME OVER CONDITIONS 
     if ( snakeX <0 || snakeX > cols *blocksize || snakeY <0 || snakeY > rows *blocksize){
        gameOver =true ; 
        alert("GAME OVER !");
     }
     for (let i = 0 ; i<snakeBody.length ; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver=true; 
            alert("GAME OVER !");
        }
     }

}

function foodLocation(){
    foodX = Math.floor(Math.random() *cols ) *blocksize;
    foodY = Math.floor(Math.random() *rows ) *blocksize;
}

function changeDirection(e){
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0 ; 
    velocityY = -1;
  }

  else if (e.code == "ArrowDown" && velocityY != -1 ) {
    velocityX = 0 ; 
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1 ; 
    velocityY = 0;
  }

  else if (e.code == "ArrowRight" &&  velocityX != -1) {
    velocityX = 1 ; 
    velocityY = 0;
  }
}