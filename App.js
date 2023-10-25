import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

import Loader from './src/components/Loader';
import Manage from './src/views/Manage';
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
    // logout();

    useEffect(() => {
        onAuthChange(setUser, setLoading);
    }, []);

    const getNavbarTitle = (title) => {
        return {
            title: title,
            headerShown: true,
            headerTransparent: true, // Para tornar o background transparente
            headerTitleAlign: 'center', // Para alinhar o texto ao centro
            headerTintColor: '#fff', // Para definir a cor do texto como branco
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 26
            },
        }
    }

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
                    <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
                    <Stack.Screen name="Feed" options={{ headerShown: false }}>
                        {props => <Feed {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="AddBook" options={getNavbarTitle('Anunciar')}>
                        {props => <AddBook {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="Manage" options={getNavbarTitle('Gerenciar')}>
                        {props => <Manage {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="Profile" options={getNavbarTitle('Perfil')}>
                        {props => <Profile {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register">
                        {props => <Profile {...props} extraData={user}  options={{ headerShown: false }} />}
                    </Stack.Screen>
                </>
            ) : (
                <>
                    <Stack.Screen name="Feed"  options={{ headerShown: false }}>
                        {props => <Feed {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="AddBook" options={getNavbarTitle('Anunciar')}>
                        {props => <AddBook {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="Manage" options={getNavbarTitle('Gerenciar')}>
                        {props => <Manage {...props} extraData={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }} />
                    <Stack.Screen name="Details" component={Details}  options={{ headerShown: false }} />
                </>
            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
