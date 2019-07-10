const socketio = require('socket.io')

module.exports.createGremlinListener = (server, { validateKey }, register, logger) => {
  const io = socketio.listen(server, { path: '/gremlin' })

  io.on('connection', socket => {
    const { 
      id,
      handshake: { query: { cloud, region, account, accessKey } }
    } = socket

    validateKey(accessKey)
      .then(isValid => {
        if (isValid !== true) {
          socket.emit('system', { type: 'disconnect', reason: 'unauthorised' })

          socket.disconnect(true)

          return
        }

        register[id] = {
          cloud,
          region,
          account,
          emit: (type, data) => socket.emit(type, data),
          statusUpdates: []
        }

        logger.info({ message: 'connected to gremlin', id })
    
        socket.on('status', data => register[id].statusUpdates.push({ timestamp: Date.now(), ...data }))
    
        socket.on('disconnect', () => {
          logger.info({ message: 'disconnected from gremlin', id })
          delete register[id]
        })

        return
      })
      .catch(logger.error)
  })
}