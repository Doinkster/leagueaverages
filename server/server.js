const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const kayn = require('./kayn.js')
const pgp = require('pg-promise')
const redis = require('redis')

//postgres
const pgPromise = pgp()
const databaseConnection = {
    port: 5432,
    database: 'brian',
    user: 'brian',
    password: 'yabub123'
};
const db = pgPromise(databaseConnection)
const cs = new pgPromise.helpers.ColumnSet([
  'game_id', 'account_id', 'game_version', 'champion', 'season_id', 'queue_id', 'kills',
  'assists', 'deaths', 'visionscore', 'visionwardsboughtingame', 'wardsplaced', 'wardskilled', 'largestmultikill','largestkillingspree', 
  'doublekills', 'triplekills', 'quadrakills', 'pentakills', 'totaldamagetaken', 'totaldamagedealttochampions', 'damagedealttoobjectives'
  ], {table: 'matches'});

//redis
// const client = redis.createClient()
// client.auth('Pu3g$xXt5!#AzT#qfnsb')
//const redisStore = connect(session)

const app = express();

app.enable('trust proxy'); //nginx
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const dir = path.join(__dirname, '../dist');
app.use(express.static(dir));

const dir2 = path.join(__dirname, '../public');
app.use(express.static(dir2));

app.listen(8080);

app.get('*', function(req, res) {
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.sendFile(path.join(__dirname, '../dist/', 'index.html'));
})

app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});

app.post('/api/:summoner', async (req, res) => {
  res.set('Content-Type', 'application/json; charset=utf-8')

  //check if valid name
  const escapedName = req.body.sumName.match(/[^\d\uFB01\uFB02\u00AA\u00B5\u00BA\u00BF-\u1FFF\u2C00-\uD7FF\w _\.]+/g)
  if(escapedName !== null) {
    res.send({notFound: true})
    return
  }
  if(req.body.sumName === '') {
    res.send({notFound: true})
    return
  }

  //logic to use without production api key
  const lowerCaseName = req.body.sumName.toLowerCase().split(' ').join('')
  let accountId

  if(['ripaptrist', 'imaqtpie', 'qldurtms'].indexOf(lowerCaseName) > -1 ) {
    if(lowerCaseName === 'ripaptrist') {
      accountId = 38848410
    } else if(lowerCaseName === 'imaqtpie') {
      accountId = 32639237
    } else if(lowerCaseName === 'qldurtms') {
      accountId = 213387568
    }
  } else {
    res.send({notFound: true})
    return
  }

  try {
    const defaultMatches = await db.any({
      text: 'SELECT * FROM matches WHERE account_id = $1',
      values: [accountId]
    })

    res.send({data: defaultMatches})
  } catch(e) {
    console.log(e)
    res.send({notFound: true})
    return
  }
  //end of logic to use without production api key

  //logic to use with production api

  // try {
  //   const sumName = req.body.sumName.trim()
  //   // const redisCache = await client.get(sumName)
  //   // if(redisCache) {
  //   //   res.send({ matches: redisCache})
  //   //   return
  //   // }
  //   let accountId = await db.one({
  //     text: 'SELECT * FROM summoners WHERE summoner_ingame_name = $1',
  //     values: [sumName]
  //   }).catch(async e => {
  //     try {
  //       const accountId = await kayn.getAccountIdWithName(sumName)
  //       await db.none({
  //         text: 'INSERT INTO summoners(account_id, summoner_ingame_name, time_last_searched) VALUES($1, $2, $3)',
  //         values: [accountId, sumName, null]
  //       }).catch(e => {
  //           console.log(e)
  //           res.send({notFound: true})
  //           return
  //         })
  //       const accountIdAsObject = {
  //         account_id: accountId,
  //         summoner_ingame_name: sumName,
  //         time_last_searched: undefined
  //       }
  //       return accountIdAsObject
  //     }.catch(e) {
  //       console.log(e)
  //       res.send({notFound: true})
  //       return
  //     }
  //   })

  //   const matchesInDatabase = await db.any({
  //     text: 'SELECT * FROM matches WHERE account_id = $1',
  //     values: [accountId.account_id]
  //   }).catch(e => {
  //     console.log(e)
  //     res.send({notFound: true})
  //     return
  //   })


  //   //if summoner searched within past 24 hours, only send data in database
  //   if(accountId.time_last_searched) {
  //     if((Date.now() - 24*60*60*1000) < accountId.time_last_searched) {
  //       res.send({data: matchesInDatabase})
  //       return
  //     } 
  //   }

  //   const allMatchesFromAPI = await kayn.getAllMatchIdsByAccountId(accountId.account_id).catch(e => {
  //     console.log(e)
  //     res.send({notFound: true})
  //     return
  //   })

  //   const matchesToRequest = allMatchesFromAPI.filter(match => {
  //     return !matchesInDatabase.includes(match)
  //   }).slice(0, 20)

  //   const newMatchData = await kayn.getRankedStatsFromMatches(matchesToRequest).catch(e => {
  //     console.log(e)
  //     res.send({notFound: true})
  //     return
  //   })
  //   //get relevant data from new matches
  //   const statsToInsert = []
  //   const statsNeeded = {
  //     kills:'kills',assists:'assists',deaths:'deaths',visionScore:'visionscore',visionWardsBoughtInGame:'visionwardsboughtingame',
  //     wardsPlaced:'wardsplaced',wardsKilled:'wardskilled',largestMultiKill:'largestmultikill',largestKillingSpree:'largestkillingspree',
  //     doubleKills:'doublekills',tripleKills:'triplekills',quadraKills:'quadrakills',pentaKills:'pentakills',totalDamageTaken:'totaldamagetaken',
  //     totalDamageDealtToChampions:'totaldamagedealttochampions',damageDealtToObjectives:'damagedealttoobjectives'
  //   }
  //   for(let i = 0; i < newMatchData.length; i++) {
  //     const singleMatchData = newMatchData[i]
  //     for(let j = 0; j < singleMatchData.participants.length; j++) {
  //       const statsForDatabase = {}
  //       let stats = {}
  //       if(singleMatchData.participantIdentities[j].player.currentAccountId === accountId.account_id) {
  //         for(const stat in statsNeeded) {
  //           const lowerCaseStat = statsNeeded[stat]
  //           stats[lowerCaseStat] = singleMatchData.participants[j].stats[stat]
  //         }

  //         stats.game_id = singleMatchData.gameId 
  //         stats.game_version = singleMatchData.gameVersion.split('.').slice(0, 2).join('.')
  //         stats.season_id = singleMatchData.seasonId
  //         stats.queue_id = singleMatchData.queueId
  //         stats.champion = singleMatchData.participants[j].championId
  //         stats.account_id = singleMatchData.participantIdentities[j].player.currentAccountId
  //         statsToInsert.push(stats)
  //         break
  //       }
  //     }
  //   }

  //   if(statsToInsert.length === 0) {
  //     res.send({notFound: true})
  //     return
  //   }

  //   const query = pgPromise.helpers.insert(statsToInsert, cs)
  //   await db.none(query).catch(e => {
  //     console.log(e)
  //     res.send({notFound: true})
  //     return
  //   })
  //   await db.none({
  //         text: 'UPDATE summoners SET time_last_searched = $1 WHERE account_id = $2',
  //         values: [Date.now(), accountId.account_id]
  //       }).catch(e => {
  //         console.log(e)
  //         res.send({notFound: true})
  //         return
  //       })

  //   const matches = statsToInsert.concat(matchesInDatabase)
  //   res.send({data: matches})
  //   return
  // } catch(e) {
  //   console.log(e)
  //   res.send({notFound: true})
  //   return
  // }

  //end of production api key logic
})