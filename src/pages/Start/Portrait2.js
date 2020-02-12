import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import GridList from '@material-ui/core/GridList';
import {Paper} from "@material-ui/core";
import {Textfit} from "react-textfit";

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh',
    },
    mainImage: {
        display: 'inline-flex',
        background: 'red',
        width: '56%',
        //flex: '0 0 56%',
        height: '100%'
    },
    preview: {
        display: 'inline-flex',
        width: '44%',
        //flex: '0 0 43%',
        background: 'blue',
        height: '100%',
    },
    image: {
        height: '100%',
        objectFit: 'contain'
    },
    verticalPreview: {
        display: 'inline-flex',
        width: '44%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
    },
    paper: {
        border: '2px solid white',
        borderRadius: 5,
        height: '33%'
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    comment: {
        width: 1080,
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
const Portrait = withStyles(styles)(
    ({classes, photos, photo}) => {

        const previews = photos.slice(1, 5);

        return (
            <>
                {photos.length > 0 ? (
                    <div className={classes.root}>
                        <div className={classes.mainImage}>
                            <img className={classes.image}
                                 id='photo'
                                 src={photo.url}/>
                        </div>

                            <div className={classes.verticalPreview}>
                                {previews.map(preview => (
                                    <Paper elevation={4} className={classes.paper}>
                                        <img
                                            className={classes.previewImage}
                                            src={preview.url}/>
                                    </Paper>)
                                )}
                            </div>

                    </div>
                ) : null}
            </>
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