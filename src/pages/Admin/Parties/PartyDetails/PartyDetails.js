import React, {Component} from 'react';
import {createUniquePartyCode} from "../../../../shared/utility";
import {compose} from "redux";
import {withFirebase} from "../../../../components/Firebase";

const initialState = {
    partyCode: createUniquePartyCode(),
    //epoch
    start: 0,
    finish: 0,
    blocked: 0,

    newRequests: 0,
    event: 'Party of the year',
    name: 'Kibbeling',
    userUid: '',
};
/**
 * Created by Doa on 1-2-2020.
 */
class PartyDetails extends Component {
    constructor(props) {
        super(props);
            this.state = initialState
}
    componentDidMount() {
        // if PartyCode -> fetch partyData
    }

    onSubmit = () => {
        this.props.firebase.party(this.state.partyCode).set(this.state)
            .then((response) => {console.log(response)})
            .catch((error) => {console.log(error)})
    };



    render() {

        return (
            <div>
                <button onClick={this.onSubmit}>
                    Save Party
                </button>

        </div>);

    }
}

export default compose(
    withFirebase
)(PartyDetails)
