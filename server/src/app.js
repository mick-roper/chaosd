const restify = require('restify')

const { 
  createApiKeyMiddleware, 
  createRequiresIdentityMiddleware 
} = require('./middleware')

const { createRouter } = require('./routes')

module.exports.createApp = ({ port }) => {
  const server = restify.createServer()

  server
    .use(restify.plugins.bodyParser(), restify.plugins.queryParser())
    .use(createApiKeyMiddleware(apiKeyValidator))
    .use(createRequiresIdentityMiddleware())

  const router = createRouter()
  router.applyRoutes(server)

  const app = {
    listen: () => server.listen(port, () => console.log('server listening on port', port)), // eslint-disable-line no-console
  }

  return app
}

const apiKeyValidator = {
  validate: key => key === 'abc123' ? { identity: 'dummy user' } : undefined
}