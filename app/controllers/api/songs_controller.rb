# app/controllers/api/songs_controller.rb

class Api::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    songs = Song.all
    render status: 200, json: songs
  end

  def show
    song = Song.find(params[:id])
    render status: 200, json: song
  end

  def create
    song = Song.new(song_params)

    if song.save
      render status: 200, json: song
    else
      render status: 422, json: {
        errors: song.errors
      }.to_json
    end
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy

    render status: 200, json: {
      message: "Song successfully deleted"
    }.to_json
  end

  def update
    song = Song.find(params[:id])

    if song.update(song_params)
      render status: 200, json: song
    else
      render status: 500, json: {
        message: "The song could not be updated",
        errors: song.errors
      }.to_json
    end
  end

  private

  def song_params
    params.require(:song).permit(:title)
  end
end
