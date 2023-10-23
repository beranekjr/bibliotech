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
    limitToFirst
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
    let booksQuery = query(booksRef, orderByChild('owner', equalTo(owner)));

    get(booksQuery)
        .then(snapshot => callback(snapshot.val()))
        .catch(err => callback(err));
}

export function getBookByUid(uid, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    let booksQuery = query(booksRef, orderByChild('uid', equalTo(uid)));

    get(booksQuery)
        .then(snapshot => callback(snapshot.val()))
        .catch(err => callback(err));
}