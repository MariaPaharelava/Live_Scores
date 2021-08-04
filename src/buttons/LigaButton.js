import React from 'react';
import {styles} from './LigaButtonStyles';
import Icon from 'react-native-ico-flags';

import {TouchableOpacity, Text, Image, View} from 'react-native';
export const LigaButton = ({
  onPress,
  noBackground = false,
  imageF,
  imageS,
  iconName,
  title,
  titleInfo,
  ...props
}) => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.radius} onPress={onPress} {...props}>
          <View style={styles.icon}>
            <Icon style={styles.iconCountry} name={iconName} />
            <View style={styles.containerText}>
              <Text style={[styles.text]} numberOfLines={1}>
                {title}
              </Text>
              <Text style={[styles.textTitle]} numberOfLines={1}>
                {titleInfo}
              </Text>
            </View>
          </View>
          <Image source={require('../images/profile/Arrow.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
