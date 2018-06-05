import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions, toggledStats } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions
    const dataToRender = []
    
    if(data.length === 0 || data[0].champcount === 0) {
      return (
        <div></div>
      )
    }
    for(let stat in this.props.toggledStats) {
      if(this.props.toggledStats[stat] === true) {
        const lowerCaseStat = stat.toLowerCase()
        let sentenceCase = this.props.camelCaseStats[stat].replace( /([A-Z])/g, " $1" );
        sentenceCase = sentenceCase.charAt(0).toUpperCase() + sentenceCase.slice(1)
        dataToRender.push({stat: sentenceCase, value: data[0][lowerCaseStat]})
      }
    }
    
    const bars = (
      dataToRender.map(datum =>
        <rect
          key={datum.stat}
          x={xScale(datum.stat)}
          y={yScale(datum.value)}
          height={height - margins.bottom - scales.yScale(datum.value)}
          width={xScale.bandwidth()}
          fill={'#537ad6'}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}
