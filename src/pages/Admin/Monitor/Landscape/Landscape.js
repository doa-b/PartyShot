import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {Paper} from "@material-ui/core";
import {Textfit} from "react-textfit";
import Comment from "../Comment";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden'
    },

    image: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
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
    }
});
/**
 * Created by Doa on 9-2-2020.
 */
const Landscape = withStyles(styles)(
    ({classes, photos, photo, appear}) => {

        const previews = photos.slice(1, 6);
        let delay = 1000;

        return (
            <div className={classes.root}>
                {photos.length > 0 ? (
                    <>
                        <img className={classes.image}
                             id='photo'
                             src={photo.url}/>
                        <Comment photo={photo} appear={appear}/>
                        <div className={classes.horizontalPreview}>
                            {previews.map(preview => {
                                delay +=400;
                                return (
                                    <Slide direction='left' in={appear} key={preview.id}
                                           mountOnEnter unmountOnExit
                                           style={{transformOrigin: '0 0 0'}}
                                           {...(appear ? {timeout: delay} : {})}>
                                        <Paper elevation={4} className={classes.paper}>
                                            <img className={classes.previewImage}
                                                 src={preview.url}>
                                            </img>
                                        </Paper>
                                    </Slide>
                                )
                            })}
                        </div>
                    </>
                ) : null}
            </div>
        );
    });

export default Landscape