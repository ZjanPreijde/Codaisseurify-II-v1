// apps/assets/javascript/artists.js
// loaded every artist index/show? Yes.

// innerHTML sometimes shows some funny shit around text
// Ah, has to do with actual HTML format,
//  new line in HTML after > shows return sign,
//  keep text jammed between >< to let innerHTML show pure text

$(function () {
  // short hand syntax : $(function() {});
  // short for $.( document ).ready(function () {});
  // console.log("Artists.js document ready");
  // Delete all songs :
  //   id="song-delete-all"
  // Delete song :
  //   id="song-delete-<%= song.id %>"
  //   artist_id="<%= artist.id %>"
  //   song_id="<%= song.id %>"
  //   class="song-delete
  //
  consoleLogSongs();
  // bind events
  $("#song-delete-all").bind( 'click', deleteAllSongsClick );
  $(".song-delete").bind( 'click', deleteSongClick );
  $("#add-song").bind( 'click', addSongClick );
});

function deleteAllSongsClick( event ) {
  // Delete a song
  // Ask confirmation
  console.log("Delete all songs clicked");
  $(".song-delete").each( function( index, element ) {
    deleteSong( false );
  });
};
function deleteSongClick( event ) {
  console.log("Delete song clicked");
  deleteSong();
};

function addSongClick( event ) {
  // Add a song
  // - check for empty
  // - add row to table
  console.log("Add song clicked");
  let title = $("#new-title").val();
  console.log("- Title :", title);

  $("#new-title").val(null);
};

function deleteSong(confirm = true) {
  // Delete a song
  // Ask confirmation if confirm true
  if (confirm === false) {
    console.log("Delete song from deleteAllSongs");
  } else {
    console.log("Delete song, ask confirmation");
  }
};


// old stuff
function consoleLogSongs () {
  // <td id="song-<%= song.id %>" class="song">
  let songs = $(".song");
  let songCount = songs.length;
  console.log(songCount.toString() + ' songs found')
  songs.each( function( index, element ) {
    console.log(element.innerHTML)
  });
};
