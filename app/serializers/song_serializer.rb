class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist_id
end
