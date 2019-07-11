module.exports.createApiKeyMiddleware = ({ validate }) => {
  if (!validate) {
    throw new Error('validate is not defined')
  }

  return async (req, res, next) => {
    const { headers: { authorization } } = req

    if (authorization) {
      const [type, key] = authorization.split(' ', 2)

      if (type && type.toLowerCase() === 'apikey') {
        const keyInfo = await validate(key)

        if (!keyInfo) {
          res.status(401)
          res.json({ message: 'apikey is invalid' })
          return next(false)
        }

        req.user = { 
          type,
          identity: keyInfo.identity
        }
      }
    }

    next()
  }
}