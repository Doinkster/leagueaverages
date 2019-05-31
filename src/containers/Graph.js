import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageValues: [],
      toggledStats: props.toggledStats,
      champIds: props.champIds
    };
    this.averageDataByChampion = this.averageDataByChampion.bind(this);
  }

  componentDidMount() {
    this.averageDataByChampion();
  }

  componentDidUpdate() {
    if (this.props.champIds !== this.state.champIds) {
      this.averageDataByChampion();
      this.setState({ champIds: this.props.champIds });
    }
  }

  averageDataByChampion() {
    const allStats = [];
    let statTotalForSelectedChampion = {};
    let champCount = 0;
    let statAverage = {};
    for (let i = 0; i < this.props.sumData.length; i++) {
      if (this.props.champIds === this.props.sumData[i].champion) {
        for (const stat in this.props.sumData[i]) {
          if (typeof this.props.sumData[i][stat] === "number") {
            if (stat !== "account_id") {
              if (stat in statTotalForSelectedChampion) {
                statTotalForSelectedChampion[stat] += this.props.sumData[i][
                  stat
                ];
              } else {
                statTotalForSelectedChampion[stat] = this.props.sumData[i][
                  stat
                ];
              }
            }
          }
        }
        champCount++;
      }
    }

    for (const stat in statTotalForSelectedChampion) {
      const averageStat = statTotalForSelectedChampion[stat] / champCount;
      const averageStatRounded = Math.round(averageStat * 10) / 10;
      statAverage[stat] = averageStatRounded;
    }
    statAverage["champcount"] = champCount;
    allStats.push(statAverage);
    this.setState({ averageValues: allStats });
  }

  render() {
    if (this.state.averageValues.length === 0) {
      return <div />;
    }
    const dataToRender = [];
    let lowerCaseStat;

    for (let stat in this.props.toggledStats) {
      if (this.props.toggledStats[stat] === true) {
        lowerCaseStat = stat.toLowerCase();
        let sentenceCase = this.props.camelCaseStats[stat].replace(
          /([A-Z])/g,
          " $1"
        );
        sentenceCase =
          sentenceCase.charAt(0).toUpperCase() + sentenceCase.slice(1);
        dataToRender.push({
          stat: sentenceCase,
          value: this.state.averageValues[0][lowerCaseStat]
        });
      }
    }

    return (
      <div className={"bar-graph"}>
        <ResponsiveBar
          data={dataToRender}
          keys={["value"]}
          indexBy="stat"
          margin={{
            top: 10,
            right: 0,
            bottom: 50,
            left: 60
          }}
          padding={0.3}
          colors="rgb(0, 76, 255)"
          borderColor="inherit:darker(1.6)"
          axisBottom={{
            orient: "bottom",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: 36
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#FFFFFF"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={false}
          maxValue={
            dataToRender[0].value + Math.round(dataToRender[0].value * 10) / 100
          }
        />
      </div>
    );
  }
}

export default Graph;
