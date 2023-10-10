import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import styles from './styles'

import { getImageFromUrl } from '../../hooks/images';

const Post = ({ items, navigation }) => {

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details')}
      style={styles.card}
    >
      <Image
        source={getImageFromUrl(items && items.images && items.images[0])}
      />
      <View>
        <Text style={styles.title}>{items?.name}</Text>
        <Text style={styles.subText}>tags, tags, tags</Text>
        <View style={styles.info}>
            <Text style={styles.text}>publicado por:</Text>
            <Text style={styles.text}>{items?.owner}</Text>
        </View>
        <View style={styles.info}>
            <Text style={styles.text}>Bairro:</Text>
            <Text style={styles.text}>{items?.local}</Text>
        </View>
        <View style={styles.info}>
            <Text style={styles.text}>Tempo de devolução:</Text>
            <Text style={styles.text}>{items?.rentTime}</Text>
        </View>
        <View style={styles.desc}>
            <Text style={styles.text}>Sobre:</Text>
            <Text style={styles.subText}>{items?.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Post;