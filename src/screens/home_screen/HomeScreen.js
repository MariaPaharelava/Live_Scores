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
import {SPORTS_IMAGES} from '../../images/Images';
import Search from '../../icons/other/Search.svg';
import styles from './HomeScreenStyles';
import {LigaButton} from '../../buttons/LigaButton';
import {Ligs} from '../../component/Ligs';
import {MatchButton} from '../../buttons/MatchButton';

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

function HomeScreen() {
  const [types, setTypes] = useState([]);

  const HandleSportPress = type => {
    if (types.includes(type)) {
      setTypes(types.filter(sportType => sportType !== type));
    } else {
      setTypes([...types, type]);
    }
  };
  // const sort = () => {
  //   Ligs.map(item => {
  //     item.matches.sort((a, b) => {
  //       return new Date(b.playtime) - new Date(a.playtime);
  //     });
  //   });
  //   console.log(Ligs);
  // };
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
        {Ligs.map(item => (
          <View key={item.id}>
            <LigaButton
              title={item.ligaName}
              titleInfo={item.ligaCountry}
              iconName={item.country}
              imageF={item.matches[0].firstTeam.teamDetails.imageUrl}
              imageS={item.matches[0].secondTeam.teamDetails.imageUrl}
            />
            <MatchButton
              firstTeam={item.matches[0].firstTeam.teamDetails.name}
              secondTeam={item.matches[0].secondTeam.teamDetails.name}
              iconName={item.country}
              imageF={item.matches[0].firstTeam.teamDetails.imageUrl}
              imageS={item.matches[0].secondTeam.teamDetails.imageUrl}
              scoreF={item.matches[0].firstTeam.score}
              scoreS={item.matches[0].secondTeam.score}
              type={item.matches[0].type}
            />
            {/* <MatchButton /> */}
          </View>
        ))}
        <View style={styles.lastView}></View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
{
  /* <SafeAreaView style={styles.content}>
        <FlatList
          data={Ligs}
          keyExtractor={item => item.currentMatchId}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 5,
              }}>
              <Text style={styles.info}>{item.ligaName}</Text>
            </View>
          )}
        />
      </SafeAreaView> */
}
