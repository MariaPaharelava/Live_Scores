import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Notification from '../../icons/other/Notification.svg';
import Search from '../../icons/other/Search.svg';
import styles from './HomeScreenStyles';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import {LigaButton} from '../../buttons/LigaButton';
import {getLigs} from '../../api/Matches';
import {MatchButton} from '../../buttons/MatchButton';
import {SPORTS} from '../../constant/Sport';
import {IMAGES} from '../../images/Images';

function HomeScreen({navigation}) {
  const [types, setTypes] = useState([]);
  const HandleSportPress = type => {
    if (types.includes(type)) {
      setTypes(types.filter(sportType => sportType !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  const [ligsData, setligsData] = useState();
  const [ligsError, setligsError] = useState();
  const [ligsLoading, setligsLoading] = useState();

  const ligsrequest = async () => {
    setligsLoading(true);
    try {
      const ligs = await getLigs();

      setligsData(ligs);
    } catch (error) {
      setligsError(error);
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };

  useEffect(() => {
    ligsrequest();
    return () => {
      setligsData();
    };
  }, []);

  const rednderLigs = ligs => {
    return ligs.map(liga => {
      const matchIndex = getIndex(liga.matches);
      return (
        <View key={liga.id}>
          <LigaButton
            liga={liga}
            matches={liga.matches[matchIndex]}
            onPress={() =>
              navigation.push('StandingsDetail', {
                image: liga.imageUrl,
                ligaID: liga.id,
                title: liga.ligaName,
              })
            }
          />
          <MatchButton
            liga={liga}
            matches={liga.matches[matchIndex]}
            onPress={() =>
              navigation.push('DetailTeam', {
                matchID: liga.matches[matchIndex].id,
                ligaID: liga.id,
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

  if (ligsLoading) {
    return <Indicator />;
  }
  if (!ligsData) {
    return null;
  }
  if (ligsError) {
    return <Error />;
  }
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

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {SPORTS.map(item => (
          <View style={styles.sportImages2} key={item.type}>
            <TouchableOpacity
              style={[
                styles.touchableOpacity,
                types.includes(item.type) && {backgroundColor: 'orange'},
              ]}
              onPress={() => HandleSportPress(item.type)}>
              <Image style={styles.button} source={item.image} />
            </TouchableOpacity>
            <Text style={styles.textUnderButton}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {rednderLigs(ligsData)}
        <View style={styles.lastView} />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
