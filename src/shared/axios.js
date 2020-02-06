import * as ACCESSLEVEL from '../shared/accessLevel';
import {VUUR} from '../kluisje';
import axios from 'axios';

const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + VUUR;

export const registerNewUser = (firebase, name, email, password, partyCode) => {
    let userId = null;
    return new Promise(resolve => {

        const authData = {
            email: email,
            password: password
        };

        const userData = {
            name: name,
            email: email,
            password: password,
            partyCode: partyCode,
            accessLevel: ACCESSLEVEL.ORGANISER,
            imageUrl: '',
            termsAgreement: false
        };
        axios.post(signUpUrl, authData)
            .then(response => {
                    userId = response.data.localId;
                    firebase
                        .user(userId)
                        .set(userData);
                    resolve(userId)
                }
            );
    })
};

