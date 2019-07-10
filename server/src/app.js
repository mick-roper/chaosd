const restify = require('restify')

const { createGremlinListener } = require('./gremlins')
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

  createGremlinListener(server.server, accessKeyValidator, loggerFactory.createLogger({ type: 'gremlin' }))

  const app = {
    listen: () => server.listen(port, () => console.log('server listening on port', port)), // eslint-disable-line no-console
  }

  return app
}

const apiKeyValidator = {
  validate: key => key === 'abc123' ? { identity: 'dummy user' } : undefined
}

const accessKeyValidator = () => ({
  validateKey: async (key) => key == 'abc-123'
})