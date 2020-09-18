import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import { AbilityContext } from './config/Can'
import ability from './config/ability'
import Cookies from 'js-cookie';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div className="loading" />}>
          <AbilityContext.Provider value={ability}>
            <App />
          </AbilityContext.Provider>
        </Suspense>
    </Provider>,
    document.getElementById('root')
  );
}
try{
  const token = Cookies.getJSON('User').auth.accessToken;
  if(token)
  {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}catch(e){}

render()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
