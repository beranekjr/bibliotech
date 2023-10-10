import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, Alert } from 'react-native';

import globalStyle from '../../styles/global.style.js';
// import styles from './styles';
import logo from '../../../assets/logo.png';

import Loader from '../../components/Loader';
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

import { loginUser } from '../../hooks/userAuth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('lucasdc12@gmail.com');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('123123');

  const handleUserLogin = () => {
    navigation.navigate('AddBook', {user: {teste: 'teste'}});

    return;
    setLoading(true);
    loginUser(email, password, (result) => {
      setLoading(false);

      const data = result.val();

      if (!data) {
        Alert.alert('Alguma coisa deu errado, tente novamente mais tarde');
      }

      navigation.navigate('Feed', { user: data });
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
      <Image
        source={logo}
      />
      <View>
        <Text style={globalStyle.title}>Login</Text>
        <MyInput
          placeholder="e-mail"
          type={'email-address'}
          value={email}
          onChangeText={setEmail}
        />
        <MyInput
          placeholder="senha"
          value={password}
          type={'default'}
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

Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;