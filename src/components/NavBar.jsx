import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import home from '../../assets/navbar/home.png';
import profile from '../../assets/navbar/profile.png';
import manage from '../../assets/navbar/manage.png';

const NavBar = ({ navigation, extraData }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Feed', extraData)}>
        <Image
          source={home}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Manage', extraData)}>
        <Image
          source={manage}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile', extraData)}>
        <Image
          source={profile}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'lightgray',
        paddingVertical: 10,
      },
      navbarText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
  });

export default NavBar;