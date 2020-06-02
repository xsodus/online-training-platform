const mysql = require('mysql')
const { promisify } = require('util')

const dbSettings = {
  host: `mysql-test`,
  user: 'root',
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME,
}

const db = mysql.createConnection(dbSettings)
const query = promisify(db.query).bind(db)

db.connect(err => {
  if (err) console.error('COULD NOT CONNECT TO MYSQL', err)
  else console.info('CONNECT TO MYSQL')
})
module.exports = { query }
