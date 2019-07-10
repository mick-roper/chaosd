const generateRequestId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const length = Math.max(15, Math.floor(Math.random() * 25))
  const array = [length]

  for (let i = 0; i < length; i++) {
    array[i] = chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return array.join('')
}

module.exports.createLoggingMiddleware = ({ createLogger }) => {
  if (!createLogger) {
    throw new Error('createLogger is not defined')
  }

  return async (req, res, next) => {
    const { headers } = req
    const requestId = generateRequestId()
    const correlationId = headers['x-correlation-id']

    const logger = req.logger = createLogger({ requestId, correlationId })

    logger.info({ message: 'handling request', headers })

    res.header('x-request-id', requestId)

    if (correlationId) {
      res.header('x-correlation-id', correlationId)
    }

    await next()
  }
}