# spec spec/models/song_spec.rb
require 'rails_helper'

RSpec.describe Song, type: :model do
  describe 'title' do
    # Shoulda Matcher style :
    # it { is_expected.to validate_presence_of(:title) }
    let(:artist) { build :artist, name: "Artist" }
    let(:song) { build :song, title: "", artist: artist }

    it ", should validate presence of" do
      expect(song.valid?).to be(false)
    end
  end

end
