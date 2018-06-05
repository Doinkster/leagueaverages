import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Bars from './Bars'
//import BarChartGrouped from './BarChartGrouped'

class StatChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xScale: scaleBand(),
      yScale: scaleLinear(),
      averageValues: [],
      maxValue: 5,
      toggledStats: props.toggledStats,
      champIds: props.champIds,
    }
    this.averageDataByChampion = this.averageDataByChampion.bind(this)
  }
  static propTypes = {}

  componentDidMount() {
    this.averageDataByChampion()
  }

  componentDidUpdate() {
    let highestNumber = 5
    for(let i = 0; i < this.props.sumData.length; i++) {
      for(let maxStat in this.props.sumData[i]) {
        if(this.props.toggledStats[maxStat] === true) {
          if(this.props.sumData[i][maxStat] > highestNumber) {
            highestNumber = this.props.sumData[i][maxStat]
          }
        }
      }
    }
    if(highestNumber !== this.state.maxValue) {
      this.setState({ maxValue: highestNumber })
    }
    if(this.props.champIds !== this.state.champIds) {
      this.averageDataByChampion()
      this.setState({champIds: this.props.champIds})
    }
  }

  averageDataByChampion() {
    //every time user selects a champion, sort thru selected champions and 
    //stats and setState as average stats for selected champ

    //allStats = [{champ 1}, {champ 2}, {champ 3}]
    const allStats = []
    let statTotalForSelectedChampion = {} 
    let champCount = 0
    let statAverage = {}
    //console.log('SELECTED CHAMPS', this.props.selectedChampions);
    // for(let j = 0; j < this.props.selectedChampions.length; j++) {
    //   champCount = 0
    //   statAverage = {}
    //   statTotalForSelectedChampion = {}

    //   for(let i = 0; i < this.props.sumData.length; i++) {
    //     if(this.props.selectedChampions[j] === this.props.sumData[i].champion) {
    //       for(const stat in this.props.sumData[i]) {
    //         if(typeof this.props.sumData[i][stat] === 'number') {
    //           if(stat !== 'account_id') {
    //             if(stat in statTotalForSelectedChampion) {
    //               statTotalForSelectedChampion[stat] += this.props.sumData[i][stat]
    //             } else {
    //               statTotalForSelectedChampion[stat] = this.props.sumData[i][stat]
    //             }
    //           }
    //         }
    //       }
    //       champCount++
    //     }
    //   }
    for(let i = 0; i < this.props.sumData.length; i++) {
      if(this.props.champIds === this.props.sumData[i].champion) {
        for(const stat in this.props.sumData[i]) {
          if(typeof this.props.sumData[i][stat] === 'number') {
            if(stat !== 'account_id') {
              if(stat in statTotalForSelectedChampion) {
                statTotalForSelectedChampion[stat] += this.props.sumData[i][stat]
              } else {
                statTotalForSelectedChampion[stat] = this.props.sumData[i][stat]
              }
            }
          }
        }
        champCount++
      }
    }

    for(const stat in statTotalForSelectedChampion) {
      const averageStat = statTotalForSelectedChampion[stat] / champCount
      statAverage[stat] = averageStat
    }
    statAverage['champcount'] = champCount
    allStats.push(statAverage)
    this.setState({averageValues: allStats})
  }

  render() {
    const toggledStats = []
    const toggledStatsToSentenceCase = []

    for(const stat in this.state.toggledStats) {
      if(this.state.toggledStats[stat] === true) {
        toggledStats.push({stat: stat})
        let sentenceCase = this.props.camelCaseStats[stat].replace( /([A-Z])/g, " $1" );
        sentenceCase = sentenceCase.charAt(0).toUpperCase() + sentenceCase.slice(1)
        toggledStatsToSentenceCase.push({sentenceCase: sentenceCase})
      }
    }


    const margins = { top: 50, right: 20, bottom: 100, left: 50 }
    const svgDimensions = { width: 700, height: 600 }
    
    const xScale = this.state.xScale
      .padding(0.5)
      .domain(toggledStatsToSentenceCase.map(d => d.sentenceCase))
      .range([margins.left, svgDimensions.width - margins.right])
  
    const yScale = this.state.yScale
      .domain([0, this.state.maxValue + (this.state.maxValue / 10)])
      .range([svgDimensions.height - margins.bottom, margins.top])

    //TODO: if(this.graphMode vs this.chartMode)
    //TODO: select multiple champions
    return (
      <svg className={'stat-chart-box'} viewBox="0 0 800 600">
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          camelCaseStats={this.props.camelCaseStats}
          data={this.state.averageValues}
          toggledStats={this.state.toggledStats}
          maxValue={this.state.maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default StatChart