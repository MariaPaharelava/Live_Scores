import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Notification from '../../icons/other/Notification.svg';
import {IMAGES} from '../../images/Images';
import Search from '../../icons/other/Search.svg';
import styles from './HomeScreenStyles';
import {LigaButton} from '../../buttons/LigaButton';
import {Ligs} from '../../component/Ligs';
import {MatchButton} from '../../buttons/MatchButton';
import {SPORTS} from '../../constant/Sport';

function HomeScreen({navigation, route}) {
  const [types, setTypes] = useState([]);
  const HandleSportPress = type => {
    if (types.includes(type)) {
      setTypes(types.filter(sportType => sportType !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  const rednderLigs = ligs => {
    return ligs.map(liga => {
      const matchIndex = getIndex(liga.matches);
      return (
        <View key={liga.id}>
          <LigaButton liga={liga} />
          <MatchButton
            liga={liga}
            matches={liga.matches[matchIndex]}
            onPress={() =>
              navigation.push('DetailTeam', {
                match: liga.matches[matchIndex],
                othermatch: liga.matches,
                liga: liga,
              })
            }
          />
        </View>
      );
    });
  };

  const getIndex = matches => {
    const now = Date.now();
    const a = matches.map(match => Math.abs(now - match.playtime));
    return a.indexOf(Math.min(...a));
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
                  ? [styles.touchableOpacity, {backgroundColor: '#ED6B4E'}]
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
