import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import swagger from './swagger'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api', routes)

app.use('/docs', swagger)

export = app
