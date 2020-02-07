import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
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

const partiesPage = asyncComponent(() => {
    return import ('./pages/Admin/Parties/Parties')
});

const partyDetailsPage = asyncComponent(() => {
    return import ('./pages/Admin/Parties/PartyDetails/PartyDetails')
});

const galleryPage = asyncComponent(() => {
    return import ('./pages/Gallery/Gallery')
});

const monitorPage = asyncComponent(() => {
    return import ('./pages/Admin/Monitor/Monitor')
});


const requestsPage = asyncComponent(() => {
    return import ('./pages/Admin/Requests/Requests')
});

const startPage = asyncComponent(() => {
    return import ('./pages/Start/Start')
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
        <Route exact path={ROUTES.PARTIES} component={partiesPage} />
        <Route path={ROUTES.PARTY_DETAILS + '/:id'} component={partyDetailsPage}/>
        <Route path={ROUTES.PARTY_DETAILS} component={partyDetailsPage}/>
        <Route exact path={ROUTES.REQUESTS} component={requestsPage}/>
        <Route exact path={ROUTES.MONITOR} component={monitorPage}/>
        <Route exact path={ROUTES.PRIVACY_POLICY} component={privacyPolicyPage} />
        <Route path={ROUTES.START + '/:partyCode'} component={startPage} />
        <Route exact path={ROUTES.NAME} component={namePage} />
        <Route  path={ROUTES.PARTY_CODE  + '/:partyCode'} component={partyCodePage}/>
        <Route  path={ROUTES.PARTY_CODE} component={partyCodePage}/>


        <Route exact path={ROUTES.GALLERY} component={galleryPage}/>
    </Switch>
);

const App = (props) => {
    return (
        <Router>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <Layout variant='temporary'>
                {routes}
            </Layout>
            </MuiPickersUtilsProvider>
        </Router>
    );
};

export default withAuthentication(App);