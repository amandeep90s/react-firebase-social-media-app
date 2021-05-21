const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const {
    createComment,
    createScream,
    getAllScreams,
    getScream,
} = require("./handlers/screams");

const {
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    login,
    signup,
    uploadImage,
} = require("./handlers/users");

// Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, createScream);
app.get("/scream/:screamId", getScream);
// TODO delete a scream
// TODO like a scream
// TODO unlike a scream
app.post("/scream/:screamId/comment", FBAuth, createComment);

// Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);

exports.api = functions.region("asia-south1").https.onRequest(app);
