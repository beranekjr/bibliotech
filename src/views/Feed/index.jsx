import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import MyInput from '../../components/MyInput';
import { listBooks } from '../../hooks/booksList';
import Loader from '../../components/Loader';

const Feed = ({navigation, extraData}) => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState(null);

    const getFeedItems = () => {
        listBooks(0, (result) => {
            setBooks(result);
        });
    };

    useEffect(() => {
        getFeedItems();
    }, []);

    return (
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <View style={globalStyle.fixedTop}>
                    <MyInput
                            style={styles.input}
                            placeholder="Procurar"
                            type={'default'}
                            value={search}
                            onChangeText={setSearch}
                            customStyle={customStyles.input}
                            />
                </View>
                {books ? (
                    books.map((book) => (
                        <View key={book.uid}>
                            <Post navigation={navigation} book={book} userData={extraData}></Post>
                        </View>
                    ))

                    ) : (
                        < Loader />
                    )
                }
            </View>
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