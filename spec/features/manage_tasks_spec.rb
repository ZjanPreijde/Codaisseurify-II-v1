# spec/features/manage_tasks_spec.rb
require 'rails_helper'

feature 'Manage tasks', js: true do
  before :each do
    Artist.create(name: 'Manage Task Artist')
  end

  scenario 'add a new song' do
    new_song_title = 'Manage task, add new song test'

    visit artist_path(1)

    fill_in 'new-title', with: new_song_title

    page.click_on('add-song')

    expect(page).to have_content(new_song_title)
  end

  # scenario 'delete a song' do
  #
  #   visit artist_path(1)
  #
  #   songs = page.execute_script("$('.song-delete')")
  #   song_count = songs.length
  #   # JS or Ruby?
  #   # if (song_count > 0) {
  #     delete_id = "#" + songs[0].id
  #
  #     accept_confirm do
  #       page.click_on(delete_id)
  #     end
  #     # alternative : dismiss_confirm do
  #
  #     # expect( page ).to not_have_content("#" + delete_id)
  #     new_count = page.execute_script("$('.song_delete')").length
  #     expect( new_count ).to eq (song_count - 1)
  #   # }
  # end

end
