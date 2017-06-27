// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const keywords = require('./helpers/keywords')

const bot = new Twit(config.twitterKeys)

const retweet = require('./api/retweet')
const follow = require('./api/follow')
const reply = require('./api/reply')
const track = require('./api/track')

// // retweet on keywords
// retweet()
// setInterval(retweet, config.twitterConfig.retweet)

// keywords.getWords().then(x => console.log(x))

// // follow on keywords
// follow()
// setInterval(follow, config.twitterConfig.follow)

// reply to new follower
const userStream = bot.stream('user')
userStream.on('follow', reply)

const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// use stream to track keywords
const stream = bot.stream('statuses/filter', {
  track: trackWords
})
stream.on('tweet', track)
stream.on('tweet', follow)
