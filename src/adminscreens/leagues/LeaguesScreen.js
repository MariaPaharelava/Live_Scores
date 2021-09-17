import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ADMIN_IMAGES} from '../../images/Images';
import Icon from 'react-native-ico-flags';
import Indicator from '../../component/ActivityIndicator';
import Error from '../../component/ErrorIndicator';
import styles from './LeaguesScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSoccerLigs} from '../../api/Matches';
import {getBasketballLigs} from '../../api/Matches';
const LeaguesScreen = ({navigation, ligs}) => {
  const [types, setTypes] = useState('');
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

  const [ligsData, setligsData] = useState();
  const [ligsError, setligsError] = useState();
  const [ligsLoading, setligsLoading] = useState();

  const ligsrequest = async () => {
    setligsLoading(true);
    try {
      if (types === 'soccer') {
        const ligs = await getSoccerLigs();
        setligsData(ligs);
      }
      if (types === 'basketball') {
        const ligs = await getBasketballLigs();
        setligsData(ligs);
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

  const deleteRow = (rowMap, rowKey) => {
    const newData = [...ligsData];
    const prevIndex = ligsData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setligsData(newData);
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
        <TouchableOpacity
          style={styles.radius}
          onPress={() => console.log('Element touched')}>
          <View style={styles.icon}>
            <Icon style={styles.iconCountry} name={data.item.country} />
            <View style={styles.containerText}>
              <Text style={[styles.text]} numberOfLines={1}>
                {data.item.ligaName}
              </Text>
              <Text style={[styles.textTitle]} numberOfLines={1}>
                {data.item.ligaCountry}
              </Text>
            </View>
          </View>
          <Image source={ADMIN_IMAGES.ARROW_IMAGE} />
        </TouchableOpacity>
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
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => navigation.navigate('EditLeagues')}>
            <Image
              source={ADMIN_IMAGES.CROSS_IMAGE}
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
      <StatusBar barStyle="dark-content" />
      {/* <View style={styles.viewScreen}>
        <Text style={styles.nameScreen}>Leagues</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('AddLeagues')}>
          <Image
            source={ADMIN_IMAGES.PLUS_IMAGE}
            resizeMode="contain"
            style={styles.imagePlus}
          />
        </TouchableOpacity>
      </View> */}
      <SwipeListView
        data={ligsData}
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
      />
    </View>
  );
};

export default LeaguesScreen;
