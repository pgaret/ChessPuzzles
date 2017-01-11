function getPuzzle(){
  $.ajax({
    dataType: 'json',
    url: 'http://chess-puzzles.herokuapp.com/api/v1/puzzles',
    success: function(result){
      $("#puzzle").html(result)
    }
  })
}
