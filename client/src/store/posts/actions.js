import { v1 as uuid } from 'uuid';
import API from '../_utils/API';
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

const CACHE_TIME = 1000 * 60 * 5;

export const fetchPosts = () => ({
  types: [REQ_POSTS_PENDING, REQ_POSTS_SUCCESS, REQ_POSTS_ERROR],
  callAPI: () => API.get('/posts'),
  // check app state and call API if applicable
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.posts;
    // check if posts are loading
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if empty or timeout on request make the API req
    return !loadedAt || !isCached;
  }
});

export const createPost = post => {
  const id = uuid();
  return {
    types: [ADD_POST_ERROR, ADD_POST_PENDING, ADD_POST_SUCCESS],
    callAPI: () => API.post('/posts', { id, ...post }),
    payload: { id }
  };
};

export const fetchPost = id => ({
  types: [REQ_POST_ERROR, REQ_POST_PENDING, REQ_POST_SUCCESS],
  callAPI: () => API.get(`/posts/${id}`),

  shouldCallAPI: state => {
    const post = state.posts.byId[id] || {};
    const { loadedAt, isLoading } = post;
    if (!post || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
    
  },
  payload: { id }
});

export const updatePost = post => ({
  types: [UPDATE_POST_ERROR, UPDATE_POST_PENDING, UPDATE_POST_SUCCESS],
  callAPI: () => API.put(`/posts/${post.id}`, post),
  payload: { id: post.id }
});
