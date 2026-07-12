const { db , Playlist, Song } = require('./models')

async function seed(){
    await db.sync({force: true})

    const RoadTrip = await Playlist.create({
        name: "Road Trip",
        description: "Songs for long driving",
    })

    await RoadTrip.createSong({title: "Problem", artist: "Ariana Grande", duration: 194})
    await RoadTrip.createSong({ title: "Levitating", artist: "Dua Lipa", duration: 203 })
    await RoadTrip.createSong({ title: "Blinding Lights", artist: "The Weeknd", duration: 200 })

    const chillVibes = await Playlist.create({
        name: "Chill Vibes",
        description: "Relaxing songs for studying",
    })
    await chillVibes.createSong({ title: "Sunflower", artist: "Post Malone", duration: 158 })
    await chillVibes.createSong({ title: "Circles", artist: "Post Malone", duration: 215 })

    console.log("Seed complete!")
    await db.close();
}

seed();