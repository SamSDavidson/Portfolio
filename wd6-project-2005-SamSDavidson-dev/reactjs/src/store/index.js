import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

//reducers
import posts from './posts/reducer';
import users from './users/reducer';
import tags from './tags/reducer'

//combine reducers
const rootReducer = combineReducers({
  posts,
  tags,
  users
});

// middleware
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
);

export const store = createStore(rootReducer, middleware);
