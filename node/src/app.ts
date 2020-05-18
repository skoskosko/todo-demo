import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import swagger from './swagger'
const app = express()
app.use(bodyParser.json())

app.use('/api', routes)

app.use('/docs', swagger)

export = app
