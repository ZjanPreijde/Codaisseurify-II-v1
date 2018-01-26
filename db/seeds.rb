Song.destroy_all
Artist.destroy_all

# Seed artists, keep values
meatloaf = Artist.create!(name: "MeatLoaf", image_url: "")
redhot   = Artist.create!(name: "Red Hot Chili Peppers", image_url: "")
jay      =  Artist.create!(name: "Screamin' Jay Hawkins", image_url: "")

# Seed songs
# Damn, this used to work
Song.create!(title: "Paradise by the Dashboard Light", artist: meatloaf)
Song.create!(title: "Heaven Can Wait", artist: meatloaf)
Song.create!(title: "All Revved Up With No Place To Go", artist: meatloaf)

Song.create!(title: "Californication", artist: redhot)
Song.create!(title: "Under the Bridge", artist: redhot)
Song.create!(title: "Give It Away", artist: redhot)

Song.create!(title: "I Put a Spell on You", artist: jay)
Song.create!(title: "Constipation Blues", artist: jay)
Song.create!(title: "Alligator Wine", artist: jay)

# Song.create!([
#   {title: "Paradise by the Dashboard Light", artist_id: meatloaf.id }
#   ])
