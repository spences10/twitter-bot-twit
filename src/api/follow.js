const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const fetch = require('node-fetch')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const follow = () => {
  const query = queryString()
  console.log('FOLLOW QUERY: ', query)
  bot.get(
    'search/tweets',
    {
      q: query,
      result_type: param.resultType,
      lang: param.language,
      filter: 'safe',
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
      } else {
        for (let i = 0; i < data.statuses.length; i++) {
          let screen_name = data.statuses[i].user.screen_name
          // console.log(screen_name)

          const d = new Date()
          d.getMonth(d.getMonth() - 1)
          // console.log(`Month is ${d.toISOString()}`)

          bot.get(
            'search/tweets',
            {
              q: `from:@${screen_name}`,
              count: 50
            },
            (err, data, res) => {
              if (err) {
                console.log('ERRORDERP: ', err)
              } else {
                data.statuses.forEach(s => {
                  // get avoid keywords
                  const avoidKeywordsEndpoint =
                    'https://gist.githubusercontent.com/spences10/d21c8b869f3e9ccdcb12e61cd8d2ed03/raw/d428b883f838e91bd2f83e6a81b99b09a16b7b33/avoid-profile-keywords.json'

                  // get follow keywords
                  const followKeywordsEndpoint =
                    'https://gist.githubusercontent.com/spences10/d21c8b869f3e9ccdcb12e61cd8d2ed03/raw/d428b883f838e91bd2f83e6a81b99b09a16b7b33/interest-profile-keywords.json'

                  let getWords = async url => {
                    const response = await fetch(url)
                    return await response.json()
                  }

                  getWords(avoidKeywordsEndpoint).then(word => {
                    const arrAvoid = Object.values(word)

                    let len = arrAvoid.length

                    while (len--) {
                      if (s.text.indexOf(arrAvoid[len]) !== -1) {
                        console.log('Avoid matches: ', arrAvoid[len])
                        console.log('Avoid user: ', s.user.screen_name)
                      }
                    }
                  })

                  getWords(followKeywordsEndpoint).then(word => {
                    const arrFollow = Object.values(word)

                    let len = arrFollow.length

                    while (len--) {
                      if (s.text.indexOf(arrFollow[len]) !== -1) {
                        console.log('Follow matches: ', arrFollow[len])
                        console.log('Follow user: ', s.user.screen_name)
                      }
                    }
                  })

                  // getWords(followKeywordsEndpoint)
                  //   .then(word => {
                  //     console.log(word)
                  //   })

                  // console.log(s.text)
                  // console.log(s.user.screen_name)
                  // console.log('\n')
                })
              }
            }
          )

          // chaeck that user can be followed

          // check that relationship doesnt exist already

          // create relationship
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
    }
  )
}

module.exports = follow
