
let LivingCreature = require('./LivingCreature')
let random = require("./random");



    module.exports = class Bomb extends LivingCreature {
    constructor(x,y, index) {
         super(x,y, index)
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
     




    explode() {
        let newCell = this.chooseCell(1);
        if (newCell) {
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    if (matrix[y][x] == 1) {
                        for (let a = 0; a < newCell.length; a++) {
                            matrix[newCell[a][0]][newCell[a][1]] = 0;
                            for (let i in grassArr) {
                                if (grassArr[i].x == a[0] && grassArr[i].y == a[1]) {
                                    grassArr.splice(i, 1);
                                    break;
                                }
                            }

                        }
                    }
                  

                }
            }
        }




    }

}
