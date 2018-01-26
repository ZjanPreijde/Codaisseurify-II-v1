class ArtistsController < ApplicationController
  before_action :set_artist, only: [:show, :edit, :update]

  def index
    @artists = Artist.all
  end
  def show
  end
  def edit
  end

  def update
    # if @artist.update(artist_params)
      # @artist.image = image_params
      # @artist.save
      redirect_to artist_path(@artist.id), notice: "Artist updated (NOT)"
    # else
    #   render :edit
    # end
  end

  def destroy
    # artist = Artist.find(params[:id])
    @artist.destroy
    redirect_to artists_path, notice: "Artist deleted"
  end

private

  def set_artist
    @artist = Artist.find(params[:id])
  end

  def artist_params
    params.require(:id).permit(:image)
  end

  def image_params
    params[:image].present? ? params[:image] : []
  end

end
