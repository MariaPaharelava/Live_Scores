import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Notification from '../../icons/other/Notification.svg';
import {IMAGES} from '../../images/Images';
import {SPORTS_IMAGES} from '../../images/Images';

import Search from '../../icons/other/Search.svg';
import styles from './HomeScreenStyles';

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

function HomeScreen({navigation, route}) {
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
      <View style={styles.title}>
        <Text style={styles.titleText}>LiveScore</Text>
        <TouchableOpacity>
          <Search />
        </TouchableOpacity>

        <TouchableOpacity style={{paddingLeft: 20}}>
          <Notification />
        </TouchableOpacity>
      </View>

      <Image style={styles.image} source={IMAGES.HOMESCREEN_IMAGE} />

      <ScrollView horizontal={true}>
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
      </ScrollView>
      <ScrollView style={styles.content}>
        <Text>La liga </Text>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
