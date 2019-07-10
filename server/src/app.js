const restify = require('restify')

module.exports.createApp = ({ port }) => {
  const server = restify.createServer()

  const app = {
    listen: () => server.listen(port, () => console.log('server listening on port', port)), // eslint-disable-line no-console
  }

  return app
}
