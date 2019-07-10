const { createApp } = require('./app')
const { loadConfigFrom } = require('./config')

const config = loadConfigFrom(process.env)
const app = createApp(config)

app.listen(config.port)
