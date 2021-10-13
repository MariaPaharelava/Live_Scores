import React from 'react';
import {View, Text, StyleSheet, Platform, TextInput} from 'react-native';

const Stats = ({
  title,
  onChangeFirstTeamText,
  valueFirstTeam,
  onChangeSecondTeamText,
  valueSecondTeam,
  ...props
}) => {
  return (
    <View style={styles.containerStats}>
      <TextInput
        placeholderTextColor="white"
        autoCorrect={false}
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={onChangeFirstTeamText}
        value={valueFirstTeam}
      />

      <Text style={styles.scoreText}>{title}</Text>
      <TextInput
        placeholderTextColor="white"
        autoCorrect={false}
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={onChangeSecondTeamText}
        value={valueSecondTeam}
      />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  containerStats: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreText: {
    flex: 1,
    color: '#C4C4C4',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
  },
});
