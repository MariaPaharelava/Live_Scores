import React from 'react';
import PropTypes from 'prop-types';
import {colors} from '../constant/colors';
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
const styles = StyleSheet.create({
  radius: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    width: 200,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#246BFD',
  },
  noBackground: {
    borderStartColor: 'transparent',
  },
  text: {
    color: colors.white,
    width: 60,
    ...fonts.defaultFont,
  },
});

RoundedButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  noBackground: PropTypes.bool.isRequired,
};
