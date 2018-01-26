# App - Codaisseurify-II

**Moving forward, based on Codaisseurify**



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

- for add song, delete song
- replace Rails submit button model_path add/delete functionality 
- with events handled by Javascript/jQuery
- and replace action with AJAX-requests (POST, DELETE)
- update info without page reload

Add

- functionality for delete all songs
- for each song send DELETE AJAX-request
- update info without page reload

Remove (not requested, but let's get rid of it)

- Photo upload for artist
- Delete artist ?





Create a song

* POST, songs#create, artists/:artist_id/songs/new


POST

* -i
* -H "Accept: application/json"
* -H "Content-type: application/json"
* -X POST
* -d  '{"title":"New Title"}'
* http://localhost:3000/api/artists/1/songs



Test: Title must be filled

May respond with 

- either 200 OK and {"message": "Song succesfully created", "song":{"id":1, "title":"Title", "artist_id":1, "created_at":"2018-etc", "updated_at":"2018-etc"}}
- or 422 Unprocessable Entity and {"errors": {"field":["validation error"]}}
- where "errors" can be many errors for each field, and error many fields

In this case probably {"errors":{"title";["can't be blank"]}}

If uniqueness is enforced, probably also other error message



Delete a song

- DELETE, songs#destroy, artists/:artist_id/songs/:song_id

DELETE

* -i
* -H "Accept: application/json"
* -H "Content-type: application/json"
* -X DELETE
* http://localhost:3000/api/artists/1songs/1


May respond with 

- either 200 OK and {"message": "Song succesfully deleted"}}
- or ??

If song would have dependants, and no *dependent: :destroy* or not able to destroy dependants, there would probably be some error



UPDATE

- -i
- -H "Accept: application/json"
- -H "Content-type: application/json"
- -X PUT
- http://localhost:3000/api/artists/1songs/1

May respond with 

- either 200 OK and {"message": "The song could not be updated", "room":{"fields": "values"}}
- or 422 Unprocessable Entity and {"errors": {"field":["validation error"]}}





####Taken from the reader, we'll only do add and delete (all) :


```ruby
# config/routes.rb

Rails.application.routes.draw do
  # rest of the code...

  namespace :api do
    resources :songs
  end
end
```



Make (folder and) file

*app/controllers/api/songs_controller.rb*

```ruby
# app/controllers/api/songss_controller.rb

class Api::SongsController < ApplicationController
  def index
    render status: 200, json: {
      rooms: Song.all
    }.to_json
  end
end
```



*In browser*, http://localhost:3000/api/rooms.json, returns JSON-formatted data

*In shell*

```shell
$ curl http://localhost:3000/api/rooms/json
$ curl http://localhost:3000/api/rooms/json | json_pp
```



```shell
$ git add .
$ git commit -m "Add API songs index"
$ git push -u origin master
```



```ruby
class Api::SongsController < ApplicationController
  # ...

  def show
    song = Song.find(params[:id])

    render status: 200, json: {
      song: song
    }.to_json
  end
end
```



```ruby
class Api::SongsController < ApplicationController
  # rest of the code...

 def create
    song = Song.new(song_params)

    if song.save
      render status: 201, json: {
        message: "Song successfully created",
        song: song
      }.to_json
    else
      render status: 422, json: {
        errors: song.errors
      }.to_json
    end
  end

  private

  def song_params
    params.require(:song).permit(:title)
  end
end
```





```ruby
# app/controllers/api/songs_controller.rb

class Api::SongsController < ApplicationController
  # rest of the code...

  def destroy
    song = Song.find(params[:id])
    song.destroy

    render status: 200, json: {
      message: "Song successfully deleted"
    }.to_json
  end

  private

  # rest of the code...
end
```



## Serialization

.as_json, .to_json, render :json



Active Model JSON Serializer, replaces default  JSON (de-)serialization



active_model_serializers gem, add in 

*.Gemfile*

```ruby
# Gemfile

# ...

# Add Active Model Serializers gem for API calls
gem 'active_model_serializers', '~> 0.10.0'

```

```shell
$ bundle install
$ rails generate serializer song
```

created 

*app/serializers/SongSerializer*

```ruby
# app/serializers/song_serializer.rb

class SongSerializer < ActiveModel::Serializer
  attributes :title
end
```

add code not present :

```ruby
class Api::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    songs = Song.all
    render status: 200, json: songs
  end

  def show
    song = Song.find(params[:id])
    render status: 200, json: song
  end

  def create
    song = Song.new(song_params)

    if song.save
      render status: 200, json: song
    else
      render status: 422, json: {
        errors: song.errors
      }.to_json
    end
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy

    render status: 200, json: {
      message: "Song successfully deleted"
    }.to_json
  end

  def update
    song = Song.find(params[:id])

    if song.update(song_params)
      render status: 200, json: song
    else
      render status: 500, json: {
        message: "The song could not be updated",
        errors: song.errors
      }.to_json
    end
  end

  private

  def song_params
    params.require(:song).permit(:title)
  end
end
```

User verification, very interesting, but not in this stage :-) See reader.

In short : if authentication is used, you skip normal authentication and authenticate with secure tokens. These are stored both client-side and server-side and identify a user, using Devise, without using email/password.



* Create new base_controller.rb, 

* create a class within from ApplicationController, 

* let other Api controllers subclass from this one, in stead of from ApplicationController

* in a newly created base_controller.rb

* skip_before_action :verify_authenticity_token

* protect_from_forgery with :null_session

* before_action :authenticate

* ```
  $ rails g migration AddTokenToUsers token:string
  ```

* add *has_secure_token* to user model

* ```
  $ rails db:seed
  ```

* token should  be added as extra header of request, -H "X-USER-TOKEN: ... "

* CORS (Cross-Origin Resource Sharing), allow for this by Rack CORS gem.



