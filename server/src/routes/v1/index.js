const { Router } = require('restify-router')

const { createChaosConfigRouter } = require('./chaos-config')

module.exports.applyRoutes = () => {
  const router = new Router()

  router.add('/chaos-config', createChaosConfigRouter())

  return router
}