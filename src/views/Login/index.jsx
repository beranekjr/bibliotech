import React, { useState } from 'react';
import { Image, Text, View, Alert } from 'react-native';

import globalStyle from '../../styles/global.style.js';
// import styles from './styles';
import logo from '../../../assets/logo.png';

import Loader from '../../components/Loader';
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

import { loginUser } from '../../hooks/userAuth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('florian@ahhaa.com');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('test1234');

    const handleUserLogin = () => {
        setLoading(true);
        loginUser(email, password, (result) => {

            setLoading(false);

            if (result) {
                navigation.navigate('Feed', { user: result.val() });
            }
        });
    };

    const handleUserRegister = () => {
        navigation.navigate('Register');
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <Text style={[globalStyle.title]}>MateriAloca</Text>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Nossa plataforma intuitiva permite aos usuários compartilhar seus materiais ou livros acadêmicos.</Text>
                <View>
                    <Text style={[globalStyle.title, { fontSize: 20, marginBottom: 0, marginTop: 20 }]}>Login</Text>
                    <MyInput
                        placeholder="e-mail"
                        type={'email-address'}
                        value={email}
                        maxLength={30}
                        onChangeText={setEmail}
                    />
                    <MyInput
                        placeholder="senha"
                        value={password}
                        type={'default'}
                        maxLength={30}
                        onChangeText={setPassword}
                    />
                    <View style={{marginTop: 30}}>
                        <MyButton
                            label='entrar'
                            onPress={handleUserLogin}
                        />
                        <Text style={globalStyle.text}>ou</Text>
                        <MyButton
                            label='register'
                            onPress={handleUserRegister}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;