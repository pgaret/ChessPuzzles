$(document).ready(function(){
  $.ajax({
    dataType: 'json',
    url: 'http://chess-puzzles.herokuapp.com/api/v1/puzzles',
    success: function(results){
      $("#puzzle").html(results)
      console.log(results)
      for (let i = 0; i < results.length; i++){
        let puzzle_data = results[i]["game_board"]["Puzzle_No"]+" | "+results[i]["game_board"]["Rating"]+" | "+results[i]["game_board"]["Played_times"]
        let str = `<button onClick='simulate(${results[i]['ind']})'>${puzzle_data}</button><br>`
        $("#menu").append(str)
      }
    }
  })
})

function simulate(id){
  $.ajax({
    dataType: 'json',
    url: 'http://chess-puzzles.herokuapp.com/api/v1/puzzles/'+id,
    success: function(results){
      $("#menu").css("display", "none")
      $("#simulator").css("display", "block")
      $("#puzzle").html(results)
        new Simulation(results[0])
      }
  })
}
