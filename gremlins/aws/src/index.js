const aws = require('aws-sdk')
const { Agent } = require('https')
const io = require('socket.io-client')

const { createLogger } = require('./logger')
const { loadConfigFrom } = require('./config')
const { createCommandProcessor } = require('./command-processor')
const { createHandlerDictionary } = require('./handlers')

const { server, region, account, accessKey } = loadConfigFrom(process.env)

aws.config.update({
  httpOptions: {
    timeout: 2000,
    agent: new Agent({
      keepAlive: true,
      rejectUnauthorized: true,
      maxSockets: 50
    })
  }
})

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

const handlers = createHandlerDictionary(aws)

const commandProcessor = createCommandProcessor(socket, handlers, logger)

socket
  .on('system', logger.warn)
  .on('connect_error', logger.error)
  .on('connect_timeout', logger.error)
  .on('reconnecting', i => logger.info(`reconnection attempt: ${i}`))
  .on('connect', () => logger.info(`connected to ${server}`))
  .on('command', commandProcessor)
