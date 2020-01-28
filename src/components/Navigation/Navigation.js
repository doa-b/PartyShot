import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../shared/routes'
import { AuthUserContext } from '../Session'
import * as ACCESS_LEVEL from '../../shared/accessLevel'

const Navigation = ( { authUser }) => (
    <div>
        <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
        </div>

);

const NavigationAuth = ({ authUser }) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
            {(authUser.accessLevel>=60) ? (
                <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
                </li>
            ) : null}

    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

export default Navigation;