import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';

import {styles} from './ProfileDataStyles';
export const ProfileData = ({
  onPress,
  noBackground = false,
  image,
  ...props
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Image source={image} />
        <View style={styles.radius} {...props}>
          <View style={styles.containerText}>
            <Text style={[styles.text]} numberOfLines={1}>
              {props.title}
            </Text>
            <Text style={[styles.textTitle]} numberOfLines={1}>
              {props.titleInfo}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};
