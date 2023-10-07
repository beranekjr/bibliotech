import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
        <Text style={styles.navbarText}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navbarText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navbarText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

NavBar.propTypes = {
  navigation: PropTypes.object
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