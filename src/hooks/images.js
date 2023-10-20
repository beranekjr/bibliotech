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

let storage = null;

/**
 * @param {array} images array de imagens a serem feitas o upload
 * @param {string} uid uid do livro
 * @returns
 */
export function uploadImagesHook(images, uid) {
    const storage = getStorage(app);

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
    if (!storage) {
        storage = getStorage(app);
    }

    const imagesRef = ref(storage, uuid);
    const images = await list(imagesRef, {  maxResults: 1 });

    if (images.items.length > 0) {
        return getDownloadURL(images.items[0]);
    }

    return '';
}

/**
 * Remove todas as imagens do especificado livro
 * @param {string} uid uid do livro contendo as imagens
 */
export async function removeImages(uid) {
    const uuid = '/images/' + uid;
    if (!storage) {
        storage = getStorage(app);
    }

    const imagesRef = ref(storage, uuid);
    const images = await listAll(imagesRef);

    images.items.forEach(image => deleteObject(image));
}
