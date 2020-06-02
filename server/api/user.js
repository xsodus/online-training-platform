const app = require('../app')
const { query } = require('../utils/mysql-client')
const { getUserSession, extendSession } = require('../utils/session')

const PREFIX_ENDPOINT_NAME = 'user'

app.get(`/${PREFIX_ENDPOINT_NAME}`, async (req, res) => {
  try {
    const token = req.header('token')
    const username = await getUserSession(token)
    if (!username) {
      res.status(200).send({
        code: 406,
        data: { message: 'The token is expired.' },
      })
    }
    const rows = await query(
      'SELECT uid,first_name,last_name,gender,birthday,nickname,user_type FROM users WHERE username=?',
      [username]
    )
    res.status(200).send({
      code: 200,
      data: rows[0],
    })
    // Extend session
    extendSession(token, username)
  } catch (e) {
    console.error(e)
    res.status(200).send({
      code: 500,
      data: { message: 'Internal Error' },
    })
  }
})

app.post(`/${PREFIX_ENDPOINT_NAME}`, async (req, res) => {
  try {
    const token = req.header('token')
    const username = await getUserSession(token)
    const { first_name, last_name, gender, birthday, nickname } = req.body
    if (!username) {
      res.status(200).send({
        code: 406,
        data: { message: 'The token is expired.' },
      })
    }
    const rows = await query(
      'UPDATE users SET first_name=?, last_name=?, gender=?, birthday=?, nickname=? WHERE username=?',
      [first_name, last_name, gender, birthday, nickname, username]
    )
    res.status(200).send({
      code: 200,
      data: rows[0],
    })
    // Extend session
    extendSession(token, username)
  } catch (e) {
    console.error(e)
    res.status(200).send({
      code: 500,
      data: { message: e },
    })
  }
})
