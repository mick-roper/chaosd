module.exports.loadConfigFrom = (source) => {
  if (!source) {
    throw new Error('source is not defined')
  }

  const {
    HOST,
    CHAOSD_SERVER
  } = source

  if (!CHAOSD_SERVER) {
    throw new Error('CHAOSD_SERVER var is not set')
  }
  
  return  {
    host: HOST,
    server: CHAOSD_SERVER
  }
}