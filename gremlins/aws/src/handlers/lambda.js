const registerConcurrencySetter = (lambdaClient, handlerRegister) => {
  const commandType = 'aws:lambda:set-concurrency'

  if (!lambdaClient) {
    throw new Error('lambdaClient is not defined')
  }
  
  if (!handlerRegister || handlerRegister[commandType]) {
    throw new Error(`the handlers collection is undefined or already has a handler registered for type '${commandType}'`)
  }

  const handler = async ({ lambdaFunctionName, reservedConcurrentExecutions }) => {
    if (!lambdaFunctionName) {
      throw new Error('no lambda function name')
    }

    const params = {
      FunctionName: lambdaFunctionName,
      ReservedConcurrentExecutions: reservedConcurrentExecutions
    }

    return lambdaClient.putFunctionConcurrency(params).promise()
  }

  handlerRegister[commandType] = handler

  return handlerRegister
}

const registerAllHandlers = (lambdaClient, handlerRegister) => {
  registerConcurrencySetter(lambdaClient, handlerRegister)

  return handlerRegister
}

module.exports = {
  registerAllHandlers,
  registerConcurrencySetter
}