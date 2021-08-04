import React from 'react';
import {styles} from './MatchButtonStyle';

import {TouchableOpacity, Text, Image, View} from 'react-native';
export const MatchButton = ({
  onPress,
  noBackground = false,

  ...props
}) => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.radius} onPress={onPress} {...props}>
          <View style={styles.wrapper}>
            <Image
              style={{height: 30, width: 30, marginRight: 10}}
              source={{uri: props.imageF}}
            />
            <Image
              style={{height: 30, width: 30}}
              source={{uri: props.imageS}}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.wrapperScore}>
              <Text style={styles.text}>{props.firstTeam}</Text>
              <Text style={styles.text}>{props.scoreF}</Text>
            </View>
            <View style={styles.wrapperScore}>
              <Text style={styles.text}>vs</Text>
              <Text style={styles.text}>-</Text>
            </View>
            <View style={styles.wrapperScore}>
              <Text style={styles.text}>{props.secondTeam}</Text>
              <Text style={styles.text}>{props.scoreS}</Text>
            </View>
          </View>
          <View style={styles.time}>
            <Text style={[styles.text]}>{props.type}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
