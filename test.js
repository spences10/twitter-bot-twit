const fetch = require('node-fetch')


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



// const yourstring = 'I was followback someone the other day that looked a bit grumpy cat'

// const substrings = [  
//   "followback",
//   "followers",
//   "grumpy cat",  
//   "gamergate",
//   "quotes",
//   "facts",
//   "harry potter"
// ]

// let len = substrings.length;

// while(len--) {
//   if (yourstring.indexOf(substrings[len])!==-1) {
//     console.log('matches: ', substrings[len])
//   }
// }
