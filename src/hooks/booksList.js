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

export function createBook(localId, name, rentTime, description, callback) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    const newBooksRef = push(booksRef);

    set(newBooksRef, {
        owner: localId,
        name: name,
        rentTime: rentTime,
        description: description,
        user: '', //quem pegou emprestado
        pending: false,
        creationDate: new Date().toISOString(),
        images: ''
    })
    .then(() => callback({ success: true }))
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