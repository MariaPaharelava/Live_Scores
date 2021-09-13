import React from 'react';

import {Text, Image, View, StyleSheet, Platform} from 'react-native';
export const TeamTable = ({
  onPress,
  noBackground = false,
  liga,
  team,
  matches,
  color,
  types,
  ...props
}) => {
  const selectedSport = () => {
    switch (types) {
      case 'soccer':
        return (
          <View style={styles.teamScoreSoccer}>
            <Text style={styles.score}>{team.win}</Text>
            <Text style={styles.score}>{team.draw}</Text>
            <Text style={styles.score}>{team.lose}</Text>
            <Text style={styles.score}>{team.Ga}</Text>
            <Text style={styles.score}>{team.Gd}</Text>
            <Text style={styles.score}>{team.Pts}</Text>
          </View>
        );
      case 'basketball':
        return (
          <View style={styles.teamScoreBasketball}>
            <Text style={styles.score}>{team.games}</Text>
            <Text style={styles.score}>{team.win}</Text>
            <Text style={styles.score}>{team.lose}</Text>
            <Text style={styles.score}>{team.place}</Text>
          </View>
        );

      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={
          team.place > 3 && team.place < 6
            ? [styles.wrapper, {backgroundColor: '#441818'}]
            : team.place > 5
            ? [styles.wrapper, {backgroundColor: ' '}]
            : styles.wrapper
        }>
        <View style={styles.teamName}>
          <Text style={styles.text}>{team.place}</Text>
          <Image style={styles.dimensions} source={{uri: team.imageTeam}} />
          <Text style={[styles.text, {marginRight: 5}]}>{team.team}</Text>
        </View>
        {selectedSport()}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  wrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#14274D',
    height: 50,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    color: 'white',
  },
  score: {
    color: 'white',
    width: 20,
    flexShrink: 0,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: Platform.OS === 'ios' ? 6 : 5,
  },
  teamName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  teamScoreSoccer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Platform.OS === 'ios' ? 15 : 50,
  },
  teamScoreBasketball: {
    flexDirection: 'row',
    marginLeft: Platform.OS === 'ios' ? 45 : 65,
  },
  dimensions: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
  },
});
