import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import './index.css';
import reportWebVitals from './reportWebVitals';

const store = createStore(
  burgerBuilderReducer,
  compose(applyMiddleware(thunk))
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
