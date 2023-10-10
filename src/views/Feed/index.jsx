import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import MyInput from '../../components/MyInput';

// import axios from 'axios';
import { listBooks } from '../../hooks/booksList';
const Feed = ({navigation, extraData}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const url = process.env.EXPO_PUBLIC_FIREBASE_DB_URL
  const getFeedItems = () => {
    listBooks(0,(result) => {
      setData(result);
      console.log(result, 'result:')
      console.log(data, 'data:')
    });
  };
  useEffect(() => {
    getFeedItems();
  }, []);
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
        {data ? (
          data.map((item, index) => (
            <View key={index}>
              <Post navigation={navigation} items={item}></Post>
            </View>
          ))

        ) : (<Text>nada</Text>)}
        {/* {result.map((items, index) => (
         <Post key={index} navigation={navigation} items={items}></Post>
      ))} */}

        <Post navigation={navigation} items={data}></Post>
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