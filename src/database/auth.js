import { getAuth } from "firebase/auth";

let auth = null;

export default function initializeAuth(app) {
    if (!auth) {
        auth = getAuth(app);
    }

    return auth;
}