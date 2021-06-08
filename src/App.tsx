import React from 'react';
import s from './App.module.css';
import Dialogs from './Components/MainContent/Dialog/Dialogs';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/MainContent/Profile/Profile";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'

import {postsDataPropsType} from './Components/MainContent/Profile/MyPosts/MyPosts'

const App = ({postsData}: postsDataPropsType) => {
    return (
       <Router>
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' render={ () => <Profile postsData={postsData}/>}/>
                <Route path='/dialogs' component={Dialogs}/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>
       </Router>
    )
}

export default App;