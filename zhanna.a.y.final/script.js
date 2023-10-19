var side = 40;
let bombCounter = 0;
const sideX = 30;
const sideY = 30;
const socket = io()

function setup() {
    createCanvas(side * sideX, side * sideY);
    background('#acacac');

}

// let xAxis = -1;
// let yAxis = -1;

function drawful (matrix) {
    // bombCounter++;
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


    // if (bombCounter == 2) {
    //     xAxis = Math.floor(random(0, matrix[0].length));
    //     yAxis = Math.floor(random(0, matrix.length));
    //     console.log(xAxis)
    //     console.log(yAxis)

    //     matrix[yAxis][xAxis] = 5;
    //     fill("black");
    //     rect(xAxis * side, yAxis * side, side, side);
    //     let newBomb = new Bomb(xAxis, yAxis);
    //     newBomb.explode();
    //     bombCounter = 0;
    //     matrix[yAxis][xAxis] = 0;
    // }



}

socket.on('update matrix', drawful )


