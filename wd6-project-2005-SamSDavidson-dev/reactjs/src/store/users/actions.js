import API from '../../API';
import {
  SET_USERS, REMOVE_USER, SET_USER, LOGIN_USER
} from '../actionTypes'
import { shouldLoad } from '../_utils';

const AWS = require('aws-sdk')
const uuid = require('uuid')

// access and secret keys
const AWS_ACCESS_KEY_ID = 'AKIAIFEMWV4UH7MYXL3Q';
const AWS_SECRET_KEY = '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';

const REGION = 'us-east-2';

const BUCKET_NAME = 'sd-shipit';

const s3 = new AWS.S3({
	signatureCache: 'v4',
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_KEY,
	region: REGION
});


export const fetchUsers = () => async (dispatch, getState) => {
  // get current state
  const { users: { usersLoadedAt } } = getState();
  if (!shouldLoad(usersLoadedAt)) return;

  // call users
  const users = await API.get('/users');
  dispatch({ type: SET_USERS, users })
};

export const fetchUser = id => async (dispatch, getState) => {
  const { users: { byId: { [id]: existingUser } } } = getState();
  if (existingUser) return;

  const user = await API.get(`/users/${id}`)
  dispatch({ type: SET_USER, user })
}

export const saveUser = user => async (dispatch) => {
  if (user.id) {
    const avatar = user.avatar
    const base64Data = new Buffer.from(avatar.replace(/^data:image\/\w+;base64/, ''), 'base64')

    // pull image type
    const type = avatar.split(':')[0].split('/')[1];
  
    const photoId = uuid();
  
    const params = {
      Bucker: BUCKET_NAME,
      Key: `${photoId}-avatar-${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    }
  
    const imageLocation = await s3.upload(params).promise();
    user.avatar = imageLocation;

    const updatedUser = await API.put(`/users/${user.id}`, user);
		console.log('Location',Location);


    dispatch({ type: SET_USER, user: { ...user, ...updatedUser } })
  } else {
    console.log('User not active')
  }
  return user;
}

export const userRegister = user => async (dispatch) => {
  await API.post(`/users/register`, user)
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
        console.log('Message: ', data.message)
      } else {
        localStorage.setItem("token", data.user.token)
        dispatch({type: LOGIN_USER, user })
      }
    })

}

export const userLogin = user => async (dispatch, getState) => {
  await API.post(`/users/authenticate`, user)
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.user.token)
      dispatch({type: LOGIN_USER, user})
    })
}

export const deleteUser = id => async (dispatch, getState) => {
  await API.delete(`/users/${id}`);
  dispatch({ type: REMOVE_USER, id })
}