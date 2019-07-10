const io = require('socket.io-client')

const { createLogger } = require('./logger')
const { loadConfigFrom } = require('./config')
const { createCommandProcessor } = require('./command-processor')

const { server, host, region, account } = loadConfigFrom(process.env)

const logger = createLogger({ host })

logger.info(`attempting to connect to ${server}`)

const socket = io(server, { path: '/gremlin', query: { host, region, account } })

socket
  .on('connect_error', logger.error)
  .on('connect_timeout', logger.error)
  .on('reconnecting', i => logger.info(`reconnection attempt: ${i}`))
  .on('connect', () => logger.info(`connected to ${server}`))
  .on('command', createCommandProcessor(socket, logger))
