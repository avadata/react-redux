import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import LoginUser from './components/login_form';
import Dashboard from './components/dashboard';
import Debounce from './components/debounce';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers);
export default function configureStore() {
    const store = createStore(
        persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(promise)
    );

    const persistor = persistStore(store);

    return { store, persistor };
}
const { store, persistor } = configureStore();
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const createStoreWithMiddleware = createStore(applyMiddleware(promise))

ReactDOM.render(
//  <Provider store={createStoreWithMiddleware(reducers)}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="h-100">
            <Switch>
              <Route path="/posts/new" component={PostsNew} />
              <Route path="/posts/:id" component={PostsShow} />
              <Route path="/login" component={LoginUser} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/debounce" component={Debounce} />
              <Route path="/" component={PostsIndex} />
            </Switch>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  , document.querySelector('.container'));
