const { Router } = require('restify-router')

const { createChaosRouter } = require('./chaos')

module.exports.createV1Routes = () => {
  const router = new Router()

  router.add('/chaos', createChaosRouter())

  return router
}