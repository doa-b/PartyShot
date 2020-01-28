import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './components/Firebase';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import dummyReducer from './store/reducers/dummy'
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
    dummy: dummyReducer
});

const composeEnhancers = (process.env.NODE_ENV === 'development') ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
        <App />
    </Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
