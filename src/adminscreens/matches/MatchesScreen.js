import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ADMIN_IMAGES} from '../../images/Images';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SPORTS} from '../../constant/Sport';
import {SportsButton} from '../../buttons/SportsButton';
import Search from '../../icons/other/Search.svg';
import {ExploreMatchButton} from '../../buttons/ExploreMatchButton';
import {
  fetchMoreBasketballMatches,
  getBasketballMatches,
  getSoccerMatches,
  getTeamBasketballMatches,
  fetchMoreSoccerMatches,
  getTeamSoccerMatches,
} from '../../api/Matches';
import styles from './MatchesScreenStyles';
const MatchesScreen = ({navigation, ligs}) => {
  const [matchesData, setMatchesData] = useState([]);
  const [matchesError, setMatchesError] = useState();
  const [matchesLoading, setMatchesLoading] = useState();
  const [startAfter, setStartAfter] = useState({});
  const [matchPerLoad] = useState(2);
  const [lastMatch, setLastMatch] = useState(false);
  const [value, setValue] = useState('');
  const [timoutHandler, settimoutHandler] = useState();
  const [types, setTypes] = useState('');
  const HandleSportPress = type => {
    if (type !== types) {
      setTypes(type);
      setMatchesData([]);
      setStartAfter({});
      setLastMatch(false);
      setValue('');
    }
  };
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

  const matchesrequest = async (refresh = false) => {
    setMatchesLoading(true);
    try {
      if (types === 'soccer') {
        const matchesdata = await getSoccerMatches(matchPerLoad);
        if (refresh) {
          setLastMatch(false);
          setMatchesData(matchesdata.matches);
        } else {
          setMatchesData([...matchesData, ...matchesdata.matches]);
        }
        setStartAfter(matchesdata.lastVisible);
      }
      if (types === 'basketball') {
        const matchesdata = await getBasketballMatches(matchPerLoad);
        if (refresh) {
          setLastMatch(false);
          setMatchesData(matchesdata.matches);
        } else {
          setMatchesData([...matchesData, ...matchesdata.matches]);
        }
        setStartAfter(matchesdata.lastVisible);
      }
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
      if (types === 'soccer') {
        const matchesdata = await getTeamSoccerMatches(matchPerLoad, text);
        setMatchesData(matchesdata.matches);

        if (text === '') {
          setLastMatch(false);
          setMatchesData([]);
          matchesrequest();
        }
        setStartAfter(matchesdata.lastVisible);
      }
      if (types === 'basketball') {
        const matchesdata = await getTeamBasketballMatches(matchPerLoad, text);
        setMatchesData(matchesdata.matches);

        if (text === '') {
          setLastMatch(false);
          setMatchesData([]);
          matchesrequest();
        }
        setStartAfter(matchesdata.lastVisible);
      }
    } catch (error) {
      setMatchesError(error);
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  useEffect(() => {
    matchesrequest();
  }, [types]);

  const getMoreMatches = async () => {
    try {
      if (!lastMatch) {
        if (types === 'soccer') {
          const matchesdata = await fetchMoreSoccerMatches(
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
        if (types === 'basketball') {
          const matchesdata = await fetchMoreBasketballMatches(
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMatchesLoading(false);
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    const newData = [...matchesData];
    const prevIndex = matchesData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setMatchesData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {data, rowHeightAnimatedValue, removeRow, rightActionState} = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <View key={data.item.id}>
          <ExploreMatchButton matches={data.item} />
        </View>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => navigation.navigate('EditMatches')}>
            <Image
              source={ADMIN_IMAGES.EDIT_IMAGE}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <Image
                  source={ADMIN_IMAGES.TRASHCAN_IMAGE}
                  resizeMode="contain"
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  if (!matchesData) {
    return null;
  }
  if (matchesError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchView}>
        <View style={styles.search}>
          <Search />
          <TextInput
            style={styles.textInput}
            color="white"
            placeholderTextColor="#65656B"
            placeholder="Search your team..."
            onChangeText={text => {
              setValue(text);

              if (timoutHandler) {
                clearTimeout(timoutHandler);
              }
              const timout = setTimeout(() => onInput(text), 100);
              settimoutHandler(timout);
            }}
            value={value}
          />
        </View>
      </View>
      <View style={styles.navigate}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {SPORTS.map(item => (
            <SportsButton
              key={item.name}
              title={types === item.type ? item.name : ''}
              image={item.image}
              width={types === item.type ? 120 : 50}
              height={types === item.type ? 50 : 50}
              color={types === item.type ? '#ED6B4E' : '#222232'}
              onPress={() => {
                HandleSportPress(item.type);
              }}
            />
          ))}
        </ScrollView>
      </View>

      <SwipeListView
        data={matchesData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
        onEndReached={getMoreMatches}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={() =>
          matchesLoading || !lastMatch ? <Indicator /> : null
        }
      />
    </View>
  );
};

export default MatchesScreen;
