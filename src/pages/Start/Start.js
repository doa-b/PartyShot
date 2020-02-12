import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {withFirebase} from "../../components/Firebase";
import {compose} from "redux";
import {Paper} from "@material-ui/core";
import {Textfit} from "react-textfit";
import Landscape from '../Admin/Monitor/Landscape/Landscape'
import Portrait from "../Admin/Monitor/Portrait/Portrait";

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    horizontalPreview: {
        zIndex: '12',
        position: 'fixed',
        top: 10,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    paper: {
        border: '2px solid white',
        borderRadius: 5,
        width: 240,
        height: 135
    },
    previewImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    comment: {
        position: 'fixed',
        left: 5,
        bottom: 5,
        textShadow: '2px 2px #000000',
        color: 'white'
    }

});
/**
 * Created by Doa on 9-2-2020.
 */
const Start = withStyles(styles)(
    ({classes, onSetFullScreen, onFetch, firebase, photos, partyCode}) => {
        const [number, setNumber] = useState(0);
        const [appear, setAppear] = useState (0);
        const preview = photos.slice(0, 5);
        useEffect(() => {
            if (photos.length < 1) onFetch(firebase, '755145', true);
            onSetFullScreen(true);
            if (photos.length > 0) {
                const image = document.getElementById('photo');
                console.log(`width: ` + image.naturalWidth);
                console.log(`Height: ` + image.naturalHeight);
            }
        });

        const clicked = () => {
            setNumber(number + 1);
            setAppear(!appear);
            const image = document.getElementById('photo');
            console.log(`width: ` + image.naturalWidth);
            console.log(`heigth: ` + image.naturalHeight);

        };

        return (
                    <div onClick={clicked} className={classes.root}>
                    <Landscape photos={photos} photo={photos[number]} appear={appear}/>
                    </div>
        );
    }
);

const mapStateToProps = (state) => {
    return {
        partyCode: state.party.partyCode,
        event: state.party.event,
        photos: state.party.photos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (firebase, partyCode, isAuth) => dispatch(actions.fetch(firebase, partyCode, isAuth)),
        onRemoveListener: () => dispatch(actions.removeListener()),
        onSetFullScreen: (isFullScreen) => dispatch(actions.setFullScreen(isFullScreen)),
        setNewRequests: (firebase, partyCode, number) =>
            dispatch(actions.increaseNewRequests(firebase, partyCode, number))
    }
};

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(Start);