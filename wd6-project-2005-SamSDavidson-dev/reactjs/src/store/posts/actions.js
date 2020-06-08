import API from '../../API';
import {
  SET_USER_POSTS,
  REMOVE_POST,
  ADD_USER_POST,
  SET_POST
} from '../actionTypes'
import { shouldLoad } from '../_utils';

export const fetchUserPosts = () => async (dispatch, getState) => {
  // get current state
  const { posts: { userPostsLoadedAt } } = getState();
  if (!shouldLoad(userPostsLoadedAt)) return;

  // call posts
  const userPosts = await API.get('/posts');
  dispatch({ type: SET_USER_POSTS, userPosts })
};

export const fetchPost = id => async (dispatch, getState) => {
  const { posts: { byId: { [id]: existingPost } } } = getState();
  if (existingPost) return;

  const post = await API.get(`/posts/${id}`)
  dispatch({ type: SET_POST, post })
}

export const savePost = post => async (dispatch) => {
  if (post.id) {
    const updatedPost = await API.put(`/posts/${post.id}`, post)

    dispatch({ type: SET_POST, post: { ...post, ...updatedPost } })
  } else {
    const createdPost = await API.post('/posts', post);
    dispatch({ type: SET_POST, post: { ...post, ...createdPost } })
    dispatch({ type: ADD_USER_POST, id: createdPost.id })
  }
  return post;
}

export const deletePost = id => async (dispatch, getState) => {
  await API.delete(`/posts/${id}`);
  dispatch({ type: REMOVE_POST, id })
}