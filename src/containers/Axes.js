import React from 'react'
import Axis from './Axis'

const Axes = ({scales, margins, svgDimensions}) => {
  const { height, width } = svgDimensions

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: 0,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left,
  }

  const yPropsRight = {
    orient: 'Right',
    scale: scales.yScale,
    translate: `translate(${width}, 0)`,
    tickSize: width - margins.left,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
      <Axis {...yPropsRight} />
    </g>
  )
}

export default Axes