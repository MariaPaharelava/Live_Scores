import React, {useState} from 'react';
import {fonts} from '../../constant/fonts';
import {SPORTS_IMAGES} from '../../images/Images';
import {RoundedButton} from '../../buttons/RoundedButton';
import {styles} from './SplashScreenStyle';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
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
function SplashScreen() {
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
                  ? [styles.touchableOpacity, {backgroundColor: 'orange'}]
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
        <RoundedButton title="Continue" />
        <TouchableOpacity style={styles.skipButton}>
          <Text style={{color: 'white', fontSize: 16}}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SplashScreen;
