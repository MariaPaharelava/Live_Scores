import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import Indicator from './ActivityIndicator';
import Error from './ErrorIndicator';
import {TeamTable} from './TeamTable';
import {getSoccerLigaByID} from '../api/Matches';

const HomeTable = ({navigation, ligaID, types}) => {
  const [ligaData, setligaData] = useState();
  const [ligaDataError, setligaDataError] = useState();
  const [ligaDataLoading, setligaDataLoading] = useState();
  const [teamsFtData, setteamsFtData] = useState();
  const [allteamStats, setallteamStats] = useState([]);
  const [allteamStatsLoading, setallteamStatsLoading] = useState(true);
  const [allteamStatsError, setallteamStatsError] = useState();

  const ligarequest = async () => {
    setligaDataLoading(true);
    try {
      if (types === 'soccer') {
        const liga = await getSoccerLigaByID(ligaID);
        setligaData(liga);
      }
      // if (types === 'basketball') {
      //   const liga = await getAllTableBasketballMatches(ligaID);
      //   setligaData(liga);
      // }
    } catch (error) {
      setligaDataError(error);
      console.log(error);
    } finally {
      setligaDataLoading(false);
    }
  };

  const allteamstatsrequest = async () => {
    try {
      if (teamsFtData) {
        let allteamstats = [];

        teamsFtData.map(team => {
          let teamStats = {
            team: '',
            imageTeam: '',
            win: 0,
            draw: 0,
            lose: 0,
            Ga: 0,
            Gd: 0,
            Pts: 0,
          };
          console.log('Team', team);
          ligaData.matches.map(match => {
            console.log('match', match);
            if (match.type !== 'UPC') {
              if (team === match.firstTeam.team[0].teamDetails.name) {
                teamStats.team = team;
                teamStats.imageTeam =
                  match.firstTeam.team[0].teamDetails.imageUrl;

                teamStats.Ga += Number(match.firstTeam.score);
                teamStats.Gd += Number(match.secondTeam.score);
                teamStats.win +=
                  Number(match.firstTeam.score) > Number(match.secondTeam.score)
                    ? 1
                    : 0;
                teamStats.lose +=
                  Number(match.firstTeam.score) < Number(match.secondTeam.score)
                    ? 1
                    : 0;
                teamStats.draw +=
                  Number(match.firstTeam.score) ===
                  Number(match.secondTeam.score)
                    ? 1
                    : 0;
                teamStats.Pts +=
                  Number(match.firstTeam.score) > Number(match.secondTeam.score)
                    ? 3
                    : Number(match.firstTeam.score) ===
                      Number(match.secondTeam.score)
                    ? 1
                    : 0;
              } else {
                if (team === match.secondTeam.team[0].teamDetails.name) {
                  teamStats.team = team;
                  teamStats.imageTeam =
                    match.secondTeam.team[0].teamDetails.imageUrl;
                }
              }
            } else {
              if (
                team === match.firstTeam.team[0].teamDetails.name ||
                team === match.secondTeam.team[0].teamDetails.name
              ) {
                teamStats.team = team;
                teamStats.imageTeam =
                  team === match.firstTeam.team[0].teamDetails.name
                    ? match.firstTeam.team[0].teamDetails.imageUrl
                    : match.secondTeam.team[0].teamDetails.imageUrl;
              }
            }
          });
          allteamstats.push(teamStats);
          allteamstats.sort(byField('Pts'));
          allteamstats.map((teamstats, index) => {
            teamstats.place = `${index + 1}.`;
          });
          setallteamStats(allteamstats);
          setallteamStatsLoading(false);
        });
      }
    } catch (error) {
      setallteamStatsError(error);
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    ligarequest();
  }, []);

  useEffect(() => {
    if (ligaData) {
      let teams = [];
      ligaData.matches.map(match => {
        if (match.type === 'FT' || match.type === 'UPC') {
          teams.push(match.firstTeam.team[0].teamDetails.name);
          teams.push(match.secondTeam.team[0].teamDetails.name);
          const sortteams = unique(teams);
          setteamsFtData(sortteams);
        }
      });
    }
  }, [ligaData]);

  useEffect(() => {
    allteamstatsrequest();
  }, [teamsFtData]);

  const unique = arr => {
    let result = [];
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  };

  if (!ligaData) {
    return null;
  }
  if (ligaDataError) {
    return <Error />;
  }
  // console.log(ligaData);
  console.log(teamsFtData);

  function byField(field) {
    return (a, b) => (a[field] < b[field] ? 1 : -1);
  }
  const renderTeam = table => {
    return table.map(team => {
      return (
        <View key={team.team}>
          <TeamTable team={team} types={types} />
        </View>
      );
    });
  };

  return !ligaDataLoading && !allteamStatsLoading ? (
    <ScrollView>
      {renderTeam(allteamStats)}
      <View style={styles.lastView} />
    </ScrollView>
  ) : (
    <Indicator />
  );
};

export default HomeTable;

const styles = StyleSheet.create({
  lastView: {height: 75},
  content: {
    height: Platform.OS === 'ios' ? '84%' : '80%',
    backgroundColor: '#181829',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
