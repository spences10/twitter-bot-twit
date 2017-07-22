const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

const retweet = (event) => {
  // console.log(JSON.stringify(event.lang))
  // console.log(JSON.stringify(event))
  // event.source.screen_name
  if (event.lang != config.twitterConfig.language) return
  console.log('====================')
  console.log(event.text)
  console.log('====================')
  // don't retweet replies
  if (!event.in_reply_to_status_id) {
    bot.post('statuses/retweet/:id', { id: event.id_str }, (err, res) => {
      if (err) {
        console.log('RETWEET ERRORDERP: ', err.message)
      }
      console.log('RT SUCCESS: ', event.text)
    })
  }
}

module.exports = retweet
