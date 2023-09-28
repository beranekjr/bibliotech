import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import styles from './styles'

const Post = ({ items, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details')} 
      style={styles.card}
    >
      <Image
        source={require('../../../assets/placeholder.png')}
      />
      <View>
        <Text style={styles.title}>Titulo</Text>
        <Text style={styles.subText}>tags, tags, tags</Text>
        <View style={styles.info}>
            <Text style={styles.text}>publicado por:</Text>
            <Text style={styles.text}>nome</Text>
        </View>
        <View style={styles.info}>
            <Text style={styles.text}>Bairro:</Text>
            <Text style={styles.text}>nome</Text>
        </View>
        <View style={styles.info}>
            <Text style={styles.text}>Tempo de devolução:</Text>
            <Text style={styles.text}>nome</Text>
        </View>
        <View style={styles.desc}>
            <Text style={styles.text}>Sobre:</Text>
            <Text style={styles.subText}>nome</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Post;