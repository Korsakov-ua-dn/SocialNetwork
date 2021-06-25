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

import state, { StateType, addPost, updateNewPostText, PostType, changeText } from './Redux/state';

type AppPropsType = {
    state: StateType
}

const App:React.FC<AppPropsType> = (props: AppPropsType) => {

    // let message = state.profilePage.postsData[0].message

    return (
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' render={ () => <Profile 
                                            profilePage={props.state.profilePage}
                                            addPost={addPost}
                                            updateNewPostText={updateNewPostText}
                                        /> }/>
                <Route path='/dialogs' render={ () => <Dialogs dialogsPage={props.state.dialogsPage} /> }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
            <Route path={'/hello'} render={() => <HelloMessage
                                            postData={state.profilePage.postsData   }
                                            message={state.profilePage.newPostText}
                                            addPostCallBack={addPost}
                                            changeTextCallback={changeText}
            /> } />
            {/* <Route path={'/hello'} render={() => <ByeMessage message={message} /> } /> */}
        </div>
    )
}

type MessageType = {
    message: string
    postData: Array<PostType>
    addPostCallBack: (postText: string) => void
    changeTextCallback:  (newText: string) => void
}

function HelloMessage(props: MessageType) {
    const addPost = () => {
        props.addPostCallBack(props.message)
    }

    const onNewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => props.changeTextCallback(e.currentTarget.value)

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