import React, {useState, useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import {getMatchData} from '../api/Matches';
import {styles} from './ExploreMatchButtonStyle';
export const ExploreMatchButton = ({
  onPress,
  noBackground = false,
  matches,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.backImage}>
          <Image
            style={styles.dimensions}
            source={{uri: matches.firstTeam.team[0].teamDetails.imageUrl}}
          />
        </View>
        <View style={styles.backImage}>
          <Image
            style={styles.dimensions}
            source={{uri: matches.secondTeam.team[0].teamDetails.imageUrl}}
          />
        </View>
      </View>

      <View style={styles.wrapperScore}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {matches.firstTeam.team[0].teamDetails.name}
          </Text>
          <Text style={styles.text}>vs</Text>
          <Text style={styles.text}>
            {matches.secondTeam.team[0].teamDetails.name}
          </Text>
        </View>
        <Text style={styles.data}>
          {matches.playtime.toDate().toString().slice(0, 24)}
        </Text>
      </View>
    </View>
  );
};
