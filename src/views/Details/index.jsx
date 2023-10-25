import React, { useState, useEffect } from 'react';
import { Text, View, } from 'react-native';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import Slide from '../../components/Slide';

import { getAllBookImages } from '../../hooks/images';

const Details = ({ route, navigation }) => {

    const [images, setImages] = useState([]);
    const { book, extraData } = route.params;

    useEffect(() => {
        getAllBookImages(book, (imagesResponse) => {
            setImages(imagesResponse.map(img => {
                return {
                    url: img
                }
            }));
        });
    }, []);

    return (
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <Slide items={images} />
            </View>
        </View>
    );
};

const customStyles = {};

export default Details;