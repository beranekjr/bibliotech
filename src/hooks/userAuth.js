import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import app from '../../firebase.config';


/**
 * Create user in firebase database
 * @param {string} email
 * @param {string} password
 * @param {function} callback function to be executed after create user is done
 */
export function createUser(email, password, callback) {
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => callback(userCredentials))
        .catch(err => callback(err));
}

/**
 * Logs in user in firebase database
 * @param {string} email
 * @param {string} password
 * @param {string} callback function to be executed after create user is done
 */
export function loginUser(email, password, callback) {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => callback(userCredentials))
        .catch(err => callback(err))
}
