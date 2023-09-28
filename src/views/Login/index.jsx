import React, {useState} from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import globalStyle from '../../styles/global.style';
import styles from './styles'
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    navigation.navigate('Feed');
  }
  const toGoRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.container}>
      <Image
        source={require('../../../assets/logo.png')}
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
              onPress={toGoRegister}
            />
          </View>
        </View>
    </View>
    </View>
  );
};

export default Login;