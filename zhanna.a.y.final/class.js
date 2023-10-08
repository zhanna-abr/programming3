class Grass extends LivingCreature{
    constructor(x,y, index) {
      super(x,y, index)
        this.multiply = 0;

       
    }




    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newGrass = new Grass(newCell[0], newCell[1], 1);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
     

        }
    }



}