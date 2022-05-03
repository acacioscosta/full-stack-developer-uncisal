const Controller = require('./controller')

module.exports = app => {
    app.get('/tasks', Controller.list)

    app.post('/task', Controller.add)

    app.patch('/task/:id', Controller.update)

    app.delete('/task/:id', Controller.remove)
}