import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
  // state: (state = {}) => state
  posts: PostsReducer,
  login: LoginReducer,
  form: formReducer
});

export default rootReducer;
