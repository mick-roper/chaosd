const { Router } = require('restify-router')

const store = {}

module.exports.createConfigRouter = () => {
  const router = new Router()

  router.get('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params

    const serviceConfigs = store[serviceId]

    if (!serviceConfigs) {
      res.status(404)
      res.json({})
      return next()
    }    

    res.status(200)
    res.json(serviceConfigs)
    next()
  })

  router.post('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params

    if (store[serviceId]) {
      res.status(400)
      res.json({ message: 'configs for the service already exists' })
      return next()
    }

    store[serviceId] = req.body

    res.status(201)
    res.json({})
    next()
  })

  router.put('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params

    if (!store[serviceId]) {
      res.status(400)
      res.json({ message: `Service does not exist. You must create it before trying to update it.` })
      return next()
    }

    store[serviceId] = req.body

    res.status(200)
    res.json({})
    next()
  })

  router.del('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params

    delete store[serviceId]

    res.status(200)
    res.json({})
    next()
  })
  
  return router
}