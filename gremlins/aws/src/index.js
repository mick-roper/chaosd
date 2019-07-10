const io = require('socket.io-client')

const { createLogger } = require('./logger')
const { loadConfigFrom } = require('./config')
const { createCommandProcessor } = require('./command-processor')
const { createHandlerDictionary } = require('./handlers')

const { server, region, account, accessKey } = loadConfigFrom(process.env)

const logger = createLogger()

logger.info(`attempting to connect to ${server}`)

const socket = io(server, { 
  path: '/gremlin', 
  query: {
    region, 
    account, 
    accessKey, 
    cloud: 'aws'
  } 
})

const handlers = createHandlerDictionary()
const processor = createCommandProcessor(socket, handlers, logger)

logger.info(handlers)

socket
  .on('system', logger.warn)
  .on('connect_error', logger.error)
  .on('connect_timeout', logger.error)
  .on('reconnecting', i => logger.info(`reconnection attempt: ${i}`))
  .on('connect', () => logger.info(`connected to ${server}`))
  .on('command', processor)
