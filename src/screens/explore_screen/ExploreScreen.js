import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getMatches} from '../../api/Matches';
import {fetchMoreMatches} from '../../api/Matches';
import {getTeamMatches} from '../../api/Matches';
import Search from '../../icons/other/Search.svg';
import {SPORTS_IMAGES} from '../../images/Images';
import {SportsButton} from '../../buttons/SportsButton';
import {ExploreMatchButton} from '../../buttons/ExploreMatchButton';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import styles from './ExploreScreenStyles';
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
const ExploreScreen = ({navigation}) => {
  const [matchesData, setMatchesData] = useState([]);
  const [matchesError, setMatchesError] = useState();
  const [matchesLoading, setMatchesLoading] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [matchPerLoad] = useState(8);
  const [lastMatch, setLastMatch] = useState(false);
  const [view, setView] = useState('soccer');
  const [value, setValue] = useState('');

  const matchesrequest = async (refresh = false) => {
    setMatchesLoading(true);
    try {
      const matchesdata = await getMatches(matchPerLoad);
      if (refresh) {
        setLastMatch(false);
        setMatchesData(matchesdata.matches);
      } else {
        setMatchesData([...matchesData, ...matchesdata.matches]);
      }
      setMatchesData(matchesdata.matches);
      setStartAfter(matchesdata.lastVisible);
    } catch (error) {
      setMatchesError(error);
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };
  const onInput = async text => {
    setMatchesLoading(true);
    try {
      setValue(text);
      const matchesdata = await getTeamMatches(matchPerLoad, text);
      setMatchesData(matchesdata.matches);
      if (text === '') {
        matchesrequest();
      }
      setStartAfter(matchesdata.lastVisible);
    } catch (error) {
      setMatchesError(error);
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };
  console.log(value);

  useEffect(() => {
    console.log('useeffect');
    matchesrequest();
  }, []);

  const getMoreMatches = async () => {
    try {
      if (!lastMatch) {
        const matchesdata = await fetchMoreMatches(
          startAfter,
          matchPerLoad,
          value,
        );
        setMatchesData([...matchesData, ...matchesdata.matches]);
        setStartAfter(matchesdata.lastVisible);
        matchesdata.matches.length === 0
          ? setLastMatch(true)
          : setLastMatch(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  const RednderLigs = ({item}) => {
    return (
      <View key={item.id}>
        <ExploreMatchButton matches={item} />
      </View>
    );
  };

  if (!matchesData) {
    return null;
  }
  if (matchesError) {
    return <Error />;
  }

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
              onChangeText={onInput}
              value={value}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setValue('');
              matchesrequest(true);
            }}>
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
          <FlatList
            data={matchesData}
            renderItem={RednderLigs}
            keyExtractor={item => item.id}
            style={{height: Platform.OS === 'ios' ? '90%' : '67%'}}
            onEndReached={getMoreMatches}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={150}
            ListFooterComponent={() =>
              matchesLoading || !lastMatch ? <Indicator /> : null
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
