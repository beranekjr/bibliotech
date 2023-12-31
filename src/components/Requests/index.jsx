import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';
import Loader from '../Loader';

import { getRentSolicitations, acceptSolicitation, rejectSolicitation} from '../../hooks/booksRent';

const Requests = ({ ownerEmail, navigation }) => {
    const [books, setBooks] = useState([]);
    const [isCollapsed, setCollapsed] = useState(true);
    const [height, setHeight] = useState(250);
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
        if (booksList.lenght === 0) {
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
                    <RequestsCtas
                        key={book.uid}
                        book={book}
                        onPress={() => updateBookList(book.referenceId)}/>
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
            label='Solicitações'
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

export default Requests;