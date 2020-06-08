import API from '../../API';
import {
  SET_TAGS, REMOVE_TAG, SET_TAG, ADD_TAG
} from '../actionTypes'
import { shouldLoad } from '../_utils';

export const fetchTags = () => async (dispatch, getState) => {
  // get current state
  const { tags: { tagsLoadedAt } } = getState();
  if (!shouldLoad(tagsLoadedAt)) return;

  // call tags
  const tags = await API.get('/tags');
  dispatch({ type: SET_TAGS, tags })
};

export const fetchTag = id => async (dispatch, getState) => {
  const { tags: { byId: { [id]: existingTag } } } = getState();
  if (existingTag) return;

  const tag = await API.get(`/tags/${id}`)
  dispatch({ type: SET_TAG, tag })
}

export const saveTag = tag => async (dispatch) => {
  if (tag.id) {
    const updatedTag = await API.put(`/tags/${tag.id}`, tag)

    dispatch({ type: SET_TAG, tag: { ...tag, ...updatedTag } })
  } else {
    const createdTag = await API.post('/tags', tag);
    dispatch({ type: SET_TAG, tag: { ...tag, ...createdTag } })
    dispatch({ type: ADD_TAG, id: createdTag.id })
  }
  return tag;
}

export const deleteTag = id => async (dispatch, getState) => {
  await API.delete(`/tags/${id}`);
  dispatch({ type: REMOVE_TAG, id })
}