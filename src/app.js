import express      from 'express'
import bodyParser   from 'body-parser'
import mailer       from './mailer.js'

const app = new express()
const dev = process.env.NODE_ENV !== 'production'

dev && app.use(require('morgan')('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//Route
app.post('/api/mailer', mailer)

export default app