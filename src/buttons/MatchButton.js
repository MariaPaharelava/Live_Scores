import React from 'react';
import {styles} from './MatchButtonStyle';

import {TouchableOpacity, Text, Image, View} from 'react-native';
export const MatchButton = ({
  onPress,
  noBackground = false,
  liga,
  matches,
  ...props
}) => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.radius} onPress={onPress} {...props}>
          <View style={styles.wrapper}>
            <View style={styles.backImage}>
              <Image
                style={{height: 30, width: 30}}
                source={{uri: matches.firstTeam.teamDetails.imageUrl}}
              />
            </View>
            <View style={styles.backImage}>
              <Image
                style={{height: 30, width: 30}}
                source={{uri: matches.secondTeam.teamDetails.imageUrl}}
              />
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.wrapperScore}>
              <Text style={styles.text}>
                {matches.firstTeam.teamDetails.name}
              </Text>
              <Text style={styles.text}>{matches.firstTeam.score}</Text>
            </View>
            <View style={styles.wrapperScore}>
              <Text style={styles.text}>vs</Text>
              <Text style={styles.text}>-</Text>
            </View>
            <View style={styles.wrapperScore}>
              <Text style={styles.text}>
                {matches.secondTeam.teamDetails.name}
              </Text>
              <Text style={styles.text}>{matches.secondTeam.score}</Text>
            </View>
          </View>
          <View style={styles.time}>
            <Text style={[styles.text]}>{matches.type}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
