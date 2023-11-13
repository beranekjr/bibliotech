import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';


import home from '../../assets/navbar/home.png';
import profile from '../../assets/navbar/profile.png';
import manage from '../../assets/navbar/manage.png';

import feed from '../../assets/navbar/feed.png';
import feed_filled from '../../assets/navbar/feed_filled.png';

import books from '../../assets/navbar/books.png';
import books_filled from '../../assets/navbar/books_filled.png';

import account from '../../assets/navbar/account.png';
import account_filled from '../../assets/navbar/account_filled.png';

const imageMapping = {
  manage: {
    manage: books,
    filled: books_filled
  },
  profile: {
    profile: account,
    filled: account_filled,
  },
  feed: {
    feed: feed,
    filled: feed_filled
  }
}

function getImageFromUrl(routeName, filled) {
  if (filled) {
    return imageMapping[routeName].filled;
  }

  return imageMapping[routeName][routeName];
}

const NavBar = ({ navigation, extraData }) => {
  const state = navigation.getState();
  const navbarRoutes = state.routeNames.filter((r) => ['Feed', 'Manage', 'Profile'].includes(r));

  return (
    <View style={styles.navbar}>
      {
        navbarRoutes.map((route, i) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate(route, extraData)}>
              <Image
                style={{ width: 50, height: 50 }}
                source={getImageFromUrl(route.toLowerCase(), route === state.routes[state.index].name)}
              />
            </TouchableOpacity>
                )
          })
      }
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