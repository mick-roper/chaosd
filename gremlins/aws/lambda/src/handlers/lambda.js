const defaultLogger = { info: () => {} }

const registerConcurrencySetter = (lambdaClient, handlerRegister) => {
  const commandType = 'aws:lambda:set-concurrency'

  if (!lambdaClient) {
    throw new Error('lambdaClient is not defined')
  }
  
  if (!handlerRegister || handlerRegister[commandType]) {
    throw new Error(`the handlers collection is undefined or already has a handler registered for type '${commandType}'`)
  }

  const handler = async ({ functionName, reservedConcurrency }, logger = defaultLogger) => {
    if (!functionName) {
      throw new Error('no lambda function name')
    }

    const params = {
      FunctionName: functionName,
      ReservedConcurrentExecutions: reservedConcurrency
    }

    logger.info({ message: 'asynchronously invoking putFunctionConcurrency', params })

    return lambdaClient.putFunctionConcurrency(params).promise()
  }

  handlerRegister[commandType] = handler
}

const registerAllHandlers = (lambdaClient, handlerRegister) => {
  registerConcurrencySetter(lambdaClient, handlerRegister)
  // todo: add more handler in here
}

module.exports = {
  registerAllHandlers,
  registerConcurrencySetter
}