import createReducer from '../_utils/createReducers';

import {
  REQ_POSTS_PENDING,
  REQ_POSTS_SUCCESS,
  REQ_POSTS_ERROR,
  
  ADD_POST_ERROR,
  ADD_POST_PENDING,
  ADD_POST_SUCCESS,

  REQ_POST_PENDING,
  REQ_POST_SUCCESS,
  REQ_POST_ERROR,

  UPDATE_POST_ERROR,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS
} from '../actionTypes';

const initialState = {
  // hold id = key
  byId: {},
  // [] of ids
  allIds: [],

  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null
};

function postsPending(state, action) {
  return { ...state, isLoading: true, error: null };
}

function postsSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    loadedAt: Date.now(),
    error: null,
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (posts, post) => ({
          // current opject
          ...posts,
          // add id as key and an object for loading
          [post.id]: {
            data: post,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [...new Set([...state.allIds, ...action.data.map(post => post.id)])]
  };
}

function postsError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function postPending(state, action) {
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function postSuccess(state, action) {
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allIds: [...new Set([...state.allIds, ...action.payload.id])]
  };
}

function postError(state, action) {
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

export default createReducer(initialState, {
  [REQ_POSTS_PENDING]: postsPending,
  [REQ_POSTS_SUCCESS]: postsSuccess,
  [REQ_POSTS_ERROR]: postsError,

  [ADD_POST_ERROR]: postError,
  [ADD_POST_PENDING]: postPending,
  [ADD_POST_SUCCESS]: postSuccess,

  [REQ_POST_ERROR]: postError,
  [REQ_POST_PENDING]: postPending,
  [REQ_POST_SUCCESS]: postSuccess,

  [UPDATE_POST_PENDING]: postPending,
  [UPDATE_POST_SUCCESS]: postSuccess,
  [UPDATE_POST_ERROR]: postError
});
