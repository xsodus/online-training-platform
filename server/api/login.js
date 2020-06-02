const app = require('../app')
const { query } = require('../utils/mysql-client')
const { setUserSession } = require('../utils/session')

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const rows = await query(
      'SELECT uid,username,user_type FROM users WHERE username=? and password=MD5(?)',
      [username, password]
    )
    if (rows.length > 0) {
      const token = setUserSession(username)
      const data = { ...rows[0], token }
      res.status(200).send({
        code: 200,
        data: data,
      })
    } else {
      throw 'Incorrect username or password'
    }
  } catch (e) {
    console.error(e)
    res.status(200).send({
      code: 500,
      data: { message: e },
    })
  }
})
