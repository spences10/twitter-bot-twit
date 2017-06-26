const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

const track = event => {
  // console.log(JSON.stringify(event.lang))
  // event.source.screen_name
  if (event.lang != config.twitterConfig.language) return
  console.log('====================')
  console.log(event.text)
  console.log('====================')
}

module.exports = track
