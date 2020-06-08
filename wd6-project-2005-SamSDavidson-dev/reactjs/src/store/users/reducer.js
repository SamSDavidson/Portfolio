import {
  SET_USERS, REMOVE_USER, SET_USER, ADD_USER, LOGOUT_USER, LOGIN_USER
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromArray,
  removeIdFromObject
} from '../_utils';

const startState = {
  users: [],
  usersLoadedAt: 0,
  byId: {}
};

export default function usersReducer(state = startState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SET_USERS: {
      const { users } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...arrayToObject(users),
        },
        users: users.map(user => user.id),
        usersLoadedAt: Date.now(),
      }
    }
    case SET_USER: {
      const { user } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [user.id]: user,
        }
      };
    }
    case ADD_USER: {
      const { id } = payload;
      const allIds = [...state.users, id];
      return {
        ...state,
        users: [...new Set(allIds)],
      };
    }
    case REMOVE_USER: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        users: removeIdFromArray(id, state.users)
      }
    }
    case LOGIN_USER: {
      return {...state, currentUser: action.payload}
    }
    case LOGOUT_USER:{
      return {...state, currentUser: {}}
    }
    default: {
      return state;
    }
  }
}