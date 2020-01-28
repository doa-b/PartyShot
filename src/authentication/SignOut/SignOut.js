import React from 'react';
import { withFirebase} from '../../components/Firebase';

const SignOutPage = ( { firebase } ) => {

    firebase.doSignOut();

    return (
        <>
            <h3>You have succesfully signed out</h3>
        </>
    )};

export default withFirebase(SignOutPage)