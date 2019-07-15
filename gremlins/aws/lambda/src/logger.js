const write = (message, fn, args = {}) => {
  if (message && fn) {
    let x = typeof message == 'object' ? message : { message }

    x = { ...args, ...x }

    const json = JSON.stringify(x)

    fn(json)
  }
}

module.exports.createLogger = (args) => ({
  info: message => write(message, console.info, args), // eslint-disable-line no-console
  warn: message => write(message, console.warn, args), // eslint-disable-line no-console
  error: message => write(message, console.error, args) // eslint-disable-line no-console
})