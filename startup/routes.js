const express = require('express')
const cors = require('cors')

const users = require('../routes/users')
const tweets = require('../routes/tweets')
const auth = require('../routes/auth')

module.exports = function (app) {
  app.use(cors())
  app.use(express.json())
  app.use('/api/users', users)
  app.use('/api/tweets', tweets)
  app.use('/api/auth', auth)
}