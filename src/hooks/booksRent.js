import {
    getDatabase,
    get,
    ref,
    query,
    orderByChild,
    equalTo,
    update
} from 'firebase/database';
import app from '../../firebase.config';

import { parseBooksList } from './helpers';
import initializeDatabase from '../database/database';

let db = initializeDatabase(app);

export function getRentedBooksByOwner(owner, callback) {
    const booksRef = ref(db, 'livros_list');
    const booksQuery = query(booksRef, orderByChild('user'), equalTo(owner));

    get(booksQuery)
        .then(snapshot => {
            callback(parseBooksList(snapshot.val(), null))
        })
        .catch(err => callback(err));
}

export function getBorrowedBooks(owner, callback) {
    const booksRef = ref(db, 'livros_list');
    const booksQuery = query(booksRef, orderByChild('owner'), equalTo(owner));

    get(booksQuery)
        .then(snapshot => {
            const result = parseBooksList(snapshot.val(), book => book.user !== '' && !book.pending);

            callback(result);
        })
        .catch(err => callback(err));
}

export function rentBook(owner, bookId, callback) {
    const bookRef = ref(db, `livros_list/${bookId}`);
    update(bookRef, {
        user: owner,
        pending: true
    })
    .then(() => callback({ success: true }) )
    .catch(err => callback(err));
}

export function getRentSolicitations(owner, callback) {
    const booksRef = ref(db, 'livros_list');
    const booksQuery = query(booksRef, orderByChild('owner'), equalTo(owner));

    get(booksQuery)
        .then(snapshot => {
            const result = parseBooksList(snapshot.val(), book => book.pending);

            callback(result);
        })
        .catch(err => callback(err));
}

export function acceptSolicitation(bookId, callback) {
    const bookRef = ref(db, `livros_list/${bookId}`);

    update(bookRef, {
        pending: false
    })
    .then(() => callback({ success: true }))
    .catch(err => callback(err));
}

export function rejectSolicitation(bookId, callback) {
    const bookRef = ref(db, `livros_list/${bookId}`);
    update(bookRef, {
        user: '',
        pending: false
    })
    .then(() => callback({ success: true }))
    .catch(err => callback(err));
}

export function resetBookStatus(bookId, callback) {
    const bookRef = ref(db, `livros_list/${bookId}`);
    update(bookRef, {
        user: '',
        pending: false
    })
    .then(() => callback({ success: true }))
    .catch(err => callback(err));
}
