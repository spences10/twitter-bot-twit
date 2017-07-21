const addTweet = require('./dbAddTweet')
const checkTweet = require('./dbCheckTweet')

const track = require('../api/track')
const config = require('../config')

const handleRetweet = (event) => {
  if (event.lang != config.twitterConfig.language) return
  // console.log(JSON.stringify(event.lang))
  // console.log(JSON.stringify(event))
  checkTweet(event).then((data) => {
    let count = data.length
    if (!count >= 0) {
      addTweet(event)
      // tweet it with track TODO refactor names!
      track(event)
    }
  })
}

module.exports = handleRetweet
