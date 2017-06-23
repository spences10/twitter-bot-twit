const fetch = require('node-fetch')

exports.getWords = async() => {

function showWordsOld() {
  const avoidKeywordsEndpoint = 'https://gist.githubusercontent.com/spences10/d21c8b869f3e9ccdcb12e61cd8d2ed03/raw/d428b883f838e91bd2f83e6a81b99b09a16b7b33/avoid-profile-keywords.json'

  fetch(avoidKeywordsEndpoint)
    .then(res => res.json())
    .then(word => {
      console.log(word)
    })
}

const showWords = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

const avoidWords = 'https://gist.githubusercontent.com/spences10/d21c8b869f3e9ccdcb12e61cd8d2ed03/raw/d428b883f838e91bd2f83e6a81b99b09a16b7b33/avoid-profile-keywords.json'
showWords(avoidWords)
  .then(word => {
    console.log(word)
  })
  
}
