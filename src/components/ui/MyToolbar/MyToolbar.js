import React from 'react';
import {useMediaQuery} from 'react-responsive'
import * as ROUTES from '../../../shared/routes';
import {AuthUserContext} from '../../Session'

import {Tooltip, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import * as ACCESSLEVEL from "../../../shared/accessLevel";

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 5
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
    },
    pageTitle: {
        cursor: 'pointer',
        paddingLeft: 10,
        paddingRight: 10
    }

});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick, event, name, newRequests, history}) => {
        const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
        let toolBarTitle =  (isMobile) ? event : event + ' ' + name;

        const navigate = (route) => {
            console.log('navigate is clicked')
            history && history.push(route)
        };

        return (
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
                            variant='body1'
                            color='inherit'
                        >
                            {title.toUpperCase()}
                        </Typography>
                        <Typography
                            variant='body2'
                            className={classes.pageTitle}
                        onClick={()=> navigate(ROUTES.PARTIES)}>
                            {toolBarTitle}</Typography>

                        <div className={classes.corner}>
                        </div>
                        <AuthUserContext.Consumer>
                            {authUser => (authUser && authUser.accessLevel >= ACCESSLEVEL.ARTIST) ? (
                               <>
                                   <IconButton
                                       aria-label="show new requests"
                                       color="inherit"
                                   onClick={() => navigate(ROUTES.REQUESTS)}>
                                       <Badge color="secondary" badgeContent={newRequests}>
                                           <QueueMusicIcon />
                                       </Badge>
                                   </IconButton>
                                <Link to={ROUTES.ACCOUNT}>
                                <Avatar
                                    alt='logged in user'
                                    src={authUser.imageUrl}/>
                               </Link>

                               </>
                            ) : null}

                        </AuthUserContext.Consumer>
                    </Toolbar>
                </AppBar>
                <div className={classes.toolbarMargin}/>
            </>
        )
    }
);

export default MyToolbar;