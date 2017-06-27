const Twit = require('twit')
const config = require('../config')

const param = config.twitterConfig

const bot = new Twit(config.twitterKeys)

const follow = (event) => {
  console.log('FOLLOW QUERY: ', event.text)
}

module.exports = follow
