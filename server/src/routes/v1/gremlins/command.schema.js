const joi = require('joi')

const schema = joi.object().keys({
  type: joi.string().required(),
  payload: joi.object().required()
})

module.exports.getValidationError = data => schema.validate(data).error