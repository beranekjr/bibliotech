import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import app from '../../firebase.config';
import {
    getDatabase,
    set,
    ref,
    onValue,
    query,
    orderByChild,
    equalTo,
    update,
    get
} from 'firebase/database';

/**
 * Create user in firebase database
 * @param {string} email
 * @param {string} password
 * @param {function} callback function to be executed after create user is done
 */
export function registerUser(email, password, callback) {
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
            const uid = response.user.uid;
            const data = {
                id: uid,
                email
            };

            const db = getDatabase(app);
            const usersRef = ref(db, 'usuarios/' + uid);

            set(usersRef, data)
                .then(() => {
                    callback({success:true, user: data});
                })
                .catch((error) => {
                    callback(error);
                });
        })
        .catch(err => callback(err));
}

export const getUserByEmail = (email, callback) => {
    const db = getDatabase(app);

    const usersRef = ref(db, 'usuarios');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));

    get(emailQuery)
        .then(snapshot => {
            callback({ emailFound: snapshot.val() !== null })
        })
        .catch(err => {
            callback({ emailFound: true });
        })
}

export const updateUserEmail = (userKey,  newEmail, callback) => {
    const db = getDatabase(app);

    const usersRef = ref(db, 'usuarios/' + userKey);
    const updatedData = {
        email: newEmail,
    };

    update(usersRef, updatedData, (error) => {
        if (error) {
            callback({ error: true })
        } else {
            callback({ success: true })
        }
    });
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
        .then(response => {
            const db = getDatabase(app);
            const usersRef = ref(db, 'usuarios/' + response.user.uid);

            onValue(usersRef, callback);
        })
        .catch(err => callback(err));
}

/**
 *
 * @param {function} setUser
 * @param {function} setLoading
 */
export function onAuthChange(setUser, setLoading) {
    const auth = getAuth(app);

    onAuthStateChanged(auth, user => {
        if (user) {
            const db = getDatabase(app);
            const usersRef = ref(db, 'usuarios/' + user.uid);

            onValue(usersRef, (document) => {
                setLoading(false);
                setUser(document.val());
            });
        } else {
          setLoading(false);
        }
    });
}

export function logout() {
    const auth = getAuth();
    auth.signOut().then(() => {
    // Sign-out successful.
    }).catch(err => {
        console.log(err);
    });
}
