import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import Portrait from "./Portrait/Portrait";
import Landscape from "./Landscape/Landscape";

const styles = theme => ({
    root: {},
});
/**
 * Created by Doa on 11-2-2020.
 */
const Display = withStyles(styles)(
    ({classes, photos, appear}) => {
        let display = null;
        if (photos && photos[0]) {
            console.log('we have content');
            display = (photos[0].isPortrait)
                ? (<Portrait photo={photos[0]} photos={photos} appear={appear}/>)
                : (<Landscape photo={photos[0]} photos={photos} appear={appear}/>)
        }
        return (
            <>
                {display}
            </>);
    });

export default Display;