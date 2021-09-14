import React from 'react';
import {Text, Image, View, StyleSheet, Platform} from 'react-native';
export const StandingsTable = ({
  onPress,
  noBackground = false,
  liga,
  teams,
  matches,
  types,
  ...props
}) => {
  const renderTeam = teams => {
    return teams.map(team => {
      while (team.place < 5) {
        switch (types) {
          case 'soccer':
            return (
              <View key={team.team} style={styles.soccerTeam}>
                <Image
                  style={styles.teamImage}
                  source={{uri: team.imageTeam}}
                />
                <Text style={styles.row}>{team.team}</Text>
              </View>
            );
          case 'basketball':
            return (
              <View key={team.team} style={styles.basketballTeam}>
                <Image
                  style={styles.teamImage}
                  source={{uri: team.imageTeam}}
                />
                <Text style={styles.row}>{team.team}</Text>
              </View>
            );

          default:
            return;
        }
      }
    });
  };
  const selectedSport = () => {
    switch (types) {
      case 'soccer':
        return (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text style={styles.row}>W</Text>
            <Text style={styles.row}>D</Text>
            <Text style={styles.row}>L</Text>
            <Text style={styles.row}>Ga</Text>
            <Text style={styles.row}>Gd</Text>

            <Text style={styles.row}>Pts</Text>
          </View>
        );
      case 'basketball':
        return (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.row}>G</Text>
            <Text style={styles.row}>W</Text>
            <Text style={styles.row}>L</Text>
            <Text style={styles.row}>Pl</Text>
          </View>
        );

      default:
        return;
    }
  };
  const renderScore = (teamsScore, types) => {
    return teamsScore.map(team => {
      while (team.place < 5) {
        switch (types) {
          case 'soccer':
            return (
              <View key={team.team} style={{flexDirection: 'column'}}>
                <View style={styles.image}>
                  <Text style={styles.row}>{team.win}</Text>
                  <Text style={styles.row}>{team.draw}</Text>
                  <Text style={styles.row}>{team.lose}</Text>
                  <Text style={styles.row}>{team.Ga}</Text>
                  <Text style={styles.row}>{team.Gd}</Text>
                  <Text style={styles.row}>{team.Pts}</Text>
                </View>
                <View style={styles.line} />
              </View>
            );
          case 'basketball':
            return (
              <View
                key={team.team}
                style={{
                  flexDirection: 'column',
                }}>
                <View style={styles.image}>
                  <Text style={styles.row}>{team.games}</Text>
                  <Text style={styles.row}>{team.win}</Text>
                  <Text style={styles.row}>{team.lose}</Text>
                  <Text style={styles.row}>{team.place}</Text>
                </View>
                <View style={styles.line} />
              </View>
            );

          default:
            return;
        }
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={[styles.row, {marginRight: '30%', marginLeft: 10}]}>
            Team
          </Text>

          <View style={styles.teams}>{renderTeam(teams, types)}</View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}>
          {selectedSport()}

          <View style={[styles.line, {paddingTop: 10}]} />

          <View style={styles.teams}>{renderScore(teams, types)}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#222232',
    borderRadius: 10,
    marginHorizontal: Platform.OS === 'ios' ? 10 : 20,

    flexDirection: 'row',

    paddingVertical: 10,
  },
  row: {
    color: 'white',
    flex: 1,
  },
  teams: {
    flexDirection: 'column',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    opacity: 0.8,
    width: '100%',
  },
  lastView: {height: 75},
  image: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
  },
  teamImage: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
  },
  soccerTeam: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  basketballTeam: {
    flexDirection: 'row',
    marginBottom: '3%',
    marginTop: 20,
    alignItems: 'center',
  },
});
