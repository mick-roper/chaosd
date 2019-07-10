const joi = require('joi')

const schema = joi.object().keys({
  errors: {
    chance: joi.number().min(0).max(1),
    statusCode: joi.number().min(0).max(600)
  },
  latency: {
    chance: joi.number().min(0).max(1),
    minMillis: joi.number().min(0).max(600000),
    maxMillis: joi.number().min(0).max(600000),
  }
})

module.exports.getValidationErrors = data => {
  if (!data) {
    return false
  }

  const result = schema.validate(data)

  return result.error
}