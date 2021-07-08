import React, {ChangeEvent} from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/MainContent/Profile/Profile";
import {Route} from 'react-router-dom';
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import DialogsContainer from './Components/MainContent/Dialog/DialogsContainer'


import {PostType, AppStoreType, AppActionTypes} from './Redux/redux-store';
import {profileActions} from './Redux/profile-reducer';

type AppPropsType = {
    store: AppStoreType
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
                                            store={props.store}
                                            // dispatch={props.store.dispatch.bind(props.store)}
                                        /> }/>
                <Route path='/dialogs' render={ () => <DialogsContainer
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
    dispatch: (action: AppActionTypes) => void 
}

function HelloMessage(props: MessageType) {
    const addPost = () => {
        props.dispatch(profileActions.addPostAC())
    }
    
    const onNewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => props.dispatch(profileActions.changeTextAC(e.currentTarget.value))

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