const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const { createScream, getAllScreams } = require("./handlers/screams");
const {
    addUserDetails,
    getUserDetails,
    login,
    signup,
    uploadImage,
} = require("./handlers/users");

// Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, createScream);

// Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getUserDetails);

exports.api = functions.region("asia-south1").https.onRequest(app);
