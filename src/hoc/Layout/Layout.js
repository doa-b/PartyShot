import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom'
import {pageTitle} from '../../shared/routes';
import {connect} from "react-redux";


import MyToolbar from '../../components/ui/MyToolbar/MyToolbar';
import MySideDrawer from '../../components/ui/MySideDrawer/MySideDrawer';
import {getPartyCode} from "../../shared/localStorage";
import * as actions from "../../store/actions";
import {withFirebase} from "../../components/Firebase";


/**
 * Created by Doa on 23-10-2019.
 */
class Layout extends Component {

    state = {
        drawer: false
    };

    componentDidMount() {
        if (!this.props.event && !!getPartyCode()) {
            this.props.onFetchOnce(this.props.firebase, getPartyCode())
        }
        // put auth in store

    }

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
        const { location, fullScreen, event, name, variant, children, newRequests, history } = this.props;
        return (
            <>
                {(fullScreen) ? null : (
                    <MyToolbar
                        title={pageTitle(location.pathname)}
                        onMenuClick={this.toggleDrawer}
                        event={event}
                        name={name}
                        history={history}
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

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOnce: (firebase, partyCode) => dispatch(actions.fetchOnce(firebase, partyCode)),
    }
};

export default compose(
    withFirebase,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Layout);