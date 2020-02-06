import React from 'react';
import {compose} from "redux";
import {withAuthorization, AuthUserContext} from '../Session';


import {withFirebase} from '../../components/Firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import {updateObject} from '../../shared/utility';
import Button from "@material-ui/core/Button";
import {FormControlLabel} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {getPartyCode} from "../../shared/localStorage";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    change: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
});

const ChangeEvent = ({classes, ...props}) => {
    const [currentParty, setCurrentParty] = React.useState(getPartyCode());
    return <AuthUserContext.Consumer>
        {authUser => {
            const onSubmit = event => {
                setCurrentParty(event.target.value);
                props.firebase
                    .user(authUser.uid)
                    .update({partyCode: event.target.value});
                //TODO pass this eventdata to store!!!!!!
                console.log(props.parties.filter((party) => (party.id === event.target.value))[0]);
                props.updateStore(props.parties.filter((party) => (party.id === event.target.value))[0])
            };


            let userData = {...authUser};
            delete userData.uid;
            return (
                    <TextField className={classes.change}
                        fullWidth
                        id='currentParty'
                        select
                        label='huidig event'
                        value={currentParty}
                        onChange={(event) => onSubmit(event)}
                    >
                        {props.parties.map((party) => (
                            <MenuItem key={party.id} value={party.id}>
                                {party.id + ' - ' + party.event + ' ' + party.name}
                            </MenuItem>))}
                    </TextField>


            )
        }}
    </AuthUserContext.Consumer>
};

const condition = authUser => !!authUser;

export default compose(
    withStyles(styles),
    withAuthorization(condition))(ChangeEvent);