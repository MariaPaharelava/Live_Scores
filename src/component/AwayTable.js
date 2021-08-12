import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {TeamTable} from './TeamTable';

const AwayTable = ({navigation, liga}) => {
  const renderTeam = awaytable => {
    return awaytable.map(team => {
      return (
        <View key={team.team}>
          <TeamTable
            team={team}
            // onPress={() => match}
          />
        </View>
      );
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {renderTeam(liga.awaytable)}
        <View style={styles.lastView}></View>
      </ScrollView>
    </View>
  );
};

export default AwayTable;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastView: {height: 75},
  content: {
    height: Platform.OS === 'ios' ? '84%' : '80%',
    backgroundColor: '#181829',
  },
});
