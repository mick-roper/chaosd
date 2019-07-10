const { createApiKeyMiddleware } = require('./apikey')
const { createRequiresIdentityMiddleware } = require('./requiresIdentity')

module.exports = {
  createApiKeyMiddleware,
  createRequiresIdentityMiddleware
}