import React from 'react';
import PropTypes from 'prop-types';
import {colors} from '../constant/colors';
import {styles} from './RoundedButtonStyles';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import fonts from '../constant/fonts';
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
  onPress: PropTypes.func.isRequired,
  noBackground: PropTypes.bool,
};
RoundedButton.defaultProps = {
  noBackground: false,
};
