import React from 'react';
import s from './App.module.css';
import Dialogs from './Components/Dialog/Dialogs';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/Profile/Profile";
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => {
    return (
       <Router>
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' component={Profile}/>
                <Route path='/dialogs' component={Dialogs}/>
            </div>
        </div>
       </Router>
    )
}

export default App;