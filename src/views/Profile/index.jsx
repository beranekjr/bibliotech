import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../../components/MyButton';
import NavBar from '../../components/NavBar';
import MyInput from '../../components/MyInput';

import { logout, updateUserEmail, getUserByEmail } from '../../hooks/userAuth';

const Profile = ({navigation, extraData}) => {

    const [email, setEmail] = useState(null);

    const submit = () => {
        if (email !== extraData.email) {
            getUserByEmail(email, (result) => {
                if (!result.emailFound) {
                    updateUserEmail(extraData.id, email, (updateResult) => {
                        if (updateResult && updateResult.success) {

                            extraData.email = email;
                            navigation.navigate('Feed');
                            return;
                        }

                        if (updateResult.error) {
                            Alert.alert('Algo deu errado ao tentar atualizar o email');
                        }
                    })
                    return;
                }

                Alert.alert('Algo deu errado ao tentar atualizar o email');
            });
        }
    }

    const logoutUser = () => {
        logout();
        navigation.navigate('Login');
    }

    useEffect(() => {
        setEmail(extraData.email);
    }, [])

    return (
        <View style={globalStyle.body}>
            <View style={[globalStyle.container, styles.container]}>
                <Text style={styles.inputLabel}>
                    Atualizar email de contato
                </Text>
                <MyInput
                    placeholder="Atualizar seu e-mail"
                    type={'email-address'}
                    value={email}
                    maxLength={30}
                    onChangeText={setEmail}
                />
                <Text style={styles.inputDisclaimer}>
                    Atualizar o e-mail de contato acima não irá alterar o seu e-mail de login. Você ainda terá de usar o e-mail anterior para efetuar o login.
                </Text>
                <MyButton
                    label='Salvar'
                    onPress={submit}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.logoutCtaContainer}
                    onPress={logoutUser}>
                    <Text style={styles.logoutCta}>Sair</Text>
                </TouchableOpacity>
            </View>
            <NavBar navigation={navigation} extraData={extraData} />
        </View>
    );
};

export default Profile;