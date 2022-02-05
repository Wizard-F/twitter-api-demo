const Joi = require('joi')
const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastModifiedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

tweetSchema.pre('save', function (next) {
    this.lastModifiedAt = Date.now()
    next()
})

const Tweet = mongoose.model('Tweet', tweetSchema)

function validateTweet(tweet) {
    const schema = Joi.object({
        content: Joi.string().min(1).max(280).required()
    })
    return schema.validate(tweet)
}

exports.Tweet = Tweet
exports.validate = validateTweet