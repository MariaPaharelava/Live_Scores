import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {ADMIN_IMAGES} from '../../images/Images';
import {ScrollView} from 'react-native-gesture-handler';
const UserPostCard = ({item, onDelete, onPress, navigation}) => {
  // const [isPress, setisPress] = useState(false);
  const [userData, setUserData] = useState(null);
  const [commentsData, setcommentsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
    if (loading) {
      setLoading(false);
    }
  };
  const getComments = async () => {
    await firestore()
      .collection('posts')
      .doc(item.id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setcommentsData(documentSnapshot.data());
        }
      });
    if (loading) {
      setLoading(false);
    }
  };
  console.log(commentsData);

  useEffect(() => {
    getUser();
    getComments();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style={styles.Card} key={item.id}>
      {!loading ? (
        <Image
          source={{uri: item.postImg}}
          style={styles.PostImg}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.AddImage}
          source={require('../../images/images/default-img.jpg')}
        />
      )}
      <Text style={styles.TitleText}>{item.title}</Text>

      <View style={styles.UserInfo}>
        <Image
          style={styles.UserImg}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <View style={styles.UserInfoText}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.UserName}>
              {userData ? userData.name || 'Test' : 'Test'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.PostTime}>
            {item.postTime.toDate().toString().slice(3, 10) +
              ',' +
              item.postTime.toDate().toString().slice(10, 15)}
          </Text>
        </View>
        <View style={styles.InteractionWrapper}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.Interaction}
              onPress={() => {
                setisPress(!isPress);
              }}>
              <Image
                source={ADMIN_IMAGES.HEART_IMAGE}
                resizeMode="contain"
                style={[
                  styles.image,

                  isPress ? {tintColor: 'red'} : {tintColor: 'white'},
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.stats}>
              {commentsData ? commentsData.likes : item.likes}
            </Text>
          </View> */}
          <View style={styles.comments}>
            <TouchableOpacity
              style={styles.Interaction}
              onPress={() =>
                navigation.push('Chat', {
                  postId: item.id,
                  comments: commentsData
                    ? commentsData.comments
                    : item.comments,
                })
              }>
              <Image
                source={ADMIN_IMAGES.CHART_IMAGE}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.stats}>
              {' '}
              {commentsData ? commentsData.comments : item.comments}
            </Text>
          </View>
        </View>
      </View>
      {/* <ScrollView style={{marginTop: 15}}> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.PostText}>{item.post}</Text>
        <View style={styles.lastView} />
      </ScrollView>
    </View>
  );
};

export default UserPostCard;

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    backgroundColor: '#222232',
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  UserInfo: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 25,
    alignSelf: 'center',
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  UserInfoText: {
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center',
  },
  UserName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  PostTime: {
    fontSize: 14,
    color: '#C4C4C4',
    paddingTop: 15,
  },
  PostText: {
    width: '100%',
    fontSize: 24,
    color: 'white',
  },
  TitleText: {
    width: 300,
    fontSize: 24,
    paddingLeft: 25,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
  },
  PostImg: {
    width: '100%',
    // height: 350,
    height: Platform.OS === 'ios' ? 350 : 200,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  Divider: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: '92%',
    alignSelf: 'center',
    marginTop: 15,
  },
  InteractionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
  },
  Interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 2,
  },

  image: {width: 25, height: 25, tintColor: 'white'},
  AddImage: {
    width: 64,
    height: 64,
  },
  stats: {
    color: 'white',
    alignItems: 'center',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
  },
  lastView: {height: 75},
});
