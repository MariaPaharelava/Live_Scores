import React from 'react';
import {Text, Image, View} from 'react-native';
import {styles} from './ExploreMatchButtonStyle';

import PropTypes from 'prop-types';

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
            source={{uri: matches.firstTeam.teamDetails.imageUrl}}
          />
        </View>
        <View style={styles.backImage}>
          <Image
            style={styles.dimensions}
            source={{uri: matches.secondTeam.teamDetails.imageUrl}}
          />
        </View>
      </View>

      <View style={styles.wrapperScore}>
        <View style={styles.content}>
          <Text style={styles.text}>{matches.firstTeam.teamDetails.name}</Text>
          <Text style={styles.text}>vs</Text>
          <Text style={styles.text}>{matches.secondTeam.teamDetails.name}</Text>
        </View>
        <Text style={styles.data}>Monday,12 Feb 2021.02.30 am</Text>
      </View>
    </View>
  );
};
ExploreMatchButton.propTypes = {
  onPress: PropTypes.func,
  liga: PropTypes.array,
  matches: PropTypes.array,
};
ExploreMatchButton.defaultProps = {
  noBackground: false,
};
