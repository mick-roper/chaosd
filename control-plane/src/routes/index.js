const { Router } = require('restify-router')

const { createV1Routes } = require('./v1')

module.exports.createRouter = (gremlinRegister) => {
  const router = new Router()

  router.add('/api/v1', createV1Routes(gremlinRegister))

  router.add('*', (_, res, next) => {
    res.status(200)
    res.send('<html><body><h1>Hello, World!</h1></body></html>')
    next()
  })

  return router
}