module.exports.loadConfigFrom = (source) => {
  if (!source) {
    throw new Error('source is not defined')
  }

  const {
    HOST,
    AWS_REGION,
    AWS_ACCOUNT,
    CHAOSD_SERVER,
    CHAOSD_ACCESS_KEY
  } = source

  if (!CHAOSD_SERVER) {
    throw new Error('CHAOSD_SERVER var is not set')
  }

  if (!CHAOSD_ACCESS_KEY) {
    throw new Error('CHAOSD_ACCESS_KEY var is not set')
  }
  
  return  {
    host: HOST,
    server: CHAOSD_SERVER,
    region: AWS_REGION,
    account: AWS_ACCOUNT,
    accessKey: CHAOSD_ACCESS_KEY
  }
}