const app = require('../app')
const PREFIX_ENDPOINT_NAME = 'course'
const { query } = require('../utils/mysql-client')
const { getUserSession, extendSession } = require('../utils/session')
const lodash = require('lodash')

app.get(`/${PREFIX_ENDPOINT_NAME}/:id`, async (req, res) => {
  try {
    const token = req.header('token')
    const username = await getUserSession(token)
    if (!username) {
      res.status(200).send({
        code: 406,
        data: { message: 'The token is expired.' },
      })
    }
    const rows = await query('SELECT * FROM courses WHERE id=?', [req.params.id])
    if (rows.length === 0) {
      res.status(200).send({
        code: 404,
        data: { message: 'Not found.' },
      })
    } else {
      res.status(200).send({
        code: 200,
        data: rows[0],
      })
    }
  } catch (e) {
    console.error(e)
    res.status(200).send({
      code: 500,
      data: { message: 'Internal Error' },
    })
  }
})

app.put(`/${PREFIX_ENDPOINT_NAME}/:id`, async (req, res) => {
  try {
    const token = req.header('token')
    const username = await getUserSession(token)
    if (!username) {
      res.status(200).send({
        code: 406,
        data: { message: 'The token is expired.' },
      })
    }
    extendSession(token, username)
    const rows = await query('SELECT user_type FROM users WHERE username=?', [username])
    if (rows[0].user_type === 'student') {
      res.status(200).send({
        code: 404,
        data: { message: 'Not found.' },
      })
    }
    const { name, description, category, subject, start_time, end_time } = req.body
    await query(
      'UPDATE courses SET name=?, description=?, category=?, subject=?, start_time=?, end_time=? WHERE id=?',
      [name, description, category, subject, start_time, end_time, req.params.id]
    )
    res.status(200).send({
      code: 200,
      data: { message: 'Success' },
    })
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
    if (!username) {
      res.status(200).send({
        code: 406,
        data: { message: 'The token is expired.' },
      })
    }
    const rows = await query('SELECT user_type FROM users WHERE username=?', [username])
    if (rows[0].user_type === 'student') {
      res.status(200).send({
        code: 404,
        data: { message: 'Not found.' },
      })
    }
    const { name, description, category, subject, start_time, end_time } = req.body
    const result = await query(
      'INSERT INTO courses (name, description, category, subject, start_time, end_time) VALUES(?,?,?,?,?,?)',
      [name, description, category, subject, start_time, end_time]
    )
    extendSession(token, username)
    res.status(200).send({
      code: 200,
      data: { id: result.insertId, name, description, category, subject, start_time, end_time },
    })
  } catch (e) {
    console.error(e)
    res.status(200).send({
      code: 500,
      data: { message: 'Internal Error' },
    })
  }
})

app.get(`/${PREFIX_ENDPOINT_NAME}`, async (req, res) => {
  try {
    console.log(req.query)
    const date = lodash.get(req, 'query.date', null)
    const keyword = lodash.get(req, 'query.keyword', null)
    const token = req.header('token')
    const username = await getUserSession(token)
    if (!username) {
      res.status(200).send({
        code: 406,
        data: { message: 'The token is expired.' },
      })
    }
    extendSession(token, username)
    const sql = 'SELECT * FROM courses WHERE '
    const conditionList = []
    const bindingParams = []
    if (date) {
      conditionList.push('? BETWEEN start_time AND end_time')
      bindingParams.push(date)
    }
    if (keyword) {
      conditionList.push('name LIKE ?')
      bindingParams.push(`%${keyword}%`)
    }
    if (conditionList.length === 0) {
      res.status(200).send({
        code: 404,
        data: { message: 'Not found.' },
      })
    }
    const finalSql = sql + conditionList.join(' AND ')
    console.log('QUERY', finalSql, bindingParams)
    const rows = await query(finalSql, bindingParams)

    if (rows.length === 0) {
      res.status(200).send({
        code: 404,
        data: { message: 'Not found.' },
      })
    } else {
      res.status(200).send({
        code: 200,
        data: rows,
      })
    }
  } catch (e) {
    console.error(e)
    res.status(200).send({
      code: 500,
      data: { message: 'Internal Error' },
    })
  }
})
