import {
    set,
    get,
    ref,
    push,
    query,
    orderByChild,
    startAfter,
    equalTo,
    getDatabase,
    limitToFirst,
    remove
} from 'firebase/database';
import app from '../../firebase.config';
import { parseBooksList } from './helpers';

/**
 * @param {string} uid
 * @param {string} localId
 * @param {string} name
 * @param {string} rentTime
 * @param {string} description
 * @param {array} images
 * @param {function} callback
 */
export function createBook(uid, localId, name, local, rentTime, description, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    const newBooksRef = push(booksRef);

    set(newBooksRef, {
        uid: uid,
        owner: localId,
        name: name,
        local: local,
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
    const pageSize = 6;
    const booksRef = ref(db, 'livros_list');

    const booksQuery = query(booksRef, orderByChild('creationDate'), startAfter(startAt), limitToFirst(pageSize));

    get(booksQuery)
        .then(snapshot => {
            const booksArray = [];
            snapshot.forEach(childSnapshot => {
                const bookData = childSnapshot.val();
                booksArray.push(bookData);
            });
            callback({
                books: booksArray,
                pageIndex: startAt + pageSize
            });
        })
        .catch(err => callback(err));
}

export function getBooksByOwner(owner, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    const booksQuery = query(booksRef, orderByChild('owner', equalTo(owner)));

    get(booksQuery)
        .then(snapshot => {
            const result = parseBooksList(snapshot.val(), null);
            callback(result);
        })
        .catch(err => callback(err));
}

export function getBookByUid(uid, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, `livros_list`);
    let booksQuery = query(booksRef, orderByChild('uid'), equalTo(uid));

    get(booksQuery)
        .then(snapshot => {
            const booksArray = [];

            snapshot.forEach(childSnapshot => {
                const book = childSnapshot.val();
                booksArray.push(book);
            });

            callback(booksArray);
        })
        .catch(err => callback(err));
}

export function removeBookByReferenceId(referenceId, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, `livros_list/${referenceId}`);

    remove(booksRef)
        .then(() => callback({ success: true }))
        .catch(err => callback({ success: false, error: err.message }));
}