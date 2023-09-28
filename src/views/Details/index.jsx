import React, {useState} from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import {body, container} from '../../styles/global.style';
import Carousel from 'react-native-reanimated-carousel';

import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import MyInput from '../../components/MyInput';


const Feed = ({navigation}) => {
    const [search, setSearch] = useState('');
    const width = Dimensions.get('window').width;
  return (
    <View style={body}>
      <View style={container}>
      <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
      </View>
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