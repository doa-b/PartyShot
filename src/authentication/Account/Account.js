import React from 'react';
import {withAuthorization, AuthUserContext} from '../../components/Session';
import {compose} from 'redux';
import {PasswordForgetForm} from '..';
import {PasswordChange} from '..';
import UserInfo from '../../forms/UserInfo';

import {withFirebase} from '../../components/Firebase';
import withStyles from '@material-ui/core/styles/withStyles';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Uppload from '../../components/FileUpload/ImageUppload';
import {updateObject} from '../../shared/utility';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    errorMessage: {
        marginLeft: theme.spacing(1),
        color: 'red'
    },
    panel: {
        width: 'parent'
    }
});

const AccountPage = ({classes, ...props}) => (
    <AuthUserContext.Consumer>
        {authUser => {
            const onSubmit = (userData) => {
                // reset imageUrl. Form overwrites it
                userData = updateObject(userData, {imageUrl: authUser.imageUrl});
                props.firebase
                    .user(authUser.uid)
                    .update(userData)
            };

            let userData = {...authUser};
            delete userData.uid;
            return (
                <>
                    <Uppload
                        imageUrl={authUser.imageUrl}
                        saveUrl={`users/${authUser.uid}/imageUrl`}
                        fileName = {`${authUser.uid}_avatar`}
                    />
                    <UserInfo
                        handleSubmit={(userData) => onSubmit(userData)}
                        userData={userData}

                    />
                    <div className={classes.paper}>
                        <ExpansionPanel className={classes.panel}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                id='panel1'
                            >
                                <Typography variant='subtitle1'>
                                    I forgot my password
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <PasswordForgetForm/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel className={classes.panel}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                id='panel2'
                            >
                                <Typography variant='subtitle1'>
                                    I want to change my password
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <PasswordChange/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </>

            )
        }}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
    withStyles(styles),
    withFirebase,
    withAuthorization(condition))(AccountPage);
