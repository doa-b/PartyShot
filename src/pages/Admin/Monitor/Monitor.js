import React, {Component} from 'react';
import {getPartyCode} from "../../../shared/localStorage";
import * as actions from "../../../store/actions";
import {compose} from "redux";
import {withFirebase} from "../../../components/Firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {Textfit} from 'react-textfit';
import {Transition} from 'react-transition-group';
import {Fade} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Portrait from './Portrait/Portrait';
import Landscape from "./Landscape/Landscape";
import Display from "./Display";
import Fullscreen from "react-full-screen";

const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    root: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    landscapeImage: {
        width: '100%',
        length: '100%',
        display: 'block',
        maxWidth: 1920,
        objectFit: 'contain'
    },
    portraitImage: {
        width: '100%',
        length: '100%',
        maxHeight: 1080,
        display: 'block',
        objectFit: 'contain'
    },
    comment: {
        fontSize: '25.5%',
        position: 'fixed',
        left: 5,
        bottom: 5,
        textShadow: '2px 2px #000000',
        color: 'white'
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

/**
 * Created by Doa on 4-2-2020.
 */
class Monitor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canvas0Photos: null,
            canvas1Photos: null,
            // photoList: null,
            isLoading: true,
            isDisplay0: false,
            isFullScreen: false
        };
    }

    componentDidMount() {
        getPartyCode() && this.props.onFetch(this.props.firebase, getPartyCode(), true);
        this.interval = setInterval(() => this.photoAction(), 5000)
    }

    componentWillUnmount() {
        this.props.onSetFullScreen(false);
        clearInterval(this.interval);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.isDisplay0 !== nextState.isDisplay0 ||
            this.state.isLoading !== nextState.isLoading) return true;
        else return false
    }

    onToggleFullScreen = () => {
        if (this.state.isFullScreen) {
            this.props.onSetFullScreen(false);
            this.setState({isFullScreen: false});
        } else {
            this.props.onSetFullScreen(true);
            this.setState({isFullScreen: true});
        }
    };

    initialize = (photo) => {
        this.setState({currentPhoto: 12})
    };

    photoAction = () => {
        // toggle action
        if (this.state.isLoading) return this.loadPhoto();
        return this.switchPhoto()
    };

    loadPhoto = () => {
        console.log('loading new photo');
        //   this.setState({photoList: Object.assign([], this.props.photos)});
        // put current photoList in state to prevent reload on change
        const newPhotosList = Object.assign([], this.props.photos);
        console.log(newPhotosList);
        // load photos in back display
        if (this.state.isDisplay0) {
            this.setState({canvas1Photos: newPhotosList, isLoading: false});
        } else this.setState({canvas0Photos: newPhotosList, isLoading: false});

        // set lastDisplayed of this photo
        this.props.partyCode && this.props.firebase.photoList(this.props.partyCode)
            .child(newPhotosList[0].id).update({lastShown: Date.now()})
            .then(() => console.log('updated'))
    };
    switchPhoto = () => {
        console.log('switching Photo');
        // toggle which display to display
        this.setState(prevState => ({isDisplay0: !prevState.isDisplay0, isLoading: true}));
        // transition from fristPhoto to secondphoto or vice versa
    };

    render() {
        console.log('((re)rendering')
        const {classes} = this.props;
        const {canvas0Photos, canvas1Photos, isDisplay0, isFullScreen} = this.state;

        return (
            <Fullscreen enabled={isFullScreen}>
                <div className={classes.root} onClick={this.onToggleFullScreen}>
                    <Fade in={isDisplay0}
                          style={{transformOrigin: '0 0 0'}}
                          {...(isDisplay0 ? {timeout: 1600} : {})}>
                        <div id='canvas0'>
                            <Display photos={canvas0Photos} appear={isDisplay0}/>
                        </div>
                    </Fade>
                    <Fade in={!isDisplay0}
                          style={{transformOrigin: '0 0 0'}}
                          {...(!isDisplay0 ? {timeout: 1600} : {})}>
                        <div id='canvas1'>
                            <Display photos={canvas1Photos} appear={!isDisplay0}/>
                        </div>
                    </Fade>
                </div>
            </Fullscreen>
        );
    }
}

// const Landscape = ({photo: {url, uploader, comment}, classes}) => {
//
//     return (
//         <>
//             <img className={classes.landscapeImage} src={url}/>
//             <Textfit>
//                 <span className={classes.comment}><b>{uploader}</b> {' - ' + comment}</span>
//             </Textfit>
//         </>
//
//     )
// };
//
// const Portrait = ({photo: {url, uploader, comment}, classes}) => {
//     console.log('portrait');
//     return (
//         <>
//             <img className={classes.portraitImage} src={url}/>
//             <Textfit>
//                 <span className={classes.comment}><b>{uploader}</b> {' - ' + comment}</span>
//             </Textfit>
//         </>
//     )
// };


const mapStateToProps = (state) => {
    return {
        partyCode: state.party.partyCode,
        event: state.party.event,
        photos: state.party.photos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (firebase, partyCode, auth) => dispatch(actions.fetch(firebase, partyCode, auth)),
        onRemoveListener: () => dispatch(actions.removeListener()),
        onSetFullScreen: (isFullScreen) => dispatch(actions.setFullScreen(isFullScreen)),
    }
};

export default compose(
    withFirebase,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Monitor);