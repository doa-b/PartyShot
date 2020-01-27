import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import * as ROUTES from './shared/routes'
import Navigation from "./components/Navigation/Navigation";
import LandingPage from './components/Landing/Landing'
import SignUpPage from './components/SignUp/SignUp'
import SignInPage from "./components/SignIn/SignIn";
import HomePage from "./components/Home/Home";
import AccountPage from "./components/Account/Account";
import AdminPage from "./components/Admin/Admin";
import PasswordForgetPage from "./components/PasswordForget/PasswordForget";

import { withAuthentication } from './components/Session'

/**
 * Created by Doa on 27-1-2020.
 */
const App = (props) => {
    return (
        <Router>
            <Navigation/>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </Router>
    );
};

export default withAuthentication(App);