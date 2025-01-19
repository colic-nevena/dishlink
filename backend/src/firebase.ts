import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("../firebase-service-account-key.json")),
    });
}

export default admin;