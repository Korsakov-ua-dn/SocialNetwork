import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";

import {ProfilePageType} from './../../../../Redux/state'

type MyPostPropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

const MyPosts = ({profilePage, addPost, updateNewPostText}: MyPostPropsType) => {

    let postItems = profilePage.postsData.map( p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostItem = React.createRef<HTMLTextAreaElement>()

    const sendPost = () => {
        if (newPostItem.current) {
            addPost()
        }
     }

     const onPostChangeHandler = () => {
        if (newPostItem.current) {
            let text = newPostItem.current.value
            updateNewPostText(text)
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