import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDgv41PqN-mUs0VxYtf8P7n2fJdnZgx44k',
    authDomain: 'bibliotech-db.firebaseapp.com',
    databaseURL: 'https://bibliotech-db-default-rtdb.firebaseio.com',
    projectId: 'bibliotech-db',
    storageBucket: 'bibliotech-db.appspot.com',
    messagingSenderId: '382278025928',
    appId: '1:382278025928:web:72b90e0092e30565d15bfd'
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;
