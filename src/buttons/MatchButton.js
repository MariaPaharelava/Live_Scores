import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';

import {styles} from './MatchButtonStyle';

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
            <Image
              style={{height: 30, width: 30, marginRight: 10}}
              source={{uri: matches.firstTeam.teamDetails.imageUrl}}
            />
            <Image
              style={{height: 30, width: 30}}
              source={{uri: matches.secondTeam.teamDetails.imageUrl}}
            />
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
MatchButton.propTypes = {
  onPress: PropTypes.func,
  liga: PropTypes.array,
  matches: PropTypes.array,
};
MatchButton.defaultProps = {
  noBackground: false,
};
