import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../../../component/FormButton';
import ImageCropPicker from 'react-native-image-crop-picker';
import styles from './EditProfileScreenStyles';
import {PROFILE_IMAGE} from '../../../images/Images';
import Indicator from '../../../component/ActivityIndicator';
const EditProfileScreen = ({navigation, route}) => {
  const [image, setImage] = useState(null);

  const {data, sport} = route.params;
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageLoading, setimageLoading] = useState();

  const [userData, setUserData] = useState(data);
  const [user, setUser] = useState();
  useEffect(() => {
    AsyncStorage.getItem('User').then(value => {
      setUser(value);
    });
  }, []);
  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();
    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }
    firestore()
      .collection('users')
      .doc(user)
      .update({
        name: userData.name,
        userImg: imgUrl,
      })
      .then(() => {
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <ImageBackground
          style={styles.userImg}
          source={{
            uri: image
              ? image
              : userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
          onLoadStart={() => setimageLoading(true)}
          onLoadEnd={() => setimageLoading(false)}>
          {imageLoading && <Indicator />}

          <TouchableOpacity
            style={styles.userEditContainer}
            onPress={choosePhotoFromLibrary}>
            <Image
              style={styles.userEditImg}
              source={PROFILE_IMAGE.EDITIMAGE_IMAGE}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.userName}>{userData ? userData.name : ''}</Text>
      </View>

      <View style={styles.action}>
        <TextInput
          placeholderTextColor="white"
          placeholder="Name"
          autoCorrect={false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={txt => setUserData({...userData, name: txt})}
          value={userData ? userData.name : ''}
        />
      </View>

      <FormButton buttonTitle="Update" onPress={handleUpdate} />
    </View>
  );
};

export default EditProfileScreen;
