module.exports.createCommandProcessor = (socket, handlers, logger) => command => {
  if (!command) {
    socket.emit('status', { type: 'warn', message: 'received an empy command' })
    return
  }

  const { type, payload } = command

  if (!type || !payload) {
    socket.emit('status', { type: 'warn', message: 'invalid command received', command })
    return
  }

  logger.info(command)
}