import React, {ChangeEvent} from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/MainContent/Profile/Profile";
import {Route} from 'react-router-dom';
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import Dialogs from './Components/MainContent/Dialog/Dialogs'

import { StoreType, PostType, ActionTypes, changeTextAC, addPostAC } from './Redux/state';

type AppPropsType = {
    store: StoreType
}

const App:React.FC<AppPropsType> = (props) => {
    const state = props.store.getState()

    // let message = state.profilePage.postsData[0].message

    return (
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' render={ () => <Profile 
                                            profilePage={state.profilePage}
                                            dispatch={props.store.dispatch.bind(props.store)}
                                        /> }/>
                <Route path='/dialogs' render={ () => <Dialogs
                                            store={props.store}
                                        /> }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
            <Route path={'/hello'} render={() => <HelloMessage
                                            postData={state.profilePage.postsData}
                                            message={state.profilePage.newPostText}
                                            dispatch={props.store.dispatch.bind(props.store)}
            /> } />
            {/* <Route path={'/bye'} render={() => <ByeMessage message={message} /> } /> */}
        </div>
    )
}

type MessageType = {
    message: string
    postData: Array<PostType>
    dispatch: (action: ActionTypes) => void 
}

function HelloMessage(props: MessageType) {
    const addPost = () => {
        props.dispatch(addPostAC())
    }
    
    const onNewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => props.dispatch(changeTextAC(e.currentTarget.value))

    return (
        <div>
            {props.message}
            <hr />
                {props.postData.map( p => <div key={p.id}> <b>{p.message}</b> </div> )}
            <hr />
            <textarea value={props.message} onChange={onNewTextHandler} />
            <button onClick={addPost} >add post</button>
        </div>
    )
}

// const ByeMessage: React.FC<MessageType> = (props) => {
//     return <h1>{props.message}</h1>
// }

export default App;