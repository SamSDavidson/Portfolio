import {
  SET_TAGS, REMOVE_TAG, SET_TAG, ADD_TAG
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromArray,
  removeIdFromObject
} from '../_utils';

const startState = {
  tags: [],
  tagsLoadedAt: 0,
  byId: {}
};

export default function tagReducer(state = startState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SET_TAGS: {
      const { tags } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...arrayToObject(tags),
        },
        tags: tags.map(tag => tag.id),
        tagsLoadedAt: Date.now(),
      }
    }
    case SET_TAG: {
      const { tag } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [tag.id]: tag,
        }
      };
    }
    case ADD_TAG: {
      const { id } = payload;
      const allIds = [...state.tags, id];
      return {
        ...state,
        tags: [...new Set(allIds)],
      };
    }
    case REMOVE_TAG: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        tags: removeIdFromArray(id, state.tags)
      }
    }
    default: {
      return state;
    }
  }
}