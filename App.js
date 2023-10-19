import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

import Loader from './src/components/Loader';
import NavBar from './src/components/NavBar';
import AddBook from './src/views/AddBook';
import Login from './src/views/Login';
import Feed from './src/views/Feed';
import Profile from './src/views/Profile';
import Register from './src/views/Register';
import Details from './src/views/Details';

import { onAuthChange, logout } from './src/hooks/userAuth';

export default function App() {
  const Stack = createNativeStackNavigator();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //TODO para deslogar, execute essa funcao: logout
  logout();

  useEffect(() => {
    onAuthChange(setUser, setLoading);
    console.log(user)
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
            headerShown: false
            }}>

          { user ? (
            <>
              <Stack.Screen name="Feed">
                {props => <Feed {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="AddBook">
                {props => <AddBook {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Profile">
                {props => <Profile {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {props => <Profile {...props} extraData={user} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="AddBook">
                {props => <AddBook {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Feed">
                {props => <Feed {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Details" component={Details} />
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}
