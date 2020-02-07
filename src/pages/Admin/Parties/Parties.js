import React, {Component} from 'react';
import * as actions from "../../../store/actions";
import {compose} from "redux";
import * as ROUTES from '../../../shared/routes'
import {withFirebase} from "../../../components/Firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {getPartyCode} from "../../../shared/localStorage";
import PartiesTable from './PartiesTable'
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {convertObjectstoArray} from "../../../shared/utility";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import ChangeEvent from "../../../components/ChangeEvent/ChangeEvent";
import {fetchSuccess} from "../../../store/actions";


const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        width: '300',
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    grid: {}
});

const initialState = {
    parties: []
};

/**
 * Created by Doa on 4-2-2020.
 */
class Parties extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.props.firebase.parties().on('value', (snapshot) => {
            this.setState({parties: convertObjectstoArray(snapshot.val())})
        });

        if (!this.props.partyCode) {
            getPartyCode() && this.props.onFetch(this.props.firebase, getPartyCode(), true);

        }
    }

    componentWillUnmount() {
        // remove listeners
        this.props.firebase.parties().off();
        this.props.onRemoveListener();
    }

    /**
     *
     * @param selected: Array of node id's to be selected
     */

    onDeleteClicked = (selected) => {
        const {firebase} = this.props;
        // you can delete a node by updating it to null. selected is an array of PartyCodes
        const deletes = {};
        selected.map((select) => {
            console.log(select);

            // TODO delete 1 user select.userUid
            const userId = this.state.parties.filter((party) => (party.id === select))[0].userUid;
            console.log(userId);
            firebase.user(userId).remove();
            // TODO delete 1 Auth user: must be a firebase function, because it uses firebase admin sdk
            return  deletes[select] = null;

        });
        // TODO delete photo folder from storage. Also requires function:
        // https://medium.com/google-developer-experts/automatically-delete-your-firebase-storage-files-from-firestore-with-cloud-functions-for-firebase-36542c39ba0d
        // TODO delete all photos
        firebase.parties().update(deletes);
        firebase.requests().update(deletes);
        firebase.photos().update(deletes);

    };

    onDetailsClicked = (id) => {
        if (id) this.props.history.push(ROUTES.PARTY_DETAILS + '/' + id);
        else this.props.history.push(ROUTES.PARTY_DETAILS)
    };

    render() {
        const {classes, firebase, updateStore} = this.props;
        return (
            <>
                <ChangeEvent
                    parties={this.state.parties}
                    firebase={firebase}
                    updateStore={updateStore}/>
                <Grid item xs={12}>
                    <PartiesTable
                        rows={this.state.parties}
                        onDetailsClicked={this.onDetailsClicked}
                        onDeleteClicked={this.onDeleteClicked}
                    />
                    <Fab variant='extended'
                         color='primary'
                         onClick={() => this.onDetailsClicked()}>
                        <AddIcon/>
                        Nieuw event
                    </Fab>
                </Grid>;
            </>)
    }
}

const mapStateToProps = (state) => {
    return {
        partyCode: state.party.partyCode,
        event: state.party.event,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (firebase, partyCode, auth) => dispatch(actions.fetch(firebase, partyCode, auth)),
        onRemoveListener: () => dispatch(actions.removeListener()),
        updateStore: (data) => dispatch(actions.fetchSuccess(data))
    }
};
export default compose(
    withFirebase,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Parties);