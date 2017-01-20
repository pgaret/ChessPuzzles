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
    puzzle = JSON.parse(File.read('./sample_board.json'))
    Puzzle.find_or_create_by(played_times: puzzle["played_times"], rating: puzzle["rating"], pieces: puzzle["pieces"], cols: puzzle["cols"], rows: puzzle["rows"], past_moves_board: puzzle["past_moves_board"])
    Puzzle.only('puzzle_no', 'rating', 'played_times').all.to_json
  end

  get '/puzzles/:id' do
    Puzzle.where({_id: params[:id]}).to_json
  end

  post '/puzzles' do
    puzzle = JSON.parse(params["data"])
    Puzzle.find_or_create_by(played_times: puzzle["played_times"], rating: puzzle["rating"], pieces: puzzle["pieces"], cols: puzzle["cols"], rows: puzzle["rows"], past_moves_board: puzzle["past_moves_board"])
    redirect to('https://pgaret.github.io/ChessPuzzleSim/')
  end

end
