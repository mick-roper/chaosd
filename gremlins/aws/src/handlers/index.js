const lambda = require('./lambda')

module.exports.createHandlerDictionary = (aws) => {
  const register = {}
  const lambdaClient = new aws.Lambda({ httpOptions: { timeout: 1000 } })

  lambda.registerAllHandlers(lambdaClient, register)

  return register
}