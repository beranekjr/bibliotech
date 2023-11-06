import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';
import Loader from '../Loader';

import { getBorrowedBooks, resetBookStatus } from '../../hooks/booksRent';

const Borrowed = ({ ownerEmail }) => {
    const [books, setBooks] = useState([]);
    const [isCollapsed, setCollapsed] = useState(true);

    const fetchBooks = () => {
        if (books.length === 0) {
            getBorrowedBooks(ownerEmail, (borrowedBooks) => setBooks(borrowedBooks));
        }
    };

    const updateBookList = (bookReferenceId) => {
        const newBooks = books.filter(book => book.referenceId !== bookReferenceId);
        setBooks(newBooks);
        if (newBooks.length === 0) {
            setCollapsed(true);
        }
    }

    const RentedCta = ({ bookReferenceId }) => {
        const conclude = () => {
            resetBookStatus(bookReferenceId, () => updateBookList(bookReferenceId));
        }

        return (
            <TouchableOpacity
                key={bookReferenceId}
                style={styles.removeCta}
                onPress={conclude}
            >
                <Text style={styles.publishedCtasText}>
                    concluir
                </Text>
            </TouchableOpacity>
        )
    }

    const renderItemCard = (booksList) => {
        if (booksList.length > 0) {
            const filteredBooks = booksList
              .filter(book => book.owner === ownerEmail);
          
            if (filteredBooks.length > 0) {
              return filteredBooks.map(book => (
                <>
                    <Post book={book}></Post>
                    <RentedCta bookReferenceId={book.referenceId}/>
                </>
              ));
            } else {
              return <Text style={globalStyle.text}>Nenhuma emprestado</Text>;
            }
          } else {
            return (
              <>
                <Loader />
              </>
            );
          }
    }

    return <View style={globalStyle.manageItemContainer}>
        <MyButton
            customStyle={globalStyle.collapsableCta}
            label='Emprestados'
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

export default Borrowed;