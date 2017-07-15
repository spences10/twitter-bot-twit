const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport

const headers = {
  Authorization: 'Bearer YOUR_AUTH_TOKEN'
}

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj54a2vg7uvcm0196cqwzu8nw', { headers })
})

function getItems() {
  return client
    .query(
      `
      query	{
      allTweets {
        tweetText
        
      }
    }
  `
    )
    .then((result) => {
      console.log(result.allTweets)
    })
}

getItems()
