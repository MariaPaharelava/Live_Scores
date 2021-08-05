import React from 'react';

import {TouchableOpacity, Text, Image, View} from 'react-native';
import {styles} from './NavigateButtonStyles';
export const NavigateButton = ({
  onPress,
  noBackground = false,
  image,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.userBtn,
        {
          width: props.width,
          height: props.height,
          backgroundColor: props.color,
        },
      ]}>
      <Text style={styles.userBtnTxt}>{props.title}</Text>
    </TouchableOpacity>
  );
};
