import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {useMediaQuery} from 'react-responsive'

const styles = theme => ({
    root: {},
});

/**
 * Created by Doa on 3-2-2020.
 */
const RequestOrPhoto = () => {
    const isPortrait = useMediaQuery({query: '(orientation: portrait)'});

    return (
        <>
            {(isPortrait) ? <RequestOrPhotoPortrait/>
                : <RequestOrPhotoLandscape/>}
        </>);
};

const RequestOrPhotoLandscape = withStyles(styles)(
    ({classes}) => {
        return (
            <>
                <p>Landscape</p>
            </>);
    });

const RequestOrPhotoPortrait = withStyles(styles)(
    ({classes}) => {
        return (
            <>
                <p>Portrait</p>
            </>);
    });

export default RequestOrPhoto;