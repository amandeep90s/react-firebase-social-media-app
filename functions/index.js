const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const firebase = require("firebase");
require("firebase/auth");
require("dotenv").config();

admin.initializeApp();

const db = admin.firestore();

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
    db.collection("screams")
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

    db.collection("screams")
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

const isEmpty = (string) => (string.trim() === "" ? true : false);

const isEmail = (email) => {
    const regEx =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return email.match(regEx) ? true : false;
};

// Signup Route
app.post("/signup", (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    // Validation
    let errors = {};

    if (isEmpty(newUser.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(newUser.email)) {
        errors.email = "Must be a valid email address";
    }

    if (isEmpty(newUser.password)) errors.password = "Must not be empty";
    if (newUser.password !== newUser.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }
    if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    let token, userId;
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res
                    .status(400)
                    .json({ handle: "This handle is already taken" });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    );
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((tokenId) => {
            token = tokenId;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            };

            return db
                .doc(`/users/${newUser.handle}`)
                .set(userCredentials)
                .then(() => {
                    return res.status(201).json({ token });
                })
                .catch((error) => console.error(error));
        })
        .catch((error) => {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                return res
                    .status(400)
                    .json({ email: "Email is already in use" });
            } else {
                return res.status(500).json({ error: error.code });
            }
        });
});

// Login Route
app.post("/login", (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    // Validation
    let errors = {};

    if (isEmpty(user.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(user.email)) {
        errors.email = "Must be a valid email address";
    }

    if (isEmpty(user.password)) errors.password = "Must not be empty";

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return res
                .status(403)
                .json({ general: "Wrong credentials, please try again" });
        });
});

exports.api = functions.region("asia-south1").https.onRequest(app);
