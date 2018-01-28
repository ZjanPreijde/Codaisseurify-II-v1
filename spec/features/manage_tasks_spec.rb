# spec/features/manage_tasks_spec.rb
require 'rails_helper'

feature 'Manage tasks', js: true do
  before :each do
    Artist.create(name: 'Manage Task Artist')
    Artist.first.songs.create(title: 'Manage task, song 1')
    Artist.first.songs.create(title: 'Manage task, song 2')
  end

  scenario 'add a new song' do
    visit artist_path(1)

    new_song_title = 'Manage task, add new song test'
    fill_in 'new-title', with: new_song_title
    page.click_on('add-song')

    expect(page).to have_content(new_song_title)
  end

  scenario 'delete a song' do
    visit artist_path(1)

    accept_confirm do
      page.click_on('song-delete-1')
    end
    # alternative : dismiss_confirm do

    sleep(2) # Yes, yes, I should not use this

    expect( page ).to have_no_content('Manage task, song 1')
  end

end
