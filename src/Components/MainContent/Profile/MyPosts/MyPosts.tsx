import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";

import {ProfilePageType, ActionTypes, addPostAC, updateNewPostTextAC} from './../../../../Redux/state'

type MyPostPropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionTypes) => void
}

const MyPosts = ({profilePage, dispatch}: MyPostPropsType) => {

    let postItems = profilePage.postsData.map( p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostItem = React.createRef<HTMLTextAreaElement>()

    const sendPost = () => {
        if (newPostItem.current) {
            dispatch(addPostAC())
        }
     }

     const onPostChangeHandler = () => {
        if (newPostItem.current) {
            let text = newPostItem.current.value
            // let action: ActionTypes = {type: "UPDATE-NEW-POST-TEXT", newText: text}
            dispatch(updateNewPostTextAC(text))
        }
     }

    return (
        <div>
            <h3>My Posts</h3>
            <textarea ref={newPostItem} onChange={onPostChangeHandler} value={profilePage.newPostText} placeholder='your news...'/>
            <button onClick={sendPost}>Send</button>
            { postItems }
        </div>
    )
}

export default MyPosts;