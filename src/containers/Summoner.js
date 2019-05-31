import React, { Component } from 'react';
import Graph from './Graph';
import StatsToDisplay from './StatsToDisplay';
import ChampionSelect from './ChampionSelect';
import champIdList from '../static/ChampIds';

class Summoner extends Component {
  constructor() {
    super();
    this.state = {
      notFound: undefined,
      fetchedData: false,
      selectedChampions: 'Aatrox',
      championsPlayed: {},
      champIds: [17],
      summonerName: '',
      sumData: {
        summoner_ingame_name: 'thinking',
        kills: undefined,
        deaths: undefined,
        assists: undefined,
        visionscore: undefined,
        visionwardsboughtingame: undefined,
        wardsplaced: undefined,
        wardskilled: undefined,
        largestmultikill: undefined,
        largestkillingspree: undefined,
        doublekills: undefined,
        triplekills: undefined,
        quadrakills: undefined,
        pentakills: undefined,
        totaldamagetaken: undefined,
        totaldamagedealttochampions: undefined,
        damagedealttoobjectives: undefined
      },
      toggledStats: {
        kills: true,
        deaths: false,
        assists: false,
        visionscore: false,
        visionwardsboughtingame: false,
        wardsplaced: false,
        wardskilled: false,
        largestmultikill: false,
        largestkillingspree: false,
        doublekills: false,
        triplekills: false,
        quadrakills: false,
        pentakills: false,
        totaldamagetaken: false,
        totaldamagedealttochampions: false,
        damagedealttoobjectives: false
      },
      camelCaseStats: {
        kills: 'kills',
        deaths: 'deaths',
        assists: 'assists',
        visionscore: 'visionScore',
        visionwardsboughtingame: 'visionWardsBoughtInGame',
        wardsplaced: 'wardsPlaced',
        wardskilled: 'wardsKilled',
        largestmultikill: 'largestMultikill',
        largestkillingspree: 'largestKillingSpree',
        doublekills: 'doubleKills',
        triplekills: 'tripleKills',
        quadrakills: 'quadraKills',
        pentakills: 'pentaKills',
        totaldamagetaken: 'totalDamageTaken',
        totaldamagedealttochampions: 'totalDamageDealtToChampions',
        damagedealttoobjectives: 'damageDealtToObjectives'
      }
    }
    this.toggleStatButton = this.toggleStatButton.bind(this);
    this.fetchSummonerData = this.fetchSummonerData.bind(this);
    this.toggleChampionButton = this.toggleChampionButton.bind(this);
    this.getChampionsPlayed = this.getChampionsPlayed.bind(this);
  }

  async componentDidMount() {
    this.fetchSummonerData();
  }

  async componentDidUpdate() {
    if(this.state.summonerName !== this.props.history.location.pathname.slice(1).toLowerCase()) {
      this.setState({fetchedData: false, summonerName: this.props.history.location.pathname.slice(1)});
      this.fetchSummonerData();
    }
  }

  async fetchSummonerData() {
    let summonerName = this.props.history.location.pathname;
    summonerName = summonerName.slice(1).toLowerCase();

    if(localStorage.getItem(summonerName)) {
      const dataInStorage = JSON.parse(localStorage.getItem(summonerName));
      if(dataInStorage) {
        //if data was retrived less than a day ago, return stored data
        if((Date.now() - dataInStorage.timeRetrived) < (24*60*60*1000)) {
          const defaultId = dataInStorage.data[0].champion;
          let defaultChamp;
          for(const champ in champIdList) {
            if(champIdList[champ] === defaultId) {
              defaultChamp = champ;
            }
          }
          const champsPlayed = this.getChampionsPlayed(dataInStorage.data);
          this.setState({championsPlayed: champsPlayed, selectedChampions: defaultChamp, champIds: defaultId, sumData: dataInStorage.data, 
            fetchedData: true, summonerName: summonerName, notFound: false});
          return
        }
      }
    }

    try {
      let serverResponse = await fetch('https://leagueaverages.com/api/:summoner', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ sumName: summonerName, region: this.state.region })
      });

      let sumData = await serverResponse.json();
      if(sumData.notFound === true) {
        sumData = {};
        this.setState({notFound: true, fetchedData: true, summonerName: summonerName});
        return;
      }

      sumData = sumData.data;

      if(sumData.length === 0) {
        sumData = {};
        this.setState({notFound: true, fetchedData: true, summonerName: summonerName});
        return;
      }

      const localStorageItem = {timeRetrived: Date.now(), data: sumData};
      localStorage.setItem(summonerName, JSON.stringify(localStorageItem));

      if(this.state.selectedChampions) {
        const defaultId = sumData[0].champion;
        let defaultChamp;
        for(const champ in champIdList) {
          if(champIdList[champ] === defaultId) {
            defaultChamp = champ;
          }
        }
        const champsPlayed = this.getChampionsPlayed(sumData);
        this.setState({championsPlayed: champsPlayed, selectedChampions: defaultChamp, champIds: defaultId, sumData: sumData, 
          fetchedData: true, summonerName: summonerName, notFound: false});
      }

      this.setState({ sumData: sumData, fetchedData: true, summonerName: summonerName, notFound: false});
    } catch(error) {
      this.setState({selectedChampions: 'Aatrox', summonerName: summonerName});
    }
  }

  getChampionsPlayed(data) {
    const champs = {};
    for(let i = 0; i < data.length; i++) {
      if(!champs[data[i].champion]) {
        champs[data[i].champion] = true;
      }
    }
    return champs;
  }

  toggleStatButton(stat) {
    this.setState(function(prevState) {
      const newState = this.state;
      for(const oneStat in newState.toggledStats) {
        newState.toggledStats[oneStat] = false;
      }
      newState.toggledStats[stat] = !prevState.toggledStats[stat];
      return newState;
    })
  }

  toggleChampionButton(champs, champIds) {
    this.setState({ selectedChampions: champs, champIds: champIds });
  }

  render() {
    if(this.state.fetchedData) {
      if(this.state.notFound === true) {
        return (
          <div className={'no-data-found-div'}>
            <span>No summoner data found :(</span>
            <span>If you're sure you entered the correct name, try refreshing</span>
          </div>
        )
      } else {
        return (
          <div className={'summoner-flex-box'}>
            <Graph sumData={this.state.sumData} camelCaseStats={this.state.camelCaseStats} toggledStats={this.state.toggledStats} champIds={this.state.champIds}/>
            <StatsToDisplay toggleButton={this.toggleStatButton} toggledStats={this.state.toggledStats} camelCaseStats={this.state.camelCaseStats}/>
            <ChampionSelect selectedChampions={this.state.selectedChampions} toggleChampion={this.toggleChampionButton} championsPlayed={this.state.championsPlayed} />
          </div>
        )
      }
    } else {
      return (
        <div className={'loading-div'}>
          <span>LOADING</span> <br />
          <span>This may take a minute...</span>
        </div>
      )
    }
  }
}

export default Summoner;