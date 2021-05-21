const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const {
    createComment,
    createScream,
    deleteScream,
    getAllScreams,
    getScream,
    likeScream,
    unlikeScream,
} = require("./handlers/screams");

const {
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    login,
    markNotificationsRead,
    signup,
    uploadImage,
} = require("./handlers/users");

// Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, createScream);
app.get("/scream/:screamId", getScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, createComment);

// Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.region("asia-south1").https.onRequest(app);

/**
 * Create Notifications
 * Notification on like a scream
 */
exports.createNotificationOnLike = functions
    .region("asia-south1")
    .firestore.document("likes/{id}")
    .onCreate(async (snapshot) => {
        return await db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (
                    doc.exists &&
                    doc.data().userHandle !== snapshot.data().userHandle
                ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: "like",
                        read: false,
                        screamId: doc.id,
                    });
                }
            })
            .catch((err) => console.error(err));
    });

/**
 * Notification on unlike a scream
 */
exports.deleteNotificationOnUnLike = functions
    .region("asia-south1")
    .firestore.document("likes/{id}")
    .onDelete(async (snapshot) => {
        try {
            return db.doc(`/notifications/${snapshot.id}`).delete();
        } catch (err) {
            console.error(err);
            return;
        }
    });

/**
 * Notification on comment a scream
 */
exports.createNotificationOnComment = functions
    .region("asia-south1")
    .firestore.document("comments/{id}")
    .onCreate(async (snapshot) => {
        return await db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (
                    doc.exists &&
                    doc.data().userHandle !== snapshot.data().userHandle
                ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: "comment",
                        read: false,
                        screamId: doc.id,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                return;
            });
    });

/**
 * Notification on change image
 */
exports.onUserImageChange = functions
    .region("asia-south1")
    .firestore.document("/users/{userId}")
    .onUpdate((change) => {
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            const batch = db.batch();
            return db
                .collection("screams")
                .where("userHandle", "==", change.before.data().handle)
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        const scream = db.doc(`/screams/${doc.id}`);
                        batch.update(scream, {
                            userImage: change.after.data().imageUrl,
                        });
                    });
                    return batch.commit();
                });
        } else return true;
    });

/**
 * Notification on delete a scream
 */
exports.onScreamDelete = functions
    .region("asia-south1")
    .firestore.document("/screams/{screamId}")
    .onDelete(async (_, context) => {
        const screamId = context.params.screamId;
        const batch = db.batch();
        try {
            const comments = await db
                .collection("comments")
                .where("screamId", "==", screamId)
                .get();
            comments.forEach((comment) => {
                batch.delete(db.doc(`/comments/${comment.id}`));
            });
            const likes = await db
                .collection("likes")
                .where("screamId", "==", screamId)
                .get();
            likes.forEach((like) => {
                batch.delete(db.doc(`/likes/${like.id}`));
            });
            const notifications = await db
                .collection("notifications")
                .where("screamId", "==", screamId)
                .get();
            notifications.forEach((notification) => {
                batch.delete(db.doc(`/notifications/${notification.id}`));
            });
            return await batch.commit();
        } catch (err) {
            return console.error(err);
        }
    });
