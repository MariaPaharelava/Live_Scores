import React from 'react';
import PropTypes from 'prop-types';

import {styles} from './ProfileButtonStyle';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import {PROFILE_IMAGES} from '../images/Images';
export const ProfileButton = ({
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
            <Text style={[styles.textTitle]} numberOfLines={1}>
              {props.titleInfo}
            </Text>
          </View>
          <Image source={PROFILE_IMAGES.ARROW_IMAGE} />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};
