class Simulation{

  constructor(simulation){
    this.game_board = simulation["game_board"]
    this.past_moves_board = simulation["past_moves_board"]
    this.setBoard(this.game_board["rows"], this.game_board["cols"], this.game_board["board"]["pieces"])
  }

  setBoard(rows, cols, pieces){
    while (pieces.includes('/')) {pieces = pieces.replace('/', '')}
    let space = '&nbsp'
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        pieces[i*cols+j] !== 'e' ? space = pieces[i*cols+j] : space = '&nbsp'
        if (i%2 === j%2){
            $("#simulator").append(`<span id=${i*j+j} class='spot white'>${space}</span>`)
        } else {
          $("#simulator").append(`<span id=${i*j+j} class='spot black'>${space}</span>`)
        }
        if (j === cols - 1) {$("#simulator").append("<br>")}
      }
    }
  }

}
