const { request } = require('graphql-request')

const endpoint = 'https://api.graph.cool/simple/v1/cj54a2vg7uvcm0196cqwzu8nw'

const addTweet = (event) => {
  const mutation = `mutation ($tweetText: String!, $userName: String!) {
    createTweet(tweetText: $tweetText, userName: $userName) {
      id
    }
  }`

  const variables = {
    tweetText: event.text,
    userName: event.user.screen_name
  }
  request(endpoint, mutation, variables)
    .then((data) => console.log(data))
    .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
}

module.exports = addTweet
