module.exports.loadConfigFrom = (source) => {
  if (!source) {
    throw new Error('source is not defined')
  }

  const {
    HOST,
    CHAOSD_SERVER,
    AWS_REGION,
    AWS_ACCOUNT
  } = source

  if (!CHAOSD_SERVER) {
    throw new Error('CHAOSD_SERVER var is not set')
  }
  
  return  {
    host: HOST,
    server: CHAOSD_SERVER,
    region: AWS_REGION,
    account: AWS_ACCOUNT
  }
}