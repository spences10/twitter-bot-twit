// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const { getWords } = require('./helpers/keywords')

const bot = new Twit(config.twitterKeys)

const retweet = require('./api/retweet')
const follow = require('./api/follow')
const reply = require('./api/reply')

// retweet on keywords
retweet()
setInterval(retweet, config.twitterConfig.retweet)

getWords()


// // follow on keywords
// follow()
// setInterval(follow, config.twitterConfig.follow)

// // reply to new follower
// const userStream = bot.stream('user')
// userStream.on('follow', reply)

