// items from twitter
const config = require('../config')
const Twit = require('twit')
const bot = new Twit(config.twitterKeys)
const { request, GraphQLClient } = require('graphql-request')

const endpoint = config.graphqlConfig.endpoint

const addFollowers = () => {
  bot.get(
    'followers/ids',
    {
      screen_name: config.twitterConfig.username,
      count: 200
    },
    function getData(err, data, response) {
      console.log('====================')
      console.log(response)
      console.log('====================')
      return
      // data.users.forEach((user) => {
      //   console.log('loop item: ', user.screen_name)
      // })

      for (let i = 0; i < data.ids.length; i++) {
        const mutation = `mutation ($screenName: String!) {
          createUser(screenName: $screenName) {
            id
          }
        }`

        const variables = {
          screenName: data.ids[i]
        }

        request(endpoint, mutation, variables)
          // .then((data) => data) // .then((data) => console.log(data))
          .then((data) => console.log(data))
          .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
        console.log(data.ids[i])
      }

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
}

module.exports = addFollowers
