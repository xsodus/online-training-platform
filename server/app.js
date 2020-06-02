// server/app.js
const express = require('express')
const path = require('path')
const db = require('./utils/mysql-client')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
module.exports = app
