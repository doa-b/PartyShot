import * as actionTypes from './actionTypes'

let listener = null;

export const start = () => {
    return {
        type: actionTypes.START
    };
};

export const fetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH,
        data: data
    }
};

export const fetchAuthSuccess = (data) => {
    return {
        type: actionTypes.FETCH,
        data: data
    }
};
export const success = () => {
    return {
        type: actionTypes.SUCCES
    };
};


export const removeListener = () => {
    listener=null;
    return {
        type: actionTypes.SUCCES
    }
};

// *** asynchronous actionCreators ***

export const fetch = (firebase, partyCode) => {
    return dispatch => {
        dispatch (start());
        listener = firebase.party(partyCode).on('value', (snapshot) => {
            dispatch(fetchSuccess(snapshot.val()));
            dispatch(success())
        })
        // get partycode from firebase
    }
};
