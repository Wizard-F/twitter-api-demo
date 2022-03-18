const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const {User} = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
  const {error} = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
  }
  const user = await User.findOne({email: req.body.email})
  if (!user) {
    res.status(400).send('Invalid email or password!')
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    res.status(400).send('Invalid email or password!')
  }

  const token = user.generateAuthToken()
  user.token = token
  res.send(user)
})


function validate(obj) {
  const schema = new Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(obj)
}

module.exports = router