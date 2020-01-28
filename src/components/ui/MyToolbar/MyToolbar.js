import React from 'react';
import {AuthUserContext} from '../../Session'

import {Tooltip, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';



const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolBar: {
        alignItems: 'center'
    },
    corner: {
        marginLeft: 'auto'
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        height: 35,
        marginTop: 5,
        marginRight: 10
    },
    message: {
        color: 'inherit'
    }
});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick, isLive, showName, showAllScenes, setShowAllScenes}) => (
        <>
            <AppBar className={classes.aboveDrawer}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='Menu'
                        onClick={onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant='h5'
                        color='inherit'
                        className={classes.flex}
                    >
                        {title}
                    </Typography>
                    {(title === 'Schedule') ? (
                        <IconButton
                            className={classes.fold}
                            color='inherit'
                            aria-label='Fold'
                            onClick={() => setShowAllScenes(!showAllScenes)}
                        >
                            <Tooltip title='show/hide scenes' placement='left-end'>
                                {(showAllScenes) ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
                            </Tooltip>
                        </IconButton>
                    ) : null}
                    <div className={classes.corner}>
                    </div>
                    <AuthUserContext.Consumer>
                        {authUser => authUser ? (
                            <Avatar

                                alt='logged in user'
                                src={authUser.imageUrl}/>
                        ) : null}

                    </AuthUserContext.Consumer>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </>
    )
);

export default MyToolbar;