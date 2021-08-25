import React from 'react';
import PropTypes from 'prop-types';
import {styles} from './RoundedButtonStyles';
import {TouchableOpacity, Text} from 'react-native';
export const RoundedButton = ({
  onPress,
  isValid,
  noBackground = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.radius,
        isValid ? {backgroundColor: 'gray'} : {backgroundColor: '#246BFD'},
      ]}
      disabled={isValid}
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
