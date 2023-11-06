import React, { useState, useEffect } from 'react';
import { Text, View, } from 'react-native';

import styles from './styles';
import globalStyle from '../../styles/global.style';
import { getBookByUid } from '../../hooks/booksList';
import Loader from '../../components/Loader';
import MyButton from '../../components/MyButton';
import NavBar from '../../components/NavBar';
import Slide from '../../components/Slide';

import { getAllBookImages } from '../../hooks/images';
import { rentBook } from '../../hooks/booksRent';

const Details = ({ route, navigation }) => {

    const [images, setImages] = useState([]);
    const { book, extraData } = route.params;
    const { bookId } = route.params;
    const [books, setBooks] = useState(null);
    const [label, setLabel] = useState('');
    const [status, setStatus] = useState();
    const getLabel = (owner, pending, tenant) => {
        const user = extraData.user
        console.log(pending)
        console.log(tenant)
        console.log(owner)
        if (pending === false && tenant === '') {
            setLabel('Solicitar aluguel');
            setStatus(false);
        } else if (user === owner) {
            setLabel('Você já alugou esse livro');
            setStatus(false);
        } else if (pending === false && user === owner) {
            setLabel('Você alugou esse livro');
            setStatus(false);
        } else {
            setLabel('Outra situação');
            setStatus(true);
        }
    };
    const requestRent = (uid, email) => {
        console.log(uid, email)
        rentBook(email, uid, (response) => {
            if (response.success) {
                Alert.alert('Solicitação de aluguel enviada! Aguarde o contato do fornecedor.');
            } else {
                removeImages(uid)
            }
        });
    }
    
    useEffect(() => {
        getAllBookImages(book.uid, (imagesResponse) => {
            setImages(imagesResponse.map(img => {
                return {
                    url: img
                }
            }));
        });
        getBookByUid(book.uid, (result) => {
            if (result) {
                setBooks(result)
                getLabel(result[0].owner, result[0].pending, result[0].user)
            } else {
                console.log('Nenhum livro encontrado para o UID:', uid);
            }
        });
        
    }, []);

    return (
      <View style={globalStyle.body}>
      <Slide items={images} config={ {width: 396, heigth: 396 } } />
      <View style={globalStyle.container}>
      {books ? (
        books.map((item) => (
            <View key={item.uid}>
                <View style={globalStyle.mb1}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.warn}>devolução em: {item.rentTime} dias</Text>
                </View>
                <View style={globalStyle.mb1}>
                <Text style={styles.title}>Descrição:</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={globalStyle.mb5}>
                    <Text style={styles.title}>Informações do anunciante:</Text>
                    <Text style={styles.description}>Local: {item.local}</Text>
                    <Text style={styles.description}>Contato: {item.owner}</Text>
                </View>
                <MyButton
                    disabled={status}
                    label={label}
                    onPress={()=> requestRent(item.uid, item.owner)}
                />
            </View>
        ))
        ) : (
            < Loader />
        )
    }
      </View>
      <NavBar navigation={navigation} />
    </View>
    );
};

const customStyles = {};

export default Details;