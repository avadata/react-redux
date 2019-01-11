import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise'

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import LoginUser from './components/login_form';
import Dashboard from './components/dashboard';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="h-100">
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/login" component={LoginUser} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
