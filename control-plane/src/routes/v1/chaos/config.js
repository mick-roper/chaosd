const { Router } = require('restify-router')

const { getValidationErrors } = require('./config.schema')

const store = {}

module.exports.createConfigRouter = () => {
  const router = new Router()

  router.get('/:serviceId', async (req, res, next) => {
    const { params: { serviceId } } = req

    const serviceConfigs = store[serviceId]

    if (!serviceConfigs) {
      res.status(404)
      res.json({})
      return next(false)
    }    

    res.status(200)
    res.json(serviceConfigs)
    next()
  })

  router.post('/:serviceId', async (req, res, next) => {
    const { params: {serviceId}, body } = req

    if (store[serviceId]) {
      res.status(400)
      res.json({ message: 'configs for the service already exists' })
      return next()
    }

    const validationError = getValidationErrors(body)

    if (validationError) {
      res.status(400)
      res.json(validationError)
      return next(false)
    }

    store[serviceId] = body

    res.status(201)
    res.json({})
    next()
  })

  router.put('/:serviceId', async (req, res, next) => {
    const { params: { serviceId }, body } = req

    if (!store[serviceId]) {
      res.status(400)
      res.json({ message: `Service does not exist. You must create it before trying to update it.` })
      return next(false)
    }

    const validationError = getValidationErrors(body)

    if (validationError) {
      res.status(400)
      res.json(validationError)
      return next(false)
    }

    store[serviceId] = req.body

    res.status(200)
    res.json({})
    next()
  })

  router.del('/:serviceId', async (req, res, next) => {
    const { params: {serviceId} } = req

    delete store[serviceId]

    res.status(200)
    res.json({})
    next()
  })
  
  return router
}