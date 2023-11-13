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
import initializeDatabase from '../database/database';

const db = initializeDatabase(app);

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
    const pageSize = 6;
    const booksRef = ref(db, 'livros_list');

    const booksQuery = query(booksRef, orderByChild('creationDate'), startAfter(startAt), limitToFirst(pageSize));

    get(booksQuery)
        .then(snapshot => {
            const booksArray = [];
            snapshot.forEach(childSnapshot => {
                const bookData = childSnapshot.val();

                let bookObj = bookData;
                bookData.referenceId = childSnapshot.key;

                booksArray.push(bookObj);
            });
            callback({
                books: booksArray,
                pageIndex: startAt + pageSize
            });
        })
        .catch(err => callback(err));
}

export function getBooksByOwner(owner, callback) {
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
    const booksRef = ref(db, `livros_list`);
    let booksQuery = query(booksRef, orderByChild('uid'), equalTo(uid));

    get(booksQuery)
        .then(snapshot => {
            const booksArray = [];
            booksArray.push(parseBooksList(snapshot.val(), null));

            if (booksArray.length > 0) {
                callback({
                    success: true,
                    book: booksArray[0]
                });
                return;
            }

            callback({
                success: true,
                book: null
            });
        })
        .catch(err => callback(err));
}

export function removeBookByReferenceId(referenceId, callback) {
    const booksRef = ref(db, `livros_list/${referenceId}`);

    remove(booksRef)
        .then(() => callback({ success: true }))
        .catch(err => callback({ success: false, error: err.message }));
}