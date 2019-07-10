const { Router } = require('restify-router')

const store = {}

module.exports.createChaosConfigRouter = () => {
  const router = new Router()

  router.get('/:serviceId', async (req, res, next) => {
    const { serviceId } = req.params
    const { version = "$LATEST" } = req.query

    const serviceConfigs = store[serviceId] | []
    const config = serviceConfigs[version]

    if (!config) {
      res.status(400)
      res.json({ message: `config '${version}' does not exist` })
      return next()
    }

    res.status(200)
    res.json(config)

    return next()
  })
  
  return router
}