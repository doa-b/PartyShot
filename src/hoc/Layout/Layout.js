import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom'
import {pageTitle} from '../../shared/routes';
import {connect} from "react-redux";


import MyToolbar from '../../components/ui/MyToolbar/MyToolbar';
import MySideDrawer from '../../components/ui/MySideDrawer/MySideDrawer';


/**
 * Created by Doa on 23-10-2019.
 */
class Layout extends Component {

    state = {
        drawer: false
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            drawer: !prevState.drawer
        }));
    };

    onItemClick = () => () => {
        this.setState(prevState => ({
            drawer: (this.props.variant === 'temporary') ? false : prevState.drawer
        }));
    };

    render() {
        const { location, fullScreen, event, name, variant, children, newRequests } = this.props;
        return (
            <>
                {(fullScreen) ? null : (
                    <MyToolbar
                        title={pageTitle(location.pathname)}
                        onMenuClick={this.toggleDrawer}
                        event={event}
                        name={name}
                    newRequests={newRequests}/>
                )}
                <MySideDrawer
                    variant={variant}
                    open={this.state.drawer}
                    onClose={this.toggleDrawer}
                    onItemClick={this.onItemClick}
                />
                <div>
                    {children}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fullScreen: state.party.fullScreen,
        event: state.party.event,
        name: state.party.name,
        newRequests: state.party.newRequests
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Layout);