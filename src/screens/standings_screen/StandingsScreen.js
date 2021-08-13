import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Search from '../../icons/other/Search.svg';
import {IMAGES, SPORTS_IMAGES} from '../../images/Images';
import {SportsButton} from '../../buttons/SportsButton';
import {Ligs} from '../../component/Ligs';
import {LigaButton} from '../../buttons/LigaButton';
import {StandingsTable} from '../../component/StandingsTable';
const StandingsScreen = ({navigation}) => {
  const [view, setView] = useState('soccer');
  const options = [
    {label: 'Soccer', value: 'soccer', image: SPORTS_IMAGES.SOOCER_IMAGE},
    {
      label: 'Basketball',
      value: 'basketball',
      image: SPORTS_IMAGES.BASKETBALL_IMAGE,
    },
    {
      label: ' Football',
      value: 'football',
      image: SPORTS_IMAGES.FOOTBALL_IMAGE,
    },
    {
      label: ' Baseball',
      value: 'baseball',
      image: SPORTS_IMAGES.BASEBALL_IMAGE,
    },
    {
      label: ' Tennis',
      value: 'tennis',
      image: SPORTS_IMAGES.TENNIS_IMAGE,
    },
    {
      label: ' Volleyball',
      value: 'volleyball',
      image: SPORTS_IMAGES.VOLLEYBALL_IMAGE,
    },
  ];

  const rednderLigs = ligs => {
    return ligs.map(liga => {
      return (
        <View key={liga.id}>
          <LigaButton
            liga={liga}
            onPress={() =>
              navigation.push('StandingsDetail', {
                image: liga.imageUrl,
                matchID: liga.matches[0].id,
                title: liga.ligaName,
              })
            }
          />

          <StandingsTable teams={liga.alltable} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181829'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.search}>
            <Search />
            <TextInput
              style={styles.textInput}
              color="white"
              placeholderTextColor="#65656B"
              placeholder="Search your competition..."
            />
          </View>
        </View>
        <View style={styles.navigate}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {options.map(item => (
              <SportsButton
                key={item.label}
                title={view == item.value ? item.label : ''}
                image={item.image}
                width={view == item.value ? 120 : 50}
                height={view == item.value ? 50 : 50}
                color={view == item.value ? '#ED6B4E' : '#222232'}
                onPress={() => {
                  setView(item.value);
                }}
              />
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content}>
          {rednderLigs(Ligs)}
          <View style={styles.lastView}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default StandingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
  itemStyle: {
    padding: 15,
    color: 'white',
  },
  textInput: {
    paddingLeft: 15,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    width: '90%',
    borderWidth: 1,
    height: 50,
    margin: 5,
    paddingHorizontal: 15,
    borderColor: '#222232',
    backgroundColor: '#222232',
  },
  navigate: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  content: {
    width: '100%',
    height: Platform.OS === 'ios' ? '50%' : '40%',
    backgroundColor: '#181829',
  },
  lastView: {height: 65},
});
