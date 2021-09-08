import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';

import {styles} from './SettingProfileButtonStyles';
export const SettingProfileButton = ({
  onPress,
  noBackground = false,
  image,
  ...props
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Image source={image} />
        <TouchableOpacity style={styles.radius} onPress={onPress} {...props}>
          <View style={styles.containerText}>
            <Text style={[styles.text]} numberOfLines={1}>
              {props.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </View>
  );
};
