import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/functions'
import {extension} from 'mime-types'
import {createUUID, getCurrentUTCinMs} from "../../shared/utility";
import * as local from '../../shared/localStorage'

import {firebaseConfig} from '../../kluisje';


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
        this.function = app.functions();
    }

    // ** Cloud functions API **

 // addMessage = this.function.httpsCallable('addMessage');

   // callAddMessage = (message) => {
   //     this.addMessage({text: message}).then(function(result) {
   //         // Read result of the Cloud Function.
   //         var sanitizedMessage = result.data.text;
   //     }).catch(function(error) {
   //         // Getting the Error details.
   //         var code = error.code;
   //         var message = error.message;
   //         var details = error.details;
   //         // ...
   //     });
   // }


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
                        // set local storage
                        console.log('setting local storage');
                        local.setName(dbUser.firstName);
                        local.setPartyCode(dbUser.partyCode);
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    // *** Parties API ***
    party = partyCode => this.db.ref(`parties/${partyCode}`);
    parties = () => this.db.ref(`parties`);

    // *** requests API ***

    requestList = (partyCode) => this.db.ref(`requests/${partyCode}`);
    requests = () => this.db.ref(`requests`);

    sendRequest = (partyCode, request, name, showResult) => {
        this.requestList(partyCode).push().set(
            {name: name, request: request, time: getCurrentUTCinMs()}
        ).then(() => showResult('je verzoekje is ingediend!'))
            .catch((error) => showResult(error.message))
    };

    // *** photoList API ***
    photoList = (partyCode) => this.db.ref(`photos/${partyCode}`);
    photos = () => this.db.ref(`photos`);

    // *** Storage API ***
    image = image => this.storage.ref(`images/${image.name}`);

    images = () => this.storage.ref(`images`);

    photo = (fileName, partyCode) => this.storage.ref(`photos/${partyCode}/${fileName}`);

    deleteFolderContents(path) {
        const ref = this.storage.ref(path);
        ref.listAll()
            .then(dir => {
                dir.items.forEach(fileRef => {
                    this.deleteFile(ref.fullPath, fileRef.name);
                });
                dir.prefixes.forEach(folderRef => {
                    this.deleteFolderContents(folderRef.fullPath);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteFile(pathToFile, fileName) {
        const ref = this.storage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete()
    }


    deletePhoto = (fileName, partyCode) => {
      this.photo(fileName, partyCode).delete()
          .then(() => {
              this.photoList(partyCode).child(fileName).remove();
          })
    };

    photoUploader = (photoFile, partyCode, isPortrait, comment, uploader, showResult) => {
        const fileName = createUUID();
        this.photo(fileName, partyCode).put(photoFile)
            .then((snapshot) => {
                snapshot.ref
                    .getDownloadURL().then(
                    (url) => {
                        const photoData = {
                            lastShown: getCurrentUTCinMs() - 18000000, // 5 hours earlier
                            uploader: uploader,
                            comment: comment,
                            url: url,
                            isPortrait: isPortrait
                        };
                        this.photoList(partyCode).update({[fileName]: photoData});
                    }
                );
                showResult('je foto is verstuurd!')
            })


            .catch((error) => showResult(error.message));
    };

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