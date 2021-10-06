import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import UserPostCard from './UserPostCard';
const UserPost = ({navigation, route}) => {
  const {item} = route.params;
  const [post, setPost] = useState(item);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#35364d'}}>
      <View style={styles.Container}>
        <UserPostCard
          item={item}
          onPress={() =>
            navigation.navigate('PostScreen', {userId: item.userId})
          }
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222232',
  },
});

export default UserPost;
