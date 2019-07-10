const generateRequestId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = Math.max(10, Math.floor(Math.random() * 25))
  let str = ''

  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return str
}

module.exports.createLoggingMiddleware = ({ createLogger }) => {
  if (!createLogger) {
    throw new Error('createLogger is not defined')
  }

  return async (req, res, next) => {
    const { headers } = req
    const requestId = generateRequestId()
    const correlationId = headers['x-correlation-id']

    req.logger = createLogger({ requestId, correlationId })
    res.header('x-request-id', requestId)

    if (correlationId) {
      res.header('x-correlation-id', correlationId)
    }

    await next()
  }
}