import React from 'react';

import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export const SportsButton = ({
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
        <View style={styles.imageView}>
          <Image style={styles.sportLogo} source={image} />
          <Text style={styles.userBtnTxt}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userBtn: {
    borderRadius: 100,
    backgroundColor: '#ED6B4E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userBtnTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportLogo: {
    width: 30,
    height: 30,
  },
});
SportsButton.propTypes = {
  onPress: PropTypes.func,
};
SportsButton.defaultProps = {
  noBackground: false,
};
