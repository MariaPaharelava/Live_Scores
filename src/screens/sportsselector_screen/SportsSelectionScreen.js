import React, {useState} from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SPORTS_IMAGES} from '../../images/Images';
import {RoundedButton} from '../../buttons/RoundedButton';
import {styles} from './SportsSelectionScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SPORTS} from '../../constant/Sport';

function SportsSelectionScreen({navigation}) {
  const [types, setTypes] = useState('soccer');
  const storeData = async type => {
    try {
      await AsyncStorage.setItem('@storage_Key', type);
    } catch (e) {}
  };
  const HandleSportPress = type => {
    setTypes(type);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.question}>What sport do you interest?</Text>
      </View>
      <View style={styles.sportImages}>
        {SPORTS.map(item => (
          <View style={styles.sportImages2} key={item.type}>
            <TouchableOpacity
              style={[
                styles.touchableOpacity,
                // types.includes(item.type) && {backgroundColor: 'orange'},
                types === item.type && {backgroundColor: 'orange'},
              ]}
              onPress={() => {
                HandleSportPress(item.type);
                storeData(item.type);
              }}>
              <Image style={styles.button} source={item.image} />
            </TouchableOpacity>

            <Text style={styles.textUnderButton}>{item.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.roundedButton}>
        <RoundedButton
          title="Continue"
          onPress={() => {
            storeData(types);

            navigation.navigate('MainTabScreen', {
              screen: 'Home',
              params: {
                screen: 'HomeScreen',
                params: {
                  sport: types,
                },
              },
            });
          }}
        />

        <TouchableOpacity style={styles.skipButton}>
          <Text
            style={styles.textSkip}
            onPress={() => {
              storeData('soccer');
              navigation.navigate('MainTabScreen', {
                screen: 'Home',
                params: {
                  screen: 'HomeScreen',
                  params: {
                    sport: 'soccer',
                  },
                },
              });
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SportsSelectionScreen;
