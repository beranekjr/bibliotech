import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import styles from './styles';
import Loader from '../Loader';

import { getImageFromUrl } from '../../hooks/images';

const Post = ({ book, navigation, userData }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        getImageFromUrl(book)
            .then(img => setImage(img))
            .catch(err => console.log(err));
    }, []);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details')}
            style={styles.card}
        >
            {image ?
                <Image
                    style={{width: '30%', height: '100%'}}
                    source={{uri: image}}
                /> :
                <Loader />
            }
            {
                book ?
                    <View style={styles.cardInfo}>
                        <Text style={styles.title}>{book.name}</Text>
                        <View style={styles.info}>
                            <Text  numberOfLines={1} ellipsizeMode='tail' style={styles.text}>publicado por:</Text>
                            <Text style={styles.text}>{book.owner}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.text}>Bairro:</Text>
                            <Text style={styles.text}>{book.local}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.text}>Tempo de devolução:</Text>
                            <Text style={styles.text}>{book.rentTime}</Text>
                        </View>
                        <View style={styles.desc}>
                            <Text style={styles.text}>Sobre:</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.subText}>{book.description}</Text>
                        </View>
                    </View> :
                    <></>
            }
        </TouchableOpacity>
    );
};
export default Post;