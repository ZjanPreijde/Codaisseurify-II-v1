require 'rails_helper'

RSpec.describe Artist, type: :model do
  describe 'name' do
    let(:artist) { build :artist, name: ""}

    it ", should validate presence of" do
      artist.valid?
      expect(artist.errors).to have_key(:name)
    end
  end
end
