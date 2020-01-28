import React, {useState} from 'react';
import {Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../shared/routes';
import {withFirebase} from '../../components/Firebase'
import {compose} from 'redux';
import UserInfo from '../../forms/UserInfo';

const SignUpPage = (props) => {
    const [error, setError] = useState(null);

    const onSubmit = (userData) => {
        props.firebase
            .doCreateUserWithEmailAndPassword(userData.email, userData.password)
            .then(authUser => {
                // remove password
                delete userData.password;
                delete userData.passwordConfirmation;
                // Create a user in firebase realtime database
                return props.firebase
                    .user(authUser.user.uid)
                    .set(userData);
            })
            .then(() => {
                props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                setError(error)
            });
    };
    return (
        <div>
            <UserInfo
                handleSubmit={(values) => {onSubmit(values)}}
                buttonLabel='Sign Up'/>
                {error && <p>{error.message}</p>}
        </div>
    );
};

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

// wrap our signup form with Firebase HOC
export default compose(
    withRouter,
    withFirebase,
)(SignUpPage);



