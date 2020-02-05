import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import ExifOrientationImg from 'react-exif-orientation-img'
import * as actionTypes from '../../store/actions'
import {getName, getPartyCode} from "../../shared/localStorage";
import withStyles from '@material-ui/core/styles/withStyles'
import * as ROUTES from '../../shared/routes';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import MyStepper from "../../components/ui/MyStepper";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SpeechBubble from "../../components/ui/SpeechBubble/SpeechBubble";
import CloseIcon from '@material-ui/icons/Close';
import imageCompression from "browser-image-compression";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withFirebase} from "../../components/Firebase";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";

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
        photoFile: {
            marginTop: '15%'
        },
        photoIcon: {
            marginTop: '3%'
        },
        middle: {
            marginTop: '15%'
        },
        separator: {

            width: '100%',
            height: 10,
            borderBottom: '1px solid grey',
            textAlign: 'center',
            marginBottom: 10
        },
        separatorText: {
            color: 'grey',
            fontWeight: 'bold',
            fontSize: 15,
            background: 'white',
            padding: '0 5px',
        },
        request: {
            marginTop: '10%'
        },
        preview: {
            width: '100vw',
            height: '100vh'
        },
        comment: {
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            width: '92vw',
            minWidth: '20vw',
            padding: 5,
            border: 0,
            fontFamily: 'Roboto'
        },
        spacingTop: {
            height: 5
        },
        controls: {
            width: '90vw',
            position: 'fixed',
            bottom: 10,
            right: 10,
            left: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        previewImage: {
            width: '100vw',
        }
    })
;

const initialState =
    {
        comment: '',
        request: '',
        photoUrl: '',
        photoFile: null,
        compressing: false, //set to true when compressing. Disables 'verstuur' button, shows spinner instead
        compressedPhoto: null,
        message: '',
    };

/**
 * Created by Doa on 27-1-2020.
 */
class Landing extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = initialState
    }

    componentDidMount() {
        if (!!getPartyCode()) {
            this.props.onFetch(this.props.firebase, getPartyCode())
        }

        // if authUser -> fetch(party)
        //
        // you can also put this in a <Redirect> conditional
        // if local.partycode {
        //      if (local.name} -> fetch(party)
        //          else go to name page
    }   // else go to partycode page

    componentWillUnmount() {
        this.props.onRemoveListener()
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const photo = e.target.files[0];
            this.setState(() => ({photoFile: photo}));
            this.setState({photoUrl: URL.createObjectURL(photo)});
            // start compressing
            this.compressPhoto(photo);
        }
    };

    compressPhoto = (file) => {
        this.setState({compressing: true});
        console.log('originalFile instanceof Blob', file instanceof Blob); // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };
        imageCompression(file, options)
            .then((compressedFile) => {
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                return this.setState({compressing: false, compressedFile: compressedFile})
            })
            .catch((error) => {
                console.log(error.message);
            })
    };

    handleClick(e) {
        this.props.onSetFullScreen(true);
        this.refs.fileUploader.click();
    }

    onChange(target) {
        this.setState({[target.id]: target.value});
    };

    onSend(firebase) {
        const fileToSend = (this.state.compressedFile < this.state.photoFile)
            ? this.state.compressedFile : this.state.photoFile;
        firebase.photoUploader(fileToSend, this.props.partyCode, this.state.comment, getName(), this.showResult);
        this.onClose()
    };

    onClose = () => {
        this.props.onSetFullScreen(false);
        this.setState(initialState);
    };

    onHandleKeyDown = (event) => {
        if (event.key === 'Enter') {
            document.getElementById('takePhoto').focus()
        }
    };

    onSubmitRequest = () => {
        this.props.firebase.sendRequest(this.props.partyCode, this.state.request, getName(), this.showResult);
        this.setState({request: ''});
    };

    showResult = (message) => {
        console.log('result');
        console.log(message);
        this.setState({message: message})
    };

    closeMessage = () => {
        this.setState({message: ''})
    };

    setComment = (event) => {
        event.preventDefault()
    };

    render() {
        const {classes, firebase} = this.props;
        const {request, comment, photoUrl, photoFile, compressing, message} = this.state;
        // if now() > partyFinish page = 'party is finished, you cannot upload any more pictures
        // ask party.name for pictures'
        // if now() < partyStart page = <countdown>

        let page = (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.request}>
                            <Typography variant='h6'>
                                Stuur een verzoekje
                            </Typography>
                            <TextField
                                multiline
                                value={request}
                                id='request'
                                label='artiest - titel (versie)'
                                onChange={(event) => this.onChange(event.target)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled={request.length < 3}
                                onClick={this.onSubmitRequest}
                                type='submit'
                                variant='contained'
                                color='primary'>
                                Stuur
                            </Button>
                        </Grid>
                        <Grid item xs={12} className={classes.middle}>
                            <div className={classes.separator}>
                                <span className={classes.separatorText}>Of</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.photoFile}>
                            <Typography variant='h6'>
                                Neem een foto
                            </Typography>
                            <Fab
                                disabled={!this.props.partyCode}
                                color="secondary"
                                className={classes.photoIcon}
                                onClick={this.handleClick}>
                                <PhotoCameraIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </div>
            </Container>);

        if (photoFile) {
            page = (
                <>
                    <ExifOrientationImg className={classes.previewImage} src={photoUrl}/>
                    <div className={classes.preview}
                         style={{
                             backgroundImage: `url(${photoUrl})`,
                             backgroundPosition: 'center',
                             backgroundSize: 'contain',
                             backgroundRepeat: 'no-repeat'
                         }}>
                        <div className={classes.spacingTop}></div>
                        <SpeechBubble>
                            <form onSubmit={(event) => this.setComment(event)}>
                                <textarea
                                    onKeyDown={(event) => this.onHandleKeyDown(event)}
                                    rows={2}
                                    className={classes.comment}
                                    id='comment'
                                    value={comment}
                                    placeholder='jouw commentaar'
                                    autoComplete='off'
                                    maxLength={120}
                                    onChange={(event) => this.onChange(event.target)}/>
                            </form>
                        </SpeechBubble>
                    </div>
                    <div className={classes.controls}>
                        <Fab onClick={this.handleClick}>
                            <PhotoCameraIcon fontSize="large"/>
                        </Fab>
                        <Button
                            id='takePhoto'
                            onClick={() => this.onSend(firebase)}
                            variant="contained"
                            color="primary"
                            disabled={compressing}>
                            {compressing && <CircularProgress/>}
                            Verstuur
                        </Button>
                        <Fab
                            onClick={this.onClose}
                            color='secondary'>
                            <CloseIcon fontSize='large'/>
                        </Fab>
                    </div>

                </>)
        }

        return (
            <>
                {(!!getPartyCode()) ? null : <Redirect to={ROUTES.PARTY_CODE}/>}
                <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    ref='fileUploader'
                    style={{display: 'none'}}
                    onChange={this.handleChange}/>
                {page}
                <Snackbar open={!!message}
                          autoHideDuration={6000}
                          onClose={this.closeMessage}>
                    <Alert severity="success">
                        {message}
                    </Alert>
                </Snackbar>
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        partyCode: state.party.partyCode,
        event: state.party.event
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (firebase, partyCode) => dispatch(actionTypes.fetch(firebase, partyCode)),
        onRemoveListener: () => dispatch(actionTypes.removeListener()),
        onSetFullScreen: (isFullScreen) => dispatch(actionTypes.setFullScreen(isFullScreen))
    }
};

export default compose(
    withStyles(styles),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(Landing);
