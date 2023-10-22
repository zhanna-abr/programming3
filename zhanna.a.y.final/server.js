
var express = require("express");

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static("."));

app.get("/", function (req, res) {

   res.redirect("index.html");

});

server.listen(3000, function () {

   console.log("App is running on port 3000");

});



matrix = [];
grassArr = []
grassEatArr = []
predatorArr = []
hunterArr = []

let Bomb = require('./bomb')
let Grass = require('./class')
let GrassEater = require('./grasseater')
let Hunter = require('./hunter')
let Predator = require('./predator')
let random = require("./random");

var side = 40
var bombCounter = 0


function setupGame() {
   for (let i = 0; i < side; i++) {
      matrix[i] = [];
      for (let g = 0; g < side; g++) {

         matrix[i][g] = Math.round(random(4))
      }
   }

   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 1) {
            let grass = new Grass(x, y, 1)
            grassArr.push(grass)
         }
         else if (matrix[y][x] == 2) {
            let grassEat = new GrassEater(x, y, 2)
            grassEatArr.push(grassEat)
         }
         else if (matrix[y][x] == 3) {
            let predator = new Predator(x, y, 3)
            predatorArr.push(predator)
         }
         else if (matrix[y][x] == 4) {
            let hunter = new Hunter(x, y, 4)
            hunterArr.push(hunter)



         }

      }
   }

}

let xAxis = -1;
let yAxis = -1;

function playGame() {

   // let xAxis = -1;
   // let yAxis = -1;

   // if (xAxis != -1 && yAxis != -1) {
   //    matrix[yAxis][xAxis] == 5;
   // }
   bombCounter++;
   for (let i in grassArr) {
      grassArr[i].mul()
   }
   for (let i in grassEatArr) {
      grassEatArr[i].eat()
   }
   for (let i in predatorArr) {
      predatorArr[i].eat()
   }
   for (let i in hunterArr) {
      hunterArr[i].eat()
   }

   if (bombCounter == 2) {
      xAxis = Math.floor(random(matrix[0].length));
      yAxis = Math.floor(random(matrix.length));

      matrix[yAxis][xAxis] = 5;
      fill("black");
      color = "black"
      rect(xAxis * side, yAxis * side, side, side);
      let newBomb = new Bomb(xAxis, yAxis);
      newBomb.explode();
      bombCounter = 0;
      matrix[yAxis][xAxis] = 0;
   }
   io.emit('update matrix', matrix)
}



io.on("connection", function (socket) {
   socket.emit('update matrix', matrix)
   setupGame()
   startPlaying()
})


let intervalID;

function startPlaying() {
   clearInterval(intervalID)
   intervalID = setInterval(() => {
      playGame()
   }, 1000)
}




