import React, {useState, useEffect} from 'react';
import {withFirebase} from "../../components/Firebase";
import withStyles from '@material-ui/core/styles/withStyles'
import * as ROUTES from '../../shared/routes';
import * as local from "../../shared/localStorage";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import MyStepper from "../../components/ui/MyStepper";
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
    partyCode: {
        marginTop: '10vH',
    },

    codeInput: {
        textAlign: 'center',
        fontSize: '1.5em',
        fontWeight: 'bold',
        letterSpacing: '1em'
    }
});
/**
 * Created by Doa on 27-1-2020.
 */
const PartyCode = withStyles(styles)(
    ({classes, history, firebase, match}) => {
        const [partyCode, setPartyCode] = useState('');
        const [error, setError] = useState(null);

        useEffect(() => {
            if(!!match.params.partyCode) {
               setPartyCode(match.params.partyCode)
            }
        });
        const onChange = (code) => {
            code.length < 7 && setPartyCode(code);
            error && setError(null);
            if (code.length === 6) {

                firebase.parties().child(code).once('value')
                    .then((snapshot) => {
                        console.log(snapshot.val());
                        let check = snapshot.exists();
                        if (check) {
                            local.setPartyCode(code);
                            history.push(ROUTES.NAME)
                        } else {
                            setError('Geef een geldige 6 cijfer code')
                        }
                    });
            }
        };

        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MyStepper step={0}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='off'
                            autoFocus
                            className={classes.partyCode}
                            InputProps={{
                                classes: {
                                    input: classes.codeInput
                                }
                            }}
                            value={partyCode}
                            id='partyCode'
                            label='jouw party code'
                            onChange={(event) => onChange(event.target.value)}
                            error={!!error}
                            helperText={!!error && error}
                        />
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Button
                            disabled={!!error}
                            onClick={() => onChange(partyCode)}
                            type='submit'
                            variant='contained'
                            color='primary'>
                            GO
                        </Button>
                    </Grid>
                </div>
            </Container>);
    });

export default withFirebase(PartyCode);

