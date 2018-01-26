# App - Codaisseurify-II

#####Moving forward, based on Codaisseurify



#### Assignment - Basic Requirements

### Adding AJAX

Refactor some of the existent functionalities in the artist detail page to meet the following requirements:

- Visitors can add songs related to an artist **via AJAX**. This should happen in the show page of the artist.
- Visitors can remove songs related to an artist **via AJAX**. This should happen in the show page of the artist.
- Visitors can delete all songs for that artist with only one click **via AJAX**. This should happen in the show page of the artist.
- You will not `reload()` your page, but you will use DOM manipulation.

### Testing

- Write some integration tests related to the three new functionalities that you just added:
  - Add a new song
  - Remove a song
  - Remove all songs

## Submission

Send the following information: **before 20:00, Sunday, January 28th 2018**

- Link to the repository in Github where your app lives.

To this email address: **teachers@codaisseur.com**.



***COMMIT OFTEN!***



Replace 

* for add songs, delete songs
* replace Rails submit button model_path add/delete functionality 
* with events handled by Javascript/jQuery
* and replace action with AJAX-requests (GET, DELETE, PUT)
* without page reload



Add

* functionality for delete all songs
* for each song send DELETE AJAX-request



Remove (not requested, but let's get rid of it)

* Photo upload for artist