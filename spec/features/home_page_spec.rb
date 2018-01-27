# spec spec/features/home_page_spec.rb
require 'rails_helper'

RSpec.feature "Home Page", :type => :feature do
  scenario "User visits Home Page" do
    visit "/"
    expect(page).to have_text( "Codaisseurify-II")
    expect(page).to_not have_text( "Codaisseurify!")
  end
end
