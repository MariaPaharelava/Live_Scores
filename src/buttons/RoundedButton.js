import React from 'react';
import PropTypes from 'prop-types';
import {styles} from './RoundedButtonStyles';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
export const RoundedButton = ({onPress, noBackground = false, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.radius, noBackground && styles.noBackground]}
      onPress={onPress}
      {...props}>
      <Text style={[styles.text]} numberOfLines={1}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

RoundedButton.propTypes = {
  onPress: PropTypes.func,
  noBackground: PropTypes.bool,
};
RoundedButton.defaultProps = {
  noBackground: false,
};
