import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TextInput} from 'react-native';

const EditLeagues = ({
  navigation,
  onPress,
  noBackground = false,
  image,
  match,
  types,
  title,
  text,
  onChangeText,
  ...props
}) => {
  return (
    <View>
      <View style={styles.rowFront}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.action}>
        <TextInput
          placeholderTextColor="white"
          placeholder={text}
          autoCorrect={false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={onChangeText}
          value={text ? text : ''}
        />
      </View>
    </View>
  );
};

export default EditLeagues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181829',
  },
  textInput: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 15,

    color: 'white',
  },
  rowFront: {
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  action: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#222232',
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 5,
  },
});
