import React from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/Profile/Profile";


const App = () => {
    return (
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <Profile/>
        </div>
    )
}

export default App;