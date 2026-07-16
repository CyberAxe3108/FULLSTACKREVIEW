const db = require('../db')
const Playlist = require('./Playlist')
const Song = require('./song')

Playlist.hasMany(Song, { onDelete: 'CASCADE'})
Song.belongsTo(Playlist)

module.exports = {db, Playlist, Song}