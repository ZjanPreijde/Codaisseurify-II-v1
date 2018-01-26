# spec spec/features/home_page_spec.rb
require 'rails_helper'

RSpec.feature "Home Page", :type => :feature do
  # let(:artist) { build :artist, name: "Artist" }
  # let(:artists_path) = '/'
  # @artists_path = '/'
  scenario "User visits Home Page" do
    visit "/"
    expect(page).to have_text( "Codaisseurify!")
  end
end
