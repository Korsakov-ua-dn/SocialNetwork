import React, {ChangeEvent} from 'react';
import s from './App.module.css';
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import Profile from "./Components/MainContent/Profile/Profile";
import Users from './Components/MainContent/Users/Users';
import {Route} from 'react-router-dom';
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import DialogsContainer from './Components/MainContent/Dialog/DialogsContainer'
import { connect } from 'react-redux'
import {Dispatch} from 'redux'
import {profileActions, PostDataType} from './Redux/profile-reducer'
import {AppStateType} from './Redux/redux-store';

// type AppPropsType = {
//     store: AppStoreType
// }

const App = () => {
    // const state = props.store.getState()

    // let message = state.profilePage.postsData[0].message

    return (
        <div className={`${s.app_wrapper} container`}>
            <Header/>
            <Nav/>
            <div className={s.app_wrapper_content}>
                <Route path='/profile' 
                       render={ () => <Profile /> }/>
                <Route path='/dialogs' 
                       render={ () => <DialogsContainer /> }/>
                <Route path='/users' 
                       render={ () => <Users /> }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
            <Route path={'/hello'} render={() => <HelloMessageContainer
                                            // postData={state.profilePage.postsData}
                                            // message={state.profilePage.newPostText}
                                            // dispatch={props.store.dispatch.bind(props.store)}
            /> } />
            {/* <Route path={'/bye'} render={() => <ByeMessage message={message} /> } /> */}
        </div>
    )
}

function HelloMessage(props: HelloMessagePropsType) {

    const onNewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => props.changeText(e.currentTarget.value)

    return (
        <div>
            {props.newPostText}
            <hr />
                {props.postsData.map( p => <div key={p.id}> <b>{p.message}</b> </div> )}
            <hr />
            <textarea value={props.newPostText} onChange={onNewTextHandler} />
            <button onClick={props.addPost} >add post</button>
        </div>
    )
}

type mapStateToPropsType = {
    postsData: PostDataType[]
    newPostText: string
}
type mapDispatchToPropsType = {
    changeText: (text: string) => void
    addPost: () => void
}
export type HelloMessagePropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return (
        {
            postsData: state.profilePage.postsData,
            newPostText: state.profilePage.newPostText,
        }
    )   
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return (
        {
            changeText: (text: string) => dispatch(profileActions.changeTextAC(text)),
            addPost: () =>dispatch(profileActions.addPostAC()),
        }
    )
}

const HelloMessageContainer = connect(mapStateToProps, mapDispatchToProps)(HelloMessage)

// const ByeMessage: React.FC<MessageType> = (props) => {
//     return <h1>{props.message}</h1>
// }

export default App;