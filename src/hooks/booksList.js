import {
    set,
    get,
    ref,
    push,
    query,
    orderByChild,
    startAfter,
    limitToFirst,
    equalTo,
    getDatabase
} from 'firebase/database';
import app from '../../firebase.config';

/**
 * @param {string} uid
 * @param {string} localId
 * @param {string} name
 * @param {string} rentTime
 * @param {string} description
 * @param {array} images
 * @param {function} callback
 */
export function createBook(uid, localId, name, rentTime, description, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    const newBooksRef = push(booksRef);

    set(newBooksRef, {
        uid: uid,
        owner: localId,
        name: name,
        rentTime: rentTime,
        description: description,
        user: '', //quem pegou emprestado
        pending: false,
        creationDate: new Date().toISOString()
    })
    .then((a) => callback({ success: true }))
    .catch(err => callback(err));
}

export function listBooks(startAt, callback) {
    const db = getDatabase(app);
    const pageSize = 2;
    const booksRef = ref(db, 'livros_list');

    let booksQuery = query(booksRef, orderByChild('creationDate'));

    if (startAt) {
        booksQuery = query(booksRef, orderByChild('creationDate'), startAfter(startAt), limitToFirst(pageSize));
    }

    get(booksQuery)
        .then(snapshot => {
            const booksArray = [];
            snapshot.forEach(childSnapshot => {
                const bookData = childSnapshot.val();
                booksArray.push(bookData);
            });
            callback(booksArray);
        })
        .catch(err => callback(err));
}

export function getBooksByOwner(owner, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    let booksQuery = query(booksRef, orderByChild('owner', equalTo(owner)));

    get(booksQuery)
        .then(snapshot => callback(snapshot.val()))
        .catch(err => callback(err));
}