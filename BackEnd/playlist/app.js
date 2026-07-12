const express = require('express')
const app = express()
const playlistRoutes = require('./routes/playlistRoutes')
const songRoutes = require('./routes/songRoutes')

function logger(req, res, next){
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(logger)

//cors for connecting both servers and be able to fetch the information
const cors = require('cors')
const { db } = require('./models')

app.use(express.json())
app.use(cors())

app.use('/playlists', playlistRoutes)
app.use('/songs', songRoutes)

db.sync()
.then(() => {
    console.log("Database Synced!")
    app.listen(3000, () => {
        console.log("Server running successfully!")
    })
})
.catch((err) => {
    console.log("Error suncing databse" , err)
})