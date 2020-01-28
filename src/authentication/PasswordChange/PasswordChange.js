import React, {Component} from 'react';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import {withFirebase} from '../../components/Firebase';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    errorMessage: {
        marginLeft: theme.spacing(1),
        color: 'red'
    }
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {passwordOne} = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({...INITIAL_STATE});
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
        const {passwordOne, passwordTwo, error} = this.state;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <form onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    name='passwordOne'
                                    id='passwordOne'
                                    value={passwordOne}
                                    label='New Password'
                                    onChange={this.onChange}
                                    type='password'

                                />


                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    name='passwordTwo'
                                    id='passwordTwo'
                                    value={passwordTwo}
                                    label='Confirm password'
                                    onChange={this.onChange}
                                    type='password'
                                />
                            </Grid>
                            <Button
                                disabled={isInvalid}
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                Change my Password
                            </Button>
                            {error && <p className={classes.errorMessage}>
                                {error.message}
                            </p>}
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default compose(
    withFirebase,
    withStyles(styles))
(PasswordChangeForm);