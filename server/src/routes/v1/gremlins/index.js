const { Router } = require('restify-router')

const { createCommandRoutes } = require('./commands')

module.exports.createGremlinRoutes = (register) => {
  const router = new Router()
  
  router.get('', async (_, res, next) => {
    res.status(200)
    res.json(register)
    next()
  })

  router.add('/:gremlinId/commands', createCommandRoutes(register))

  return router
}