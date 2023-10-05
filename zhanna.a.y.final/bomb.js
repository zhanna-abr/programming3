class Bomb {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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
        this.getNewCoordinates()
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }



    explode() {
        let newCell = this.chooseCell(1);
        console.log(newCell)
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

