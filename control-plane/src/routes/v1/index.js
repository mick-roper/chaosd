const { Router } = require('restify-router')

const { createChaosRouter } = require('./chaos')
const { createGremlinRoutes } = require('./gremlins')

module.exports.createV1Routes = (gremlinRegister) => {
  const router = new Router()

  router.add('/chaos', createChaosRouter())
  router.add('/gremlins', createGremlinRoutes(gremlinRegister))

  return router
}