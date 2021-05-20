const { admin, db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
require("firebase/auth");

const {
    reducerUserDetails,
    validateLoginData,
    validateSignupData,
} = require("../util/validators");

/**
 * Initializing firebase app
 */
firebase.initializeApp(config);

/**
 * Signup function
 */
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const { errors, valid } = validateSignupData(newUser);
    if (!valid) return res.status(400).json(errors);

    const noImg = "no-img.png";

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
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${noImg}?alt=media`,
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
};

/**
 * Login function
 */
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const { errors, valid } = validateLoginData(user);
    if (!valid) return res.status(400).json(errors);

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
};

/**
 * Add user details function
 */
exports.addUserDetails = (req, res) => {
    let userDetails = reducerUserDetails(req.body);

    db.doc(`/users/${req.user.handle}`)
        .update(userDetails)
        .then(() => {
            return res.json({ message: "Details added successfully" });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: error.code });
        });
};

/**
 * Get user details function
 */
exports.getUserDetails = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.user = doc.data();
                return db
                    .collection("screams")
                    .where("userHandle", "==", req.user.handle)
                    .orderBy("createdAt", "desc")
                    .get();
            } else {
                return res.status(404).json({ error: "User not found" });
            }
        })
        .then((data) => {
            userData.screams = [];
            data.forEach((doc) => {
                userData.screams.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    screamId: doc.id,
                });
            });
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

/**
 * Upload a profile image for user function
 */
exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");

    const busboy = new BusBoy({
        headers: req.headers,
    });

    let imageFileName;
    let imageToBeUploaded = {};
    busboy.on("file", (fieldName, file, fileName, encoding, mimeType) => {
        if (mimeType !== "image/jpeg" && mimeType !== "image/png") {
            return res.status(400).json({ error: "Wrong file type submitted" });
        }

        const imageExtension = fileName.split(".").pop();
        imageFileName = `${Math.round(
            Math.random() * 10000000000
        )}.${imageExtension}`;
        const filePath = path.join(os.tmpdir(), imageFileName);

        imageToBeUploaded = {
            filePath,
            mimeType,
        };
        file.pipe(fs.createWriteStream(filePath));
    });
    busboy.on("finish", () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filePath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimeType,
                    },
                },
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
            })
            .then(() => {
                return res.json({ message: "Image uploaded successfully" });
            })
            .catch((error) => {
                console.error(error);
                return res.status(500).json({ error: error.code });
            });
    });
    busboy.end(req.rawBody);
};
