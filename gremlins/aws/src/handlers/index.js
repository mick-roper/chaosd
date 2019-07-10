const aws = require('aws-sdk')

const lambda = require('./lambda')

module.exports.createHandlerDictionary = () => {
  const lambdaClient = new aws.Lambda()
  
  const handlerRegister = {}

  lambda.registerAllHandlers(lambdaClient, handlerRegister)

  return handlerRegister
}