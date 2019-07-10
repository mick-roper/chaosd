const { createApiKeyMiddleware } = require('./apikey')
const { createRequiresIdentityMiddleware } = require('./requiresIdentity')
const { createLoggingMiddleware } = require('./logging')

module.exports = {
  createApiKeyMiddleware,
  createRequiresIdentityMiddleware,
  createLoggingMiddleware
}