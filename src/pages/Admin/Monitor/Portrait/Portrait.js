import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import GridList from '@material-ui/core/GridList';
import {Paper} from "@material-ui/core";
import {Textfit} from "react-textfit";
import Grow from "@material-ui/core/Grow";
import Comment from "../Comment";

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    image: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    verticalPreview: {
        zIndex: '12',
        position: 'fixed',
        top: 10,
        left: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        width: '27%',
    },
    verticalPreviewRight: {
        zIndex: '12',
        position: 'fixed',
        top: 10,
        right: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        width: '27%'
    },
    paper: {
        flex: '0 0 324px',
    },
    previewImage: {
        height: '324px',
        objectFit: 'contain',
        overflow: 'hidden',
        border: '2px solid white',
        borderRadius: 5,
    }
});
/**
 * Created by Doa on 9-2-2020.
 */
const Portrait = withStyles(styles)(
    ({classes, photos, photo, appear}) => {

        const previews = photos.slice(1, 4);
        const previewsRight = photos.slice(4, 7);
        let delay = 1000;
        return (
            <div className={classes.root}>
                {photos.length > 0 ? (
                    <>
                      <Comment photo={photo} isPortrait appear={appear}/>
                        <img className={classes.image}
                             id='photo'
                             src={photo.url}/>
                        <div className={classes.verticalPreview}>
                            {previews.map(preview => {
                                delay += 1500;
                                return (
                                    <Grow in={appear} key={preview.id}
                                          style={{ transformOrigin: '0 0 0' }}
                                          {...(appear ? { timeout: delay } : {})}>
                                        <div className={classes.paper}>
                                            <img className={classes.previewImage}
                                                 src={preview.url}>
                                            </img>
                                        </div>
                                    </Grow>
                                )
                            })}
                        </div>
                        <div className={classes.verticalPreviewRight}>
                            {previewsRight.map(preview => {
                                delay += 1500;
                                return (
                                    <Grow in={appear} key={preview.id}
                                          style={{ transformOrigin: '0 0 0' }}
                                          {...(appear ? { timeout: delay } : {})}>
                                        <div elevation={4} className={classes.paper}>
                                            <img className={classes.previewImage}
                                                 src={preview.url}>
                                            </img>
                                        </div>
                                    </Grow>
                                )
                            })}
                        </div>
                    </>
                ) : null}
            </div>
        );
    });

export default Portrait

// {photos.length > 0 ? (
//     <div className={classes.root}>
//         <div className={classes.preview}>
//             <div className={classes.verticalPreview}>
//                 {previews.map(preview => (
//                     <Paper elevation={4} className={classes.paper}>
//                         <img className={classes.previewImage}
//                              src={preview.url}>
//                         </img>
//                     </Paper>
//                 ))}
//             </div>
//         </div>
//         <div className={classes.mainImage}>
//             <img className={classes.image}
//                  id='photo'
//                  src={photo.url}/>
//             <Textfit>
//                 <span className={classes.comment}><b>{photo.uploader}</b> {' - ' + photo.comment}</span>
//             </Textfit>
//         </div>
//     </div>) : null}