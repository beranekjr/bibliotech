import React, {useState} from 'react'
import { Image, Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import globalStyle from '../../styles/global.style';

import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAcount = () => {
    navigation.navigate('Feed');
  }

  return (
    <View style={globalStyle.container}>
      <Image
        source={require('../../../assets/logo.png')}
      />
      <View>
        <Text style={globalStyle.title}>Crie sua conta</Text>
        <MyInput
          placeholder="Digite seu e-mail"
          type={'email-address'}
          value={email}
          onChangeText={setEmail}
        />
        <MyInput
          placeholder="crie sua senha"
          value={password}
          type={'default'}
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

export default Register;