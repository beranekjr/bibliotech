export const parseBooksList = (books, filter) => {
    let result = Object.keys(books).map(key => {
        let newObj = books[key];
        newObj.referenceId = key;
        return newObj;
    });

    if (filter) {
        result = result.filter(filter);
    }

    return result;
}
