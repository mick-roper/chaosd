const { Router } = require('restify-router')

const store = {}

const latest = "$LATEST"

module.exports.createChaosConfigRouter = () => {
  const router = new Router()

  router.get('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params
    const { version = latest } = req.query

    const serviceConfigs = store[serviceId] || {}
    const config = serviceConfigs[version]

    if (!config) {
      res.status(400)
      res.json({ message: `Config '${version}' does not exist` })
      return next()
    }

    res.status(200)
    res.json(config)
    next()
  })

  router.post('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params
    const { version = latest } = req.query

    store[serviceId] = store[serviceId] || {}

    if (version !== latest && store[serviceId][version]) {
      res.status(400)
      res.json({ message: `A config with version '${version}' already exists. Perform a PUT to update it.` })
      return next()
    }

    store[serviceId][version] = req.body

    res.status(201)
    res.json({})
    next()
  })

  router.put('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params
    const { version = latest } = req.query

    store[serviceId] = store[serviceId] || {}
    if (!store[serviceId][version]) {
      res.status(400)
      res.json({ message: `Config ${version} does not exist. You must create it before trying to update it.` })
      return next()
    }

    store[serviceId][version] = req.body

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