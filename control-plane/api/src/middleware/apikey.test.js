const { createApiKeyMiddleware } = require('./apikey')

describe('apikey middleware', () => {
  describe('createApiKeyMiddleware', () => {
    it('returns middleware', () => {
      const args = { validate: () => {} }

      const middleware = createApiKeyMiddleware(args)

      expect(middleware).not.toBeNull()
    })

    it ('throws if validate is not defined', () => {
      expect(() => createApiKeyMiddleware({})).toThrow('validate is not defined')
    })
  })
})