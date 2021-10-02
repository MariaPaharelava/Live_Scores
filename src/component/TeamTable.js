import React from 'react';

import {Text, Image, View, StyleSheet} from 'react-native';
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
    <View
      style={
        team.place > 3 && team.place < 6
          ? [styles.wrapper, {backgroundColor: '#441818'}]
          : team.place > 5
          ? [styles.wrapper, {backgroundColor: ' '}]
          : styles.wrapper
      }>
      <View style={styles.teamName}>
        <Text style={[styles.text, {paddingRight: 10}]}>{team.place}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.dimensions} source={{uri: team.imageTeam}} />
          <Text style={[styles.text, {marginRight: 5}]}>{team.team}</Text>
        </View>
      </View>
      {selectedSport()}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#14274D',
    height: 50,
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    color: 'white',
    width: 25,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamName: {
    flexDirection: 'row',
  },
  teamScoreSoccer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
  // teamScoreBasketball: {
  //   flexDirection: 'row',
  //   marginLeft: Platform.OS === 'ios' ? 45 : 65,
  // },
  dimensions: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
});
