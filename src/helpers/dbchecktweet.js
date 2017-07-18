const { request } = require('graphql-request')

const endpoint = 'https://api.graph.cool/simple/v1/cj54a2vg7uvcm0196cqwzu8nw'

// use varibles to avoid breaking text being added
// https://github.com/graphcool/graphql-request#using-variables
const checkTweet = (event) => {
  const query = `query ($tweetText: String!) {
    allTweets(filter: {tweetText: $tweetText}) {
      id
    }
  }`

  const variables = {
    tweetText: event.text
  }

  request(endpoint, query)
    .then((data) => console.log(data))
    .catch((err) => console.log('Error: ', err, 'Tweet Text: ', event.text, 'Mutation: ', mutation))
}

module.exports = checkTweet
