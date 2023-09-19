import React, {useState} from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import globalStyle from '../styles/global.style';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    navigation.navigate('Feed');
  }

  return (
    <View style={globalStyle.container}>
      <Image
        source={require('../../assets/logo.png')}
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
              onPress={loginUser}
            />
            <Text style={globalStyle.text}>ou</Text>
            <MyButton
              label='register'
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70A0AF',
    justifyContent: 'center',
    margin: '0 auto',
    padding: 20,
    gap: 93,
  },
});

export default Login;