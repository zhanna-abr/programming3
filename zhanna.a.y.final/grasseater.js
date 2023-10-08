

class GrassEater extends LivingCreature{
    constructor(x,y,index) {
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

            let newGrassE = new GrassEater(newCell[0], newCell[1], 2);

            grassEatArr.push(newGrassE);

            matrix[newCell[1]][newCell[0]] = 2;

        }
    }

    die() {
    
        matrix[this.y][this.x] = 0;
        for (let i in grassEatArr) {
            if (this.x == grassEatArr[i].x && this.y == grassEatArr[i].y) {
                grassEatArr.splice(i, 1);
                break;
            }
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        let grassCells = this.chooseCell(1);
        let newCell = grassCells[Math.floor(Math.random() * grassCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            for (let i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
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