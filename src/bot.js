// listen on port so now.sh likes it
const { createServer } = require('http')

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

const addTweet = require('./helpers/dbaddtweet')
const checkTweet = require('./helpers/dbchecktweet')

// keywords.getWords().then(x => console.log(x))

// reply to new follower
// const userStream = bot.stream('user')
// userStream.on('follow', reply)

const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})
trackStream.on('tweet', checkTweet[0])
trackStream.on('tweet', addTweet)

trackStream.on('tweet', track) // retweet
trackStream.on('tweet', follow) // follow

// This will cause the bot/server to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)
