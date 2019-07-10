const restify = require('restify')

const { createRouter } = require('./routes')

module.exports.createApp = ({ port }) => {
  const server = restify.createServer()

  const router = createRouter()
  router.applyRoutes(server)

  const app = {
    listen: () => server.listen(port, () => console.log('server listening on port', port)), // eslint-disable-line no-console
  }

  return app
}
