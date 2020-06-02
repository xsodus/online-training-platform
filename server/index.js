// server/index.js
'use strict'

const app = require('./app')
require('./api/course')
require('./api/login')
require('./api/user')
const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
