import React, {Component} from 'react';
import * as actions from "../../../store/actions";
import {compose} from "redux";
import {withFirebase} from "../../../components/Firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {getPartyCode} from "../../../shared/localStorage";
import RequestsTable from "./RequestsTable";
import {Paper} from "@material-ui/core";


const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
});

/**
 * Created by Doa on 4-2-2020.
 */
class Requests extends Component {

    componentDidMount() {
        getPartyCode() && this.props.onFetch(this.props.firebase, getPartyCode(), true);
        this.props.setNewRequests (this.props.firebase, getPartyCode(), 0)
    }

    componentWillUnmount() {
        this.props.onRemoveListener();
    }

    /**
     *
     * @param selected: Array of node id's to be selected
     */

    onDeleteClicked = (selected) => {
        // you can delete a node by updating it to null
        const deletes = {};
        selected.map((select) => {
          deletes[select] = null
        });
        this.props.firebase.requestList(getPartyCode()).update(deletes);
    };

    render() {
        const {classes, requests} = this.props;
        return (<div className={classes.paper}>
            <RequestsTable
                rows={requests}
                onDeleteClicked={this.onDeleteClicked}
            />
        </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        partyCode: state.party.partyCode,
        event: state.party.event,
        requests: state.party.requests,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (firebase, partyCode, auth) => dispatch(actions.fetch(firebase, partyCode, auth)),
        onRemoveListener: () => dispatch(actions.removeListener()),
        setNewRequests: (firebase, partyCode, number) =>
            dispatch(actions.increaseNewRequests(firebase, partyCode, number))
    }
};

export default compose(
    withFirebase,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Requests);