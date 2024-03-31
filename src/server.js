import express from 'express'
import { createServer } from 'http'
import { router as WeatherRouter } from './routes/weather.js'
import { Server } from 'socket.io'
import { config } from 'dotenv'
//configering envoirmental variable
config()
import { weatherListner } from './listners/weather.js';
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL
    }
})

app.use(express.json())
app.use('/api/weather', WeatherRouter)
//crreating web socket connnection
io.on('connection',weatherListner)


httpServer.listen(8080, () => {
    console.log("server connected: http://localhost:8080")
})