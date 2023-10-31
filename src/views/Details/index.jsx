import React, { useState, useEffect } from 'react';
import { Text, View, } from 'react-native';

import styles from './styles';
import globalStyle from '../../styles/global.style';
import { getBookByUid } from '../../hooks/booksList';
import Loader from '../../components/Loader';

import NavBar from '../../components/NavBar';
import Slide from '../../components/Slide';

import { getAllBookImages } from '../../hooks/images';

const Details = ({ route, navigation }) => {

    const [images, setImages] = useState([]);
    const { book, extraData } = route.params;
    const { bookId } = route.params;
    const [books, setBooks] = useState(null);
    const getFeedItems = () => {
      getBookByUid(bookId, (result) => {
          setBooks(result.books);
          console.log(books)
      });
  };

    useEffect(() => {
        getAllBookImages(book, (imagesResponse) => {
            setImages(imagesResponse.map(img => {
                return {
                    url: img
                }
            }));
        });
        getFeedItems();
    }, []);

    return (
      <View style={globalStyle.body}>
      <Slide items={images} config={ {width: 396, heigth: 396 } } />
      <View style={globalStyle.container}>
      {books ? (
        books.map((item) => (
            <View key={item.uid}>
                <Text>{item.name}</Text>
            </View>
        ))
        ) : (
            < Loader />
        )
    }
      </View>
      <NavBar navigation={navigation} />
    </View>
    );
};

const customStyles = {};

export default Details;