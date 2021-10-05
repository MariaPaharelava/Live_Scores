import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProgressiveImage from '../../../component/ProgressiveImage';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {ADMIN_IMAGES} from '../../../images/Images';
const PostActivity = ({item, onDelete, onPress}) => {
  const user = useSelector(state => state.AuthReducer.user);
  console.log(item);
  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#333';
  let likeText = '1 Like';
  let commentText = '1 Like';

  if (item.likes === 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments === 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  return (
    <View style={styles.Card} key={item.id}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.PostTime}>
          {moment(item.postTime.toDate()).fromNow()}
        </Text>

        <View style={{flexDirection: 'row', paddingLeft: 10}}>
          {item.postImg != null ? (
            <ProgressiveImage
              defaultImageSource={require('../../../images/images/default-img.jpg')}
              source={{uri: item.postImg}}
              style={{width: 64, height: 64}}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.AddImage}
              source={require('../../../images/images/default-img.jpg')}
            />
          )}
          <Text style={styles.PostText}>{item.title}</Text>
        </View>

        <View style={styles.InteractionWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={styles.Interaction}>
              <Image
                source={ADMIN_IMAGES.HEART_IMAGE}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.stats}>{item.likes}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={styles.Interaction}>
              <Image
                source={ADMIN_IMAGES.CHAR_IMAGE}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.stats}>{item.comments}</Text>
          </View>

          {user === item.userId ? (
            <TouchableOpacity
              style={styles.Interaction}
              onPress={() => onDelete(item.id)}>
              <Image
                source={ADMIN_IMAGES.TRASHCAN_IMAGE}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostActivity;

const styles = StyleSheet.create({
  Card: {
    backgroundColor: '#222232',
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
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
    padding: 10,
    fontSize: 14,
    color: '#666',
  },
  PostText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    color: 'white',
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

  image: {width: 25, height: 25, tintColor: 'white'},
  AddImage: {
    width: 64,
    height: 64,
  },
  TitleText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  stats: {
    color: 'white',
    alignItems: 'center',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});
