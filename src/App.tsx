import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/MainContent/Profile/Profile";
import {Route} from 'react-router-dom';
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import Dialogs from './Components/MainContent/Dialog/Dialogs'

import { DialogItemType, MessageItem, PostType } from './Redux/state';

type AppPropsType = {
    state: StatePropsType
}

type StatePropsType = {
    postsData: Array<PostType>
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItem>
}

const App:React.FC<AppPropsType> = (props: AppPropsType) => {
    return (
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' render={ () => <Profile postsData={props.state["postsData"]} /> }/>
                <Route path='/dialogs' render={ () => <Dialogs dialogsData={props.state.dialogsData} messagesData={props.state.messagesData} /> }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>
    )
}

export default App;