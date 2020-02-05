import * as actionTypes from './actionTypes'
import * as ROLES from './actionTypes'
import {convertObjectsAndSortByKey, convertObjectstoArray} from "../../shared/utility";
import {getPartyCode} from "../../shared/localStorage";

let listener = null;
let requestListener = null;
let photosListener = null;

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

export const setFullScreen = (isFullScreen) => {
    return {
        type: actionTypes.SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    }

};

export const removeListener = () => {
    listener = null;
    photosListener=null;
    requestListener = null;

    return {
        type: actionTypes.SUCCES
    }
};

// *** asynchronous actionCreators ***

export const fetch = (firebase, partyCode, auth = false) => {
    return dispatch => {
        dispatch(start());
        listener = firebase.party(partyCode).on('value', (snapshot) => {
            dispatch(fetchSuccess(snapshot.val()));
            dispatch(success())
        });
        if (auth) {
            // fetch photo's and requests
            photosListener = firebase.photoList(partyCode).on('value', (snapshot) => {
                const photos = convertObjectsAndSortByKey(snapshot.val(), 'lastShown', 'asc');
                dispatch(fetchSuccess({photos: photos}));
            });
            requestListener = firebase.requestList(partyCode).on('value', (snapshot) => {
                const requests = convertObjectsAndSortByKey(snapshot.val(), 'lastShown', 'asc');
                dispatch(fetchSuccess({requests: requests}));
            });
        }
    }
};

export const increaseNewRequests = (firebase, partyCode, number) => {
    console.log('increasing number')
    return (dispatch, getState) => {
        const newValue = (number === 0) ? 0 : getState().party.newRequests + number;
        firebase.party(partyCode).update({newRequests: newValue});
    };

};