import _ from 'lodash';
import { LOGIN_USER } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    default:
      return state;

  }
}