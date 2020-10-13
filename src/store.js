import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history'
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from "react-redux-toastr";

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

// if (process.env.NODE_ENV === 'development') {
//     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension());
//     }
// }

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const reducer = combineReducers({
    form: formReducer,
    toastr: toastrReducer
});

export const store = createStore(reducer, initialState, composedEnhancers);