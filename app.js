function getPuzzle(){
  $.ajax({url: 'http://localhost:9393/api/v1/puzzles', success: function(result){
    $("#puzzle").html(result)
  }})
}
