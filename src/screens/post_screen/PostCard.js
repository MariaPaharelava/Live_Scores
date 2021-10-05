import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';

import ProgressiveImage from '../../component/ProgressiveImage';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const PostCard = ({item, onDelete, onPress, navigation}) => {
  const [isPress, setisPress] = useState(false);
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.Card} key={item.id}>
      <TouchableOpacity
        onPress={() =>
          navigation.push('UserPost', {
            item: item,
          })
        }>
        <View style={{flexDirection: 'row'}}>
          {item.postImg != null ? (
            <ProgressiveImage
              defaultImageSource={require('../../images/images/default-img.jpg')}
              source={{uri: item.postImg}}
              style={{width: 64, height: 64}}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.AddImage}
              source={require('../../images/images/default-img.jpg')}
            />
          )}
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.PostText}>{item.title}</Text>
            <Text style={styles.PostTime}>
              {moment(item.postTime.toDate()).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    backgroundColor: '#222232',
    height: 64,
    width: '80%',
    marginBottom: 40,
  },
  UserInfo: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'flex-start',
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  PostTime: {
    fontSize: 14,
    color: '#C4C4C4',
    paddingLeft: 15,
    marginTop: 'auto',
  },
  PostText: {
    width: 200,
    fontSize: 16,
    paddingLeft: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  PostImg: {
    width: '100%',
    height: 250,
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
    justifyContent: 'space-around',
    padding: 15,
  },
  Interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 2,
  },
  InteractionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2e64e5',
  },
  image: {width: 25, height: 25, tintColor: 'red'},
  AddImage: {
    width: 64,
    height: 64,
  },
});
