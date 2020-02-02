import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import { withAuthorization } from '../../components/Session';
import * as ROUTES from '../../shared/routes'

const styles = theme => ({
    root: {},
});
/**
 * Created by Doa on 27-1-2020.
 */
const Home = withStyles(styles)(
    ({classes}) => {
        return (
            <>
                <h1>Welkom!</h1>
                <p>Je kunt net als je gasten <a href={ROUTES.LANDING}>hier</a> foto's insturen of verzoekjes doen</p>
                <p>Alleen jij kunt alle foto's <a href={ROUTES.HOME}>hier</a> bekijken, en indien nodig, wissen</p>
            </>);
    });

//  broad-grained authorization condition
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);