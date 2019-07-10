const { Router } = require('restify-router')

module.exports.createGremlinRoutes = (register) => {
  const router = new Router()
  
  router.get('/', async (_, res, next) => {
    res.status(200)
    res.json(register)
    next()
  })

  return router
}