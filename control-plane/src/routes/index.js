const { Router } = require('restify-router')

const { createV1Routes } = require('./v1')

module.exports.createRouter = (gremlinRegister) => {
  const router = new Router()

  router.add('/v1', createV1Routes(gremlinRegister))

  return router
}