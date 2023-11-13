import React, { useState, useEffect }  from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';
import Loader from '../Loader';
import { getBooksByOwner, removeBookByReferenceId } from '../../hooks/booksList';

const Published = ({ ownerEmail, navigation }) => {
    const [books, setBooks] = useState([]);
    const [height, setHeight] = useState(250);
    const [isCollapsed, setCollapsed] = useState(true);    

    const fetchBooks = () => {
        if (books.length === 0) {
            getBooksByOwner(ownerEmail, (publishedBooks) => setBooks(publishedBooks));
        }
    };

    const updateBookList = (bookReferenceId) => {
        const newBooks = books.filter(book => book.referenceId !== bookReferenceId);
        setBooks(newBooks);
        if (newBooks.length === 0) {
            setCollapsed(true);
        }
    }

    const PublishedCtas = ({ bookReferenceId }) => {
        const removeBook = () => {
            removeBookByReferenceId(bookReferenceId, (result) => {
                if (result.success) {
                    updateBookList(bookReferenceId);
                } else {
                    Alert.alert('Erro ao remover livro', success.error)
                }
            })
        }

        return (
            <TouchableOpacity
                key={bookReferenceId}
                style={styles.removeCta}
                onPress={removeBook}
            >
                <Text style={styles.publishedCtasText}>
                    remover
                </Text>
            </TouchableOpacity>
        )
    }

    const renderItemCard = (booksList) => {
        if (booksList === null) {
            return (
              <>
                <Loader />
              </>
            );
          } else if (booksList.length > 0) {
            const filteredBooks = booksList.filter(book => book.owner === ownerEmail);
          
            if (filteredBooks.length > 0) {
              return filteredBooks.map(book => (
                <View>
                    <Post
                        key={book.id}
                        navigation={navigation}
                        book={book}
                        userData={{ email: ownerEmail }}
                    />
                    <PublishedCtas bookReferenceId={book.referenceId} />
                </View>
              ));
            } else {
              return <Text style={globalStyle.text}>Nenhuma publicação</Text>;
            }
          } else {
            return <Text style={globalStyle.text}>Nenhuma publicação</Text>;
          }
    }
    useEffect(() => {
        const lenght = books.filter(book => book.owner === ownerEmail)
        setHeight(250 * lenght.length);
    }, [books]);

    return <View style={globalStyle.manageItemContainer}>
        <MyButton
            customStyle={globalStyle.collapsableCta}
            label='Publicados'
            onPress={() => setCollapsed(!isCollapsed)}
            isCollaps={true}
            collapsed={isCollapsed}
        />
        <Collapsible
            style={[globalStyle.collapsedContainer, {height: height} ]}
            collapsed={isCollapsed}
            onAnimationEnd={fetchBooks}
            >
            <ScrollView style={globalStyle.collapsedContainerView}>
                {renderItemCard(books)}
            </ScrollView>
        </Collapsible>
    </View>
}

export default Published;