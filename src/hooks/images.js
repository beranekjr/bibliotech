import {
   getStorage,
   ref,
   uploadBytes,
   list,
   getDownloadURL,
   deleteObject,
   listAll
} from 'firebase/storage';

import app from '../../firebase.config';
import initializeStorage from '../database/storage';

let storage = initializeStorage(app);

/**
 * @param {array} images array de imagens a serem feitas o upload
 * @param {string} uid uid do livro
 * @returns
 */
export function uploadImagesHook(images, uid) {
    return images.map(async (imageUri) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const filePath = `${uid}/image_${Date.now()}.jpg`;
        const imageRef = ref(storage, `images/${filePath}`);

        const imageUploadResult = await uploadBytes(imageRef, blob);

        return imageUploadResult;
    });
}

/**
 * @param {Object} book um objeto contendo uid do livro e das imagens
 * @returns
 */
export async function getImageFromUrl(book) {
    if (!book || !book.uid) {
        return '';
    }

    const uuid = '/images/' + book.uid;

    const imagesRef = ref(storage, uuid);
    const images = await list(imagesRef, {  maxResults: 1 });

    if (images.items.length > 0) {
        return getDownloadURL(images.items[0]);
    }

    return '';
}

export async function getAllBookImages(book, callback) {
    if (!book || !book.uid) {
        callback([]);
    }

    const uuid = '/images/' + book.uid;

    const imagesRef = ref(storage, uuid);
    const images = await list(imagesRef);

    if (images.items.length > 0) {
        const downloadURLs = await Promise.all(images.items.map(img => getDownloadURL(img)));

        callback(downloadURLs);
    }
}

/**
 * Remove todas as imagens do especificado livro
 * @param {string} uid uid do livro contendo as imagens
 */
export async function removeImages(uid) {
    const uuid = '/images/' + uid;

    const imagesRef = ref(storage, uuid);
    const images = await listAll(imagesRef);

    images.items.forEach(image => deleteObject(image));
}
