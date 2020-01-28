import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import { withAuthorization } from '../Session/';

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
                <h1>Home Page</h1>
                <p>The Home Page is accessible by every signed in user.</p>
            </>);
    });

//  broad-grained authorization condition
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);