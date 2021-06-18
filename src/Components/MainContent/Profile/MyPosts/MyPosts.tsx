import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";

import {PostType} from './../../../../Redux/state'

type MyPostPropsType = {
    postsData: Array<PostType>
    addPost: (value: string)=>void
}

const MyPosts = ({postsData, addPost}: MyPostPropsType) => {

    let postItems = postsData.map( p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostItem = React.createRef<HTMLTextAreaElement>()

    const sendPost = () => {
        if (newPostItem.current) {
            let text = newPostItem.current.value
            addPost(text)
            newPostItem.current.value = ''
        }
     }

    return (
        <div>
            <h3>My Posts</h3>
            <textarea ref={newPostItem} placeholder='your news...'/>
            <button onClick={sendPost}>Send</button>
            { postItems }
        </div>
    )
}

export default MyPosts;