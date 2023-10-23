import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';
import Loader from '../Loader';

import RequestsCtas from '../RequestsCtas';

import { getRentSolicitations } from '../../hooks/booksRent';

const Requests = ({ ownerEmail }) => {
    const [books, setBooks] = useState([]);
    const [loader, setLoader] = useState(true);
    const [isCollapsed, setCollapsed] = useState(true);

    const fetchBooks = () => {
        getRentSolicitations(ownerEmail, (booksPending) => {
            if (books.length === 0) {
                setBooks(booksPending);
            }
            setLoader(false);
        });
    };

    const updateBookList = (bookReferenceId) => {
        const newBooks = books.filter(book => book.referenceId !== bookReferenceId);
        setBooks(newBooks);
    }

    const renderItemCard = (args) => {
        return (
            <>
                <Post book={args.item}></Post>
                <RequestsCtas
                    book={args.item}
                    onPress={() => updateBookList(args.item.referenceId)}/>
            </>
        )
    }

    return <View style={[globalStyle.container, styles.container]}>
        <MyButton
            customStyle={styles.collapsableCta}
            label='Solicitacoes'
            onPress={() => setCollapsed(!isCollapsed)}
        />
        <Collapsible
            style={styles.collapsedContainer}
            collapsed={isCollapsed}
            onAnimationEnd={fetchBooks}
            >
            <View style={styles.collapsedContainer}>
                {
                    books.length > 0 ?
                        <FlatList
                            data={books}
                            renderItem={renderItemCard}
                            keyExtractor={item => item.uid}
                        />
                    : <></>
                }
            </View>
        </Collapsible>
    </View>
}

export default Requests;