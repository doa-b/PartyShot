import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import * as actions from '../../store/actions'

import ExifOrientationImg from 'react-exif-orientation-img'

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
import RequestOrPhoto from "./RequestOrPhoto/RequestOrPhoto";

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
            textAlign: 'center',
            '@media (orientation:landscape)': {
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: theme.spacing(1)
            }
        },
        requestTextField: {
            margin: 0
        },
        grid: {
            marginTop: theme.spacing(2),
            '@media (orientation:landscape)': {
                flexDirection: 'row',
                marginTop: 0
            }
        },
        photoFile: {
            marginTop: '15%',
            '@media (orientation:landscape)': {
                marginTop: 5
            }
        }
        ,
        photoIcon: {
            marginTop: '3%'
        }
        ,
        middle: {
            marginTop: '15%',
            '@media (orientation:landscape)': {
                marginTop: 5
            }
        }
        ,
        separator: {
            width: '100%',
            height: 10,
            borderBottom:
                '1px solid grey',
            textAlign: 'center',
            marginBottom: 10
        }
        ,
        separatorText: {
            color: 'grey',
            fontWeight: 'bold',
            fontSize: 15,
            background: 'white',
            padding: '0 5px',
        },
        divider: {
            '@media (orientation:landscape)': {
                display: 'none'
            }
        },

        request: {
            marginTop: '10%',
            '@media (orientation:landscape)': {
                marginTop: 5
            }
        }
        ,
        preview: {
            width: '100vw',
            height: '100vh'
        }
        ,
        comment: {
            outline: 'none',
            backgroundColor:
                'rgba(255, 255, 255, 0)',
            width:
                '92vw',
            minWidth:
                '20vw',
            padding:
                5,
            border:
                0,
            fontFamily:
                'Roboto'
        }
        ,
        spacingTop: {
            position: 'fixed',
            left:
                5,
            top:
                5
        }
        ,
        controls: {
            width: '90vw',
            position:
                'fixed',
            bottom:
                10,
            right:
                10,
            left:
                10,
            display:
                'flex',
            flexDirection:
                'row',
            justifyContent:
                'space-between',
            alignItems:
                'center',
        }
        ,
        previewImage: {
            marginTop: 'auto',
            marginLeft: 'auto',
            objectFit: 'cover',
            width: '100%',
        }
        ,
        container: {
            display: 'flex',
            justifyContent:
                'center',
            alignItems:
                'center',
            textAlign:
                'center',
            width:
                '100%',
            height:
                '100%',
        },
    requestContainer: {
        '@media (orientation:landscape)': {
            flexGrow: 4
        }
    },
    photoContainer: {
        '@media (orientation:landscape)': {
            flexGrow: 1
        }
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
        compressedFile: null,
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
        firebase.photoUploader(
            fileToSend,
            this.props.partyCode,
            this.isPortrait(),
            this.state.comment,
            getName(),
            this.showResult
        );
        this.onClose();
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
        this.props.firebase.sendRequest(
            this.props.partyCode,
            this.state.request,
            getName(),
            this.showResult);
        this.props.setNewRequests (this.props.firebase, getPartyCode(), 1)
        this.setState({request: ''});
    };

    onHandleKeyDownRequest = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitRequest()
        }
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

    isPortrait = () => {
        const image = document.getElementById('photo');
        if (image.naturalWidth < image.naturalHeight) return true;
        return false
    };

    render() {
        const {classes, firebase} = this.props;
        const {request, comment, photoUrl, photoFile, compressing, message, compressedFile} = this.state;
        // if now() > partyFinish page = 'party is finished, you cannot upload any more pictures
        // ask party.name for pictures'
        // if now() < partyStart page = <countdown>

        let page = (
            <Container component='main' maxWidth='sm'>
                <RequestOrPhoto/>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid container spacing={2} className={classes.requestContainer}>
                        <Grid item xs={12} className={classes.request}>
                            <Typography variant='h6'>
                                Stuur een verzoekje
                            </Typography>
                            <TextField
                                fullWidth
                                className={classes.requestTextField}
                                multiline
                                value={request}
                                id='request'
                                label='artiest - titel (versie)'
                                onChange={(event) => this.onChange(event.target)}
                                onKeyDown={(event) => this.onHandleKeyDownRequest(event)}
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
                    </Grid>
                    <Grid container spacing={2} className={classes.divider}>
                        <Grid item xs={12} className={classes.middle}>
                            <div className={classes.separator}>
                                <span className={classes.separatorText}>Of</span>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className={classes.photoContainer}>
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
                    <div className={classes.container}>
                        {!!(compressedFile) ? (
                            <img src={URL.createObjectURL(compressedFile)} id='photo' className={classes.previewImage}/>)
                         : (<ExifOrientationImg id='photo' className={classes.previewImage} src={photoUrl}/>)}

                        <div className={classes.spacingTop}>
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
        onFetch: (firebase, partyCode) => dispatch(actions.fetch(firebase, partyCode)),
        onRemoveListener: () => dispatch(actions.removeListener()),
        onSetFullScreen: (isFullScreen) => dispatch(actions.setFullScreen(isFullScreen)),
        setNewRequests: (firebase, partyCode, number) =>
            dispatch(actions.increaseNewRequests(firebase, partyCode, number))
    }
};

export default compose(
    withStyles(styles),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(Landing);
