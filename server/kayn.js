const _kayn = require('kayn')
const apiKey = require('./keys')
const Kayn = _kayn.Kayn
const REGIONS = _kayn.REGIONS
const kayn = Kayn(apiKey.devKey)({
  region: REGIONS.NORTH_AMERICA,
  debugOptions: {
      isEnabled: true,
      showKey: false,
  },
  requestOptions: {
      shouldRetry: true,
      numberOfRetriesBeforeAbort: 2,
      delayBeforeRetry: 3000,
      burst: false,
  },
})

// const get = async (summoner) => {
//     const { accountId } = await kayn.Summoner.by.name(summoner)
//     const { matches, totalGames } = await kayn.Matchlist.by
//       .accountID(accountId)
//       .query({ season: 11, champion: 67 })
//       .region(REGIONS.NORTH_AMERICA)

//     console.log('actual matches:', matches)
//     console.log(`total number of games: ${totalGames}`)
// }

const getAccountIdWithName = async summoner => {
  const { accountId } = await kayn.Summoner.by.name(summoner)
  return accountId
}

const matchToGameId = ({ gameId }) => gameId

const getAllMatchIDs = async (matchlistDTO, accountID, getFn) => {
  const totalGames = 3000 //stops when all games found
  console.log(`Total number of games to process: ${totalGames}`)

  let rest = []
  if (totalGames > 100) {
    for (let beginIndex = 100; beginIndex < totalGames; beginIndex += 100) {
      const endIndex = beginIndex + 100
      const indexQuery = { beginIndex, endIndex }
      const matchlist = await getFn(accountID, indexQuery)
      if (matchlist.matches.length === 0) break // this is key
      rest = rest.concat(matchlist)
    }
  }

  const allMatchIds = rest.reduce((finalMatchList, currentList) => {
    return finalMatchList.concat(currentList.matches)
  }, [])

  let allMatches = matchlistDTO['matches'].concat(allMatchIds)
  allMatches = allMatches.map(matchToGameId)
  return allMatches
}

const getAllMatchIdsByAccountId = async (accountID) => {

  const getRankedMatchesForSummoner = async (accountID, indexQuery) => {
    return kayn.Matchlist.by
    .accountID(accountID)
    .region(REGIONS.NORTH_AMERICA)
    .query({ queue: 420, season: 11 })
    .query(indexQuery || {})
  }

  const firstMatchlistDTO = await getRankedMatchesForSummoner(accountID)
  
  const matchIDs = await getAllMatchIDs(
      firstMatchlistDTO,
      accountID,
      getRankedMatchesForSummoner,
  )
  return matchIDs  
}

const getRankedStatsFromMatches = async matchList => {
  const matches = await Promise.all(matchList.map(kayn.Match.get))
  return matches
}

module.exports.kayn = kayn
module.exports.REGIONS = REGIONS
module.exports.getAccountIdWithName = getAccountIdWithName
module.exports.getAllMatchIdsByAccountId = getAllMatchIdsByAccountId
module.exports.getRankedStatsFromMatches = getRankedStatsFromMatches
