module.exports.createCommandProcessor = (socket, logger) => command => {
  if (!command) {
    socket.emit('status', { type: 'info', message: 'received an empy command' })
  }

  logger.info(command)
}