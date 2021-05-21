const { db } = require("../util/admin");
require("firebase/firestore");

/**
 * Get all screams function
 */
exports.getAllScreams = (req, res) => {
    db.collection("screams")
        .orderBy("createdAt", "desc")
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
};

/**
 * Create a scream function
 */
exports.createScream = (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
    };

    db.collection("screams")
        .add(newScream)
        .then((doc) => {
            const resScream = newScream;
            resScream.screamId = doc.id;
            res.json(resScream);
        })
        .catch((err) => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
};

/**
 * Get a scream function
 */
exports.getScream = (req, res) => {
    let screamData = {};
    db.doc(`/screams/${req.params.screamId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Scream not found" });
            }
            screamData = doc.data();
            screamData.screamId = doc.id;
            return db
                .collection("comments")
                .orderBy("createdAt", "desc")
                .where("screamId", "==", req.params.screamId)
                .get();
        })
        .then((data) => {
            screamData.comments = [];
            data.forEach((doc) => {
                screamData.comments.push(doc.data());
            });
            return res.json(screamData);
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: error.code });
        });
};

/**
 * Create a comment on scream function
 */
exports.createComment = (req, res) => {
    if (req.body.body.trim() === "")
        return res.status(400).json({ error: "Must not be empty" });

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        screamId: req.params.screamId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
    };

    db.doc(`/screams/${req.params.screamId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Scream not found" });
            }
            return doc.ref.update({
                commentCount: doc.data().commentCount + 1,
            });
        })
        .then(() => {
            return db.collection("comments").add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

/**
 * Delete a scream function
 */
exports.deleteScream = (req, res) => {
    const document = db.doc(`/screams/${req.params.screamId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Scream not found" });
            }

            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({ error: "Unauthorized" });
            } else {
                return document.delete();
            }
        })
        .then(async () => {
            let screamComments = await db
                .collection("comments")
                .where("screamId", "==", req.params.screamId)
                .get();

            return screamComments.then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        })
        .then(async () => {
            let screamLikes = await db
                .collection("likes")
                .where("screamId", "==", req.params.screamId)
                .get();

            return screamLikes.then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        })
        .then(() => {
            return res.json({ message: "Scream deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: error.code });
        });
};

/**
 * Like scream function
 */
exports.likeScream = (req, res) => {
    //
};

/**
 * Unlike a scream
 */
exports.unlikeScream = (req, res) => {
    //
};
