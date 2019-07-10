const socketio = require('socket.io')

const gremlins = {}

module.exports.createGremlinListener = (server, logger) => {
  const io = socketio.listen(server, { path: '/gremlin' })

  io.on('connection', socket => {
    const { 
      id,
      handshake: { query: { cloud, host, region, account, accessKey } }
    } = socket

    logger.info({ cloud, host, region, account, accessKey })

    gremlins[id] = socket

    logger.info({ message: 'connected to gremlin', id })

    socket.on('status', data => logger.info({ message: 'info from gremlin', id, data }))

    socket.on('disconnect', () => {
      logger.info({ message: 'disconnected from gremlin', id })
      delete gremlins[id]
    })
  })
}