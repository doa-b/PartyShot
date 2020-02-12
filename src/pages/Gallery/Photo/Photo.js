import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({

    card: {
        width: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    header:{
        paddingBottom: 0
    }
});

/**
 * Created by Doa on 2-2-2020.
 */
const Photo = withStyles(styles)(
    ({classes, deleteClicked, photoData: {comment, uploader, url, id}}) => {

        return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                        <CardHeader className={classes.header}
                            action={
                                <IconButton
                                    onClick={() => deleteClicked(id)}
                                    aria-label="delete">
                                    <CloseIcon/>
                                </IconButton>
                            }
                                    subheader={<span><b>{uploader}</b> {' - ' + comment}</span>}
                        />
                        <CardMedia
                            className={classes.media}
                            image={url}
                            title={uploader + ' ' + comment}
                        />
                    </Card>
                </Grid>
            );
    });

export default Photo;