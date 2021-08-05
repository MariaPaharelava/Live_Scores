import React from 'react';
import {styles} from './LigaButtonStyles';
import Icon from 'react-native-ico-flags';

import {TouchableOpacity, Text, Image, View} from 'react-native';
export const LigaButton = ({
  onPress,
  liga,
  noBackground = false,

  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.radius} onPress={onPress} {...props}>
        <View style={styles.icon}>
          <Icon style={styles.iconCountry} name={liga.country} />
          <View style={styles.containerText}>
            <Text style={[styles.text]} numberOfLines={1}>
              {liga.ligaName}
            </Text>
            <Text style={[styles.textTitle]} numberOfLines={1}>
              {liga.ligaCountry}
            </Text>
          </View>
        </View>
        <Image source={require('../images/profile/Arrow.png')} />
      </TouchableOpacity>
    </View>
  );
};
