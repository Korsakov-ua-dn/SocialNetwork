import React from 'react'
import s from './App.module.css'
import HeaderContainer from './Components/Header/HeaderContainer'
import Nav from './Components/Nav/Nav'
import ProfileContainer from './Components/MainContent/Profile/ProfileContainer'
import UsersContainer from './Components/MainContent/Users/UsersContainer'
import {Route} from 'react-router-dom'
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import DialogsContainer from './Components/MainContent/Dialog/DialogsContainer'
import Login from './Components/Login/Login'

const App = () => {

    return (
        <div className={`${s.app_wrapper} container`}>
            <HeaderContainer/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer/>}/>
                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}/>
                <Route path='/users'
                       render={() => <UsersContainer/>}/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
                <Route path='/login'
                       render={() => <Login />} />
            </div>
        </div>
    )
}

export default App