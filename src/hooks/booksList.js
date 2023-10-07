import {
    set,
    get,
    ref,
    push,
    query,
    orderByChild,
    startAfter,
    limitToFirst,
    equalTo
 } from "firebase/database";
import app from '../../firebase.config';

export function createBook(localId, name, rentTime, description) {
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
      });
}

export function listBooks(startAt) {
    const db = getDatabase(app);
    const pageSize = 2;
    const booksRef = ref(db, 'livros_list');

    let q = query(booksRef, orderByChild('creationDate'))

    if (startAt) {
        q = query(booksRef, orderByChild('creationDate'), startAfter(startAt), limitToFirst(pageSize))
    }

    get(q)
        .then(snapshot => console.log(snapshot.val()))
        .catch(err => console.log(err))

}

export function getBooksByOwner(owner) {
    const db = getDatabase(app);
    const booksRef = ref(db, 'livros_list');
    let q = query(booksRef, orderByChild('owner', equalTo(owner)))

    get(q)
        .then(snapshot => console.log(snapshot.val()))
        .catch(err => console.log(err))
}