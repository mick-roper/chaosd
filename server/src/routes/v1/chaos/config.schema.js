const joi = require('joi')

const schema = joi.object().keys({
  error: joi.object({
    chance: joi.number().min(0).max(1).required(),
    statusCode: joi.number().min(0).max(600).required()
  }),
  latency: joi.object({
    chance: joi.number().min(0).max(1).required(),
    minMillis: joi.number().min(0).max(600000).required(),
    maxMillis: joi.number().min(0).max(600000).required(),
  })
})

module.exports.getValidationErrors = data => {
  const result = schema.validate(data)

  return result.error
}