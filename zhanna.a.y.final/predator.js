class Predator extends LivingCreature{
    constructor(x,y, index) {
        super(x,y, index)
        this.energy = 10;
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

            let predator = new Predator(newCell[0], newCell[1], 3);

            predatorArr.push(predator);

            matrix[newCell[1]][newCell[0]] = 3;

        }
    }



    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
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
                matrix[newY][newX] = 3
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

        let grassEaterCells = this.chooseCell(2);
        let newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            for (let i in grassEatArr) {
                if (grassEatArr[i].x == newX && grassEatArr[i].y == newY) {
                    grassEatArr.splice(i, 1);
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

