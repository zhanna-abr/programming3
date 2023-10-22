
let LivingCreature = require('./LivingCreature')
let random = require("./random");

module.exports = class Hunter extends LivingCreature {

    constructor(x,y, index) {
        super(x,y,index)
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
     }
     

    mul() {
        let newCell = random(this.chooseCell(0));

        if (newCell) {

            let newHunter = new Hunter(newCell[0], newCell[1], 4);

            hunterArr.push(newHunter);

            matrix[newCell[1]][newCell[0]] = 4;

        }
    }




    die() {
        matrix[this.y][this.x] = 0;
        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);//[[1,2],[2,3]]
                break;
            }
        }
    }

    move() {
        if (this.energy > 0) {
            let emptyCells = this.chooseCell(0)
            let oneEmptyCell = random(emptyCells)
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0
                let newX = oneEmptyCell[0]
                let newY = oneEmptyCell[1]
                matrix[newY][newX] = 4
                this.y = newY
                this.x = newX
                this.energy--;
            }
        }
        else {
            this.die();
        }
    }

    eat() {

        let predatorCells = this.chooseCell(3);
        let newCell = predatorCells[Math.floor(Math.random() * predatorCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            for (let i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 12) {
                this.mul();
            }
        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }


}

