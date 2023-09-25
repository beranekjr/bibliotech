import React, {useState} from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import MyInput from '../../components/MyInput';


const Feed = ({navigation}) => {
    const [search, setSearch] = useState('');
  return (
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
        <Post></Post>
        <NavBar navigation={navigation} />
    </View>
  );
};

const customStyles = {
    input: {
        width: '100%',
    },
  };

export default Feed;