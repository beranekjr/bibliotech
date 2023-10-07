import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import MyInput from '../../components/MyInput';


const Feed = ({navigation, extraData}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={globalStyle.body}>
        <View style={globalStyle.container}>
        <View style={globalStyle.fixedTop}>
            <MyInput
                style={styles.input}
                placeholder="Procurar"
                type={'default'}
                value={search}
                onChangeText={setSearch}
                customStyle={customStyles.input}
                />
        </View>
        <Post navigation={navigation} ></Post>
        
    </View>
    <NavBar navigation={navigation} />
    </View>
  );
};

Feed.propTypes = {
  navigation: PropTypes.object,
  extraData: PropTypes.object,
};

const customStyles = {
    input: {
        width: '100%',
    },
  };

export default Feed;