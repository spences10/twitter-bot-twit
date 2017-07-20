const addTweet = require('./dbaddtweet')
const checkTweet = require('./dbchecktweet')

const handleRetweet = (event) => {
  // console.log(JSON.stringify(event.lang))
  // console.log(JSON.stringify(event))
  checkTweet(event).then((data) => {
    console.log(data)
  })
  addTweet(event)
}

module.exports = handleRetweet
