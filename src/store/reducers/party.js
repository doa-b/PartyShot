import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";

export const initialState = {
    partyCode: '',
    //epoch
    start: 0,
    finish: 0,
    blocked: 0,

    event: '',
    name: '',
    userUid: '',
    photos: [],
    requests: [],
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.START: return updateObject(state, {error: false, loading: true});
      case actionTypes.SUCCES: return updateObject(state, {error: false, loading: false});
      case actionTypes.FETCH: return updateObject(state, action.data);
      default: return state
  }
};

export default reducer

// we only put this in the store. All other data is loaded from Firebase when needed.