import React, {useState} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import globalStyle from '../styles/global.style';

import NavBar from '../components/NavBar';

const Feed = ({navigation}) => {
  return (
    <View style={globalStyle.container}>
        <Text style={globalStyle.text}>Feed</Text>
        <NavBar navigation={navigation} />
    </View>
  );
};


export default Feed;