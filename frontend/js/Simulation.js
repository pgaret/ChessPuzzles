class Simulation{

  constructor(simulation){
    this.game_board = simulation["game_board"]
    this.past_moves_board = simulation["past_moves_board"]
    this.board_size = [this.game_board["rows"], this.game_board["cols"]]
    this.current = this.past_moves_board.length-2
    this.delay = 500
    this.direction = 1
    this.runningSim = false
    this.takenPieces=[]
    this.paused = false
    this.setBoard(this.game_board["rows"], this.game_board["cols"], this.past_moves_board[this.past_moves_board.length-1]["pieces"], this.past_moves_board[0]["special_square"])
  }

  runSim(){
    this.runningSim = true
    setTimeout(function render(){
      // debugger
      if (!simulator.paused){
        if ((simulator.direction > 0 && simulator.current > -2 && simulator.current+1 < simulator.past_moves_board.length) || (simulator.direction < 0 && simulator.current > -2 && simulator.current+1 < simulator.past_moves_board.length)){
          let fromSpace; let toSpace
          if (simulator.current >= 0) {
            fromSpace = [simulator.past_moves_board[simulator.current]["last_move_squares"]["from"]["row"], simulator.past_moves_board[simulator.current]["last_move_squares"]["from"]["col"]]
            toSpace = [simulator.past_moves_board[simulator.current]["last_move_squares"]["to"]["row"], simulator.past_moves_board[simulator.current]["last_move_squares"]["to"]["col"]]
          } else {
            fromSpace = [simulator.game_board["board"]["last_move_squares"]["from"]["row"], simulator.game_board["board"]["last_move_squares"]["from"]["col"]]
            toSpace = [simulator.game_board["board"]["last_move_squares"]["to"]["row"], simulator.game_board["board"]["last_move_squares"]["to"]["col"]]
          }
          simulator.changeBoard(fromSpace, toSpace)
          this.runningSim = false
          setTimeout(render, simulator.delay)
          simulator.current -= simulator.direction
        }
        else {
          if (simulator.current === -2) {simulator.current += 1}
          simulator.runningSim = false
          $("#play").css("display", "inline-block")
          $("#pause").css("display", "none")
        }
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
        let img_src = "<img id='piece' src='./css/"
        i%2 === j%2 ? space_class += " white" : space_class += " black"
        if (special_square) { if (special_square['row'] === i+1 && special_square['col'] === j+1) { space_class += " special" } }
        if (pieces[i*cols+j] !== 'e'){
          img_src += pieces[i*cols+j].toUpperCase() === pieces[i*cols+j] ? 'B' : 'W'
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
    // debugger
    let fromIndex; let toIndex
    if (this.direction === 1){
      fromIndex = this.getId(fromSpace); toIndex = this.getId(toSpace)
    } else {
      fromIndex = this.getId(toSpace); toIndex = this.getId(fromSpace)
    }
    let orig_copy = $("#"+fromIndex).children()
    let temp = orig_copy.clone().appendTo('body')
    if (!$("#"+toIndex).children().is('span')){
      let img_src = $("#"+toIndex).children().prop('src')
      img_src = "."+img_src.slice(img_src.length - 11, img_src.length)
      this.takenPieces.push([img_src, this.current, this.direction])
    }
    $("#"+toIndex).empty()
    let new_copy = orig_copy.clone().appendTo("#"+toIndex)
    let oldOffset = orig_copy.offset()
    $("#"+fromIndex).empty().append("<span id='piece'></span>")
    let newOffset = new_copy.offset()
    for (let i = 0; i < this.takenPieces.length; i++){
      if (this.takenPieces[i][1] === this.current && this.takenPieces[i][2] !== this.direction){
        // debugger
        $("#"+fromIndex).empty().append(`<img sid="piece" src=${this.takenPieces[i][0]}></img>`)
      }
    }
    temp
      .css('position', 'absolute')
      .css('left', oldOffset.left)
      .css('top', oldOffset.top)
      .css('zIndex', 1000)
    new_copy.css("display", "none")
    temp.animate({'top': newOffset.top, 'left':newOffset.left}, this.delay, function(){
       new_copy.css("display", "block")
       temp.remove()
    })
  }

}
