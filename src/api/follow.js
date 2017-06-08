const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const follow = () => {

  const query = queryString()

  bot.get('search/tweets', {
    q: query,
    result_type: param.resultType,
    lang: param.language,
    filter: 'safe',
    count: param.searchCount
  }, (err, data, response) => {
    if (err) {
      console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
    } else {
      // grab tweet ID to retweet
      const rando = Math.floor(Math.random() * param.searchCount) + 1
      let screen_name

      try {
        screen_name = data.statuses[0].user.screen_name
      } catch (e) {
        console.log('ERRORDERP: Cannot assign screen_name')
        return
      }

      bot.post('friendships/create', {
        screen_name
      }, (err, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('FOLLOWED: ', screen_name)
        }
      })

    }
  })

}

module.exports = follow