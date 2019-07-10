const { createApiKeyMiddleware } = require('./apikey')
const { createRequiresIdentityMiddleware } = require('./requiresIdentity')
const { createLoggingMiddleware } = require('./logging')
const { createHeadersMiddleware } = require('./headers')

module.exports = {
  createApiKeyMiddleware,
  createRequiresIdentityMiddleware,
  createLoggingMiddleware,
  createHeadersMiddleware
}