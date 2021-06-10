import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";

import {PostType} from './../../../../Redux/state'

export type PostsDataPropsType = {
    postsData: Array<PostType>
}

const MyPosts = ({postsData}: PostsDataPropsType) => {

    let postItems = postsData.map( p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <h3>My Posts</h3>
            <input type="text" placeholder='your news...'/>
            <button>Send</button>
            { postItems }
        </div>
    )
}

export default MyPosts;