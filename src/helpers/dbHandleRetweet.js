const addTweet = require('./dbAddTweet')
const checkTweet = require('./dbCheckTweet')

const retweet = require('../api/retweet')
const config = require('../config')

const handleRetweet = (event) => {
  if (event.lang != config.twitterConfig.language) return
  // console.log(JSON.stringify(event.lang))
  // console.log(JSON.stringify(event))
  checkTweet(event).then((data) => {
    let count = data.length
    if (!count >= 0) {
      addTweet(event)
      // retweet
      retweet(event)
    }
  })
}

module.exports = handleRetweet
