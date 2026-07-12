const express = require('express')
const router = express.Router()
const { Playlist, Song } = require('../models')

function validatePlaylist(req, res, next){
    const {name, description} = req.body
        if(!name || !description){
            return res.status(400).json('Name and description required')
        }
    next()
}

function validateSong(req, res, next){
    const {title, artist, duration} = req.body
    if(!title || !artist || !duration){
        return res.status(400).json('Title, artist, andduration required')
    }
    next()
}

router.get('/', async (req, res, next) => {
    try {
        const playlists = await Playlist.findAll({include: Song})
        res.json(playlists)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const playlist = await Playlist.findByPk(req.params.id, { include: Song })
        if (!playlist) {
            const err = new Error('Playlist not found')
            err.status = 404
            return next(err)
        }
        res.json(playlist)
    } catch (err) {
        next(err)
    }
})

router.post('/', validatePlaylist, async (req, res, next) => {
    try {
        const newPlaylist = await Playlist.create(req.body)
        res.status(201).json(newPlaylist)
    } catch (err) {
        next(err)
    }
})

router.post('/:playlistId/songs', validateSong, async (req, res, next) => {
    try{
        const playlist = await Playlist.findByPk(req.params.playlistId)
        if(!playlist) return res.status(404).json("Playlist not found")

        const {title, artist, duration} = req.body
        const song = await playlist.createSong( { title, artist, duration } )
        res.status(201).json(song)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const deleted = await Playlist.destroy({where: {id: req.params.id}})
        if(!deleted) return res.status(404).json('Playlist not found')
        res.status(204).send()
    }catch(err){
        next(err)
    }
})

module.exports = router