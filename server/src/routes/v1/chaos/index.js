const { Router } = require('restify-router')

const { createConfigRouter } = require('./config')

module.exports.createChaosRouter = () => {
  const router = new Router()

  router.add('/config', createConfigRouter())

  return router
}