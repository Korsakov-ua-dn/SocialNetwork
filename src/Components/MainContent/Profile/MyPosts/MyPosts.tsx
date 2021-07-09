import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {MyPostsPropsType} from './MyPostsContainer'
// import { v1 } from 'uuid';

const MyPosts = ({postsData, onPostChange, addPost, newPostText}: MyPostsPropsType) => {

    let postItems = postsData.map( p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostItem = React.createRef<HTMLTextAreaElement>()

    const sendPost = () => {
        if (newPostItem.current) {
            addPost()
        }
    }

    const onPostChangeHandler = () => {
        if (newPostItem.current) {
            let text = newPostItem.current.value
            onPostChange(text)
        }
    }

    return (
        <div>
            <h3>My Posts</h3>
            <textarea ref={newPostItem} onChange={onPostChangeHandler} value={newPostText} placeholder='your news...'/>
            <button onClick={sendPost}>Send</button>
            { postItems }
        </div>
    )
}

export default MyPosts;