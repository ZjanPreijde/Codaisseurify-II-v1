class SongsController < ApplicationController
  before_action :set_artist

  def create
    @song = @artist.songs.new(song_params)
    @song.save
    redirect_to artist_path(@artist), notice: "Song added"
  end

  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    redirect_to artist_path(@artist), notice: "Song deleted"
  end

private
  def set_artist
    @artist = Artist.find(params[:artist_id])
  end

  def song_params
    params.require(:song).permit(:title)
  end
end
