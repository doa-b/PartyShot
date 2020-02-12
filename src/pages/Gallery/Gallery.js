import React, {Component} from 'react';
import {compose} from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {withFirebase} from "../../components/Firebase";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {getPartyCode} from "../../shared/localStorage";
import Photo from "./Photo/Photo";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
});


/**
 * Created by Doa on 2-2-2020.
 */
class Gallery extends Component {

    componentDidMount() {
        // TODO refactor this to take the partycode from authUser!!!
        // const value = this.context;
        // console.log(value);
        getPartyCode() && this.props.onFetch(this.props.firebase, getPartyCode(), true)
    }

    componentWillUnmount() {
        this.props.onRemoveListener();
    }

    onDelete = (id) => {
        this.props.firebase.deletePhoto(id, getPartyCode())
    };

    render() {
        const {classes} = this.props;
        return (
                    <Grid container spacing={1}>
                    {this.props.photos.map((photo, index) => {
                        return <Photo key={index} photoData={photo} deleteClicked={this.onDelete}/>
                    })}
                    </Grid>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        partyCode: state.party.partyCode,
        event: state.party.event,
        photos: state.party.photos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (firebase, partyCode, auth) => dispatch(actions.fetch(firebase, partyCode, auth)),
        onRemoveListener: () => dispatch(actions.removeListener())
    }
};

export default compose(
    withFirebase,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Gallery);