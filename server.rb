require 'sinatra'
require 'sinatra/namespace'
require 'mongoid'
require 'byebug'
require 'json'

Mongoid.load! 'mongoid.config'

class Puzzle
  include Mongoid::Document

  field :puzzle_no, type: Integer
  field :played_times, type: Integer
  field :rating, type: Integer
  field :pieces, type: String
  field :cols, type: Integer
  field :rows, type: Integer
  field :past_moves_board, type: Array
end

def loadFiles
  Dir.foreach('./boards') do |board|
    next if board == '.' or board == '..'
    puzzle = JSON.parse(File.read("./boards/"+board))
    puts puzzle
    if Puzzle.where(played_times: puzzle["played_times"], rating: puzzle["rating"], pieces: puzzle["pieces"], cols: puzzle["cols"], rows: puzzle["rows"], past_moves_board: puzzle["past_moves_board"]).count === 0 then
      Puzzle.create(puzzle)
    end
  end
end

get '/' do
  'Welcome to chess puzzles'
end

namespace '/api/v1' do

  before do
    content_type 'application/json'
    headers 'Access-Control-Allow-Origin' => '*',
              'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
  end

  get '/puzzles' do
    loadFiles
    Puzzle.only('puzzle_no', 'rating', 'played_times').all.to_json
  end

  get '/puzzles/:id' do
    Puzzle.where({_id: params[:id]}).to_json
  end

  post '/puzzles' do
    loadFiles
    puzzle = JSON.parse(params["data"])
    if Puzzle.where(played_times: puzzle["played_times"], rating: puzzle["rating"], pieces: puzzle["pieces"], cols: puzzle["cols"], rows: puzzle["rows"], past_moves_board: puzzle["past_moves_board"]).count === 0 then
      Puzzle.create(puzzle)
    end
    redirect to('https://pgaret.github.io/ChessPuzzleSim/')
  end

end
