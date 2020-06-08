import {
  SET_USER_POSTS, REMOVE_POST, SET_POST, ADD_USER_POST
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromArray,
  removeIdFromObject
} from '../_utils';

const startState = {
  posts: [],
  postsLoadedAt: 0,
  byId: {}
};

export default function postReducer(state = startState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SET_USER_POSTS: {
      const { posts } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...arrayToObject(posts),
        },
        posts: posts.map(post => post.id),
        postsLoadedAt: Date.now(),
      }
    }
    case SET_POST: {
      const { post } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [post.id]: post,
        }
      };
    }
    case ADD_USER_POST: {
      const { id } = payload;
      const allIds = [...state.userPosts, id];
      return {
        ...state,
        userPosts: [...new Set(allIds)],
      };
    }
    case REMOVE_POST: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        userPosts: removeIdFromArray(id, state.userPosts)
      }
    }
    default: {
      return state;
    }
  }
}