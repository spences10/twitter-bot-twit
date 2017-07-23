// items from twitter
const Twit = require('twit')
const config = require('../config')
const bot = new Twit(config.twitterKeys)

const { request, GraphQLClient } = require('graphql-request')

const endpoint = config.graphqlConfig.endpoint

const mutation = `mutation {
  createUser(tweetText: "Hi", userName: "rando") {
    id
  }
}`

request(endpoint, mutation).then((data) => console.log(data))

bot.get(
  'followers/ids',
  {
    screen_name: config.twitterConfig.username,
    count: 200
  },
  function getData(err, data, response) {
    data.users.forEach((user) => {
      console.log('loop item: ', user.screen_name)
    })

    // for (let i = 0; i < response.users.length; i++) {
    //   console.log(response.users[i])
    // }

    if (data['next_cursor'] > 0)
      bot.get(
        'followers/ids',
        {
          screen_name: config.twitterConfig.username,
          count: 200,
          next_cursor: data['next_cursor']
        },
        getData
      )
  }
)