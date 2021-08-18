import React from 'react';

import {TouchableOpacity, Text, View} from 'react-native';
import {styles} from './NavigateButtonStyles';
export const NavigateButton = ({
  onPress,
  noBackground = false,
  image,
  ...props
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.userBtn,
          {
            width: props.width,
            height: props.height,
            backgroundColor: props.color,
          },
        ]}
        onPress={onPress}>
        <Text style={styles.userBtnTxt}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
