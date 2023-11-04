import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';

import { getBooksByOwner, removeBookByReferenceId } from '../../hooks/booksList';

const Published = ({ ownerEmail }) => {
    const [books, setBooks] = useState([]);
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
        return booksList.map(book => {
            return (
                <>
                    <Post book={book}></Post>
                    <PublishedCtas bookReferenceId={book.referenceId}/>
                </>
            )
        });
    }

    return <View style={globalStyle.manageItemContainer}>
        <MyButton
            customStyle={globalStyle.collapsableCta}
            label='Publicados'
            onPress={() => setCollapsed(!isCollapsed)}
        />
        <Collapsible
            style={globalStyle.collapsedContainer}
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