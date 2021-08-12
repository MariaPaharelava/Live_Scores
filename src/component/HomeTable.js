import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {TeamTable} from './TeamTable';

const HomeTable = ({navigation, liga}) => {
  const renderTeam = hometable => {
    return hometable.map(team => {
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
        {renderTeam(liga.hometable)}
        <View style={styles.lastView}></View>
      </ScrollView>
    </View>
  );
};

export default HomeTable;

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
