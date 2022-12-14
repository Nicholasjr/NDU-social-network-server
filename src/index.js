const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes')
const logger = require('./utils/logger')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4500
const main = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    logger.log('info', 'connected to mongodb')
    app.listen(PORT, () => logger.log('info', `Server Listening on port http://localhost:${PORT}`))
}
main()

// pre route middlewwares
require('./middlewares/pre-route-middleware')(app)

// routes
app.use('/api/v1', routes)

app.get('/', (req, res) => {
    logger.log('connection is live')
    res.send('connection is live')
})

app.get('/ping', (req, res) => {
    logger.log('connection is live')
    res.send('connection is live')
})

// custom 404 && this will replace default express Not Found response for security reasons
require('./middlewares/error-middleware')(app)

// On  server error
app.on('error', (error) => {
    logger.error(`<::: An error occurred on the server: \n ${error}`)
})
