var matrix = [];

var side = 40;
let bombCounter = 0;

let grassArr = []
let grassEatArr = []
let predatorArr = []
let hunterArr = []



function setup() {


    for (let i = 0; i < side; i++) {
        matrix[i] = [];
        for (let g = 0; g < side; g++) {

            matrix[i][g] = Math.round(random(0, 4))
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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

function draw() {
    bombCounter++;
    if (xAxis != -1 && yAxis != -1) {
        matrix[yAxis][xAxis] == 5;
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green")
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#fa3ca8");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else {
                fill("#acacac");
            }

            rect(x * side, y * side, side, side);



        }
    }
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
        xAxis = Math.floor(random(0, matrix[0].length));
        yAxis = Math.floor(random(0, matrix.length));
         console.log(xAxis)
         console.log(yAxis)

        matrix[yAxis][xAxis] = 5;
        fill("black");
        rect(xAxis * side, yAxis * side, side, side);
        let newBomb = new Bomb(xAxis, yAxis);
        newBomb.explode();
        bombCounter = 0;
        matrix[yAxis][xAxis] = 0;
    }



}


