# app/controllers/api/songs_controller.rb

class Api::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # For some reason,
  #   show/index,
  #   ActiveRecordSerializer only returns :id's :-(
  # Oh, might have something to do with song_serializer-
  # Use old skool rendering, don't trust new skool right now
  def index
    render status: 200, json: {
      songs: Song.all
    }.to_json
  end
  # def index
  #   songs = Song.all
  #   render status: 200, json: songs
  # end

  def show
    song = Song.find(params[:id])

    render status: 200, json: {
      song: song
    }.to_json
  end
  # def show
  #   song = Song.find(params[:id])
  #   render status: 200, json: song
  # end

  def create
    song = Song.new(song_params)

    if song.save
      render status: 201, json: {
        message: 'Song successfully created',
        song: song
      }.to_json
    else
      render status: 422, json: {
        errors: song.errors
      }.to_json
    end
  end
  # def create
  #   song = Song.new(song_params)
  #
  #   if song.save
  #     render status: 200, json: song
  #   else
  #     render status: 422, json: {
  #       errors: song.errors
  #     }.to_json
  #   end
  # end

  def destroy
    song = Song.find(params[:id])
    song.destroy

    render status: 200, json: {
      message: 'Song successfully deleted'
    }.to_json
  end

  private

  def song_params
    params.require(:song).permit(:title)
  end
end
