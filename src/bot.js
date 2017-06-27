// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const keywords = require('./helpers/keywords')

const bot = new Twit(config.twitterKeys)

const follow = require('./api/follow')
const reply = require('./api/reply')
const track = require('./api/track')

// keywords.getWords().then(x => console.log(x))

// reply to new follower
const userStream = bot.stream('user')
userStream.on('follow', reply)

const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})
trackStream.on('tweet', track) // retweet
trackStream.on('tweet', follow) // follow
