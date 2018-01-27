// apps/assets/javascript/artists.js
// loaded every artist index/show? Yes.

// innerHTML sometimes shows some funny shit around text
// Ah, has to do with actual HTML format,
//  new line in HTML after > shows return sign,
//  keep text jammed between >< to let innerHTML show pure text

// Document ready, bind events
$(function() {
  // short for $.( document ).ready(function () {});
  // console.log("Artists.js document ready");

  // bind events
  console.log("Binding events ...");
  $("#song-delete-all").bind('click', deleteAllSongsClick);
  $(".song-delete").bind('click', deleteSongClick);
  $("#add-song").bind('click', addSongClick);
  console.log("Binding events done");
});

// Event bound functions
function deleteAllSongsClick(event) {
  // Delete all songs
  // - Ask confirmation
  console.log("Delete all songs clicked, ask confirmation");
  let deleteFlag = confirm("Delete all songs?") ;
  if (deleteFlag) {
    let artistId   = getArtistId();
    let songId     = "";
    let totalCount = 0;
    let doneCount  = 0;
    $(".song-delete").each(function(index, element) {
      songId = element.id.replace("song-delete-", "");
      totalCount = totalCount + 1;
      console.log("Call deleteSong with", artistId, songId);
      if (deleteSong(artistId, songId, false)) {
        $.when($("#song-" + songId).remove())
        .then(console.log("Song removed"));
        doneCount = doneCount + 1;
      };
    });
    console.log("Total", totalCount, ": deleted", doneCount);
  };
};

function deleteSongClick( event ) {
  console.log("Delete song clicked");

  let artistId = getArtistId();

  // Determine songId from <a>.id
  let songId   = this.id.replace("song-delete-", "");
  // Determine rowId from <a>.id
  let rowId    = this.id.replace("delete-", "");

  if (deleteSong(artistId, songId, true)) {
    // Yes, what?!
  }
};

function deleteSong(artistId, songId, confirmDelete = true) {
  // Delete a song
  // Ask confirmation if confirm true
  let deleteFlag = true;
  let deleteText = "#" + artistId + "-" + songId;
  if (confirmDelete === false) {
    console.log("Delete song", deleteText, "from deleteAllSongs");
  } else {
    console.log("Delete song", deleteText, "ask confirmation");
    deleteFlag = confirm("Do you want to delete this song?");
  }
  if (deleteFlag ) {
    if (deleteApiCall(artistId, songId)) { ;
      removeSongFromTable(songId) ;
    }
  }
  return deleteFlag;
};

function addSongClick(event) {
  // Add a song
  // - check for empty
  // - add row to table
  console.log("Add song clicked");
  let title = $("#new-title").val();
  if (title == "") {
    console.log("- Title is empty")
  } else {
    console.log("- Title :", title);
    let songId = addSong(title);
    if (songId > "") {
      $("#new-title").val(null);
    }
  }
};



function addSong(title) {
  let artistId  = getArtistId();
  let newSongId = addSongApiCall(artistId, title) ;
  if (newSongId > "") {
    addSongToTable( artistId, newSongId, title )
  };
  return newSongId;
};


// API call delete (DELETE)
function deleteApiCall() {
  let deleteSucceed = true ;
  // API call resulting in succes will not give us much?
  return deleteSucceed ;
}

// API call add (POST)
function addSongApiCall( artistId, title ) {
  let songId = ""

  // API call resulting in succes will give songId
  songId = Math.floor(Math.random() * 100).toString() ;

  return songId ;
};


// <table> manipulation
function removeSongFromTable(songId) {
  $.when($("#song-" + songId).remove())
    .then(console.log("Song removed"));
}

function addSongToTable(artistId, songId, title) {
  console.log("Adding song", "(#" + artistId + "-" + songId + ")", title, "to <table>");

  let tableRow = $("<tr></tr>");

  let rowDetail1 = $("<td></td>");
  rowDetail1.attr("id", "song-" + songId);
  rowDetail1.addClass("song");
  rowDetail1.addClass("new-song");
  rowDetail1.html(title);

  let rowDetail2 = $("<td></td>");
  rowDetail2.html("#" + artistId + "-" + songId);

  let rowDet3Anchor = $("<a></a>");
  rowDet3Anchor.attr("href", "#");
  rowDet3Anchor.attr("id", "song-delete-" + songId);
  rowDet3Anchor.addClass("song-delete");
  rowDet3Anchor.addClass("btn");
  rowDet3Anchor.addClass("btn-warning");
  rowDet3Anchor.html("Delete");
  rowDet3Anchor.bind("click", deleteSongClick);

  let rowDetail3 = $("<td></td>");
  rowDetail3.addClass("text-center");
  rowDetail3.append( rowDet3Anchor );

  tableRow.append( rowDetail1 );
  tableRow.append( rowDetail2 );
  tableRow.append( rowDetail3 );

  $("#song-table").append( tableRow );
};

function getArtistId() {
  // Get artist from hidden input
    return $("#artistId").val();
}

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
