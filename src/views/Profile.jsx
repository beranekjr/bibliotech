import React, {useState} from 'react'
import { Text, View } from 'react-native'
import globalStyle from '../styles/global.style';

import NavBar from '../components/NavBar';

const Profile = ({navigation}) => {
  return (
    <View style={globalStyle.container}>
        <Text style={globalStyle.text}>Profile</Text>
        <NavBar navigation={navigation} />
    </View>
  );
};

export default Profile;