// https://github.com/Eywek/twitter-bot-unfollow
const Twit = require('twit')
const config = require('../config')
const client = new Twit(config.twitterKeys)
const _ = require('underscore')

const getFollowers = (callback, cursor, followers) => {
  if (!followers) followers = []
  client.get(
    'followers/list',
    {
      screen_name: config.twitterConfig.username.screen_name,
      count: 200,
      include_user_entities: false,
      cursor
    },
    (err, response) => {
      if (err) return callback(err)

      for (let i = 0; i < response.users.length; i++) {
        followers.push(response.users[i])
      }

      // next page
      if (response.next_cursor && response.next_cursor > 0)
        return getFollowers(callback, response.next_cursor, followers)
      else return callback(undefined, _.uniq(followers, (user, key) => user.id))
    }
  )
}

let followersList = [] // list of followers ids
let unfollowers = []

setInterval(() => {
  console.log(`[${new Date()}] Check unfollowers... (Last followers count: ${followersList.length})`)
  getFollowers(
    (err, followers) => {
      if (err) return console.error(err)
      unfollowers = [] // reset unfollowers

      // Check each followers
      if (followersList.length > 0) {
        // not init
        // Check each followers
        for (var i = 0; i < followersList.length; i++) {
          // check if is in list
          if (
            !_.findWhere(followers, {
              id: followersList[i].id
            }) // not in actual followers list
          )
            unfollowers.push(
              _.findWhere(followersList, {
                id: followersList[i].id
              })
            ) // get infos from unfollow on old Followers list
        }
      }

      // update followers list
      followersList = []
      for (var i = 0; i < followers.length; i++) {
        followersList.push(followers[i])
      }

      // send unfollowers mp
      if (unfollowers) {
        console.log(
          'Unfollowers list:',
          unfollowers.map((user) => {
            return `${user.name} (@${user.screen_name})`
          })
        )
        if (unfollowers.length > 0) {
          // unfollowers
          client.post(
            'direct_messages/new',
            {
              screen_name: config.twitterConfig.username.screen_name,
              text: `${unfollowers
                .map((user) => {
                  return user.name + ' (@' + user.screen_name + ')'
                })
                .join(', ')} vous ${
                unfollowers.length > 1 ? 'ont' :
                'a'} unfollow.`
            },
            (err) => {
              if (err) console.error(err)
            }
          )
        }
      }
    },
    undefined,
    []
  )
}, 15 * 60 * 1000) // each 15 minutes

module.exports = getFollowers
