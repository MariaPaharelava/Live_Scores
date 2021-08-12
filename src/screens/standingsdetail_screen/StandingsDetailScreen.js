import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {LogBox} from 'react-native';
import {NavigateButton} from '../../buttons/NavigateButton';
import HomeTable from '../../component/HomeTable';
import AllTable from '../../component/AllTable';
import AwayTable from '../../component/AwayTable';
const StandingsDetailScreen = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {liga} = route.params;

  const [view, setView] = useState('all');
  const options = [
    {label: 'All Table', value: 'all'},
    {label: 'Home Table', value: 'home'},
    {label: ' Away Table', value: 'away'},
  ];

  const selectedView = () => {
    switch (view) {
      case 'all':
        return <AllTable navigation={navigation} liga={liga} />;
      case 'home':
        return <HomeTable navigation={navigation} liga={liga} />;
      case 'away':
        return <AwayTable navigation={navigation} liga={liga} />;
      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.image} source={{uri: liga.imageUrl}} />
      </View>
      <View style={styles.navigate}>
        {options.map(item => (
          <NavigateButton
            key={item.label}
            title={item.label}
            width={100}
            height={50}
            color={view == item.value ? '#ED6B4E' : '#00000000'}
            onPress={() => {
              setView(item.value);
            }}
          />
        ))}
      </View>
      <View style={styles.indicators}>
        <Text style={styles.textTeam}># Team</Text>
        <Text style={styles.textPts}>
          {'  '} W {'   '} D {'   '} L {'  '} Ga {'   '} Gd {'   '} Pts
        </Text>
      </View>
      <View style={styles.line}></View>

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
  textPts: {
    color: 'white',
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
