class Simulation{

  constructor(simulation){
    this.game_board = simulation["game_board"]
    this.past_moves_board = simulation["past_moves_board"]
    this.board_size = [this.game_board["rows"], this.game_board["cols"]]
    this.current = this.past_moves_board.length-2
    this.delay = 1000
    this.setBoard(this.game_board["rows"], this.game_board["cols"], this.past_moves_board[this.past_moves_board.length-1]["pieces"], this.past_moves_board[0]["special_square"])
  }

  runSim(){
    setTimeout(function render(){
      debugger
      let fromSpace; let toSpace
      if (simulator.current >= 0) {
        fromSpace = [simulator.past_moves_board[simulator.current]["last_move_squares"]["from"]["row"], simulator.past_moves_board[simulator.current]["last_move_squares"]["from"]["col"]]
        toSpace = [simulator.past_moves_board[simulator.current]["last_move_squares"]["to"]["row"], simulator.past_moves_board[simulator.current]["last_move_squares"]["to"]["col"]]
      } else {
        fromSpace = [simulator.game_board["board"]["last_move_squares"]["from"]["row"], simulator.game_board["board"]["last_move_squares"]["from"]["col"]]
        toSpace = [simulator.game_board["board"]["last_move_squares"]["to"]["row"], simulator.game_board["board"]["last_move_squares"]["to"]["col"]]
      }
      let index = simulator.getId(fromSpace)
      simulator.changeBoard(fromSpace, toSpace)
      if (!simulator.paused && simulator.current >= 0){
        simulator.current -= 1
        setTimeout(render, simulator.delay)
      }
    }, simulator.delay)
  }

  getId(space){
    return this.board_size[1]*space[0]+space[1]-1
  }

  setBoard(rows, cols, pieces, special_square){
    $("#simulator").empty()
    while (pieces.includes('/')){pieces = pieces.replace('/', '')}
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        let space_class = "spot"
        // debugger
        let img_src = "<img id='piece' src='./css/"
        i%2 === j%2 ? space_class += " white" : space_class += " black"
        if (special_square) { if (special_square['row'] === i+1 && special_square['col'] === j+1) { space_class += " special" } }
        if (pieces[i*cols+j] !== 'e'){
          img_src += pieces[i*cols+j].toUpperCase() === pieces[i*cols+j] ? 'W' : 'B'
          img_src += (pieces[i*cols+j].toUpperCase()+".png'></img>")
        } else {
          img_src = "<span id='piece'></span>"
        }
        $("#simulator").append(`<span id=${i*this.board_size[1]+j} class='${space_class}'>${img_src}</span>`)
        if (j === cols - 1) {$("#simulator").append("<br>")}
      }
    }
  }

  changeBoard(fromSpace, toSpace){
    let fromIndex = this.getId(fromSpace); let toIndex = this.getId(toSpace)
    $("#"+toIndex).empty().prepend($("#"+fromIndex).children()[0])
    $("#"+fromIndex).prepend("<span id='piece'></span>")
  }

}
