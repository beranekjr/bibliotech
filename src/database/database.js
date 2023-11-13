import { getDatabase } from "firebase/database";

let db = null;

export default function initializeDatabase(app) {
    if (!db) {
        db = getDatabase(app);
    }

    return db;
}
