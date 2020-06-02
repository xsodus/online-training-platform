const redis = require('redis')
const { promisify } = require('util')
const crypto = require('crypto')
const client = redis.createClient({ host: 'redis-test' })
const asyncGet = promisify(client.get).bind(client)

async function getUserSession(token) {
  const userData = await asyncGet(token)
  return userData
}

function setUserSession(username) {
  const md5 = crypto.createHash('md5')
  md5.update(username + new Date().toISOString())
  const token = md5.digest('hex')
  extendSession(token, username)
  return token
}

function extendSession(token, username) {
  client.setex(token, 600, username)
}

module.exports = { getUserSession, setUserSession, extendSession }
