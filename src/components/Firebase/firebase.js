import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import {extension} from 'mime-types'

import {firebaseConfig} from '../../kluisje';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    /**
     * Merge Auth and DB User Data
     * @param next: callback function that needs to be executed when check is passed: user is authenticated
     * and returns a merged (realtime db & internal auth) user
     * @param fallback: callback function that needs to be executed when check has failed. Returns null
     * @returns {firebase.Unsubscribe}
     */
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .on('value', snapshot => {
                        const dbUser = snapshot.val();

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    // *** Storage API ***

    image = image => this.storage.ref(`images/${image.name}`);

    images = () => this.storage.ref(`images`);

    // *** Uppload uploader *** //

    firebaseUploader = (file, updateProgress, fileName, saveUrl) =>
        new Promise((resolve, reject) => {
            console.log(file);

            if (!fileName) {
                // Generate a file name based on current date and random number
                fileName = `${
                    Math.random().toString().replace('0.', '').substr(0, 7)
                }-${new Date().getTime()}`
            }

            // get the file extension from the file Type
            const fileExtension = extension(file.type);

            // append file extension to the fileName
            fileName = fileName.concat('.', fileExtension);


            // Upload the file to the storage reference. Automatically overwrites if file already exists
            const uploadTask = this.images().child(fileName).put(file);

            // Report upload progress
            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (updateProgress) updateProgress(progress);
                },
                error => {
                    console.log('Got error', error);
                    return reject(new Error('unable_to_upload'));
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(url => {
                            // when you use update(value) value MUST be an object
                            this.db.ref(saveUrl).set(url);
                            //  this.db.ref(`users/3igMGPcFl1X7h5WbFgAYRxXGjJ63/imageUrl`).set(url);
                            resolve(url)
                        }) // Return uploaded file's URL

                        .catch(() => reject(new Error('unable_to_upload')));
                }
            );
        });

}



export default Firebase