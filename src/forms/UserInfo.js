import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Formik, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import * as ROUTES from '../shared/routes';
import {MenuItem} from '@material-ui/core';
import * as ACCESSLEVEL from '../shared/accessLevel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import {Checkbox} from './Checkbox';
// Custom Checkbox compatibility issue with Material UI checkbox and Formik. The Material design checkbox does not
// handle change of values. It does not pass all fields correctly

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
    }
});

let SignupSchema = yup.object().shape({
    firstName: yup.string().required('Please enter your firstname.'),
    lastName: yup.string().required('Please enter your lastname.'),
    email: yup.string()
        .email()
        .required('Email is required.'),
    password: yup
        .string()
        // .min(6, 'Password is too short.')
        .max(20, 'Password is too long.')
        .required('This field is required.'),
    passwordConfirmation: yup.string()
        .required('Confirm your password')
        .oneOf([yup.ref('password')], 'Password does not match'),
    accessLevel: yup.string().required('Please set an access Level'),
    termsAgreement: yup.bool().oneOf([true], 'You must agree to use this App')
});

const UserInfo = withStyles(styles)(({classes, handleSubmit, userData, isAdmin, buttonLabel = 'Update'}) => {
    // Note when you do not set a initial value, yup will not validate it
    let initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        accessLevel: ACCESSLEVEL.GUEST,
        termsAgreement: false,
        imageUrl: '',
    };

    // when this is an existing user, we cannot change password and email in this form,
    // so no validation is required
    if (userData) {
        initialValues = userData;
        SignupSchema = yup.object().shape({
            firstName: yup.string().required('Please enter your firstname.'),
            lastName: yup.string().required('Please enter your lastname.'),
            accessLevel: yup.string().required('Please set an access Level'),
            termsAgreement: yup.bool().oneOf([true], 'You must agree to use this App')
        });
        // when this is a new user created by admin, he cannot check termsAgreement
    }
    if (isAdmin === true) {
        SignupSchema = yup.object().shape({
            firstName: yup.string().required('Please enter your firstname.'),
            lastName: yup.string().required('Please enter your lastname.'),
            accessLevel: yup.string().required('Please set an access Level'),
        });
    }
    const terms = (
        <p>I agree to the <Link to={ROUTES.PRIVACY_POLICY}>privacy policy.</Link></p>
    );

    return (

        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <div className={classes.paper}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({errors, handleChange, touched, values}) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={values.firstName}
                                        error={errors.firstName && touched.firstName}
                                        autoComplete='fname'
                                        name='firstName'
                                        variant='outlined'
                                        fullWidth
                                        onChange={handleChange}
                                        id='firstName'
                                        label='First Name'
                                        autoFocus
                                        helperText={
                                            errors.firstName && touched.firstName
                                                ? errors.firstName
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={values.lastName}
                                        error={errors.lastName && touched.lastName}
                                        variant='outlined'
                                        fullWidth
                                        onChange={handleChange}
                                        id='lastName'
                                        label='Last Name'
                                        name='lastName'
                                        autoComplete='lname'
                                        helperText={
                                            errors.lastName && touched.lastName
                                                ? errors.lastName
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={values.email}
                                        disabled={!!userData}
                                        error={errors.email && touched.email}
                                        variant='outlined'
                                        fullWidth
                                        onChange={handleChange}
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                        helperText={
                                            errors.email && touched.email ? errors.email : null
                                        }
                                    />
                                </Grid>
                                {/*only new users are allowed to set a password in this way*/}
                                {(userData || (isAdmin === true)) ? null : (<>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={errors.password && touched.password}
                                            variant='outlined'
                                            fullWidth
                                            onChange={handleChange}
                                            name='password'
                                            label='Password'
                                            type='password'
                                            id='password'
                                            autoComplete='current-password'
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={errors.passwordConfirmation && touched.passwordConfirmation}
                                            variant='outlined'
                                            fullWidth
                                            onChange={handleChange}
                                            name='passwordConfirmation'
                                            label='Confirm Password'
                                            type='password'
                                            id='passwordConfirmation'
                                            helperText={
                                                errors.passwordConfirmation && touched.passwordConfirmation
                                                    ? errors.passwordConfirmation
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </>)}
                                {(isAdmin) ? (
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            value={values.accessLevel}
                                            error={errors.accessLevel && touched.accessLevel}
                                            variant='outlined'
                                            fullWidth
                                            onChange={handleChange}
                                            name='accessLevel'
                                            label='Granted Access Level'
                                            id='accessLevel'
                                            helperText={
                                                errors.accessLevel && touched.accessLevel
                                                    ? errors.accessLevel
                                                    : null
                                            }
                                        >
                                            {ACCESSLEVEL.ALL.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                ) : null}
                                {(isAdmin) ? null : (
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                onChange={handleChange}
                                                checked={values.termsAgreement}
                                                name='termsAgreement'
                                                id='termsAgreement'
                                                color='primary'
                                                error={errors.termsAgreement && touched.termsAgreement}
                                                helperText={
                                                    errors.termsAgreement && touched.termsAgreement
                                                        ? errors.termsAgreement
                                                        : null
                                                }
                                            />}
                                            label={terms}
                                        />
                                        <ErrorMessage name='termsAgreement'
                                                      render={msg => <Typography
                                                          variant='caption'
                                                          display='block'
                                                          className={classes.errorMessage}>{msg}</Typography>}/>

                                    </Grid>
                                )}
                            </Grid>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                {buttonLabel}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
});

export default UserInfo;
