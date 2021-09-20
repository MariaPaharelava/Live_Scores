import React, {useState} from 'react';
import {Text, Image, View} from 'react-native';
import Indicator from './ActivityIndicator';
import {PROFILE_IMAGE} from '../images/Images';
import {styles} from './UsersDataStyles';
export const UsersData = ({
  onPress,
  noBackground = false,
  image,
  firstTitle,
  secondTitle,
  firstInfo,
  secondInfo,
}) => {
  const [imageLoading, setimageLoading] = useState();

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={{height: 50, width: 50, borderRadius: 50}}
          source={{
            uri: image
              ? image ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
          onLoadStart={() => setimageLoading(true)}
          onLoadEnd={() => setimageLoading(false)}
        />
        {imageLoading && <Indicator />}

        <View style={styles.radius}>
          <View style={styles.containerText}>
            <View style={[styles.info, {marginBottom: 10}]}>
              <Image source={PROFILE_IMAGE.PROFILE_IMAGE} />

              <View style={styles.containerText}>
                <Text style={styles.text} numberOfLines={1}>
                  {firstTitle}
                </Text>
                <Text style={styles.textTitle} numberOfLines={1}>
                  {firstInfo}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <Image source={PROFILE_IMAGE.EMAIL_IMAGE} />
              <View style={styles.containerText}>
                <Text style={styles.text} numberOfLines={1}>
                  {secondTitle}
                </Text>
                <Text style={styles.textTitle} numberOfLines={1}>
                  {secondInfo}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};
