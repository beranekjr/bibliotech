import {
   getStorage,
   ref,
   uploadBytes,
   getDownloadURL,

} from 'firebase/storage';

import app from '../../firebase.config';

export function uploadImagesHook(images) {
    const storage = getStorage(app);

    return images.map(async (imageUri) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const fileName = `image_${Date.now()}.jpg`;
        const imageRef = ref(storage, `images/${fileName}`);

        const imageUploadResult = await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageUploadResult.ref);

        return downloadURL;
    });
}

export async function getImageFromUrl(url) {
    if (!url) {
        return;
    }

    const storage = getStorage(app);

    const image = await ref(storage, url);
    console.log(image);
    return image;
}
