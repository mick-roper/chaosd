module.exports.createHeadersMiddleware = () => (_, res, next) => {
  res.header('Server', 'chaosd')
  return next()
}