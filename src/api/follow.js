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

      for (let i = 0; i < data.statuses.length; i++) {
        let screen_name = data.statuses[i].user.screen_name;
        // console.log(screen_name)

        const d = new Date()
        d.getMonth(d.getMonth() - 12)
        console.log(`Month is ${d.toISOString()}`)
        bot.get('search/tweets', {
          q: `from:@${screen_name} since:${d.toISOString()}`,
          count: 200
        }, (err, data, res) => {
          if (err) {
            console.log('ERRORDERP: ', err)
          } else {
            data.statuses.forEach(s => {
              console.log(s.text)
              console.log(s.user.screen_name)
              console.log('\n')
            })
          }
        })


        // bot.post('friendships/create', {
        //   screen_name
        // }, (err, res) => {
        //   if (err) {
        //     console.log(err)
        //   } else {
        //     console.log('FOLLOWED: ', screen_name)
        //   }
        // })
      }
    }
  })

}

module.exports = follow