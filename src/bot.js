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

// console.log(keywords.getWords())

// follow on keywords
follow()
setInterval(follow, config.twitterConfig.follow)

// // reply to new follower
// const userStream = bot.stream('user')
// userStream.on('follow', reply)

// track the things
// const filterStream = bot.stream('statuses/filter', { track: ['node'] })
// filterStream.on('tweet', track)

// const param = config.twitterConfig
// const trackWords = param.queryString.split(',')

// const stream = bot.stream('statuses/filter', {
//   track: trackWords
// });

// stream.on('tweet', track)