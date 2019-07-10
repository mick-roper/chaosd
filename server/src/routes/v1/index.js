const { Router } = require('restify-router')

const { createChaosConfigRouter } = require('./chaos-config')

module.exports.createV1Routes = () => {
  const router = new Router()

  router.add('/chaos-config', createChaosConfigRouter())

  return router
}