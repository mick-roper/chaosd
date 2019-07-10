const socketio = require('socket.io')

const gremlins = {}

module.exports.createGremlinListener = (server, logger) => {
  const io = socketio.listen(server, { path: '/gremlin' })

  setTimeout(() => {
    Object.keys(gremlins).forEach(k => {
      gremlins[k].emit('command', { hello: 'world' })
    })
  }, 5000)

  io.on('connection', socket => {
    const { id } = socket

    gremlins[id] = socket

    logger.info({ message: 'connected to gremlin', id })

    socket.emit('command', { hello: 'world' })

    socket.on('info', data => logger.info({ message: 'info from gremlin', id, data }))

    socket.on('disconnect', () => {
      logger.info({ message: 'disconnected from gremlin', id })
      delete gremlins[id]
    })
  })
}