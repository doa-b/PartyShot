import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {PasswordForgetForm} from "../PasswordForget/PasswordForget";
import PasswordChangeForm from "../PasswordChange/PasswordChange";
import {AuthUserContext, withAuthorization} from '../Session';

const styles = theme => ({
    root: {},
});
/**
 * Created by Doa on 27-1-2020.
 */
const Account = withStyles(styles)(
    ({classes}) => {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <>
                        <h1>Account: {authUser.email} </h1>
                       <PasswordForgetForm/>
                       <PasswordChangeForm/>
                        </>
                        )}

            </AuthUserContext.Consumer>);
    });

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);