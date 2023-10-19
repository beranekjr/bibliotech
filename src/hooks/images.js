import {
   getStorage,
   ref,
   uploadBytes,
   list,
   getDownloadURL
} from 'firebase/storage';

import app from '../../firebase.config';

let storage = null;

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
