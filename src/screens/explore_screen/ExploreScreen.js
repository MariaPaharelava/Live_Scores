import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Search from '../../icons/other/Search.svg';
import {SPORTS_IMAGES} from '../../images/Images';
import {SportsButton} from '../../buttons/SportsButton';
import TeamShedule from '../../component/TeamShedule';
const ExploreScreen = ({navigation}) => {
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181829'}}>
      <View>
        <View style={styles.wrapper}>
          <View style={styles.search}>
            <Search />
            <TextInput
              style={styles.textInput}
              color="white"
              placeholderTextColor="#65656B"
              placeholder="Search your team..."
            />
          </View>
          <TouchableOpacity>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigate}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {options.map(item => (
              <SportsButton
                key={item.label}
                title={view === item.value ? item.label : ''}
                image={item.image}
                width={view === item.value ? 120 : 50}
                height={view === item.value ? 50 : 50}
                color={view === item.value ? '#ED6B4E' : '#222232'}
                onPress={() => {
                  setView(item.value);
                }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.container}>
          <TeamShedule />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 20,
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
    width: '70%',
    borderWidth: 1,
    height: 50,
    paddingLeft: 20,
    marginHorizontal: Platform.OS === 'ios' ? 10 : 15,

    borderColor: '#222232',
    backgroundColor: '#222232',
  },
  navigate: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 40 : 40,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  content: {
    marginTop: Platform.OS === 'ios' ? 40 : 40,

    backgroundColor: '#181829',
  },
});
