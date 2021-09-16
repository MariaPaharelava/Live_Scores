import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';

import {TouchableOpacity, Text, Image, View} from 'react-native';
export const Score = ({
  onPress,
  noBackground = false,

  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{props.valueF}</Text>
      <View style={styles.image}>
        <Image style={{marginRight: 5}} source={props.image} />

        <Text style={styles.scoreText}>{props.title}</Text>
      </View>
      <Text style={styles.score}>{props.valueS}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 55,
  },
  score: {
    color: colors.white,
    ...fonts.defaultFont,
    fontSize: 18,
    width: 30,
    textAlign: 'center',
    flexShrink: 0,
  },
  scoreText: {color: '#C4C4C4', ...fonts.defaultFont, fontSize: 18},
  image: {flexDirection: 'row', alignItems: 'center'},
});
