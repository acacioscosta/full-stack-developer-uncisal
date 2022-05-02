const express = require('express')
const routes = express.Router()

const Controller = require('./controller')

routes.get('/tasks', Controller.list)
routes.post('/task', Controller.add)
routes.patch('/task/:id', Controller.update)
routes.delete('/task/:id', Controller.remove)

module.exports = routes