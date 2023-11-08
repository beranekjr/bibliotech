import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import MyInput from '../../components/MyInput';
import { listBooks } from '../../hooks/booksList';
import Loader from '../../components/Loader';

const Feed = ({navigation, extraData}) => {
    const [search, setSearch] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchStarted, setSearchStarted] = useState(false);
    const [books, setBooks] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    const getFeedItems = () => {
        listBooks(pageIndex, (result) => {
            setBooks(result.books);
            setPageIndex(result.pageIndex);
        });
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        listBooks(pageIndex, (result) => {
            setBooks(result.books);
            setPageIndex(result.pageIndex);
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        getFeedItems();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
    
        if (text === '') {
          setFilteredBooks([]);
          setSearchStarted(false);
        } else {
          const filtered = books.filter((book) =>
            book.name.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredBooks(filtered);
          setSearchStarted(true);
        }
      };
    return (
        <View style={globalStyle.body}>
            <ScrollView
                style={globalStyle.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={globalStyle.container}>
                    <View style={globalStyle.fixedTop}>
                        <MyInput
                            style={styles.input}
                            placeholder="Procurar"
                            type={'default'}
                            value={search}
                            onChangeText={handleSearch}
                            maxLength={30}
                            customStyle={customStyles.input}
                            />
                    </View>
                    {searchStarted
                        ? filteredBooks?.map((book) => (
                            <View key={book.uid}>
                                <Post navigation={navigation} book={book} userData={extraData}></Post>
                            </View>
                            ))
                        : books?.map((book) => (
                            <View key={book.uid}>
                                <Post navigation={navigation} book={book} userData={extraData}></Post>
                            </View>
                    ))}
                </View>
            </ScrollView>
            <NavBar navigation={navigation} extraData={extraData} />
        </View>
    );
};

const customStyles = {
    input: {
            width: '100%',
    },
};

export default Feed;