module.exports.createLoggingMiddleware = () => (req, res, next) => {
  const { headers } = req
  const requestId = headers['x-request-id']
  const correlationId = headers['x-correlation-id'] || 'some-correlation-id'

  
}

const createLogger = ({ requestId, correlationId }) => ({})