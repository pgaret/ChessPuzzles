require 'sinatra'
require 'sinatra/namespace'
require 'mongoid'
require 'byebug'
require 'json'

Mongoid.load! 'mongoid.config'

class Puzzle
  include Mongoid::Document

  field :ind, type: Integer
  field :game_board, type: Hash
  field :past_moves_board, type: Array
end



get '/' do
  'Welcome to chess puzzles'
end

get '/seed' do
  puzzle = JSON.parse(File.read('./sample_board.json'))
  Puzzle.create(ind: Puzzle.all.count+1, game_board: puzzle["game_board"], past_moves_board: puzzle["past_moves_board"])
end

namespace '/api/v1' do

  before do
    content_type 'application/json'
    headers 'Access-Control-Allow-Origin' => '*',
              'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
  end

  get '/puzzles' do
    Puzzle.all.to_json
  end

  get '/puzzles/:id' do
    Puzzle.where({ind: params[:id]}).to_json
  end

end
