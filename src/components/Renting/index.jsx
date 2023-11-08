import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';

import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';
import Loader from '../Loader';

import { getRentedBooksByOwner } from '../../hooks/booksRent';

const Renting = ({ ownerEmail, navigation }) => {
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
        if (booksList.length > 0) {
            const filteredBooks = booksList
              .filter(book => book.owner === ownerEmail);

            if (filteredBooks.length > 0) {
              return filteredBooks.map(book => (
                <>
                    <Post navigation={navigation} book={book} userData={{ email: ownerEmail }}></Post>
                </>
              ));
            } else {
              return <Text style={globalStyle.text}>Nenhuma publicação</Text>;
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
            label='Alugados'
            onPress={() => setCollapsed(!isCollapsed)}
            isCollaps={true}
            collapsed={isCollapsed}
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