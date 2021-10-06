import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './HomeScreenStyles';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import {LigaButton} from '../../buttons/LigaButton';
import {getBasketballLigs, getSoccerLigs} from '../../api/Matches';
import {MatchButton} from '../../buttons/MatchButton';
import {SPORTS} from '../../constant/Sport';
import {IMAGES} from '../../images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation, route}) => {
  const [types, setTypes] = useState('');
  const [image, setImage] = useState(IMAGES.HOMESCREEN_IMAGE);
  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(value => {
      if (value === null) {
        AsyncStorage.setItem('@storage_Key', 'soccer');
        setTypes('soccer');
      } else {
        setTypes(value);
      }
    });
  }, []);
  const HandleSportPress = type => {
    setTypes(type);
  };
  const [ligsData, setligsData] = useState();
  const [ligsError, setligsError] = useState();
  const [ligsLoading, setligsLoading] = useState();

  const ligsrequest = async () => {
    setligsLoading(true);
    try {
      if (types === 'soccer') {
        const ligs = await getSoccerLigs();
        setligsData(ligs);
        setImage(IMAGES.HOMESCREEN_IMAGE);
      }
      if (types === 'basketball') {
        const ligs = await getBasketballLigs();
        setligsData(ligs);
        setImage(IMAGES.HOMESCREEN2_IMAGE);
      }
    } catch (error) {
      setligsError(error);
      console.log(error);
    } finally {
      setligsLoading(false);
    }
  };

  useEffect(() => {
    ligsrequest();
  }, [types]);

  const rednderLigs = ligs => {
    return ligs.map(liga => {
      const matchIndex = getIndex(liga.matches);
      return (
        <View key={liga.ligaName}>
          <LigaButton
            liga={liga}
            matches={liga.matches[matchIndex]}
            onPress={() =>
              navigation.push('StandingsDetail', {
                image: liga.imageUrl,
                ligaID: liga.id,
                title: liga.ligaName,
                types: types,
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
                types: types,
              })
            }
          />
        </View>
      );
    });
  };

  const getIndex = matches => {
    const now = Date.now();
    const a = matches.map(match => {
      return Math.abs(now - match.playtime);
    });
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#35364d'}}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>LiveScore</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={{alignItems: 'center'}}>
            <Image style={styles.image} source={image} />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {SPORTS.map(item => (
              <View style={styles.sportImages2} key={item.type}>
                <TouchableOpacity
                  style={[
                    styles.touchableOpacity,
                    item.type === types && {backgroundColor: 'orange'},
                  ]}
                  onPress={() => HandleSportPress(item.type)}>
                  <Image style={styles.button} source={item.image} />
                </TouchableOpacity>
                <Text style={styles.textUnderButton}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
          {rednderLigs(ligsData)}
          <View style={styles.lastView} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
