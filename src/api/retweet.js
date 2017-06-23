const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
  const query = queryString()
  console.log('RT QUERY: ', query)
  bot.get(
    'search/tweets',
    {
      q: query,
      result_type: param.resultType,
      lang: param.language,
      filter: 'safe',
      count: param.searchCount,
      exclude: 'replies'
    },
    (err, data, response) => {
      if (err) {
        console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
      } else {
        for (let i = 0; i < data.statuses.length; i++) {
          let retweeID
          try {
            retweetId = { id: data.statuses[i].id_str }
          } catch (e) {
            console.log('ERRORDERP: RT Err: ', e)
            return
          }

          bot.post(
            'statuses/retweet/:id',
            {
              id: retweetId
            },
            (err, response) => {
              if (err) {
                console.log('ERRORDERP: Retweet!')
              }
              console.log(
                'SUCCESS: RT: ',
                data.statuses[i].text
              )
            }
          )
        }
      }
    }
  )
}

module.exports = retweet
