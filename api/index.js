const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({ extended: false }))

const routes = require('./src/routes')
routes(app)

const port = process.env.PORT || 3000

app.listen(port, console.log('Server ON at port ' + port))