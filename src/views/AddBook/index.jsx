import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { launchImageLibraryAsync, MediaTypeOptions, useMediaLibraryPermissions } from 'expo-image-picker';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

import { uploadImagesHook, removeImages } from '../../hooks/images';
import { createBook } from '../../hooks/booksList';

import Slide from '../../components/Slide';

const AddBook = ({ navigation, extraData }) => {
    const [nome, setNome] = useState('');
    const [bairro, setBairro] = useState('');
    const [rentTime, setRentTime] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
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

    const uploadImages = async (uid) => {
        try {
            const promises = uploadImagesHook(images, uid);

            Promise.all(promises);
        } catch (error) {
            console.error('Erro ao fazer upload das imagens: ', error);
        }
    };

    const uploadBook = () => {
        if (!nome) {
            Alert.alert('Por favor especifique o nome do livro');
            return;
        }

        if (!rentTime) {
            Alert.alert('Por favor determine o tempo de devolução');
            return;
        }

        if (!description) {
            Alert.alert('Por favor defina uma descrição para o livro');
            return;
        }

        if (images.length === 0) {
            Alert.alert('Ao menos uma imagem é necessaria para anunciar');
            return;
        }

        const uid = uuid.v4();

        uploadImages(uid);

        createBook(uid, extraData.email, nome, bairro, rentTime, description, (response) => {
            if (response.success) {
                navigation.navigate('Feed', extraData);
            } else {
                removeImages(uid)
            }
        });
    }

    return <ScrollView style={[globalStyle.body]}>
            <View style={[globalStyle.container]}>
                <Text style={[globalStyle.title]}>Anunciar</Text>
                <View style={styles.addBookContainer}>
                    <MyInput
                        placeholder="nome do livro"
                        type={'default'}
                        value={nome}
                        onChangeText={setNome}
                        maxLength={30}
                    />
                    <MyInput
                        placeholder="bairro"
                        type={'default'}
                        value={bairro}
                        onChangeText={setBairro}
                        maxLength={30}
                    />
                    <MyInput
                        placeholder="tempo de devolucao em dias"
                        type={'numeric'}
                        value={rentTime}
                        maxLength={2}
                        onChangeText={setRentTime}
                    />
                    <MyInput
                        placeholder="descricao"
                        type={'default'}
                        value={description}
                        maxLength={150}
                        onChangeText={setDescription}
                        customStyle={{ height: 100 }}
                    />
                    <MyButton
                        label='enviar imagens'
                        onPress={selectImages}
                    />
                    <View style={styles.imagesContainer}>
                        {images &&
                            <Slide
                                config={{ width: 220, heigth: 200 }}
                                items={images.map(img => { return { url: img } })}
                            />
                        }
                    </View>
                    <MyButton
                        label='enviar'
                        onPress={uploadBook}
                    />
                </View>
            </View>
        </ScrollView>;
}

export default AddBook;