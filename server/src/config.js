module.exports.loadConfigFrom = (source) => {
  if (!source) {
    throw new Error('source is not defined')
  }

  const { PORT } = source

  if (!PORT) {
    throw new Error('PORT var is not set in the config source')
  }

  return {
    port: PORT,
  }
}
