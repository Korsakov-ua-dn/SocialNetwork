import './index.css';
import store from './Redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';

const rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <App store={store}/>
            </Router>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree()

store.subscribe(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
