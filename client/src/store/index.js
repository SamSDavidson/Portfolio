// redux imports
import { combineReducers, createStore, applyMiddleware } from 'redux';
// middleware imports
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import callAPI from './_utils/callAPIMiddleware';
import posts from './posts/reducer';

// pull our reducers

// combine reducers
const rootReducer = combineReducers({
  posts
});

// set up middleware
const middleware = applyMiddleware(thunkMiddleware, callAPI, createLogger());

// create a redux store
const store = createStore(rootReducer, middleware);

export default store;
