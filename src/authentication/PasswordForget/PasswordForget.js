import React, {Component} from 'react';
import {compose} from 'redux';
import {TextField, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {withFirebase} from '../../components/Firebase';
import * as ROUTES from '../../shared/routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    page: {
        marginTop: theme.spacing(4)
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

const PasswordForget = withStyles(styles)( ({classes}) => {
        return (
            <div className={classes.page}>
               <PasswordForgetForm/>
            </div>
        )
});



const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;
        this.props.firebase
            .doPasswordReset(email)
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
        const {email, error} = this.state;
        const isInvalid = email === '';
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <form onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    name='email'
                                    id='email'
                                    value={email}
                                    label='Email Address'
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Button
                                disabled={isInvalid}
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            > reset my password
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

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForget

const PasswordForgetForm = compose(
    withFirebase,
    withStyles(styles)
) (PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };





