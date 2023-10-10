import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions, useMediaLibraryPermissions } from 'expo-image-picker';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

import { uploadImagesHook } from '../../hooks/images';
import { createBook } from '../../hooks/booksList';

import Slide from '../../components/Slide';

const AddBook = ({ navigation }) => {

    const [nome, setNome] = useState('');
    const [rentTime, setRentTime] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [downloadUrls, setDownloadURLs] = useState([]);
    const [status, requestPermission] = useMediaLibraryPermissions();

    const selectImages = async () => {
        const config = {
            allowsEdiging: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
            mediaTypes: MediaTypeOptions.Images,
            selectionLimit: 5
        }

        const result = await launchImageLibraryAsync(config);

        if (!result.canceled) {
            const imagesUris = result.assets.map(asset => asset.uri);
            setImages(imagesUris);
        }
    }

    const uploadImages = async () => {
        try {
            const promises = uploadImagesHook(images)

            const downloadURLArray = await Promise.all(promises);

            setDownloadURLs(downloadURLArray);
        } catch (error) {
            console.error('Erro ao fazer upload das imagens: ', error);
        }
    };

    const uploadBook = () => {
        uploadImages();

        createBook('', nome, rentTime, description, images, (response) => {
            if (response.success) {
                navigation.navigate('Feed');
            }
        });
    }

    return <View style={[globalStyle.body]}>
        <View style={[globalStyle.container]}>
            <Text style={[globalStyle.title]}>Anunciar</Text>
            <View style={styles.addBookContainer}>
                <MyInput
                    placeholder="nome do livro"
                    type={'default'}
                    value={nome}
                    onChangeText={setNome}
                />
                <MyInput
                    placeholder="tempo de devolucao"
                    type={'default'}
                    value={rentTime}
                    onChangeText={setRentTime}
                />
                <MyInput
                    placeholder="descricao"
                    type={'default'}
                    value={description}
                    onChangeText={setDescription}
                />

                <MyButton
                    label='enviar imagens'
                    onPress={selectImages}
                />

                {images &&
                    <Slide

                        items={images.map(img => { return { url: img } })}
                    />
                }

                <MyButton
                    label='enviar'
                    onPress={uploadBook}
                />
            </View>
        </View>
    </View>;
}

export default AddBook;