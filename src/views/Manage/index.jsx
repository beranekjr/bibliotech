import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';

const Manage = ({navigation, extraData}) => {
  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.container}>
      </View>
      <NavBar navigation={navigation} extraData={extraData} />
    </View>
  );
};

export default Manage;