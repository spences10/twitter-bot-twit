const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

const retweet = (event) => {
  // console.log(JSON.stringify(event.lang))
  // console.log(JSON.stringify(event))
  // event.source.screen_name
  const blacklist = config.twitterConfig.blacklist.split(',')
  console.log('====================')
  console.log(blacklist, event.user.screen_name, blacklist.indexOf(event.user.screen_name))
  console.log('====================')
  if (
    event.lang != config.twitterConfig.language ||
    !event.in_reply_to_status_id ||
    blacklist.indexOf(event.screen_name) > -1
  )
    return
  console.log('====================')
  console.log(event)
  console.log('====================')
  // don't retweet replies
  bot.post('statuses/retweet/:id', { id: event.id_str }, (err, res) => {
    if (err) {
      console.log('RETWEET ERRORDERP: ', err.message)
    }
    console.log('RT SUCCESS: ', event.text)
  })
}

module.exports = retweet
