module.exports.createRequiresIdentityMiddleware = () => (req, res, next) => {
  if (!req.user) {
    res.status(401)
    res.json({ message: 'you are not authorised to access this resource' })
    return next(false)
  }

  next()
}