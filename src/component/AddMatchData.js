import React from 'react';
import {Text, Image, View} from 'react-native';
import {styles} from './AddMatchDataStyles';
export const AddMatchData = ({
  onPress,
  noBackground = false,
  matches,
  firstTeam,
  secondTeam,
  playtime,
  ...props
}) => {
  console.log('Time', playtime);
  console.log('FS', firstTeam);
  console.log('SS', secondTeam);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.backImage}>
          <Image
            style={styles.dimensions}
            source={{uri: firstTeam.teamDetails.imageUrl}}
          />
        </View>
        <View style={styles.backImage}>
          <Image
            style={styles.dimensions}
            source={{uri: secondTeam.teamDetails.imageUrl}}
          />
        </View>
      </View>

      <View style={styles.wrapperScore}>
        <View style={styles.content}>
          <Text style={styles.text}>{firstTeam.teamDetails.name}</Text>
          <Text style={styles.text}>vs</Text>
          <Text style={styles.text}>{secondTeam.teamDetails.name}</Text>
        </View>
        <Text style={styles.data}>{playtime.toString().slice(0, 24)}</Text>
      </View>
    </View>
  );
};
