const express = require("express")
const router = express.Router()
const {Song, Playlist } = require('../models')


// router.post('/playlists/:playlistId/songs', validateSong, async (req, res, next) => {
//     try{
//         const playlist = await Playlist.findByPk(req.params.playlistId)
//         if(!playlist) return res.status(404).json("Playlist not found")

//         const {title, artist, duration} = req.body
//         const song = await playlist.createSong( { title, artist, duration } )
//         res.status(201).json(song)
//     }catch(err){
//         next(err)
//     }
// })

router.delete('/:id', async (req, res, next) => {
    try{
        const deleted = await Song.destroy({where: {id: req.params.id}})
        if(!deleted) return res.status(404).json('Song not found')
            res.sendStatus(204)
    }catch(err){
        next(err)
    }
})


module.exports = router