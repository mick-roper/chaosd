const { Manager } = require('socket.io-client')

const { createLogger } = require('./logger')
const { loadConfigFrom } = require('./config')
const { createCommandProcessor } = require('./command-processor')

const { server, host } = loadConfigFrom(process.env)

const logger = createLogger({ host })

logger.info('creating manager...')

const manager = new Manager(server, { 
  secure: false,
  reconnection: true,
  timeout: 5000,
  path: '/gremlin/aws'
})

manager.on('connect_error', logger.error)
manager.on('connect_timeout', logger.error)
manager.on('reconnecting', i => logger.info(`reconnection attempt: ${i}`))

manager.on('command', createCommandProcessor(logger))

// open the connection
logger.info('opening the connection to the server...')

manager.open(logger.error)
