import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {AuthUserContext, withAuthorization} from '../../components/Session';
import * as ROUTES from '../../shared/routes'
import moment from "moment";
import 'moment/locale/nl'
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {compose} from "redux";
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        '@media (min-width:600px)': {
            marginTop: theme.spacing(8)
        }
    },
    subtitle: {
        marginTop: theme.spacing(2),

    }
});
/**
 * Created by Doa on 27-1-2020.
 */
const Home = withStyles(styles)(
    ({classes, event, start, partyCode}) => {
        return (
            <>
                <AuthUserContext.Consumer>
                    {authUser => {
                        return (
                            <Container component="main" maxWidth="sm">
                                <CssBaseline/>
                            <div className={classes.root}>
                                <Typography  variant="h4" component="h1">Welkom {authUser.name}</Typography>
                                {start>Date.now() &&
                                <Typography  variant="subtitle1" >
                                    Nog {moment(start).fromNow(true)} tot je {event}!
                                </Typography>
                                }

                                <Typography  variant="subtitle2" className={classes.subtitle} color='primary' >
                                    Gebruik
                                </Typography>
                                <Typography  variant="body1">Je kunt net als je gasten <a href={ROUTES.LANDING}>hier</a> foto's insturen of
                                    verzoekjes doen.
                                </Typography>
                                <Typography  variant="body1">Alleen jij kunt alle foto's <a href={ROUTES.GALLERY}>hier</a> bekijken, en indien
                                    nodig, wissen.
                                </Typography>
                                <Typography  variant="subtitle2" className={classes.subtitle} color='primary' >
                                Voorpret
                                </Typography>
                                <Typography  variant="body1" >
                                    Stuur onderstaande unieke link alvast naar je gasten zodat ze deze App ook kunnen downloaden:
                                </Typography>
                                <a href={`https://partyshot.web.app/party-code/${partyCode}`}>
                                    https://partyshot.web.app/party-code/{partyCode}</a>

                                <Typography  variant="subtitle2" className={classes.subtitle} color='primary'>
                                    Privacy
                                </Typography>
                                <Typography  variant="body1" >
                                    We slaan 2 cookies op: je inloggegevens en je partycode, zodat je deze niet telkens opnieuw in hoeft te vullen.
                                    voor meer info: <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
                                </Typography>
                            </div>
                            </Container>
                        )
                    }}
                </AuthUserContext.Consumer>
            </>);
    });

//  broad-grained authorization condition
const condition = authUser => !!authUser;

const mapStateToProps = (state) => {
    return {
        event: state.party.event,
        start: state.party.start,
        partyCode: state.party.partyCode
    }
};

export default compose(
    connect(mapStateToProps),
    withAuthorization(condition)
)(Home);