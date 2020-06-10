const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

//const gcs = require('@google-cloud/storage');

admin.initializeApp();

exports.addMessage = functions.https.onCall((data, context) => {
    // Message text passed from the client.
    const text = data.text;
// Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;

    // Saving the new message to the Realtime Database.
    const sanitizedMessage = sanitizer.sanitizeText(text); // Sanitize the message.
    return admin.database().ref('/messages').push({
        text: sanitizedMessage,
        author: { uid, name, picture, email },
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return { text: sanitizedMessage };
    })
});



exports.deleteUser2 = functions.firestore
    .document('users/{userID}')
    .onDelete((snap, context) => {
        return admin.auth().deleteUser(snap.id)
            .then(() => console.log('Deleted user with ID:' + snap.id))
            .catch((error) => console.error('There was an error while deleting user:', error));
    });
//
// exports.deleteUser = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const userId = req.query.text;
//     admin.auth().deleteUser(userId);
// });



// const bucket = admin.storage().bucket();

// // exports.deleteStorage
//
// exports.deleteFiles = functions.https.onRequest(async (req, res) => {
//     const folderId = req.query.folderId;
//
//     return bucket.deleteFiles({
//         prefix: `photos/${folderId}/`
//     }, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(`All the Firebase Storage files in users/${userId}/ have been deleted`);
//         }
//     });
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     const snapshot = await admin.database().ref('/messages').push({original: original});
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref.toString());
// });
// call it with:
// https://us-central1-partyshot.cloudfunctions.net/addMessage?text=blablablablabla


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
