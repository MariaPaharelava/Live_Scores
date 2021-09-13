import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {NavigateButton} from '../../buttons/NavigateButton';
import HomeTable from '../../component/HomeTable';
import AllTable from '../../component/AllTable';
import AwayTable from '../../component/AwayTable';
const StandingsDetailScreen = ({navigation, route}) => {
  const {ligaID, image, types} = route.params;

  const [view, setView] = useState('all');
  const options = [
    {label: 'All Table', value: 'all'},
    {label: 'Home Table', value: 'home'},
    {label: ' Away Table', value: 'away'},
  ];

  const selectedView = () => {
    switch (view) {
      case 'all':
        return (
          <AllTable navigation={navigation} ligaID={ligaID} types={types} />
        );
      case 'home':
        return (
          <HomeTable navigation={navigation} ligaID={ligaID} types={types} />
        );
      case 'away':
        return (
          <AwayTable navigation={navigation} ligaID={ligaID} types={types} />
        );
      default:
        return;
    }
  };
  const selectedSport = () => {
    switch (types) {
      case 'soccer':
        return (
          <Text style={styles.textPtsSoccer}>
            {'  '} W {'   '} D {'   '} L {'  '} Ga {'   '} Gd {'   '} Pts
          </Text>
        );
      case 'basketball':
        return (
          <Text style={styles.textPtsBasketball}>
            {'   '} G {'    '} W {'    '} L {'    '} Pl
          </Text>
        );

      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.image} source={{uri: image}} />
      </View>
      <View style={styles.navigate}>
        {options.map(item => (
          <NavigateButton
            key={item.label}
            title={item.label}
            width={100}
            height={50}
            color={view === item.value ? '#ED6B4E' : '#00000000'}
            onPress={() => {
              setView(item.value);
            }}
          />
        ))}
      </View>
      <View style={styles.indicators}>
        <Text style={styles.textTeam}># Team</Text>
        {selectedSport()}
      </View>
      <View style={styles.line} />

      <View>{selectedView()}</View>
    </View>
  );
};

export default StandingsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  ligaTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconCountry: {},
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  navigate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Platform.OS === 'ios' ? 20 : 15,
    marginHorizontal: 20,
  },
  textTeam: {
    color: 'white',
  },
  textPtsSoccer: {
    color: 'white',
  },
  textPtsBasketball: {
    color: 'white',
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 8,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginTop: 10,
    opacity: 0.1,
  },
});
