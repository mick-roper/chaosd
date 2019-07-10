const restify = require('restify')
const socketio = require('socket.io')

const loggerFactory = require('./logger')

const { 
  createApiKeyMiddleware, 
  createRequiresIdentityMiddleware,
  createLoggingMiddleware,
  createHeadersMiddleware
} = require('./middleware')

const { createRouter } = require('./routes')

module.exports.createApp = ({ port }) => {
  const server = restify.createServer()

  server
    .use(restify.plugins.bodyParser(), restify.plugins.queryParser())
    .use(createHeadersMiddleware())
    .use(createLoggingMiddleware(loggerFactory))
    .use(createApiKeyMiddleware(apiKeyValidator))
    .use(createRequiresIdentityMiddleware())

  const router = createRouter()
  router.applyRoutes(server)

  const io = socketio.listen(server.server, { path: '/gremlin' })

  io.on('connection', socket => {
    const logger = loggerFactory.createLogger()

    logger.info('connected to gremlin')

    socket.emit('command', { hello: 'world' })
  })

  const app = {
    listen: () => server.listen(port, () => console.log('server listening on port', port)), // eslint-disable-line no-console
  }

  return app
}

const apiKeyValidator = {
  validate: key => key === 'abc123' ? { identity: 'dummy user' } : undefined
}