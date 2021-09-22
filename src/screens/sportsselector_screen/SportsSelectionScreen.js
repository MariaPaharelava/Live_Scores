import React, {useState} from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SPORTS_IMAGES} from '../../images/Images';
import {RoundedButton} from '../../buttons/RoundedButton';
import {styles} from './SportsSelectionScreenStyles';

const SPORTS = [
  {
    name: 'Soccer',
    type: 'soccer',
    image: SPORTS_IMAGES.SOOCER_IMAGE,
  },
  {
    name: 'Basketball',
    type: 'basketball',
    image: SPORTS_IMAGES.BASKETBALL_IMAGE,
  },
  {
    name: 'Football',
    type: 'football',
    image: SPORTS_IMAGES.FOOTBALL_IMAGE,
  },
  {
    name: 'Baseball',
    type: 'baseball',
    image: SPORTS_IMAGES.BASEBALL_IMAGE,
  },
  {
    name: 'Tennis',
    type: 'tennis',
    image: SPORTS_IMAGES.TENNIS_IMAGE,
  },
  {
    name: 'Volleyball',
    type: 'volleyball',
    image: SPORTS_IMAGES.VOLLEYBALL_IMAGE,
  },
];
function SportsSelectionScreen({navigation}) {
  const [types, setTypes] = useState([]);

  const HandleSportPress = type => {
    if (types.includes(type)) {
      setTypes(types.filter(sportType => sportType !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.question}>What sport do you interest?</Text>
        <Text style={styles.chooseText}>You can choose more than one</Text>
      </View>
      <View style={styles.sportImages}>
        {SPORTS.map(item => (
          <View style={styles.sportImages2} key={item.type}>
            <TouchableOpacity
              style={
                types.includes(item.type)
                  ? [styles.touchableOpacity, {backgroundColor: '#ED6B4E'}]
                  : styles.touchableOpacity
              }
              onPress={() => HandleSportPress(item.type)}>
              <Image style={styles.button} source={item.image} />
            </TouchableOpacity>

            <Text style={styles.textUnderButton}>{item.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.roundedButton}>
        <RoundedButton
          title="Continue"
          // onPress={() => {
          //   navigation.navigate('MainTabScreen', {
          //     screen: 'HomeScreen',
          //     otherParam: 'sadasdsadsadsadsa',
          //   });
          // }}
          onPress={() => navigation.navigate('MainTabScreen')}
        />
        <TouchableOpacity style={styles.skipButton}>
          <Text
            style={styles.textSkip}
            onPress={() => navigation.navigate('MainTabScreen')}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SportsSelectionScreen;
