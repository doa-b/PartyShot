import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import clsx from "clsx";
import {Textfit} from "react-textfit";
import {Slide} from "@material-ui/core";

const styles = theme => ({
    commentBox: {
        width: '99%',
        position: 'fixed',
        left: 5,
        bottom: 20,
        textAlign: 'center',
        textShadow: '2px 2px #000000',
        color: 'white'
    },
    portrait: {
        width: '40%',
        left: '30%'
    }
});
/**
 * Created by Doa on 11-2-2020.
 */
const Comment = withStyles(styles)(
    ({classes, isPortrait, photo, appear}) => {

        const comment = (photo.comment)
            ? (<span><b>{photo.uploader}</b> {' - ' + photo.comment}</span>)
            : (<span>{photo.uploader}</span>) ;

        return (
            <Slide direction='up' in={appear} mountOnEnter unmountOnExit
                   style={{transformOrigin: '0 0 0'}}
                   {...(appear ? {timeout: 6000} : {})}>

                <div className={clsx(classes.commentBox, {[classes.portrait]: isPortrait})}>
                    <Textfit mode='single'>
                       {comment}
                    </Textfit>
                </div>
            </Slide>);
    });

export default Comment;