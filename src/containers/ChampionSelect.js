import React, { Component } from "react";
import championIds from "../static/ChampIds";

class ChampionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: [
        "Aatrox",
        "Ahri",
        "Akali",
        "Alistar",
        "Amumu",
        "Anivia",
        "Annie",
        "Ashe",
        "Aurelion Sol",
        "Azir",
        "Bard",
        "Blitzcrank",
        "Brand",
        "Braum",
        "Caitlyn",
        "Camille",
        "Cassiopeia",
        "Cho'Gath",
        "Corki",
        "Darius",
        "Diana",
        "Dr. Mundo",
        "Draven",
        "Ekko",
        "Elise",
        "Evelynn",
        "Ezreal",
        "Fiddlesticks",
        "Fiora",
        "Fizz",
        "Galio",
        "Gangplank",
        "Garen",
        "Gnar",
        "Gragas",
        "Graves",
        "Hecarim",
        "Heimerdinger",
        "Illaoi",
        "Irelia",
        "Ivern",
        "Janna",
        "Jarvan IV",
        "Jax",
        "Jayce",
        "Jhin",
        "Jinx",
        "Kai'Sa",
        "Kalista",
        "Karma",
        "Karthus",
        "Kassadin",
        "Katarina",
        "Kayle",
        "Kayn",
        "Kennen",
        "Kha'Zix",
        "Kindred",
        "Kled",
        "Kog'Maw",
        "LeBlanc",
        "Lee Sin",
        "Leona",
        "Lissandra",
        "Lucian",
        "Lulu",
        "Lux",
        "Malphite",
        "Malzahar",
        "Maokai",
        "Master Yi",
        "Miss Fortune",
        "Mordekaiser",
        "Morgana",
        "Nami",
        "Nasus",
        "Nautilus",
        "Nidalee",
        "Nocturne",
        "Nunu",
        "Olaf",
        "Orianna",
        "Ornn",
        "Pantheon",
        "Poppy",
        "Quinn",
        "Rakan",
        "Rammus",
        "Rek'Sai",
        "Renekton",
        "Rengar",
        "Riven",
        "Rumble",
        "Ryze",
        "Sejuani",
        "Shaco",
        "Shen",
        "Shyvana",
        "Singed",
        "Sion",
        "Sivir",
        "Skarner",
        "Sona",
        "Soraka",
        "Swain",
        "Syndra",
        "Tahm Kench",
        "Taliyah",
        "Talon",
        "Taric",
        "Teemo",
        "Thresh",
        "Tristana",
        "Trundle",
        "Tryndamere",
        "Twisted Fate",
        "Twitch",
        "Udyr",
        "Urgot",
        "Varus",
        "Vayne",
        "Veigar",
        "Vel'Koz",
        "Vi",
        "Viktor",
        "Vladimir",
        "Volibear",
        "Warwick",
        "Wukong",
        "Xayah",
        "Xerath",
        "Xin Zhao",
        "Yasuo",
        "Yorick",
        "Zac",
        "Zed",
        "Ziggs",
        "Zilean",
        "Zoe",
        "Zyra"
      ]
    };
    this.sendSelectedChampsToSummonerParent = this.sendSelectedChampsToSummonerParent.bind(
      this
    );
  }

  sendSelectedChampsToSummonerParent(e) {
    const champName = e.target.className;
    let champToObjectProp = champName.replace(/[\s\.']/g, "");
    champToObjectProp = champToObjectProp
      .toLowerCase()
      .split(" ")
      .map(function(x) {
        return x[0].toUpperCase() + x.substr(1);
      })
      .join(" ");
    const champId = championIds[champToObjectProp];
    this.props.toggleChampion(champToObjectProp, champId);

    // multiple champions
    // let newChamps = this.state.selectedChampions
    // const index = newChamps.indexOf(champName)
    // if(index >= 0) {
    //   newChamps.splice(index, 1)
    // } else {
    //   newChamps.push(champName)
    // }
    // const champIds = newChamps.map(champ => {
    //   let champToObjectProp = champ.replace(/[\s\.']/g, '');
    //   champToObjectProp = champToObjectProp.toLowerCase().split(' ').map(function(x) {return x[0].toUpperCase() + x.substr(1)}).join(' ')
    //   return championIds[champToObjectProp]
    // })
    // this.setState({ selectedChampions: newChamps})
    // this.props.toggleChampion(newChamps, champIds)
  }

  render() {
    let selectedChamp;
    const championList = this.state.champions.map(champName => {
      let buttonColor = "grey";
      let nameWithoutPuncuation = champName.replace(/[\s\.']/g, "");
      nameWithoutPuncuation = nameWithoutPuncuation
        .toLowerCase()
        .split(" ")
        .map(function(x) {
          return x[0].toUpperCase() + x.substr(1);
        })
        .join(" ");
      if (this.props.selectedChampions === nameWithoutPuncuation) {
        selectedChamp = champName;
        buttonColor = "#537ad6";
      }
      if (this.props.championsPlayed[championIds[nameWithoutPuncuation]]) {
        return (
          <div
            key={champName}
            className={champName}
            onClick={this.sendSelectedChampsToSummonerParent}
          >
            <button
              className={champName}
              style={{ backgroundColor: buttonColor }}
            />
            <span className={champName}>{champName}</span>
          </div>
        );
      } else {
        return null;
      }
    });

    return <div className={"champion-select-box"}>{championList}</div>;
  }
}

export default ChampionSelect;
