// apps/assets/javascript/artists.js
// loaded every artist index/show? Yes.

// innerHTML sometimes shows some funny shit around text
// Ah, has to do with actual HTML format,
//  new line in HTML after > shows return sign,
//  keep text jammed between >< to let innerHTML show pure text

$(function() {
  // short hand syntax : $(function() {});
  // short for $.( document ).ready(function () {});
  // console.log("Artists.js document ready");
  // Delete all songs :
  //   id="song-delete-all"
  // Delete song :
  //   id="song-delete-<%= song.id %>"
  //   class="song-delete
  //
  // bind events
  console.log("Binding events ...");
  $("#song-delete-all").bind('click', deleteAllSongsClick);
  $(".song-delete").bind('click', deleteSongClick);
  $("#add-song").bind('click', addSongClick);
});

function deleteAllSongsClick(event) {
  // Delete a song
  // Ask confirmation
  console.log("Delete all songs clicked");
  $(".song-delete").each(function(index, element) {
    deleteSong(false);
  });
};

function deleteSongClick(event) {
  console.log("Delete song clicked");
  deleteSong();
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

function addSongClick(event) {
  // Add a song
  // - check for empty
  // - add row to table
  console.log("Add song clicked");
  let title = $("#new-title").val();
  console.log("- Title :", title);
  if (title == "") {
    console.log("Title is empty")
  } else {
    addSongToTable(title);
    // let song = { :title: title, :id 0, :artist_id 0}
    $("#new-title").val(null);
  }
};

function addSongToTable(title) {
  console.log("Adding", title, "to <table>");

  let tableRow = $("<tr></tr>");

  let rowDetail1 = $("<td></td>");
  rowDetail1.attr("id", "song-xx");
  rowDetail1.addClass("song");
  rowDetail1.html(title);

  let rowDetail2 = $("<td></td>");
  rowDetail2.html("#0-0");

  let rowDetail3 = $("<td></td>");
  rowDetail3.addClass("text-center");

  let rowDet3Anchor = $("<a></a>");
  rowDet3Anchor.attr("href", "#");
  rowDet3Anchor.attr("id", "song-delete-0");
  rowDet3Anchor.addClass("song-delete");
  rowDet3Anchor.addClass("btn");
  rowDet3Anchor.addClass("btn-warning");
  rowDet3Anchor.html("Delete");
  rowDet3Anchor.bind("click", deleteSongClick);

  rowDetail3.append( rowDet3Anchor );

  tableRow.append( rowDetail1 );
  tableRow.append( rowDetail2 );
  tableRow.append( rowDetail3 );

  $("#song-table").append( tableRow );
};

// old stuff
function consoleLogSongs() {
  // <td id="song-<%= song.id %>" class="song">
  let songs = $(".song");
  let songCount = songs.length;
  console.log(songCount.toString() + ' songs found')
  songs.each(function(index, element) {
    console.log(element.innerHTML)
  });
};
