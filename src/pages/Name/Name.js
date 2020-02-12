import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import * as ROUTES from '../../shared/routes';
import * as local from "../../shared/localStorage";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import MyStepper from "../../components/ui/MyStepper/MyStepper";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
        alignItems: 'center',
        textAlign: 'center'
    },
    grid: {
        marginTop: theme.spacing(2),
    },
    name: {
        marginTop: '10vH',
    },
});
/**
 * Created by Doa on 30-1-2020.
 */

const Name = withStyles(styles)(
    ({classes, history}) => {
        const [name, setName] = useState('');

        const onSubmit = (event) => {
            event.preventDefault();
            local.setName(name);
            history.push(ROUTES.LANDING)
        };

        return (
            <Container component='main' maxWidth='xs'>
                { (!!local.getPartyCode()) ? null : <Redirect to={ROUTES.PARTY_CODE}/>}
                { (!!local.getName()) ? <Redirect to={ROUTES.LANDING}/> : null}
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MyStepper step={1}/>
                        </Grid>
                    </Grid>
                    <form onSubmit={onSubmit} autoComplete='off'>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            className={classes.name}
                            value={name}
                            id='name'
                            label='je naam'
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Button
                            disabled={name.length<3}
                            type='submit'
                            variant='contained'
                            color='primary'>
                            GO
                        </Button>
                    </Grid>
                    </form>
                </div>
            </Container>);
    });

export default Name