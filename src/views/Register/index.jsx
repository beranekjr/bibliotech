import React, {useState} from 'react';
import { Alert, Image, Text, View, TouchableOpacity } from 'react-native';

import globalStyle from '../../styles/global.style';
import logo from '../../../assets/logo.png';

import Loader from '../../components/Loader';
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

import { registerUser } from '../../hooks/userAuth';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const createAcount = () => {
        setLoading(true);

        registerUser(email, password, (result) => {
            setLoading(false);

            if (!result.success) {
                Alert.alert('Algo deu errado, verifique suas informacoes e tente novamente');
                return;
            }

            navigation.navigate('Feed');
        });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <Text style={[globalStyle.logo]}>MateriAloca</Text>
                <Text style={{ color: 'white', alignSelf: 'center'}}>
                    Nossa plataforma permite a você compartilhar ou alugar materiais ou livros acadêmicos.
                </Text>
                <View>
                <Text style={[globalStyle.title, { fontSize: 20, marginBottom: 0, marginTop: 20 }]}>Crie sua conta</Text>
                    <MyInput
                        placeholder="Digite seu e-mail"
                        type={'email-address'}
                        value={email}
                        maxLength={30}
                        onChangeText={setEmail}
                    />
                    <MyInput
                        placeholder="crie sua senha"
                        value={password}
                        type={'default'}
                        maxLength={30}
                        onChangeText={setPassword}
                    />
                        <View style={{marginTop: 30}}>
                            <MyButton
                                label='Criar'
                                onPress={createAcount}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={globalStyle.text}>Já tem uma conta? Faça o login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        </View>
    );
};

export default Register;