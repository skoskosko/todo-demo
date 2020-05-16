import express from 'express'
import routes from './routes'
import swagger from './swagger'
const app = express()

app.use('/api', routes)

app.use('/docs', swagger)

export = app
