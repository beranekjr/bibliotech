import React, { useState, useEffect } from 'react';
import { Text, View, Alert, StatusBar } from 'react-native';

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
    const { extraData } = route.params;

    const [book, setBook] = useState(route.params.book);
    const [label, setLabel] = useState('');
    const [status, setStatus] = useState();
    const [showContact, setShowContact] = useState(false);

    const getLabel = (owner, pending, tenant) => {
        const user = extraData.email;
        if (pending === false && tenant === '') {
            setLabel('Solicitar aluguel');
            setStatus(false);
        } else if (pending === true && user === tenant) {
            setLabel('Você já alugou esse livro');
            setStatus(true);
        } else if (pending === false && user === tenant) {
            setLabel('Você alugou esse livro');
            setStatus(true);
            setShowContact(true);
        } else if (user === book.owner) {
            setLabel('Este livro é seu');
            setStatus(true);
            setShowContact(true);
        } else {
            setLabel('Outra situação');
            setStatus(true);
        }
    };
    const requestRent = (referenceId, email) => {
        rentBook(email, referenceId, (response) => {
            if (response.success) {
                Alert.alert('Solicitação de aluguel enviada! Aguarde o contato do fornecedor.');
            } else {
                Alert.alert('Alguma coisa deu errado, tente novamente mais tarde!');
            }

            getBookByUid(book?.uid, (books) => {
                if (Array.isArray(books) && books.length > 0) {
                    setBook(books[0]);
                }
            });

            getLabel(book.owner, book.pending, book.user);
        });
    }

    useEffect(() => {
        setBook(route.params.book);

        getAllBookImages(book, (imagesResponse) => {
            setImages(imagesResponse.map(img => {
                return {
                    url: img
                }
            }));
        });

        getLabel(book?.owner, book?.pending, book?.user);
    }, []);

    return (
      <View style={globalStyle.body}>
        <StatusBar/>
        <Slide items={images} config={ {width: 396, heigth: 396 } } />
        <View style={globalStyle.container}>
        {book ? (
                <View key={book?.uid}>
                    <View style={globalStyle.mb1}>
                        <Text style={styles.name}>{book?.name}</Text>
                        <Text style={styles.warn}>devolução em: {book?.rentTime} dias</Text>
                    </View>
                    <View style={globalStyle.mb1}>
                    <Text style={styles.title}>Descrição:</Text>
                        <Text style={styles.description}>{book?.description}</Text>
                    </View>
                    <View style={globalStyle.mb5}>
                        <Text style={styles.title}>Informações do anunciante:</Text>
                        <Text style={styles.description}>Local: {book?.local}</Text>
                        <Text style={styles.description}>Contato: {showContact === true ? book?.owner : 'Disponível após usuario aceitar aluguel'}</Text>
                    </View>
                    <MyButton
                        disabled={status}
                        label={label}
                        onPress={()=> requestRent(book?.referenceId, extraData.email)}
                    />
                </View>
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