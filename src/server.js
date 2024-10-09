import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from './config/index.js'
import connectDb from './config/db.js'
import routes from './routes/index.js'

const app = express()
const port = config.port;

app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (_req, res) => res.send('Hello!! GrowthX Task Server!'))
app.use('/api',routes)


app.listen(port, () => 
    connectDb().then(() =>{
        console.log(`Server is running on http://localhost:${port}`)
    }))
