const { Router } = require('restify-router')

const { getValidationError } = require('./command.schema')

module.exports.createCommandRoutes = (register) => {
  const router = new Router()
  
  router.post('', async (req, res, next) => {
    const { params: { gremlinId }, body } = req

    const validationError = getValidationError(body)

    if (validationError) {
      res.status(400)
      res.json(validationError)
      return next(false)
    }

    const gremlin = register[gremlinId]

    if (!gremlin) {
      res.status(404)
      res.json({ message: 'gremlin is not connected to the server' })
      return next(false)
    }

    gremlin.emit('command', body)

    res.status(200)
    res.json({})

    next()
  })

  return router
}