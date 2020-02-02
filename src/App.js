import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from './hoc/Layout/Layout';
import * as ROUTES from './shared/routes';

import { withAuthentication } from './components/Session'

const landingPage = asyncComponent(() => {
    return import ('./pages/Landing/Landing')
});

const signUpPage = asyncComponent(() => {
    return import ('./authentication/SignUp/SignUp')
});

const signInPage = asyncComponent(() => {
    return import ('./authentication/SignIn/SignIn')
});

const signOutPage = asyncComponent(() => {
    return import ('./authentication/SignOut/SignOut')
});
const homePage = asyncComponent(() => {
    return import ('./pages/Home/Home')
});
const accountPage = asyncComponent(() => {
    return import ('./authentication/Account/Account')
});
const adminPage = asyncComponent(() => {
    return import ('./components/Admin/Admin')
});
const passwordForgetPage = asyncComponent(() => {
    return import ('./authentication')
});
const privacyPolicyPage = asyncComponent(() => {
    return import ('./pages/PrivacyPolicy/PrivacyPolicy')
});

const namePage = asyncComponent(() => {
    return import ('./pages/Name/Name')
});

const partyCodePage = asyncComponent(() => {
    return import ('./pages/PartyCode/PartyCode')
});

const partDetailsPage = asyncComponent(() => {
    return import ('./pages/PartyDetails/PartyDetails')
});
/**
 * Created by Doa on 27-1-2020.
 */

const routes = (
    <Switch>
        <Route exact path={ROUTES.LANDING} component={landingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={signUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={signInPage} />
        <Route exact path={ROUTES.SIGN_OUT} component={signOutPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={passwordForgetPage} />
        <Route exact path={ROUTES.HOME} component={homePage} />
        <Route exact path={ROUTES.ACCOUNT} component={accountPage} />
        <Route exact path={ROUTES.ADMIN} component={adminPage} />
        <Route exact path={ROUTES.PRIVACY_POLICY} component={privacyPolicyPage} />
        <Route exact path={ROUTES.NAME} component={namePage} />
        <Route exact path={ROUTES.PARTY_CODE} component={partyCodePage}/>
        <Route exact path={ROUTES.PARTY_DETAILS} component={partDetailsPage}/>
    </Switch>
);

const App = (props) => {
    return (
        <Router>
            <Layout variant='temporary'>
                {routes}
            </Layout>
        </Router>
    );
};

export default withAuthentication(App);