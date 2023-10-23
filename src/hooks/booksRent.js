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

export function getRentedBooksByOwner(owner, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    const booksQuery = query(booksRef, orderByChild('user'), equalTo(owner));

    get(booksQuery)
        .then(snapshot => callback(snapshot.val()))
        .catch(err => callback(err));
}

export function rentBook(owner, bookId, callback) {
    const db = getDatabase(app);
    const bookRef = ref(db, `livros_list/${bookId}`);
    update(bookRef, {
        user: owner,
        pending: true
    })
    .then(() => callback({ success: true }) )
    .catch(err => callback(err));
}

export function getRentSolicitations(owner, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    const booksQuery = query(booksRef, orderByChild('owner'), equalTo(owner));

    get(booksQuery)
        .then(snapshot => {
            const books = snapshot.val();

            const result = Object.keys(books).map(key => {
                let newObj = books[key];
                newObj.referenceId = key;
                return newObj;
            }).filter(book => book.pending);

            callback(result);
        })
        .catch(err => callback(err));
}

export function acceptSolicitation(bookId, callback) {
    const db = getDatabase(app);
    const bookRef = ref(db, `livros_list/${bookId}`);

    update(bookRef, {
        pending: false
    })
    .then(() => callback({ success: true }))
    .catch(err => callback(err));
}

export function rejectSolicitation(bookId, callback) {
    const db = getDatabase(app);
    const bookRef = ref(db, `livros_list/${bookId}`);
    update(bookRef, {
        user: '',
        pending: false
    })
    .then(() => callback({ success: true }))
    .catch(err => callback(err));
}

export function resetBookStatus(bookId, callback) {
    const db = getDatabase(app);
    const bookRef = ref(db, `livros_list/${bookId}`);
    update(bookRef, {
        user: '',
        pending: false
    })
    .then(() => callback({ success: true }))
    .catch(err => callback(err));
}
