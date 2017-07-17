// here we want to check that the tweet text does not match
// anything that has already been retweeted
const { request, GraphQLClient } = require('graphql-request')

const endpoint = 'https://api.graph.cool/simple/v1/cj54a2vg7uvcm0196cqwzu8nw'

const queryAllTweets = `{
  allTweets {
    tweetText
  }
}`

const mutation = `mutation {
  createTweet(tweetText: "Hi", userName: "rando") {
    id
  }
}`

const querySpecificTweet = `{
  allTweets(filter: {tweetText: "hi dave"}) {
    id
  }
}`

request(endpoint, queryAllTweets).then((data) => console.log(data))

request(endpoint, mutation).then((data) => console.log(data))

request(endpoint, querySpecificTweet).then((data) => console.log(data))

// // items from twitter
// const Twit = require('twit')
// const config = require('../config')
// const bot = new Twit(config.twitterKeys)

// bot.get(
//   'followers/ids',
//   {
//     screen_name: config.twitterConfig.username,
//     count: 200
//   },
//   function getData(err, data, response) {
//     data.users.forEach((user) => {
//       console.log('loop item: ', user.screen_name)
//     })

//     // for (let i = 0; i < response.users.length; i++) {
//     //   console.log(response.users[i])
//     // }

//     if (data['next_cursor'] > 0)
//       bot.get(
//         'followers/ids',
//         {
//           screen_name: config.twitterConfig.username,
//           count: 200,
//           next_cursor: data['next_cursor']
//         },
//         getData
//       )
//   }
// )
