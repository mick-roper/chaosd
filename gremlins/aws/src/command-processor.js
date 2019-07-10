module.exports.createCommandProcessor = (socket, handlers = {}, logger) => command => {
  if (!command) {
    socket.emit('status', { level: 'warn', message: 'received an empy command' })
    return
  }

  const { type, payload } = command

  if (!type || !payload) {
    socket.emit('status', { level: 'warn', message: 'invalid command received', command })
    return
  }

  logger.info({ message: 'command recieved', command })

  const handler = handlers[type]

  if (!handler) {
    logger.info({ message: 'handler not found', type })
    socket.emit('status', { level: 'warn', message: 'handler not found', type })
    return
  }

  handler(payload)
    .then(() => {
      logger.info({ message: 'command handled successfully' })
      socket.emit('status', { level: 'info', message: 'command handled successfully', command })
      return
    })
    .catch(err => {
      logger.error(err)
      socket.emit('status', { level: 'error', message: 'handling the command caused an error', command, err })
      return
    })
}