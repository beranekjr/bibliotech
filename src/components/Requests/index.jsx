import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';

import { getRentSolicitations, acceptSolicitation, rejectSolicitation} from '../../hooks/booksRent';

const Requests = ({ ownerEmail }) => {
    const [books, setBooks] = useState([]);
    const [isCollapsed, setCollapsed] = useState(true);

    const fetchBooks = () => {
        getRentSolicitations(ownerEmail, (booksPending) => {
            if (books.length === 0) {
                setBooks(booksPending);
            }
        });
    };

    const updateBookList = (bookReferenceId) => {
        const newBooks = books.filter(book => book.referenceId !== bookReferenceId);
        setBooks(newBooks);
        if (newBooks) {
            setCollapsed(true);
        }
    }

    const RequestsCtas = ({ key, book, onPress }) => {
        const acceptBookSolicitation = () => {
            acceptSolicitation(book.referenceId, () => {
                onPress({ success: true });
            })
        }

        const rejectBookSolicitation = () => {
            rejectSolicitation(book.referenceId, () => {
                onPress({ success: true });
            })
        }

        return <View
            key={key}
            style={styles.requestsCtaContainer}>
            <TouchableOpacity
                style={[styles.requestsCtas, styles.acceptCta]}
                onPress={acceptBookSolicitation}
            >
                <Text style={styles.requestsCtasText}>
                    aceitar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.requestsCtas, styles.rejectCta]}
                onPress={rejectBookSolicitation}
            >
                <Text style={[styles.requestsCtasText, styles.rejectCtaText]}>
                    rejeitar
                </Text>
            </TouchableOpacity>
        </View>;
    }

    const renderItemCard = (booksList) => {
        return booksList.map(book => {
            return (
                <>
                    <Post book={book}></Post>
                    <RequestsCtas
                        key={book.uid}
                        book={book}
                        onPress={() => updateBookList(book.referenceId)}/>
                </>
            )
        })
    }

    return <View style={globalStyle.manageItemContainer}>
        <MyButton
            customStyle={globalStyle.collapsableCta}
            label='Solicitacoes'
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

export default Requests;