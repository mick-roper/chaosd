const { Manager } = require('socket.io-client')

const { createLogger } = require('./logger')
const { loadConfigFrom } = require('./config')

const { server, host } = loadConfigFrom(process.env)

const logger = createLogger({ host })

logger.info('creating manager...')

const manager = new Manager(server, { 
  secure: false,
  reconnection: true,
  timeout: 5000,
  path: '/gremlin/aws'
})

manager.connect(logger.error)

manager.on('command', logger.info)

manager.on('info', logger.info)

// open the connection
manager.open(logger.error)
