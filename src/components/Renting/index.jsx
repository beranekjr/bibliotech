import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';

import { getRentedBooksByOwner } from '../../hooks/booksRent';

const Renting = ({ ownerEmail }) => {
    const [books, setBooks] = useState([]);
    const [isCollapsed, setCollapsed] = useState(true);

    const fetchBooks = () => {
        if (books.length === 0) {
            getRentedBooksByOwner(ownerEmail, (rentingBooks) => {
                if (Array.isArray(rentingBooks)) {
                    setBooks(rentingBooks)
                }
            });
        }
    };

    const renderItemCard = (booksList) => {
        return booksList.map(book => {
            return (
                <>
                    <Post book={book}></Post>
                </>
            )
        });
    }

    return <View style={globalStyle.manageItemContainer}>
        <MyButton
            customStyle={globalStyle.collapsableCta}
            label='Alugados'
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

export default Renting;