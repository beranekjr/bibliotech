import React, {useState} from 'react'
import { Text, View, } from 'react-native'
import styles from './styles'
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Slide from '../../components/Slide';


const Details = ({navigation}) => {
  
const images = [
  {
    url: 'https://i.imgur.com/03iuB2Um.jpg'
  },
  {
    url: 'https://i.imgur.com/03iuB2Um.jpg'
  },
  {
    url: 'https://i.imgur.com/03iuB2Um.jpg'
  },
] 

  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.container}>
        <Slide items={images} />
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
};

const customStyles = {};

export default Details;