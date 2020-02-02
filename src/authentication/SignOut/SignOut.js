import React from 'react';
import { withFirebase } from '../../components/Firebase';
import { clearLocalStorage } from '../../shared/localStorage'

const SignOutPage = ( { firebase } ) => {

    firebase.doSignOut();
    clearLocalStorage();

    return (
        <>
            <h3>You have succesfully signed out</h3>
        </>
    )};

export default withFirebase(SignOutPage)