import { getStorage } from "firebase/storage";

let storage = null;

export default function initializeStorage(app) {
    if (!storage) {
        storage = getStorage(app);
    }

    return storage;
}
