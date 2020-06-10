import React, {Component} from 'react';
import {createUniquePartyCode, generatePassword, updateObject} from "../../../../shared/utility";
import {compose} from "redux";
import { registerNewUser } from '../../../../shared/axios'
import * as ROUTES from '../../../../shared/routes'
import {DateTimePicker} from "@material-ui/pickers";
import moment from "moment";
import 'moment/locale/nl';
import {withFirebase} from "../../../../components/Firebase";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (min-width:600px)': {
            marginTop: theme.spacing(8)
        }
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    errorMessage: {
        marginLeft: theme.spacing(1),
        color: 'red'
    },
    spacer: {

        height: '2em'
    },
    dateTimePicker: {}
});

const initialState = {
    name: '',
    email: '',
    password: generatePassword(8),

    partyCode: '',
    //epoch
    start: moment(),
    finish: 0,
    blocked: 0,

    newRequests: 0,
    event: '',

    userUid: ''
};

/**
 * Created by Doa on 1-2-2020.
 */
class PartyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.fetch = null;
        this.code = null;
    }

    componentDidMount() {
        if (!!this.props.match.params.id) {
            this.props.firebase.party(this.props.match.params.id).once('value')
                .then((snapshot) => {
                    let partyData = snapshot.val();

                 if (partyData) {
                     console.log(partyData);
                     this.props.firebase.user(partyData.userUid).once('value')
                         .then((user) => {
                             console.log(user.val());
                             const userData = user.val();
                             partyData = updateObject(partyData, {
                                 password: userData.password,
                                 email: userData.email
                             });
                             console.log('the partyData is:')
                             console.log(partyData);
                             this.setState(partyData);
                         });
                 }
                })
        } else {
            // fetch all parties, & pass it to generateUniquePartyCode, then set to 0
            createUniquePartyCode(this.props.firebase)
                .then((result) => {
                    console.log(result);
                    this.setState({partyCode: result})
                })
        }
    }

    componentWillUnmount() {
        this.fetch=null;
        this.code=null;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            userName, email, password, partyCode, start, finish, blocked,
            event, name, userUid
        } = this.state;
        const { firebase } = this.props;

        const data = {
            name: name,
            partyCode: partyCode,
            //epoch
            start: start.valueOf(),
            finish: finish.valueOf() || start.valueOf() + 43200000, // default to 12 hours later
            blocked: blocked.valueOf() || start.valueOf() + 604800000, // default to 1 week later,
            event: event,
        };
        if (!!this.props.match.params.id)
         // update
            {
            firebase.party(partyCode).update(data)
                .then((response) => {
                    this.completeSave()
                })
                .catch((error) => {
                    this.setState({error: error})
                })
        } else {
            registerNewUser(firebase, name, email, password, partyCode)
                .then((userId) => {
                    console.log(userId);
                    // create new record
                    data.userUid = userId;
                    this.props.firebase.party(partyCode).set(data)
                            .then((response) => {
                                this.completeSave()
                            })
                            .catch((error) => {
                                this.setState({error: error})
                            })
                    }
                )
        }

    };
    completeSave = () => {
        // save partyCode to user
        this.props.history.push(ROUTES.PARTIES)


    };

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    };

    dateTimeChangedHandler = (date, target) => {
        this.setState({[target]: date})
    };

    startDateTimeChangedHandler = (date, target) => {
        let finish = moment(date).add(12, 'hours');
        let blocked = moment(date).add(1, 'weeks')

        this.setState({
            start: date,
            finish: finish,
            blocked: blocked
        })

    };


    render() {
        const {classes} = this.props;
        const buttonLabel = (!!this.props.match.params.id) ? 'update' : 'opslaan'
        const {
            email, password, partyCode, start, finish, blocked,
            event, name, userUid, error
        } = this.state

        return (
            <Container component='main' maxWidth='xs'>
                <form className={classes.form} onSubmit={this.onSubmit}>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={name}
                                    id='name'
                                    label='naam'
                                    variant='outlined'
                                    fullWidth
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='email'
                                    required
                                    value={email}
                                    id='email'
                                    label='email'
                                    variant='outlined'
                                    fullWidth
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={password}
                                    id='password'
                                    label='wachtwoord'
                                    variant='outlined'
                                    disabled
                                    fullWidth
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.spacer}></div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={partyCode}
                                    id='partyCode'
                                    label='partyCode'
                                    variant='outlined'
                                    disabled
                                    fullWidth
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={event}
                                    id='event'
                                    label='event'
                                    variant='outlined'
                                    fullWidth
                                    onChange={(event) => this.handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <DateTimePicker
                                    fullWidth
                                    id='start'
                                    required
                                    className={classes.dateTimePicker}
                                    inputVariant="outlined"
                                    value={start}
                                    format={'LLLL'}
                                    disablePast
                                    onChange={this.startDateTimeChangedHandler}
                                    label='datum en startTijd'
                                    showTodayButton
                                    allowKeyboardControl
                                    ampm={false}
                                    animateYearScrolling
                                />
                            </Grid>
                            {(finish) ?
                                <Grid item xs={12} sm={12} md={12}>
                                    <DateTimePicker
                                        fullWidth
                                        id='finish'
                                        required
                                        className={classes.dateTimePicker}
                                        inputVariant="outlined"
                                        value={finish}
                                        format={'LLLL'}
                                        disablePast
                                        onChange={(date) => this.dateTimeChangedHandler(date, 'finish')}
                                        label='Eindtijd'
                                        // helperText="geen foto's en/of verzoekjes meer"
                                        showTodayButton
                                        allowKeyboardControl
                                        ampm={false}
                                        animateYearScrolling/>
                                </Grid> : null}
                            {(finish) ?
                                <Grid item xs={12} sm={12} md={12}>
                                    <DateTimePicker
                                        fullWidth
                                        id='blocked'
                                        required
                                        className={classes.dateTimePicker}
                                        inputVariant="outlined"
                                        value={blocked}
                                        format={'LLLL'}
                                        disablePast
                                        onChange={(date) => this.dateTimeChangedHandler(date, 'blocked')}
                                        label='Geblokkeerd'
                                        // helperText="moment waarop foto's niet meer zichtbaar zijn"
                                        showTodayButton
                                        allowKeyboardControl
                                        ampm={false}
                                        animateYearScrolling/>
                                </Grid> : null}
                            <Grid item xs={12}>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                >
                                    {buttonLabel}
                                </Button>
                                {error && <p className={classes.errorMessage}>{error.message}</p>}
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </Container>
        );

    }
}

export default compose(
    withStyles(styles),
    withFirebase
)(PartyDetails)
