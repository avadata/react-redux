import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOGIN_USER = 'LOGIN_USER';

const ROOT_URL = 'http://reduxblog.herokuapp.com'
const API_KEY = '?key=KESHAK123';

export function fetchPosts() {
  const request  = axios.get(`${ROOT_URL}/api/posts${API_KEY}`)
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(values, callback) {
  const request  = axios.post(`${ROOT_URL}/api/posts${API_KEY}`, values)
  .then(()=> callback());
  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id) {
  const request  = axios.get(`${ROOT_URL}/api/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request  = axios.delete(`${ROOT_URL}/api/posts/${id}${API_KEY}`)
  .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  }
}

export function loginUser(values, callback){
  console.log('user info data ', values);
  if(values.username){
    callback();
  }
  return{
    type: LOGIN_USER,
    payload: values
  }
}
