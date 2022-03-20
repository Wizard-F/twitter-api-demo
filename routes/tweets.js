const express = require('express')
const _ = require('lodash')

const {Tweet, validate} = require('../models/tweet')
const auth = require('../middleware/auth')

const router = express.Router()

// Get tweet by id
router.get('/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate('author', 'name')
    res.send(tweet)
  } catch (e) {
    console.log(e)
  }
})

// Get all tweets
router.get('/', async (req, res) => {
  const tweets = await Tweet.find().populate('author', 'name').sort('lastModifiedAt')
  res.send(tweets)
})

// Post new tweet
router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const tweet = new Tweet({
    content: req.body.content,
    author: req.user._id
  })
  await tweet.save()
  
  res.send(tweet)
})

// Modify tweet
router.put('/:id', auth, async (req, res) => {
  const {error} = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const tweet = await Tweet.findById(req.params.id)
  if (!tweet) {
    return res.status(404).send('Tweet not found!')
  }

  if (req.user._id.toString() !== tweet.author.toString()) {
    return res.status(403).send('Permission denied!')
  }

  tweet.content = req.body.content
  await tweet.save()
  res.send(tweet)
})

router.delete('/:id', auth, async (req, res) => {
  const tweet = await Tweet.findById(req.params.id)
  if (!tweet) {
    return res.status(404).send('Tweet not found!')
  }
  if (req.user._id.toString() !== tweet.author.toString()) {
    return res.status(403).send('Permission denied!')
  }
  await Tweet.findByIdAndDelete(req.params.id)
  res.send(tweet)
})

module.exports = router