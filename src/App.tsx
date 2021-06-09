import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/MainContent/Profile/Profile";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import Dialogs from './Components/MainContent/Dialog/Dialogs'

import { DialogItemType, MessageItem, PostType } from './index';

type AppPropsType = {
    postsData: Array<PostType>
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItem>
}

const App:React.FC<AppPropsType> = ({postsData, dialogsData, messagesData}: AppPropsType) => {
    return (
       <Router>
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' render={ () => <Profile postsData={postsData} /> }/>
                <Route path='/dialogs' render={ () => <Dialogs dialogsData={dialogsData} messagesData={messagesData} /> }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>
       </Router>
    )
}

export default App;