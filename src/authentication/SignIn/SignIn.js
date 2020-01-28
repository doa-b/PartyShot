import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import { SignUpLink } from '../SignUp/SignUp';
import {PasswordForgetLink} from '..';
import { withFirebase} from '../../components/Firebase';
import * as ROUTES from '../../shared/routes';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    errorMessage: {
        fontWeight: 'bold',
        color: 'red'
    }
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <form onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name='email'
                                    id='email'
                                    value={email}
                                    onChange={this.onChange}
                                    type='text'
                                    label='Email Address'
                                    variant='outlined'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='password'
                                    id='password'
                                    value={password}
                                    onChange={this.onChange}
                                    type='password'
                                    label='Your password'
                                    variant='outlined'
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={isInvalid}
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        {error && <p className={classes.error}>{error.messageMessage}</p>}
                    </form>
                    <PasswordForgetLink/>
                    <SignUpLink/>
                </div>
            </Container>
        );
    }
}

export default compose(
    withStyles(styles),
    withRouter,
    withFirebase,
)(SignInPage);