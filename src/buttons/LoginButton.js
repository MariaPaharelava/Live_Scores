import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';

import Message from '../icons/login/Message.svg';
import Hide from '../icons/login/Hide.svg';
import Password from '../icons/login/Password.svg';
import Show from '../icons/login/Show.svg';
import {styles} from './LoginButtonStyle';
import PropTypes from 'prop-types';

export const LoginButton = ({
  onChangeText,
  onPress,
  data,
  onEndEditing,
  onChangeTextPass,
  noBackground = false,
  ...props
}) => {
  return (
    <View>
      <View style={styles.password}>
        <Message style={styles.imageStyle} />
        <TextInput
          placeholderTextColor="#65656B"
          placeholder="Email"
          selectionColor="#65656B"
          style={styles.textInput}
          color="white"
          autoCapitalize="none"
          onEndEditing={onEndEditing}
          onChangeText={onChangeText}
        />
      </View>

      <View style={styles.password}>
        <Password style={styles.imageStyle} />

        <TextInput
          placeholderTextColor="#65656B"
          placeholder="Password"
          selectionColor="#65656B"
          color="white"
          style={styles.textInput}
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={onChangeTextPass}
        />

        <TouchableOpacity onPress={onPress}>
          {data.secureTextEntry ? <Hide /> : <Show />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

LoginButton.propTypes = {
  onPress: PropTypes.func,
  onChangeText: PropTypes.func,
  data: PropTypes.object,
};
LoginButton.defaultProps = {
  noBackground: false,
};
