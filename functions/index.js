const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
require("dotenv").config();

admin.initializeApp();

const firebase = require("firebase");
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(config);

app.get("/screams", (req, res) => {
    admin
        .firestore()
        .collection("screams")
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                });
            });

            return res.json(screams);
        })
        .catch((err) => {
            console.error(err);
        });
});

app.post("/scream", (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString(),
    };

    admin
        .firestore()
        .collection("screams")
        .add(newScream)
        .then((doc) => {
            res.json({
                message: `document ${doc.id} created successfully`,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
});

exports.api = functions.region("asia-south1").https.onRequest(app);
